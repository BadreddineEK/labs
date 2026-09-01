"""Magnitude des revisions Insee (version reduite, voir CONSIGNES.md §5.1 et §8).

Faute de donnees "vintage" facilement accessibles en open data sur 8-12 trimestres,
on se limite aux deux revisions recentes documentees (T1 et T2 2026), comparees a la
reference historique du Senat (0,45 point sur 2000-2005). Le Lab le signale explicitement.
"""

from __future__ import annotations

import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "data"

# Faits verifies (CONSIGNES §3). Premiere estimation vs estimation detaillee (horizon court, ~1 mois).
REVISIONS = [
    {"trimestre": "T1 2026", "premiere": -0.1, "detaillee": -0.2},
    {"trimestre": "T2 2026", "premiere": 0.2, "detaillee": 0.0},
]
# Reference historique : ecart moyen premiere estimation vs COMPTE DEFINITIF (horizon long).
REF_SENAT_POINTS = 0.45
REF_SENAT_PERIODE = "2000-2005"


def calculer_magnitude_revisions(revisions=REVISIONS):
    ecarts = [round(r["detaillee"] - r["premiere"], 2) for r in revisions]
    magnitudes = [abs(e) for e in ecarts]
    for r, e in zip(revisions, ecarts):
        r["revision"] = e
        r["magnitude"] = abs(e)
    moyenne = round(sum(magnitudes) / len(magnitudes), 3)
    return {
        "revisions": revisions,
        "magnitude_moyenne": moyenne,
        "magnitude_max": max(magnitudes),
        "n": len(revisions),
        "toutes_baissieres": all(e < 0 for e in ecarts),
        "ref_senat_points": REF_SENAT_POINTS,
        "ref_senat_periode": REF_SENAT_PERIODE,
        "echantillon_limite": True,
        "note_horizon": (
            "Notre ecart (premiere estimation vers estimation detaillee) couvre l'horizon court "
            "(environ un mois). La reference Senat (0,45 point) couvre l'horizon long, jusqu'au "
            "compte definitif. La revision du T2 2026 peut donc encore evoluer."
        ),
    }


def main():
    result = calculer_magnitude_revisions()
    (OUT / "revisions.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    print(json.dumps(main(), ensure_ascii=False, indent=2))
