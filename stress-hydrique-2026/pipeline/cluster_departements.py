"""
Clustering exploratoire des departements/bassins.
Voir CONSIGNES.md §5.4 - PRESENTER COMME EXPLORATOIRE, PAS PREDICTIF.
"""

import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

DEFAULT_FEATURES = ["anomalie_piezometrique", "deficit_pluviometrique", "intensite_agricole", "taux_fuite"]


def determiner_nombre_clusters_optimal(dataset, features=DEFAULT_FEATURES):
    features = list(features)
    values = dataset[features].replace([np.inf, -np.inf], np.nan).dropna()
    if len(values) < 8:
        raise ValueError("Au moins 8 territoires complets sont necessaires")
    scaled = StandardScaler().fit_transform(values)
    scores = {}
    for n_clusters in range(2, min(6, len(values) - 1) + 1):
        labels = KMeans(n_clusters=n_clusters, n_init=20, random_state=42).fit_predict(scaled)
        scores[str(n_clusters)] = float(silhouette_score(scaled, labels))
    return max(scores, key=scores.get), scores


def kmeans_typologies_departements(dataset, n_clusters, features=DEFAULT_FEATURES):
    features = list(features)
    clean = dataset[features].replace([np.inf, -np.inf], np.nan).dropna()
    if len(clean) <= n_clusters:
        raise ValueError("Le nombre de territoires doit depasser le nombre de clusters")
    scaled = StandardScaler().fit_transform(clean)
    model = KMeans(n_clusters=int(n_clusters), n_init=20, random_state=42)
    labels = model.fit_predict(scaled)
    result = dataset.loc[clean.index].copy()
    result["cluster"] = labels.astype(int)
    return result, {
        "n_clusters": int(n_clusters),
        "features": features,
        "silhouette": float(silhouette_score(scaled, labels)),
        "exploratoire": True,
    }


if __name__ == "__main__":
    pass
