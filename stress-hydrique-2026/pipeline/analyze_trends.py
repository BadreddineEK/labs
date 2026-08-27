"""
Analyse statistique des series piezometriques.
Voir CONSIGNES.md §5.2 - Test de tendance (Mann-Kendall recommande) + rang percentile.
INTERDICTION de prevision (decomposition saisonniere + extrapolation), voir CONSIGNES.md §3.
"""

def test_tendance_mann_kendall(serie_temporelle):
    raise NotImplementedError("pymannkendall recommande pour robustesse aux non-normalites")


def calculer_rang_percentile(valeur_actuelle, historique):
    raise NotImplementedError("Situer le niveau actuel dans la distribution historique complete")


if __name__ == "__main__":
    pass
