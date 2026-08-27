"""
Ingestion des sources brutes.
Voir CONSIGNES.md §6 pour la liste exacte des donnees et leur statut.
ATTENTION: API Hub'Eau Indicateurs des services s'arrete le 10/09/2026,
basculer sur Sispea directement si besoin apres cette date.
"""

def fetch_piezometrie_hubeau():
    raise NotImplementedError("API Hub'Eau Piezometrie, ~5790 stations, series longues")


def fetch_sispea_rendement_reseaux():
    raise NotImplementedError("SISPEA / Eaufrance, rendement par commune")


def fetch_agreste_usage_agricole():
    raise NotImplementedError("Agreste, usage agricole de l'eau par departement")


def fetch_insee_revenu_densite():
    raise NotImplementedError("INSEE Filosofi, reutilisable depuis les Labs precedents")


if __name__ == "__main__":
    fetch_piezometrie_hubeau()
    fetch_sispea_rendement_reseaux()
    fetch_agreste_usage_agricole()
    fetch_insee_revenu_densite()
