"""
Ingestion des sources brutes.
Voir CONSIGNES.md §7 pour la liste exacte des donnees et leur statut.
"""

def fetch_smic_historique_insee_dares():
    raise NotImplementedError("Historique SMIC nominal/reel depuis 1990")


def fetch_salaires_par_decile_insee():
    raise NotImplementedError("INSEE Les salaires en France, grilles salariales par decile")


def fetch_smic_eurostat_pays_ue():
    raise NotImplementedError("Salaire minimum legal par pays UE 2026")


def fetch_salaire_median_eurostat():
    raise NotImplementedError("Salaire median par pays UE, pour indice de Kaitz")


def fetch_couverture_conventionnelle_ocde():
    raise NotImplementedError("Taux de couverture conventionnelle, pays sans SMIC legal")


if __name__ == "__main__":
    fetch_smic_historique_insee_dares()
    fetch_salaires_par_decile_insee()
    fetch_smic_eurostat_pays_ue()
    fetch_salaire_median_eurostat()
    fetch_couverture_conventionnelle_ocde()
