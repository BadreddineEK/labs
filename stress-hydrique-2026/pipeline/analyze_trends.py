"""
Analyse statistique des series piezometriques.
Voir CONSIGNES.md §5.2 - Test de tendance (Mann-Kendall recommande) + rang percentile.
INTERDICTION de prevision (decomposition saisonniere + extrapolation), voir CONSIGNES.md §3.
"""

import numpy as np


def test_tendance_mann_kendall(serie_temporelle):
    """Return a serialisable Mann-Kendall summary for a numeric series."""
    import pymannkendall as mk

    values = np.asarray(serie_temporelle, dtype=float)
    values = values[np.isfinite(values)]
    if values.size < 8:
        raise ValueError("Une serie d'au moins 8 observations est necessaire")
    result = mk.original_test(values)
    slope = float(mk.sens_slope(values).slope)
    return {
        "n": int(values.size),
        "trend": str(result.trend),
        "h": bool(result.h),
        "p_value": float(result.p),
        "tau": float(result.Tau),
        "sens_slope": slope,
        "interpretation": "baisse statistiquement detectee" if result.trend == "decreasing" and result.h else "pas de baisse statistiquement detectee",
    }


def calculer_rang_percentile(valeur_actuelle, historique):
    """Return the empirical percentile and low-tail position of a level."""
    values = np.asarray(historique, dtype=float)
    values = values[np.isfinite(values)]
    if values.size == 0 or not np.isfinite(valeur_actuelle):
        raise ValueError("Historique et valeur actuelle doivent etre numeriques")
    below_or_equal = int(np.count_nonzero(values <= valeur_actuelle))
    percentile = 100.0 * below_or_equal / values.size
    return {
        "n_historique": int(values.size),
        "percentile": round(percentile, 2),
        "percentile_bas": round(100.0 - percentile, 2),
        "valeur_actuelle": float(valeur_actuelle),
        "lecture": "dans les 10 % les plus bas" if percentile <= 10 else "dans les 25 % les plus bas" if percentile <= 25 else "au-dessus des 25 % les plus bas",
    }


if __name__ == "__main__":
    pass
