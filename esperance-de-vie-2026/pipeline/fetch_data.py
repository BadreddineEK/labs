"""
Recuperation des sources officielles.
Voir CONSIGNES.md §7 pour la liste exacte des donnees et leur statut.
"""

def fetch_esperance_vie_departements():
    raise NotImplementedError("INSEE - Esperance de vie en 2025, voir CONSIGNES.md paragraphe 7")


def fetch_esperance_vie_niveau_de_vie():
    raise NotImplementedError("INSEE - L'esperance de vie par niveau de vie, 2020-2024")


def fetch_revenu_median_departements():
    raise NotImplementedError("INSEE Filosofi")


if __name__ == "__main__":
    fetch_esperance_vie_departements()
    fetch_esperance_vie_niveau_de_vie()
    fetch_revenu_median_departements()
