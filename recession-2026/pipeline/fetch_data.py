"""
Ingestion des sources brutes.
Voir CONSIGNES.md §8 - verifier en priorite la disponibilite de donnees vintage Insee.
"""

def fetch_insee_comptes_trimestriels():
    raise NotImplementedError("Series longues comptes nationaux trimestriels, PIB et composantes")


def fetch_insee_premiere_estimation_historique():
    raise NotImplementedError("Donnees vintage si disponibles, sinon limiter a T1/T2 2026 - voir CONSIGNES 5.1/8")


def fetch_eurostat_pib_pays():
    raise NotImplementedError("PIB trimestriel France/Allemagne/Italie/Espagne/zone euro")


if __name__ == "__main__":
    fetch_insee_comptes_trimestriels()
    fetch_insee_premiere_estimation_historique()
    fetch_eurostat_pib_pays()
