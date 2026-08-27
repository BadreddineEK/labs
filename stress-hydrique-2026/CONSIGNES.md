# CONSIGNES — Brief éditorial et technique complet

> Contexte de référence pour tout agent (Copilot, Claude, etc.) travaillant sur ce Lab. Lire en entier avant de coder. Ne pas dévier sans le signaler explicitement.

## 1. Contexte stratégique

5e/6e Lab de la série "actualité + preuve technique + pédagogie" de Badreddine EL KHAMLICHI (data scientist, Lyon). Séquence : Mondial 2026 → Canicule 2026 → Rentrée 2026 → Espérance de vie 2026 → **CE LAB** (stress hydrique / sécheresse) → IA & data centers (en cadrage).

Suite logique directe du Lab Canicule. Sujet ultra-actuel (BRGM publie des bulletins mensuels, août 2026 = situation critique).

## 2. Exigence transversale majeure : ne pas être un simple agrégateur

**C'est le point le plus important de ce brief.** Contrairement à un travail journalistique qui concatène des chiffres déjà calculés par d'autres (BRGM, INSEE, presse) en les citant, ce Lab doit produire des résultats **calculés nous-mêmes** à partir de données brutes. L'objectif est de démontrer un vrai travail de data scientist (engineering + stats + ML), pas de vulgarisation de chiffres déjà mâchés.

Concrètement, interdiction de se contenter de citer "92% des nappes sont en baisse" (chiffre BRGM déjà publié partout) sans a minima le recalculer ou l'enrichir avec une analyse propre (percentile historique, tendance statistique, etc. — voir §5).

## 3. Règle d'or éditoriale (héritée des Labs précédents)

- Zéro bullshit : chaque affirmation sourcée, datée, avec le bon périmètre.
- Ne jamais confondre corrélation et causalité.
- Toujours une section "ce que ça ne dit pas" + limites méthodologiques explicites, notamment pour le clustering (§5.4) qui est exploratoire et NON prédictif.
- **Interdiction formelle de faire de la prévision hydrogéologique** (pas de décomposition saisonnière + extrapolation pour "prédire" le niveau futur des nappes). Une vraie prévision nécessite un modèle hydrogéologique complet (pluviométrie future, caractéristiques de l'aquifère, prélèvements prévus). À la place : rang percentile historique (voir §5.2), qui caractérise la sévérité actuelle sans prédire l'avenir.
- Ne jamais présenter la France comme étant en "pénurie d'eau" au sens où l'entendent les pays du top 25-30 du classement mondial (voir §4). C'est un stress saisonnier récurrent, pas une rareté structurelle chronique. Distinction à maintenir absolument pour ne pas être alarmiste à tort.

## 4. Structure narrative imposée (angle 3 "hybride", validé)

1. **Hook** — l'alerte BRGM août 2026 (92% des nappes en baisse, 64% sous les normales, situation plus dégradée qu'en 2025)
2. **Mise en perspective mondiale** — la France a-t-elle un vrai problème de pénurie ? Classement WRI (25-27 pays en stress hydrique extrême, Bahreïn/Chypre/Koweït/Liban en tête, 4 milliards de personnes en stress sévère au moins un mois/an). La France absente du top 25-30, contrairement à la Belgique (18e) ou à la Grèce/Chypre. Mentionner les tensions géopolitiques réelles (Tigre-Euphrate, Colorado, vallée du Pô) **sans surjouer "guerres de l'eau"** — ce sont des tensions d'usage transfrontalier, nuance à garder.
3. **Alors, la France a-t-elle un problème ?** — pivot : oui, mais différent. Introduction du vrai sujet de fond (répartition/fuites/équité, pas rareté absolue)
4. **Qui consomme vraiment l'eau en France** — agriculture 45-58% (jusqu'à 80% en été), eau potable 21-26%, refroidissement centrales 12-31%, industrie 4%
5. **Le paradoxe des fuites** — 18,8-20% de l'eau potable perdue avant le robinet (~1 milliard de m³/an), avec disparités communales fortes (jusqu'à 45-50% dans certaines communes)
6. **Qui paie vs qui consomme** — usagers domestiques paient 51-67% des redevances pour 24% de la consommation nette ; agriculture paie 2-15% pour 45-58% (jusqu'à 80% en été)
7. **Historique comparatif calculé** — test de tendance statistique sur 20-25 ans de données piézométriques (voir §5.1) + rang percentile du niveau actuel (§5.2)
8. **Géographie interne** — carte des typologies issues du clustering (§5.4), pas une simple carte de valeurs brutes
9. **Le coût économique** — 5,6 Md€ en 2022 (dont 1,1 Md€ pertes agricoles), comparaison avec l'estimation 2026 si disponible
10. **Ce que ça ne dit pas + limites** — notamment sur le clustering exploratoire et l'absence de prévision

## 5. Travail technique attendu (le cœur différenciant du Lab)

### 5.1 Data engineering — pipeline multi-sources
Assembler, nettoyer et joindre :
- **API Hub'Eau Piézométrie** (BRGM/ADES) : séries temporelles brutes de ~5 790 piézomètres, chroniques quotidiennes historiques
- **SISPEA/Eaufrance** : rendement des réseaux d'eau potable **par service/commune** (pas la moyenne nationale déjà citée partout)
- **Agreste** : usage agricole de l'eau par département
- **INSEE** : revenu médian, densité de population par département (pour la corrélation §5.3)
⚠️ Note technique : l'API Hub'Eau "Indicateurs des services" s'arrête le 10/09/2026, récupérer directement sur Sispea si besoin après cette date.

### 5.2 Statistiques — deux analyses calculées
- **Test de tendance** (régression, test de significativité type Mann-Kendall ou équivalent) sur les niveaux piézométriques agrégés sur 20-25 ans, pour quantifier objectivement le taux de dégradation annuel avec sa robustesse statistique
- **Rang percentile historique** : pour chaque station/bassin, situer le niveau actuel (août 2026) dans la distribution complète de son historique disponible ("ce niveau se situe au Xe percentile le plus bas depuis Y années") — remplace toute tentative de prévision (interdite, voir §3)

### 5.3 Statistiques — corrélation fuites × facteurs explicatifs
Calculer la corrélation (et idéalement une régression multivariée simple) entre le taux de fuite réseau (rendement SISPEA, par commune/département) et des variables explicatives : densité de population, ruralité, revenu médian. Objectif : expliquer pourquoi certains départements perdent 45% d'eau et d'autres 8%, ce qu'aucun article grand public ne calcule actuellement.

### 5.4 Machine Learning — clustering exploratoire (avec réserve méthodologique obligatoire)
K-means (ou méthode équivalente) sur les départements/bassins à partir du dataset assemblé (anomalie piézométrique + déficit pluviométrique + intensité agricole + taux de fuite), pour faire émerger des typologies : "stress climatique pur", "pression agricole dominante", "réseau vétuste", "résilient".
⚠️ **À présenter explicitement comme exploratoire, pas prédictif.** Avec ~96 départements et un nombre limité de variables, ce n'est pas un modèle à présenter comme définitif. Formuler cette réserve dans le Lab lui-même (chapitre 10).

## 6. Données à récupérer — sources et statut

| Donnée | Source | Statut |
|---|---|---|
| Niveaux piézométriques historiques | API Hub'Eau Piézométrie (ADES/BRGM) | À récupérer, séries longues |
| Bulletins mensuels de situation | BRGM, communiqués mensuels 2026 | Déjà identifiés (voir historique conversation), à archiver mois par mois |
| Rendement des réseaux d'eau potable par commune | SISPEA / Eaufrance (observatoire prix de l'eau) | À récupérer, attention à la bascule API→site avant le 10/09/2026 |
| Répartition de l'usage de l'eau (agriculture/potable/industrie/centrales) | France Stratégie, ministère écologie | Chiffres clés déjà identifiés, à vérifier à la source primaire (attention : chiffres variables selon année/saison, préciser le périmètre exact) |
| Coût économique sécheresse 2022 | Ministère écologie, rapport théma avril 2025 | Chiffre vérifié : 5,1-5,6 Md€ |
| Coût économique sécheresse 2026 | À rechercher, probablement pas encore publié en totalité | À vérifier avant publication finale |
| Classement mondial stress hydrique | World Resources Institute (Aqueduct) | Chiffres identifiés (25-27 pays, top Bahreïn/Chypre/Koweït/Liban), à confirmer à la source primaire WRI |
| Revenu médian et densité par département | INSEE Filosofi | Déjà utilisé pour le Lab Rentrée/Espérance de vie, réutilisable |
| Usage agricole de l'eau par département | Agreste | À récupérer |

## 7. Structure du dossier

```
stress-hydrique-2026/
├── CONSIGNES.md          # ce fichier
├── README.md
├── index.html            # 10 sections dans l'ordre du §4
├── css/
│   └── style.css
├── js/
│   ├── chart-hook-alerte.js       # chapitre 1
│   ├── chart-mondial.js           # chapitre 2 : classement WRI
│   ├── chart-usages-france.js     # chapitre 4 : qui consomme quoi
│   ├── chart-fuites.js            # chapitre 5 : paradoxe des fuites
│   ├── chart-qui-paie.js          # chapitre 6
│   ├── chart-tendance-percentile.js # chapitre 7 : resultats calcules §5.1/5.2
│   ├── map-clustering-departements.js # chapitre 8 : resultats §5.4
│   └── chart-cout-economique.js   # chapitre 9
├── data/                 # JSON exportes par le pipeline (resultats calcules, pas donnees brutes)
└── pipeline/
    ├── requirements.txt
    ├── fetch_data.py         # ingestion Hub'Eau, SISPEA, Agreste, INSEE
    ├── build_dataset.py      # jointure multi-sources, nettoyage
    ├── analyze_trends.py     # §5.1 test de tendance + §5.2 rang percentile
    ├── analyze_correlation.py # §5.3 correlation fuites x facteurs
    └── cluster_departements.py # §5.4 clustering exploratoire
```

## 8. Points ouverts à trancher avant mise en prod

- [ ] Vérifier le coût économique précis de la sécheresse 2026 dès que des estimations officielles sortent
- [ ] Confirmer les chiffres de répartition d'usage de l'eau à la source primaire exacte (les chiffres varient significativement selon la période/saison considérée — préciser le périmètre dans le Lab)
- [ ] Vérifier le classement WRI à la source primaire (Aqueduct) plutôt que via des articles de presse secondaires
- [ ] Choisir la méthode exacte de test de tendance (Mann-Kendall recommandé pour séries hydrogéologiques, robuste aux non-normalités)
- [ ] Déterminer le nombre de clusters optimal (méthode du coude ou silhouette) avant de figer la carte du chapitre 8
- [ ] Vérifier la disponibilité réelle des données Agreste par département (granularité à confirmer)
