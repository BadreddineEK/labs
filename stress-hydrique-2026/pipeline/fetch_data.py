"""Ingestion des sources brutes avec cache local.
Voir CONSIGNES.md §6 pour la liste exacte des donnees et leur statut.
ATTENTION: API Hub'Eau Indicateurs des services s'arrete le 10/09/2026,
basculer sur Sispea directement si besoin apres cette date.
"""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)
HUBEAU = "https://hubeau.eaufrance.fr/api/v1"
HUBEAU_SERVICES = "https://hubeau.eaufrance.fr/api/v0"


def _get_json(endpoint: str, params: dict, filename: str) -> dict:
    response = requests.get(endpoint, params=params, timeout=45)
    response.raise_for_status()
    payload = response.json()
    (RAW_DIR / filename).write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    return payload

def fetch_piezometrie_hubeau():
    cached = RAW_DIR / "piezometrie_stations.json"
    if cached.exists():
        return json.loads(cached.read_text(encoding="utf-8"))
    return _get_json(
        f"{HUBEAU}/niveaux_nappes/stations",
        {"size": 2000, "format": "json"},
        "piezometrie_stations.json",
    )


def fetch_chroniques_longues(limit: int = 10):
    """Fetch a reproducible sample of stations with long available histories."""
    stations = fetch_piezometrie_hubeau().get("data", [])
    candidates = []
    for station in stations:
        try:
            start = date.fromisoformat(station["date_debut_mesure"])
            end = date.fromisoformat(station["date_fin_mesure"])
        except (KeyError, TypeError, ValueError):
            continue
        if end.year >= 2025 and int(station.get("nb_mesures_piezo") or 0) >= 1000:
            candidates.append((end.toordinal() - start.toordinal(), station))
    selected = [station for _, station in sorted(candidates, key=lambda item: item[0], reverse=True)[:limit]]
    chroniques = []
    for station in selected:
        endpoint = f"{HUBEAU}/niveaux_nappes/chroniques"
        params = {
            "code_bss": station["code_bss"],
            "date_debut_mesure": "2000-01-01",
            "date_fin_mesure": "2026-08-28",
            "size": 2000,
            "format": "json",
        }
        first_page = requests.get(endpoint, params=params, timeout=60)
        first_page.raise_for_status()
        first_payload = first_page.json()
        total = int(first_payload.get("count", 0))
        pages = min((total + 1999) // 2000, 4)
        records = first_payload.get("data", [])
        for page in range(2, pages + 1):
            page_response = requests.get(endpoint, params={**params, "page": page}, timeout=60)
            page_response.raise_for_status()
            records.extend(page_response.json().get("data", []))
        payload = {"count": total, "data": records}
        (RAW_DIR / f"chronique_{station['bss_id']}.json").write_text(
            json.dumps(payload, ensure_ascii=False), encoding="utf-8"
        )
        chroniques.append({"station": station, "data": payload.get("data", [])})
    output = {"stations": chroniques, "selection": "10 historiques les plus longs parmi les stations retournees"}
    (RAW_DIR / "piezometrie_chroniques_longues.json").write_text(
        json.dumps(output, ensure_ascii=False), encoding="utf-8"
    )
    return output


def fetch_sispea_rendement_reseaux():
    return _get_json(
        f"{HUBEAU_SERVICES}/indicateurs_services/indicateurs",
        {"code_indicateur": "P104.3", "size": 2000, "format": "json"},
        "sispea_rendement.json",
    )


def fetch_agreste_usage_agricole():
    raise RuntimeError("Source Agreste a telecharger depuis le millesime officiel retenu")


def fetch_insee_revenu_densite():
    raise RuntimeError("Source INSEE Filosofi a reutiliser depuis le dataset valide des Labs precedents")


def _centroids_departements():
    """Department centroids derived from the cached piezometer coordinates."""
    stations = fetch_piezometrie_hubeau().get("data", [])
    groups: dict[str, list[tuple[float, float]]] = {}
    for station in stations:
        code = station.get("code_departement")
        x, y = station.get("x"), station.get("y")
        if code and x and y:
            groups.setdefault(code, []).append((float(x), float(y)))
    return {
        code: (sum(p[1] for p in pts) / len(pts), sum(p[0] for p in pts) / len(pts))
        for code, pts in groups.items()
    }


def fetch_departements_context():
    """Fetch real density (geo.api.gouv.fr) and yearly rainfall (Open-Meteo) per department.

    Resumable: keeps departments already fetched in the local cache.
    """
    cache = RAW_DIR / "departements_context.json"
    context = json.loads(cache.read_text(encoding="utf-8")) if cache.exists() else {}
    centroids = _centroids_departements()
    for code, (lat, lon) in sorted(centroids.items()):
        if code in context:
            continue
        entry: dict = {}
        try:
            communes = requests.get(
                f"https://geo.api.gouv.fr/departements/{code}/communes",
                params={"fields": "population,surface"}, timeout=30,
            ).json()
            population = sum((c.get("population") or 0) for c in communes)
            surface_km2 = sum((c.get("surface") or 0) for c in communes) / 100.0
            if surface_km2 > 0:
                entry["population"] = int(population)
                entry["surface_km2"] = round(surface_km2, 1)
                entry["densite"] = round(population / surface_km2, 1)
        except (requests.RequestException, ValueError):
            pass
        try:
            meteo = requests.get(
                "https://archive-api.open-meteo.com/v1/archive",
                params={
                    "latitude": round(lat, 3), "longitude": round(lon, 3),
                    "start_date": "2025-01-01", "end_date": "2025-12-31",
                    "daily": "precipitation_sum", "timezone": "Europe/Paris",
                }, timeout=30,
            ).json()
            values = [v for v in meteo.get("daily", {}).get("precipitation_sum", []) if v is not None]
            if len(values) > 300:
                entry["pluvio_2025_mm"] = round(sum(values), 1)
        except (requests.RequestException, ValueError):
            pass
        if entry:
            context[code] = entry
            cache.write_text(json.dumps(context, ensure_ascii=False), encoding="utf-8")
    return context


if __name__ == "__main__":
    results = {}
    for name, function in (
        ("piezometrie", fetch_chroniques_longues),
        ("sispea", fetch_sispea_rendement_reseaux),
    ):
        try:
            payload = function()
            results[name] = {"ok": True, "count": len(payload.get("data", []))}
        except (requests.RequestException, RuntimeError) as error:
            results[name] = {"ok": False, "error": str(error)}
    try:
        context = fetch_departements_context()
        results["context_departements"] = {"ok": True, "count": len(context)}
    except requests.RequestException as error:
        results["context_departements"] = {"ok": False, "error": str(error)}
    (ROOT / "data" / "fetch_status.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(results, ensure_ascii=False, indent=2))
