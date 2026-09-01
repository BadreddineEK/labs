"""Construit le JSON du chapitre cycles (Bry-Boschan simplifie) a partir du PIB en volume."""

from __future__ import annotations

import json
from pathlib import Path

from bry_boschan import construire_diagnostic_cycles

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"


def build_cycles():
    niveau = json.loads((RAW / "pib_niveau_fr.json").read_text(encoding="utf-8"))
    periodes = sorted(niveau)
    valeurs = [niveau[p] for p in periodes]
    result = construire_diagnostic_cycles(periodes, valeurs)
    result["serie_niveau"] = [{"periode": p, "valeur": round(v, 1)} for p, v in zip(periodes, valeurs)]
    result["source"] = "Eurostat, PIB en volume, niveau chaine (CVS-CJO), 2004-2026."
    (OUT / "cycles_bry_boschan.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    r = build_cycles()
    print(json.dumps({"n_evenements": r["n_evenements"], "phase_actuelle": r["phase_actuelle"]}, ensure_ascii=False, indent=2))
