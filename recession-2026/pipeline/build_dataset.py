"""Orchestre le pipeline Recession 2026 : produit les JSON consommes par le front.

- pib_hook.json          : serie PIB France (chapitres 1 et 2)
- comparaison_europe.json: PIB par pays, classement du T2 2026 (chapitre 5)
- revisions.json         : magnitude des revisions (chapitre 3, via analyze_revisions)
- diagnostic_multi.json  : diagnostic 4 indicateurs, secondaire (via build_diagnostic_multi)
- croissance_longue.json : croissance 10 ans multi-pays (via build_croissance_longue)
- cycles_bry_boschan.json: points de retournement PIB (via build_cycles)
- dette_deficit.json     : dette/deficit FR vs DE/IT/ES (via build_dette_deficit)
- part_pib_europe.json   : part FR/IT/PL dans le PIB de l'UE, 2005-2025 (via build_part_pib_europe)
"""

from __future__ import annotations

import json
from pathlib import Path

import analyze_revisions
import build_diagnostic_multi
import build_croissance_longue
import build_cycles
import build_dette_deficit
import build_part_pib_europe

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data"

PAYS = {"FR": "France", "DE": "Allemagne", "IT": "Italie", "ES": "Espagne", "EA20": "Zone euro"}


def _load(name):
    return json.loads((RAW / name).read_text(encoding="utf-8"))


def build_pib_hook():
    pib = _load("pib_fr.json")
    points = [{"periode": p, "valeur": pib[p]} for p in sorted(pib)]
    result = {
        "points": points,
        "dernier": points[-1],
        "avant_dernier": points[-2],
        "source": "Eurostat, comptes nationaux trimestriels, volume, variation t/t-1 (donnees CVS-CJO).",
    }
    (OUT / "pib_hook.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def build_comparaison_europe():
    series = {geo: _load(f"pib_{geo}.json") for geo in PAYS}
    periodes = sorted(series["FR"])
    dernier = periodes[-1]
    classement = sorted(
        ({"geo": geo, "pays": PAYS[geo], "valeur": series[geo].get(dernier)} for geo in PAYS),
        key=lambda x: (x["valeur"] is None, x["valeur"]),
    )
    result = {
        "trimestre": dernier,
        "pays": [
            {"geo": geo, "pays": PAYS[geo], "points": [{"periode": p, "valeur": series[geo].get(p)} for p in periodes]}
            for geo in PAYS
        ],
        "classement_dernier": classement,
        "france_valeur": series["FR"].get(dernier),
        "source": "Eurostat, PIB en volume, variation t/t-1 (CVS-CJO). Estimations pouvant differer du calendrier de publication national.",
    }
    (OUT / "comparaison_europe.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def main():
    hook = build_pib_hook()
    comp = build_comparaison_europe()
    rev = analyze_revisions.main()
    diag = build_diagnostic_multi.main()
    longue = build_croissance_longue.build_croissance_longue()
    cycles = build_cycles.build_cycles()
    dette = build_dette_deficit.build_dette_deficit()
    part_ue = build_part_pib_europe.build_part_pib_europe()
    print(json.dumps({
        "pib_dernier": hook["dernier"],
        "france_rang": [c["pays"] for c in comp["classement_dernier"]],
        "revision_moyenne": rev["magnitude_moyenne"],
        "diagnostic_negatifs": f'{diag["n_negatifs"]}/{diag["n_total"]}',
        "verdict_longue": longue["verdict"],
        "cycles_n_evenements": cycles["n_evenements"],
        "cycles_phase": cycles["phase_actuelle"],
        "dette_derniere": dette["dette_derniere_fr"],
        "part_ue_derniere": part_ue["derniere_annee"],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
