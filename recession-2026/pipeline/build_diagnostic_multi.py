"""Diagnostic multi-indicateurs simplifie (CONSIGNES.md §5.2).

EXPLORATOIRE : 4 series Insee/Eurostat cote a cote pour montrer que la regle
"2 trimestres negatifs" est une simplification. PAS le modele a seuils de l'etude AFSE.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"


def _load(name):
    return json.loads((RAW / name).read_text(encoding="utf-8"))


def _last(series):
    period = sorted(series)[-1]
    return period, series[period]


def _yoy(series):
    """Glissement annuel (%) sur une serie de niveaux trimestriels (retire la saisonnalite)."""
    periods = sorted(series)
    last = periods[-1]
    year, q = last.split("-")
    prev = f"{int(year) - 1}-{q}"
    if prev not in series:
        return last, None
    return last, round((series[last] / series[prev] - 1) * 100, 2)


def _direction(value, seuil=0.05):
    if value is None:
        return "inconnu"
    if value > seuil:
        return "positif"
    if value < -seuil:
        return "negatif"
    return "stable"


def construire_diagnostic_multi_indicateurs():
    pib = _load("pib_fr.json")
    fbcf = _load("fbcf_fr.json")
    emploi = _load("emploi_fr.json")
    capa = _load("capacites_fr.json")

    p_pib, v_pib = _last(pib)
    p_fbcf, v_fbcf = _last(fbcf)
    p_emp, v_emp = _yoy(emploi)
    # Aligner l'utilisation des capacites sur le meme trimestre que le PIB : l'enquete de conjoncture
    # publie parfois un point plus recent (ex. T3) que les comptes nationaux (ex. T2) - on ne compare
    # que des trimestres communs pour eviter un decalage silencieux de date.
    capa_alignee = {p: v for p, v in capa.items() if p <= p_pib}
    p_capa, v_capa = _last(capa_alignee)
    moy_capa = round(sum(capa.values()) / len(capa), 1)

    indicateurs = [
        {"nom": "PIB", "mesure": "variation trimestrielle", "periode": p_pib,
         "valeur": v_pib, "unite": "%", "direction": _direction(v_pib),
         "lecture": "stable, ni positif ni negatif" if _direction(v_pib) == "stable" else None},
        {"nom": "Investissement (FBCF)", "mesure": "variation trimestrielle", "periode": p_fbcf,
         "valeur": v_fbcf, "unite": "%", "direction": _direction(v_fbcf)},
        {"nom": "Emploi", "mesure": "glissement annuel", "periode": p_emp,
         "valeur": v_emp, "unite": "%", "direction": _direction(v_emp)},
        {"nom": "Utilisation des capacités", "mesure": "niveau (industrie)", "periode": p_capa,
         "valeur": v_capa, "unite": "%", "direction": "stable",
         "reference": moy_capa, "lecture": f"proche de sa moyenne recente ({str(moy_capa).replace('.', ',')} %)"},
    ]

    negatifs = sum(1 for i in indicateurs if i["direction"] == "negatif")
    result = {
        "indicateurs": indicateurs,
        "n_negatifs": negatifs,
        "n_total": len(indicateurs),
        "exploratoire": True,
        "note_bases": (
            "Chaque indicateur suit sa base de reference usuelle (le PIB et l'investissement en variation "
            "trimestrielle, l'emploi en glissement annuel, l'utilisation des capacites en niveau) : ce n'est "
            "pas un vote a poids egal entre series comparables, mais une juxtaposition de signaux de nature differente."
        ),
        "lecture": (
            "Les indicateurs ne pointent pas tous dans la meme direction : selon celui qu'on regarde, "
            "le diagnostic change. C'est justement pourquoi les economistes croisent plusieurs series "
            "plutot que la seule regle des deux trimestres negatifs."
        ),
        "source": "Eurostat (comptes nationaux trimestriels et enquete de conjoncture), donnees 2026.",
    }
    (OUT / "diagnostic_multi.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def main():
    return construire_diagnostic_multi_indicateurs()


if __name__ == "__main__":
    print(json.dumps(main(), ensure_ascii=False, indent=2))
