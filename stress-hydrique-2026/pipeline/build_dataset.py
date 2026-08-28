"""Jointure et export des résultats calculés du Lab."""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

from analyze_trends import calculer_rang_percentile, test_tendance_mann_kendall


ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"

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


if __name__ == "__main__":
    result = build_departements_dataset()
    print(json.dumps({"n_stations": result["n_stations"], "n_points_annuels": len(result["serie_annuelle"])}, ensure_ascii=False))
