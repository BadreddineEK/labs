"""Part des principales économies dans le PIB nominal de l'UE27, 2005-2025.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"


def _load(name):
    return json.loads((RAW / name).read_text(encoding="utf-8"))


def _annuel(serie, annee):
    valeurs = [serie.get(f"{annee}-Q{q}") for q in (1, 2, 3, 4)]
    if any(v is None for v in valeurs):
        return None
    return sum(valeurs)


def build_part_pib_europe():
    de = _load("pib_nominal_DE.json")
    fr = _load("pib_nominal_FR.json")
    it = _load("pib_nominal_IT.json")
    es = _load("pib_nominal_ES.json")
    pl = _load("pib_nominal_PL.json")
    eu = _load("pib_nominal_EU27_2020.json")

    annees = list(range(2005, 2026))
    series = {
    "Allemagne": de,
    "France": fr,
    "Italie": it,
    "Espagne": es,
    "Pologne": pl,
    }
    points = []
    for annee in annees:
        eu_a = _annuel(eu, annee)
        if eu_a is None:
            continue
        row = {"annee": annee}
        for nom, serie in series.items():
            v = _annuel(serie, annee)
            row[nom] = round(v / eu_a * 100, 1) if v is not None else None
        points.append(row)

    premiere, derniere = points[0], points[-1]
    result = {
        "points": points,
        "premiere_annee": premiere,
        "derniere_annee": derniere,
        "lecture": (
            "La part de la France dans le PIB de l'UE27 recule sur 20 ans, mais elle n'est pas seule : "
            "l'Italie recule davantage sur la meme periode, pendant que des pays comme la Pologne montent. "
            "C'est une redistribution plus large au sein de l'UE, pas un decrochage franco-francais isole."
        ),
        "perimetre": "UE27 a composition actuelle (EU27_2020), PIB nominal (prix courants), sommes annuelles des 4 trimestres.",
        "source": "Eurostat, comptes nationaux trimestriels (namq_10_gdp), PIB a prix courants.",
    }
    (OUT / "part_pib_europe.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    print(json.dumps(build_part_pib_europe(), ensure_ascii=False, indent=2))
