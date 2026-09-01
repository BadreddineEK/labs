"""Detection simplifiee de points de retournement cyclique, inspiree de Bry-Boschan (1971).

Reference : Bry, G. et Boschan, C. (1971), Cyclical Analysis of Time Series.
Egalement : Banque de France, document de travail sur les indicateurs probabilistes
de retournement cyclique (2007), pour le principe de detection par regime.
Reference de methode complete : etude AFSE de datation des cycles francais (modele a seuils).

IMPORTANT : ceci est une implementation simplifiee et pedagogique de la LOGIQUE de
detection de pics/creux, pas une reproduction du modele academique complet (qui utilise
des seuils bien plus sophistiques et plusieurs series croisees). Voir CONSIGNES.md.

Principe (adapte au trimestriel, regles simplifiees de Bry-Boschan) :
1. Un point est un pic (creux) local s'il est le plus haut (bas) dans une fenetre de +/-2 trimestres.
2. Alternance stricte pic/creux imposee.
3. Duree minimale de phase (pic->creux ou creux->pic) : 2 trimestres.
4. Duree minimale de cycle complet (pic->pic) : 5 trimestres.
"""

from __future__ import annotations


def detecter_points_retournement(niveaux: list[float], fenetre: int = 2, phase_min: int = 2, cycle_min: int = 5):
    """niveaux : serie ordonnee dans le temps (indices 0..n-1). Retourne une liste
    d'evenements {"index": i, "type": "pic"|"creux"}."""
    n = len(niveaux)
    candidats = []
    for i in range(n):
        lo, hi = max(0, i - fenetre), min(n, i + fenetre + 1)
        fenetre_vals = niveaux[lo:hi]
        if niveaux[i] == max(fenetre_vals) and fenetre_vals.count(niveaux[i]) == 1:
            candidats.append({"index": i, "type": "pic"})
        elif niveaux[i] == min(fenetre_vals) and fenetre_vals.count(niveaux[i]) == 1:
            candidats.append({"index": i, "type": "creux"})
    candidats.sort(key=lambda e: e["index"])

    # Alternance stricte : entre deux evenements de meme type consecutifs, ne garder que le plus extreme.
    filtres: list[dict] = []
    for ev in candidats:
        if filtres and filtres[-1]["type"] == ev["type"]:
            i_prev, i_cur = filtres[-1]["index"], ev["index"]
            if ev["type"] == "pic":
                if niveaux[i_cur] > niveaux[i_prev]:
                    filtres[-1] = ev
            else:
                if niveaux[i_cur] < niveaux[i_prev]:
                    filtres[-1] = ev
        else:
            filtres.append(ev)

    # Contraintes de duree minimale (phase et cycle).
    final: list[dict] = []
    for ev in filtres:
        if not final:
            final.append(ev)
            continue
        duree = ev["index"] - final[-1]["index"]
        if duree < phase_min:
            continue
        if len(final) >= 2 and final[-2]["type"] == ev["type"] and (ev["index"] - final[-2]["index"]) < cycle_min:
            continue
        final.append(ev)
    return final


def construire_diagnostic_cycles(periodes: list[str], niveaux: list[float]):
    events = detecter_points_retournement(niveaux)
    evenements = [
        {"periode": periodes[e["index"]], "type": e["type"], "niveau": round(niveaux[e["index"]], 1)}
        for e in events
    ]
    dernier_type = evenements[-1]["type"] if evenements else None
    if dernier_type == "pic":
        phase_actuelle = "phase descendante ou de ralentissement depuis le dernier pic detecte"
    elif dernier_type == "creux":
        phase_actuelle = "phase de reprise depuis le dernier creux detecte"
    else:
        phase_actuelle = "pas assez de recul pour dater une phase"
    return {
        "evenements": evenements,
        "n_evenements": len(evenements),
        "phase_actuelle": phase_actuelle,
        "parametres": {"fenetre": 2, "phase_min_trimestres": 2, "cycle_min_trimestres": 5},
        "exploratoire": True,
        "methode": "Detection simplifiee de type Bry-Boschan (1971) sur le PIB en volume, CVS-CJO.",
    }


if __name__ == "__main__":
    pass
