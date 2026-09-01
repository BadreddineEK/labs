"""Dette et deficit publics, comparaison France/Allemagne/Italie/Espagne.

Voir addendum comparaison systematique : chaque chiffre macro francais est resitue
par rapport a la meme cohorte de pays (DE, IT, ES, zone euro).
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"

PAYS = {"FR": "France", "DE": "Allemagne", "IT": "Italie", "ES": "Espagne"}


def _load(name):
    return json.loads((RAW / name).read_text(encoding="utf-8"))


def build_dette_deficit():
    dette_q_fr = _load("dette_q_fr.json")
    periodes_q = sorted(dette_q_fr)

    dette_annuelle = {geo: _load(f"dette_a_{geo}.json") for geo in PAYS}
    deficit_annuelle = {geo: _load(f"deficit_a_{geo}.json") for geo in PAYS}
    derniere_annee = sorted(dette_annuelle["FR"])[-1]

    result = {
        "dette_trimestrielle_fr": [{"periode": p, "valeur": dette_q_fr[p]} for p in periodes_q],
        "dette_derniere_fr": {"periode": periodes_q[-1], "valeur": dette_q_fr[periodes_q[-1]]},
        "dette_comparaison": {
            "annee": derniere_annee,
            "pays": [{"geo": g, "pays": PAYS[g], "valeur": dette_annuelle[g].get(derniere_annee)} for g in PAYS],
        },
        "deficit_comparaison": {
            "annee": derniere_annee,
            "pays": [{"geo": g, "pays": PAYS[g], "valeur": deficit_annuelle[g].get(derniere_annee)} for g in PAYS],
        },
        # Projection conditionnelle citee (pas calculee par nous) : a presenter comme telle.
        "projection_dette": {
            "hypothese": "a legislation constante, sans nouvelle mesure de redressement",
            "points": [
                {"annee": "2027", "valeur": 120.0},
                {"annee": "2030", "valeur": 129.0},
            ],
            "type": "projection conditionnelle, non une certitude",
        },
        "budget_2027": {
            "deficit_vise_2027": 4.9,
            "deficit_2025": deficit_annuelle["FR"].get(derniere_annee),
            "date_presentation": "30 septembre 2026",
        },
        "note_ecart_source": (
            "Notre point calculé (Eurostat, comptes trimestriels harmonisés) porte sur le dernier trimestre "
            "disponible dans cette base, en général un trimestre derrière la publication nationale la plus "
            "récente de l'Insee (qui peut afficher un chiffre légèrement différent et plus à jour). Écart de "
            "calendrier de publication, pas une contradiction de fond."
        ),
    }
    (OUT / "dette_deficit.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    print(json.dumps(build_dette_deficit(), ensure_ascii=False, indent=2))
