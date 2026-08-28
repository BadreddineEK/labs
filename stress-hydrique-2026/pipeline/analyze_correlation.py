"""
Correlation calculee entre taux de fuite reseau et facteurs explicatifs.
Voir CONSIGNES.md §5.3
"""

import numpy as np
from scipy.stats import pearsonr, spearmanr

def correlation_fuites_facteurs(dataset, facteurs=("densite", "revenu_median")):
    """Calculate pairwise correlations between leak rate and explanatory factors."""
    facteurs = tuple(facteurs)
    required = {"taux_fuite", *facteurs}
    missing = required.difference(dataset.columns)
    if missing:
        raise ValueError("Colonnes manquantes: " + ", ".join(sorted(missing)))
    clean = dataset[list(required)].replace([np.inf, -np.inf], np.nan).dropna()
    if len(clean) < 3:
        raise ValueError("Au moins 3 territoires complets sont necessaires")
    output = {"n": int(len(clean)), "correlations": {}}
    for variable in facteurs:
        x = clean[variable].to_numpy(dtype=float)
        y = clean["taux_fuite"].to_numpy(dtype=float)
        pearson = pearsonr(x, y)
        spearman = spearmanr(x, y)
        output["correlations"][variable] = {
            "pearson_r": float(pearson.statistic),
            "pearson_p": float(pearson.pvalue),
            "spearman_r": float(spearman.statistic),
            "spearman_p": float(spearman.pvalue),
        }
    return output


if __name__ == "__main__":
    pass
