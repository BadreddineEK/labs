"""
Calcul de la correlation esperance de vie x revenu median par departement,
verification du paradoxe rural (chapitre 9), export JSON pour le frontend.
Voir CONSIGNES.md §8 et §10 - ne rien affirmer sans calcul reel sur donnees fraiches.
"""

def build_departements_dataset():
    raise NotImplementedError


def compute_correlation_revenu_esperance():
    raise NotImplementedError


def check_paradoxe_rural():
    """Verifie si certains departements ruraux/modestes font mieux que leur revenu
    ne le predirait. Ne pas affirmer dans le Lab sans confirmation ici."""
    raise NotImplementedError


if __name__ == "__main__":
    build_departements_dataset()
    compute_correlation_revenu_esperance()
    check_paradoxe_rural()
