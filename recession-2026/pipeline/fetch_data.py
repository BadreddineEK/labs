"""Ingestion Eurostat (harmonise, ouvert) pour le Lab Recession 2026.

Voir CONSIGNES.md. Chaque serie est recuperee seule (un geo, un indicateur)
pour que l'index plat de JSON-stat corresponde directement au temps.
"""

from __future__ import annotations

import json
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
RAW.mkdir(parents=True, exist_ok=True)
BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"


def eurostat_series(dataset: str, params: dict, filename: str) -> dict:
    """Retourne {periode: valeur} pour une serie a une seule dimension temporelle."""
    response = requests.get(BASE + dataset, params={**params, "format": "JSON"}, timeout=60)
    response.raise_for_status()
    payload = response.json()
    times = payload.get("dimension", {}).get("time", {}).get("category", {}).get("index", {})
    values = payload.get("value", {})
    series = {period: values.get(str(pos)) for period, pos in times.items()}
    series = {k: v for k, v in series.items() if v is not None}
    (RAW / filename).write_text(json.dumps(series, ensure_ascii=False), encoding="utf-8")
    return series


def fetch_pib_croissance_fr():
    return eurostat_series(
        "namq_10_gdp",
        {"geo": "FR", "na_item": "B1GQ", "unit": "CLV_PCH_PRE", "s_adj": "SCA", "sinceTimePeriod": "2023-Q1"},
        "pib_fr.json",
    )


def fetch_pib_pays():
    out = {}
    for geo in ("FR", "DE", "IT", "ES", "EA20"):
        out[geo] = eurostat_series(
            "namq_10_gdp",
            {"geo": geo, "na_item": "B1GQ", "unit": "CLV_PCH_PRE", "s_adj": "SCA", "sinceTimePeriod": "2024-Q1"},
            f"pib_{geo}.json",
        )
    return out


def fetch_fbcf_fr():
    return eurostat_series(
        "namq_10_gdp",
        {"geo": "FR", "na_item": "P51G", "unit": "CLV_PCH_PRE", "s_adj": "SCA", "sinceTimePeriod": "2023-Q1"},
        "fbcf_fr.json",
    )


def fetch_emploi_fr():
    # Emploi interieur total (niveau, milliers). NSA -> on calculera le glissement annuel.
    return eurostat_series(
        "namq_10_a10_e",
        {"geo": "FR", "na_item": "EMP_DC", "unit": "THS_PER", "s_adj": "NSA", "nace_r2": "TOTAL", "sinceTimePeriod": "2022-Q1"},
        "emploi_fr.json",
    )


def fetch_capacites_fr():
    # Taux d'utilisation des capacites de production dans l'industrie (%).
    return eurostat_series(
        "ei_bsin_q_r2",
        {"geo": "FR", "indic": "BS-ICU-PC", "s_adj": "SA", "sinceTimePeriod": "2023-Q1"},
        "capacites_fr.json",
    )


# --- v2 : profondeur (dette, deficit, part PIB UE, cycles) ---

def fetch_dette_trimestrielle_fr():
    # Dette publique consolidee, % PIB, trimestrielle (comptes nationaux, secteur S13).
    return eurostat_series(
        "gov_10q_ggdebt",
        {"geo": "FR", "unit": "PC_GDP", "sector": "S13", "na_item": "GD", "sinceTimePeriod": "2022-Q1"},
        "dette_q_fr.json",
    )


def fetch_dette_deficit_annuels():
    out = {"dette": {}, "deficit": {}}
    for geo in ("FR", "DE", "IT", "ES"):
        out["dette"][geo] = eurostat_series(
            "gov_10dd_edpt1",
            {"geo": geo, "unit": "PC_GDP", "sector": "S13", "na_item": "GD", "sinceTimePeriod": "2019"},
            f"dette_a_{geo}.json",
        )
        out["deficit"][geo] = eurostat_series(
            "gov_10dd_edpt1",
            {"geo": geo, "unit": "PC_GDP", "sector": "S13", "na_item": "B9", "sinceTimePeriod": "2019"},
            f"deficit_a_{geo}.json",
        )
    return out


def fetch_pib_nominal_part_ue():
    # PIB nominal (prix courants), pour calculer la part des principaux pays
    # dans le PIB de l'UE27 depuis 2004.
    out = {}

    for geo in ("DE", "FR", "IT", "ES", "PL", "EU27_2020"):
        out[geo] = eurostat_series(
            "namq_10_gdp",
            {
                "geo": geo,
                "na_item": "B1GQ",
                "unit": "CP_MEUR",
                "s_adj": "NSA",
                "sinceTimePeriod": "2004-Q1",
            },
            f"pib_nominal_{geo}.json",
        )

    return out


def fetch_pib_niveau_volume_fr():
    # PIB en volume, niveau (chaine, CVS-CJO) : serie d'entree pour la detection de points de retournement.
    return eurostat_series(
        "namq_10_gdp",
        {"geo": "FR", "na_item": "B1GQ", "unit": "CLV15_MEUR", "s_adj": "SCA", "sinceTimePeriod": "2004-Q1"},
        "pib_niveau_fr.json",
    )


def fetch_croissance_longue_pays():
    # Croissance trimestrielle sur ~10 ans, plusieurs pays (chapitre profondeur temporelle).
    out = {}
    for geo in ("FR", "DE", "IT", "ES", "EA20"):
        out[geo] = eurostat_series(
            "namq_10_gdp",
            {"geo": geo, "na_item": "B1GQ", "unit": "CLV_PCH_PRE", "s_adj": "SCA", "sinceTimePeriod": "2016-Q1"},
            f"croissance_longue_{geo}.json",
        )
    return out


if __name__ == "__main__":
    results = {}
    for name, fn in (
        ("pib_fr", fetch_pib_croissance_fr),
        ("pib_pays", fetch_pib_pays),
        ("fbcf_fr", fetch_fbcf_fr),
        ("emploi_fr", fetch_emploi_fr),
        ("capacites_fr", fetch_capacites_fr),
        ("dette_q_fr", fetch_dette_trimestrielle_fr),
        ("dette_deficit_annuels", fetch_dette_deficit_annuels),
        ("pib_nominal_part_ue", fetch_pib_nominal_part_ue),
        ("pib_niveau_fr", fetch_pib_niveau_volume_fr),
        ("croissance_longue_pays", fetch_croissance_longue_pays),
    ):
        try:
            data = fn()
            results[name] = {"ok": True}
        except requests.RequestException as e:
            results[name] = {"ok": False, "error": str(e)}
    print(json.dumps(results, ensure_ascii=False, indent=2))
