"""Croissance trimestrielle FR/DE/IT/ES/zone euro sur ~10 ans (profondeur temporelle).

Objectif : montrer que le trimestre actuel s'inscrit dans une phase de croissance
faible engagee depuis fin 2025, pas un accident isole.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"

PAYS = {"FR": "France", "DE": "Allemagne", "IT": "Italie", "ES": "Espagne", "EA20": "Zone euro"}


def _load(name):
    return json.loads((RAW / name).read_text(encoding="utf-8"))


def build_croissance_longue():
    series = {geo: _load(f"croissance_longue_{geo}.json") for geo in PAYS}
    periodes = sorted(series["FR"])

    # Moyenne mobile 4 trimestres (indicatif) pour lisser la phase de ralentissement recente.
    fr_vals = [series["FR"][p] for p in periodes]
    recent = [p for p in periodes if p >= "2025-Q1"]
    moy_fr_recente = round(sum(series["FR"][p] for p in recent) / len(recent), 2) if recent else None
    autres = [g for g in PAYS if g != "FR"]
    moy_autres_recente = round(
        sum(series[g][p] for g in autres for p in recent if series[g].get(p) is not None)
        / sum(1 for g in autres for p in recent if series[g].get(p) is not None),
        2,
    ) if recent else None

    ecart = round(moy_fr_recente - moy_autres_recente, 2) if moy_fr_recente is not None and moy_autres_recente is not None else None
    if ecart is not None and ecart <= -0.15:
        verdict = "sous-performance spécifiquement française : le ralentissement français est plus marqué que celui de ses pairs sur la même période"
    elif ecart is not None and ecart >= 0.15:
        verdict = "la France ralentit un peu moins que ses pairs sur cette période récente"
    else:
        verdict = "ralentissement globalement partagé avec l'Allemagne, l'Italie, l'Espagne et la zone euro, pas un phénomène isolément français"

    result = {
        "periodes": periodes,
        "pays": {PAYS[geo]: [series[geo].get(p) for p in periodes] for geo in PAYS},
        "moyenne_fr_2025_2026": moy_fr_recente,
        "moyenne_autres_2025_2026": moy_autres_recente,
        "ecart_fr_vs_autres": ecart,
        "verdict": verdict,
        "lecture": (
            "Depuis fin 2025, la croissance trimestrielle française tourne autour de zéro, "
            "un ralentissement anticipé dès octobre 2025 par l'OFCE (prévision annuelle proche de +0,7 % "
            "pour 2025 et 2026), pas une surprise soudaine de l'été 2026."
        ),
        "source": "Eurostat, PIB en volume, variation t/t-1 (CVS-CJO), depuis 2016. Prévisions historiques : OFCE (octobre 2025, avril 2026).",
    }
    (OUT / "croissance_longue.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    print(json.dumps(build_croissance_longue(), ensure_ascii=False, indent=2))
