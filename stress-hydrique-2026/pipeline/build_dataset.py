"""Jointure et export des résultats calculés du Lab."""

from __future__ import annotations

import json
import math
from pathlib import Path

import pandas as pd

from analyze_trends import calculer_rang_percentile, test_tendance_mann_kendall
from analyze_correlation import correlation_fuites_facteurs
from cluster_departements import determiner_nombre_clusters_optimal, kmeans_typologies_departements


ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"
REVENUS = ROOT.parent / "rentree-2026" / "data" / "correlation.json"

def build_departements_dataset():
    source = RAW / "piezometrie_chroniques_longues.json"
    if not source.exists():
        raise FileNotFoundError("Lancer fetch_data.py avant build_dataset.py")
    payload = json.loads(source.read_text(encoding="utf-8"))
    summaries = []
    annual_rows = []
    for item in payload.get("stations", []):
        station = item["station"]
        rows = pd.DataFrame(item.get("data", []))
        if rows.empty:
            continue
        rows["date_mesure"] = pd.to_datetime(rows["date_mesure"], errors="coerce")
        rows["niveau_nappe_eau"] = pd.to_numeric(rows["niveau_nappe_eau"], errors="coerce")
        rows = rows.dropna(subset=["date_mesure", "niveau_nappe_eau"])
        rows = rows[rows["date_mesure"].dt.year >= 2000]
        if len(rows) < 8:
            continue
        annual = rows.assign(annee=rows["date_mesure"].dt.year).groupby("annee")["niveau_nappe_eau"].median().dropna()
        if len(annual) < 8:
            continue
        trend = test_tendance_mann_kendall(annual.to_numpy())
        current = float(annual.iloc[-1])
        percentile = calculer_rang_percentile(current, annual.to_numpy())
        summaries.append({
            "bss_id": station.get("bss_id"),
            "departement": station.get("nom_departement"),
            "code_departement": station.get("code_departement"),
            "annee_debut": int(annual.index[0]),
            "annee_fin": int(annual.index[-1]),
            "tendance": trend,
            "percentile_actuel": percentile,
        })
        annual_rows.extend({"bss_id": station.get("bss_id"), "annee": int(index), "niveau": round(float(value), 3)} for index, value in annual.items())
    result = {"n_stations": len(summaries), "stations": summaries, "serie_annuelle": annual_rows}
    (OUT / "tendance_percentile.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def build_fuites_dataset():
    """Taux de fuite departemental (SISPEA) croise au revenu median (INSEE)."""
    source = RAW / "sispea_rendement.json"
    if not source.exists():
        raise FileNotFoundError("Lancer fetch_data.py avant build_dataset.py")
    services = json.loads(source.read_text(encoding="utf-8")).get("data", [])
    annees = sorted({s.get("annee") for s in services if s.get("annee")})
    millesime = annees[-1] if annees else None
    rows = []
    for service in services:
        if service.get("annee") != millesime:
            continue
        rendement = service.get("indicateur")
        communes = service.get("codes_commune") or []
        if rendement is None or not communes:
            continue
        # rendement en %, taux de fuite = complement a 100 (borne a [0, 100])
        taux_fuite = max(0.0, min(100.0, 100.0 - float(rendement)))
        for code in communes:
            if len(code) >= 2 and code[:2].isdigit():
                rows.append({"code_departement": code[:2], "taux_fuite": taux_fuite})
    frame = pd.DataFrame(rows)
    if frame.empty:
        raise ValueError("Aucun service exploitable dans SISPEA")
    par_dep = frame.groupby("code_departement")["taux_fuite"].median().round(1)
    n_services = frame.groupby("code_departement")["taux_fuite"].size()

    revenus = json.loads(REVENUS.read_text(encoding="utf-8")).get("points", [])
    revenu_par_dep = {p["code"]: p["revenu_median"] for p in revenus if p.get("revenu_median")}
    nom_par_dep = {p["code"]: p["nom"].title() for p in revenus if p.get("nom")}

    departements = []
    for code, taux in par_dep.items():
        departements.append({
            "code_departement": code,
            "nom": nom_par_dep.get(code, code),
            "taux_fuite": float(taux),
            "n_services": int(n_services[code]),
            "revenu_median": revenu_par_dep.get(code),
        })
    departements.sort(key=lambda d: d["taux_fuite"], reverse=True)

    seuil_services = 10
    robustes = [d for d in departements if d["n_services"] >= seuil_services]
    joint = pd.DataFrame([d for d in robustes if d["revenu_median"] is not None])
    correlation = correlation_fuites_facteurs(joint, facteurs=("revenu_median",)) if len(joint) >= 3 else None
    taux_robustes = pd.Series([d["taux_fuite"] for d in robustes])

    result = {
        "millesime": millesime,
        "n_departements": len(departements),
        "seuil_services": seuil_services,
        "n_departements_robustes": len(robustes),
        "national": {
            "taux_fuite_median": round(float(taux_robustes.median()), 1),
            "lecture": "Taux de fuite = 100 - rendement du reseau, mediane par departement (>= 5 services).",
        },
        "departements_robustes": robustes,
        "departements": departements,
        "correlation_revenu": correlation,
    }
    (OUT / "fuites_facteurs.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def _nommer_clusters(profils):
    """Assign a unique label per cluster from its most distinctive standardized feature."""
    libelles = {
        ("pluvio_2025_mm", "-"): "Faible pluviométrie",
        ("pluvio_2025_mm", "+"): "Forte pluviométrie",
        ("taux_fuite", "+"): "Réseaux qui fuient",
        ("taux_fuite", "-"): "Réseaux performants",
        ("densite_log", "+"): "Territoires denses",
        ("densite_log", "-"): "Territoires ruraux",
        ("revenu_median", "+"): "Revenus élevés",
        ("revenu_median", "-"): "Revenus modestes",
    }
    ranking = []
    for cluster in profils.index:
        for feature in profils.columns:
            ranking.append((abs(profils.loc[cluster, feature]), cluster, feature))
    ranking.sort(reverse=True)
    noms, used_clusters, used_labels = {}, set(), set()
    for _, cluster, feature in ranking:
        if cluster in used_clusters:
            continue
        sign = "+" if profils.loc[cluster, feature] >= 0 else "-"
        label = libelles.get((feature, sign))
        if label is None or label in used_labels:
            continue
        noms[cluster] = label
        used_clusters.add(cluster)
        used_labels.add(label)
    for cluster in profils.index:
        noms.setdefault(cluster, "Profil intermédiaire")
    return noms


def build_typologie_dataset():
    """Clustering exploratoire departemental sur des variables reelles et fiables."""
    fuites = json.loads((OUT / "fuites_facteurs.json").read_text(encoding="utf-8"))
    context = json.loads((RAW / "departements_context.json").read_text(encoding="utf-8"))
    fuite_par_dep = {d["code_departement"]: d for d in fuites["departements_robustes"]}

    rows = []
    for code, ctx in context.items():
        if not code[:2].isdigit() or code.startswith("97") or code == "20":
            continue  # metropole uniquement, regimes DOM et Corse-2A/2B a part
        if code in {"75", "92", "93", "94"}:
            continue  # Paris + petite couronne : coeurs ultra-urbains non representatifs
        base = fuite_par_dep.get(code)
        if not base or base.get("revenu_median") is None:
            continue
        if ctx.get("densite") is None or ctx.get("pluvio_2025_mm") is None:
            continue
        rows.append({
            "code_departement": code,
            "nom": base["nom"],
            "taux_fuite": base["taux_fuite"],
            "densite": ctx["densite"],
            "densite_log": round(math.log10(ctx["densite"]), 3) if ctx["densite"] > 0 else 0.0,
            "pluvio_2025_mm": ctx["pluvio_2025_mm"],
            "revenu_median": base["revenu_median"],
        })
    frame = pd.DataFrame(rows)
    features = ["taux_fuite", "densite_log", "pluvio_2025_mm", "revenu_median"]
    if len(frame) < 8:
        raise ValueError("Pas assez de departements complets pour le clustering")

    n_opt, scores = determiner_nombre_clusters_optimal(frame, features=features)
    labelled, meta = kmeans_typologies_departements(frame, int(n_opt), features=features)

    standardized = (labelled[features] - labelled[features].mean()) / labelled[features].std(ddof=0)
    standardized["cluster"] = labelled["cluster"]
    profils = standardized.groupby("cluster")[features].mean().round(2)
    noms = _nommer_clusters(profils)

    profil_features = ["taux_fuite", "densite", "pluvio_2025_mm", "revenu_median"]
    reels = labelled.groupby("cluster")[profil_features].mean().round(1)
    clusters = []
    for c in profils.index:
        membres = labelled[labelled["cluster"] == c]
        clusters.append({
            "cluster": int(c),
            "nom": noms[c],
            "n_departements": int(len(membres)),
            "profil_moyen_reel": {f: float(reels.loc[c, f]) for f in profil_features},
            "departements": sorted(membres["nom"].tolist()),
        })

    result = {
        "n_departements": int(len(labelled)),
        "features": features,
        "n_clusters": int(n_opt),
        "silhouette": round(meta["silhouette"], 3),
        "silhouette_par_k": scores,
        "exploratoire": True,
        "clusters": clusters,
        "departements": [
            {"code_departement": r["code_departement"], "nom": r["nom"],
             "cluster": int(labelled.loc[i, "cluster"]), "typologie": noms[labelled.loc[i, "cluster"]]}
            for i, r in labelled.iterrows()
        ],
    }
    (OUT / "typologie_departements.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    result = build_departements_dataset()
    fuites = build_fuites_dataset()
    typologie = build_typologie_dataset()
    print(json.dumps({
        "n_stations": result["n_stations"],
        "n_points_annuels": len(result["serie_annuelle"]),
        "millesime_fuites": fuites["millesime"],
        "n_departements_fuites": fuites["n_departements"],
        "correlation_revenu": fuites["correlation_revenu"]["correlations"]["revenu_median"]["pearson_r"] if fuites["correlation_revenu"] else None,
        "n_clusters": typologie["n_clusters"],
        "silhouette": typologie["silhouette"],
        "typologies": [c["nom"] + " (" + str(c["n_departements"]) + ")" for c in typologie["clusters"]],
    }, ensure_ascii=False))
