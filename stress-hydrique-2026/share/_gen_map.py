"""Génère une carte SVG statique de France (taux de fuite par département)
pour l'injecter dans le carrousel. Source : departements.geojson + fuites_facteurs.json.
Départements robustes (>= 10 services) colorés ; les autres en gris.
Sortie : share/_map_fuites.svg.txt
"""

import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GEO = ROOT / "data" / "departements.geojson"
FUITES = ROOT / "data" / "fuites_facteurs.json"
OUT = Path(__file__).parent / "_map_fuites.svg.txt"

# Rampe chaude : plus c'est foncé, plus ça fuit.
BINS = [
    (12, "#ead9c0"),
    (17, "#d7a86a"),
    (22, "#c17d3c"),
    (27, "#a5601f"),
    (999, "#7c4310"),
]
GREY = "#e7e3da"


def color_for(v):
    if v is None:
        return GREY
    for seuil, col in BINS:
        if v < seuil:
            return col
    return BINS[-1][1]


def main():
    geo = json.loads(GEO.read_text(encoding="utf-8"))
    fuites = json.loads(FUITES.read_text(encoding="utf-8"))
    taux = {d["code_departement"]: d["taux_fuite"] for d in fuites["departements_robustes"]}

    lat0 = 46.6
    k = math.cos(math.radians(lat0))

    def rings(geom):
        if geom["type"] == "Polygon":
            return [geom["coordinates"]]
        return geom["coordinates"]  # MultiPolygon

    # bbox projeté
    xs, ys = [], []
    for f in geo["features"]:
        for poly in rings(f["geometry"]):
            for ring in poly:
                for lon, lat in ring:
                    xs.append(lon * k)
                    ys.append(lat)
    pxmin, pxmax = min(xs), max(xs)
    pymin, pymax = min(ys), max(ys)
    W = 820.0
    scale = W / (pxmax - pxmin)
    H = (pymax - pymin) * scale

    def proj(lon, lat):
        x = (lon * k - pxmin) * scale
        y = (pymax - lat) * scale
        return round(x, 1), round(y, 1)

    paths = []
    for f in geo["features"]:
        code = f["properties"]["code"]
        col = color_for(taux.get(code))
        d = []
        for poly in rings(f["geometry"]):
            for ring in poly:
                pts = [proj(lon, lat) for lon, lat in ring]
                d.append("M" + " L".join(f"{x} {y}" for x, y in pts) + "Z")
        paths.append(f'<path d="{"".join(d)}" fill="{col}" stroke="#ffffff" stroke-width="1.1"/>')

    svg = (
        f'<svg viewBox="0 0 {round(W)} {round(H)}" width="100%" role="img" '
        f'aria-label="Carte du taux de fuite des reseaux d eau potable par departement">'
        + "".join(paths) + "</svg>"
    )
    OUT.write_text(svg, encoding="utf-8")
    print(f"OK — {OUT.name} ({len(svg)} chars, {len(taux)} departements colorés)")


if __name__ == "__main__":
    main()
