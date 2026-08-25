# CONSIGNES — Brief éditorial et technique complet

> Contexte de référence pour tout agent (Copilot, Claude, etc.) travaillant sur ce Lab. Lire en entier avant de coder. Ne pas dévier sans le signaler explicitement.

## 1. Contexte stratégique

4e/5e Lab de la série "actualité + preuve technique + pédagogie" de Badreddine EL KHAMLICHI (data scientist, Lyon). Séquence : Mondial 2026 → Canicule 2026 → Rentrée 2026 (inégalités scolaires) → **CE LAB** (espérance de vie) → Data centers/électricité (en attente de calibrage).

Objectif : sujet **mainstream, universellement accessible**, dans l'esprit du Lab canicule (fort contraste, donnée officielle, géographie + causes sociales), sans le clivage politique du Lab éducation (public/privé).

## 2. Règle d'or éditoriale (héritée des Labs précédents)

- Zéro bullshit : chaque affirmation sourcée, datée, avec le bon périmètre/dénominateur.
- Ne jamais confondre corrélation et causalité.
- Distinguer explicitement les mesures qui ne se comparent pas (ex: écart par revenu ≠ écart par éducation — voir §5).
- Toujours une section "ce que ça ne dit pas".
- **Spécifique à ce Lab** : le sujet touche à la mortalité. Le simulateur personnel (§8) doit impérativement présenter une **statistique de population**, jamais un pronostic individuel. Formulation obligatoire : « espérance de vie statistique moyenne de votre groupe », jamais « vous vivrez jusqu'à... ».

## 3. Hook retenu

```
Un homme parmi les 5% les plus pauvres en France vit en moyenne jusqu'à 72 ans.
Parmi les 5% les plus riches ? 85 ans.

Treize années d'écart. Et ce n'est pas stable : ça se creuse.

J'ai regardé les chiffres officiels (INSEE) pour comprendre où, et pourquoi.
```

## 4. Structure narrative imposée (10 chapitres, dans cet ordre)

1. **Cadrage macro** — la France, bonne élève mondiale (83,1-83,7 ans, 2e UE femmes, +1,9 an vs moyenne OCDE)
2. **Où se situe vraiment la France ? Ça dépend de la mesure** — écart par revenu vs écart par éducation donnent des classements différents (voir §5)
3. **Mini-leçon pédagogique** — paradoxe de Simpson + risque relatif/absolu (voir §6) : généraliser la leçon du chapitre 2 à d'autres cas célèbres
4. **Le twist** — l'écart interne français par revenu (13 ans H / 9 ans F, 2020-2024)
5. **Comparaison internationale complète** — tableau multi-pays multi-mesures (voir §5)
6. **L'évolution dans le temps** — l'écart se creuse (12,7→7,9 ans... à vérifier précisément dans le pipeline), stagnation de la moyenne nationale masquant une régression pour les plus modestes
7. **La géographie interne** — carte départementale (extrêmes : Hauts-de-Seine/Yvelines vs Creuse/Pas-de-Calais)
8. **Le pont statistique calculé** — corrélation espérance de vie départementale × revenu médian (INSEE Filosofi) — **à calculer nous-mêmes**, aucun chiffre officiel équivalent à l'IPS/revenu du Lab éducation trouvé pour l'instant
9. **La nuance qui sauve** — vérifier le « paradoxe » de départements ruraux/modestes qui font mieux que leur revenu ne le prédirait (hypothèse Aveyron/Sud-Ouest à confirmer ou infirmer dans les vraies données — ne pas l'affirmer sans preuve)
10. **Ce que ça ne dit pas + simulateur personnel** (avec avertissement éthique obligatoire)

## 5. Tableau comparatif international — données vérifiées

| Pays/zone | Mesure utilisée | Écart | Source |
|---|---|---|---|
| France | Revenu (5% pauvres vs 5% riches) | 13 ans (H) / 9 ans (F) | INSEE, période 2020-2024 |
| France | Éducation (35 ans, universitaire vs sans bac) | 8,0 ans (H) / 5,4 ans (F) | Eurostat/OCDE, Health at a Glance Europe 2024 |
| USA | Revenu (comparaison par quintile/décile) | 15 ans (H) / 10 ans (F) | NEJM, cité par Atlantico/AFIS (vérifier la source primaire NEJM avant publication) |
| Moyenne OCDE | Éducation (25 ans, ~23 pays OCDE, données ~2011) | 8 ans (H) / 5 ans (F) | OCDE, working paper 2017 |
| UE (meilleur vs pire pays) | Espérance de vie nationale moyenne | >8 ans (Espagne ~84,0 vs Bulgarie <76) | Eurostat/OCDE Health at a Glance Europe 2024 |

**Classification OCDE 2019 (à présenter avec la nuance méthodologique du chapitre 2)** :
- Pays à forte inégalité **par revenu** : Suède, Estonie, Danemark, Slovénie, Royaume-Uni, USA
- Pays à faible inégalité **par éducation** : Danemark, Estonie, Allemagne, Irlande, Lituanie, Luxembourg, Pays-Bas, Slovaquie, Suède, Royaume-Uni
- ⚠️ Plusieurs pays apparaissent dans LES DEUX listes (Suède, Estonie, Danemark, UK) — c'est le point pédagogique central du chapitre 2 : la même réalité sociale, mesurée différemment, donne des classements contradictoires.
- Tendance USA 2011-2016 : aggravation de l'inégalité (+1,3 an femmes, +1,1 an hommes) — contexte pour montrer que la divergence temporelle n'est pas propre à la France.
- Pays à plus faible inégalité éducative : Autriche, Italie, Espagne.

## 6. Mini-leçon pédagogique — contenu exact à utiliser

**Titre** : « La leçon derrière ce Lab : la même donnée peut raconter plusieurs histoires »

**Exemple 1 — Paradoxe de Simpson (données Covid, France, 2021)** :
Sur les hospitalisations Delta (juin-septembre 2021), chez les moins de 50 ans, le taux de mortalité est 1,8 fois plus élevé chez les non-vaccinés. Mais sur la population entière agrégée, la tendance s'inverse : le taux apparaît 1,3 fois plus faible chez les non-vaccinés. Le renversement s'explique uniquement par la répartition différente des tranches d'âge entre vaccinés et non-vaccinés (effet de confusion/confounding). Source : The Conversation, « Le paradoxe de Simpson illustré par des données de vaccination contre le Covid-19 ».

**Exemple 2 — Risque relatif vs absolu (scandale de la pilule, UK, 1995)** :
Une agence sanitaire britannique annonce en 1995 que la pilule de 3e génération « double le risque » de thrombose. Vrai en relatif (+100%). Mais en absolu, le risque passe de 1 femme sur 7 000 à 2 sur 7 000 (+1 cas sur 7 000). Résultat : panique nationale, arrêts de pilule en masse, hausse mesurée des grossesses non désirées, pour un risque réel minuscule. Source : SFMU / Eufic (fiches pédagogiques risque relatif/absolu).

**Règle pratique à formuler pour le lecteur** (les 3 questions avant de croire un chiffre choc) :
1. Quel dénominateur ? (population totale ou sous-groupe pertinent ?)
2. Quelle période de référence ? (le choix des dates peut inventer ou cacher une tendance)
3. Quelle définition exacte de la mesure ? (revenu ? éducation ? risque relatif ou absolu ?)

**Lien réflexif obligatoire** : rappeler que c'est pour ça que le Lab canicule a testé plusieurs seuils/périodes de référence, et que ce Lab teste plusieurs mesures (revenu/éducation) avant de conclure.

## 7. Données à récupérer et calculer (pipeline)

| Donnée | Source | Statut |
|---|---|---|
| Espérance de vie par département (H/F, naissance/20/40/60 ans) | INSEE, « Espérance de vie en 2025 » | À récupérer, table complète |
| Espérance de vie par niveau de vie (quintiles) | INSEE, « L'espérance de vie par niveau de vie », 2020-2024 | Chiffres clés déjà identifiés (§5), à vérifier à la source primaire |
| Historique espérance de vie par niveau de vie (comparaison temporelle) | INSEE, période 2012-2016 vs 2020-2024 | À vérifier précisément (chapitre 6) |
| Revenu médian par département | INSEE Filosofi | À récupérer pour le calcul de corrélation (§4.8) |
| Tables de mortalité historiques (optionnel, frise longue) | data.gouv.fr « table-mortalite » (depuis 1806) | Optionnel, si temps disponible |
| Comparaisons internationales | Eurostat/OCDE Health at a Glance Europe 2024, OCDE working paper 2017, OCDE Health Policy Studies 2019 | Chiffres déjà collectés (§5), à citer avec précision de périmètre |

**IMPORTANT** : le chiffre USA (15/10 ans) provient de sources secondaires (Atlantico, AFIS) citant le NEJM. Vérifier la publication primaire NEJM avant publication finale si possible, sinon citer explicitement « source secondaire, étude NEJM non consultée directement » dans les sources.

## 8. Simulateur personnel — cadrage éthique strict

- Titre suggéré : « Espérance de vie statistique moyenne de votre groupe » (jamais « votre espérance de vie »)
- Inputs : département + tranche de niveau de vie (pas plus, pas de fausse précision)
- Avertissement visible et permanent : « Ceci est une moyenne statistique de population, pas une prédiction individuelle. Votre espérance de vie réelle dépend de nombreux facteurs non capturés ici (santé, mode de vie, accès aux soins, génétique...). »
- Ne jamais afficher un âge unique sans fourchette/incertitude

## 9. Structure du dossier

```
esperance-de-vie-2026/
├── CONSIGNES.md          # ce fichier
├── README.md
├── index.html            # 10 sections dans l'ordre du §4
├── css/
│   └── style.css
├── js/
│   ├── chart-macro.js         # chapitre 1 : cadrage OCDE/UE
│   ├── chart-mesures.js       # chapitre 2 : revenu vs éducation
│   ├── chart-comparaison-intl.js  # chapitre 5 : tableau multi-pays
│   ├── chart-evolution.js     # chapitre 6
│   ├── map-departements.js    # chapitre 7
│   ├── scatter-correlation.js # chapitre 8
│   └── simulateur-esperance.js # chapitre 10, avec avertissement éthique
├── data/                 # JSON exportés par le pipeline
└── pipeline/             # scripts Python, ne tourne jamais en prod
    ├── fetch_data.py
    ├── build_dataset.py
    └── requirements.txt
```

## 10. Points ouverts à trancher avant mise en prod

- [ ] Vérifier précisément les chiffres d'évolution temporelle (chapitre 6) à la source INSEE primaire
- [ ] Confirmer ou infirmer le « paradoxe » rural (chapitre 9) dans les vraies données — ne rien affirmer sans calcul réel
- [ ] Vérifier la source primaire NEJM pour le chiffre USA si possible
- [ ] Calculer la vraie corrélation espérance de vie × revenu médian par département (chapitre 8), aucune référence officielle équivalente à citer contrairement au Lab éducation
