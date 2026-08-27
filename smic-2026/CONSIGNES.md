# CONSIGNES — Brief éditorial et technique complet

> Contexte de référence pour tout agent (Copilot, Claude, etc.) travaillant sur ce Lab. Lire en entier avant de coder. Ne pas dévier sans le signaler explicitement.

## 1. Contexte stratégique

Lab de la série "actualité + preuve technique + pédagogie" de Badreddine EL KHAMLICHI. Séquence : Mondial 2026 → Canicule 2026 → Rentrée 2026 → Espérance de vie 2026 → Stress hydrique 2026 → **CE LAB** (SMIC / salaire minimum). Famille "enquête data" (CONSIGNES + pipeline), pas famille "explainer LLM" (fichier unique).

## 2. Origine du sujet et sujets écartés

Ce Lab est né d'un cadrage plus large sur "salaires/pouvoir d'achat en France". Deux sous-angles ont été écartés pour ce Lab (à garder en réserve pour un autre Lab éventuel) :
- Classement des métiers gagnants/perdants en pouvoir d'achat 2019-2024 (étude INSEE-DARES, 35% des métiers seulement en progression)
- Pouvoir d'achat immobilier (m2 achetable avec le salaire médian, évolution et géographie)
Le SMIC a été choisi comme sujet principal car il offre un vrai mécanisme économique à expliquer (pas un simple classement), un twist calculable (effet de diffusion/tassement salarial), et un axe comparatif international structurant.

## 3. Exigence transversale : rigueur sur les comparaisons internationales

**Point critique** : ne jamais comparer les salaires minimums en euros bruts nominaux entre pays (ex: "620€ Bulgarie vs 2704€ Luxembourg") sans les corriger. Deux corrections obligatoires :
1. **Parité de pouvoir d'achat (PPA)** pour neutraliser le coût de la vie différent entre pays
2. **Indice de Kaitz** (ratio salaire minimum / salaire médian national) pour comparer le niveau de protection relatif, pas le niveau absolu
C'est directement lié à la leçon méthodologique déjà établie dans d'autres Labs de la série (Espx9rance de vie 2026, §2 sur mesure revenu vs éducation) : ne jamais comparer des choses qui ne se comparent pas sans le signaler.

## 4. Règle d'or éditoriale (héritée des Labs précédents)

- Zéro bullshit : chaque affirmation sourcée, datée, avec le bon périmètre.
- Ne jamais confondre corrélation et causalité, notamment sur le chapitre emploi (§5.4) qui est un sujet académiquement débattu — présenter les nuances, pas une conclusion tranchée.
- Toujours une section "ce que ça ne dit pas" + limites méthodologiques explicites (chapitre 8).
- Ne pas se contenter de citer les coefficients de diffusion déjà publiés (DARES/INSEE) sans les reproduire/visualiser nous-mêmes à partir des séries de données disponibles (voir §5.1).

## 5. Structure narrative imposée (8 chapitres)

1. **Hook** — le SMIC réel a gagné +43% de pouvoir d'achat depuis 1990, contre +13% pour le salaire moyen depuis 1996 (source Insee, à vérifier périmètres exacts avant publication — les deux chiffres ne portent pas exactement sur la même période, à harmoniser ou à préciser explicitement)
2. **Comment ça marche vraiment** — le mécanisme à 3 étages : indexation automatique dès que l'inflation dépasse 2%, garantie de progression égale à la moitié de la hausse du salaire horaire de base ouvriers/employés (SHBOE), coup de pouce politique discrétionnaire
3. **Le tassement salarial (le vrai twist)** — effet de diffusion calculé/reproduit par décile de salaire (voir §5.1) : +1% de SMIC → jusqu'à +1% sur les salaires entre 1 et 1,1 SMIC, ~+0,1% entre 1,4 et 1,5 SMIC, effet quasi nul au-delà
4. **Simulateur interactif** — "si le SMIC augmente de X%, effet réel estimé sur votre tranche de salaire", basé sur les coefficients de diffusion (voir §5.2)
5. **Comparaison internationale, correctement faite** — indice de Kaitz + PPA (pas d'euros bruts naifs), + les 6 pays UE sans SMIC légal (Danemark, Suède, Finlande, Autriche, Italie, Chypre) fonctionnant par négociation collective, avec taux de couverture conventionnelle (89-98% pour Autriche/Danemark)
6. **Le SMIC protège-t-il vraiment contre l'inflation ?** — historique des déclenchements, délais réels entre pic d'inflation et revalorisation, écarts mesurés
7. **Effet sur l'emploi** — débat académique classique, présenter les études françaises (France Stratégie/Trésor, rapport annuel du groupe d'experts SMIC) avec les nuances, sans trancher au-delà de ce que la littérature permet
8. **Ce que ça ne dit pas + limites méthodologiques** — notamment : les coefficients de diffusion varient selon la période/étude, les comparaisons internationales de PPA ont leurs propres limites, le débat emploi n'est pas tranché

## 6. Travail technique attendu

### 6.1 Stats — reproduire l'effet de diffusion
Utiliser les séries de salaires par décile (INSEE "Les salaires en France", grilles salariales) et l'historique des revalorisations SMIC pour calculer/reproduire une estimation propre de l'effet de diffusion (régression simple hausse SMIC vs croissance salariale par tranche), à comparer aux coefficients publiés (DARES ~2000-2005, OFCE ~2012) pour voir si l'effet a évolué dans le temps.

### 6.2 Modèle — simulateur basé sur les coefficients de diffusion
Implémenter une fonction appliquant les coefficients de diffusion (calculés en §6.1 ou repris de la littérature si les données manquent) à une tranche de salaire saisie par l'utilisateur, pour estimer l'effet réel d'une hausse du SMIC. Afficher explicitement l'incertitude/la fourchette, ne jamais donner un chiffre unique présenté comme certain.

### 6.3 Data engineering — comparaison internationale rigoureuse
Assembler : salaire minimum légal par pays UE (Eurostat), salaire médian par pays (Eurostat/OCDE) pour calculer l'indice de Kaitz, taux de couverture conventionnelle par pays (OCDE/OIT) pour les pays sans SMIC légal, conversion PPA (Eurostat/OCDE).

## 7. Données à récupérer — sources et statut

| Donnée | Source | Statut |
|---|---|---|
| Historique SMIC nominal et réel depuis 1990 | INSEE / DARES rapport annuel groupe d'experts SMIC | Chiffres clés identifiés (+43% depuis 1990), à vérifier périmètre exact |
| Séries de salaires par décile | INSEE "Les salaires en France" | À récupérer pour §6.1 |
| Coefficients de diffusion publiés | DARES (2000-2005), OFCE (2012), Insee | Chiffres clés identifiés, à utiliser comme référence de comparaison |
| Salaire minimum légal par pays UE 2026 | Eurostat | Chiffres identifiés (620€ Bulgarie à 2704€ Luxembourg, France 6e à 1867€), à reconvertir en PPA + Kaitz avant publication |
| Liste des pays UE sans SMIC légal + taux de couverture conventionnelle | OCDE / OIT | Chiffres clés identifiés (Danemark, Suède, Finlande, Autriche, Italie, Chypre), taux à vérifier pays par pays |
| Salaire médian par pays UE | Eurostat | À récupérer pour le calcul de l'indice de Kaitz |
| Historique inflation vs date de revalorisation SMIC | Service-public.gouv.fr, DARES | À reconstituer chronologiquement pour §5 chapitre 6 |
| Études sur effet emploi du SMIC | France Stratégie / Trésor, rapports annuels | À synthétiser avec nuance, ne pas trancher |

## 8. Structure du dossier

```
smic-2026/
├── CONSIGNES.md
├── README.md
├── index.html            # 8 sections dans l'ordre du §5
├── css/
│   └── style.css
├── js/
│   ├── chart-hook-evolution.js       # chapitre 1
│   ├── chart-mecanisme.js            # chapitre 2
│   ├── chart-tassement-salarial.js   # chapitre 3 : resultats calcules §6.1
│   ├── simulateur-diffusion.js       # chapitre 4 : modele §6.2
│   ├── chart-comparaison-intl.js     # chapitre 5 : Kaitz + PPA, §6.3
│   ├── chart-inflation-protection.js # chapitre 6
│   └── chart-effet-emploi.js         # chapitre 7
├── data/                 # JSON exportes par le pipeline (resultats calcules)
└── pipeline/
    ├── requirements.txt
    ├── fetch_data.py         # ingestion INSEE, DARES, Eurostat, OCDE
    ├── build_dataset.py      # jointure multi-sources
    ├── analyze_diffusion.py  # §6.1 regression effet de diffusion par decile
    └── compute_kaitz_ppa.py  # §6.3 indice de Kaitz + conversion PPA
```

## 9. Points ouverts à trancher avant mise en prod

- [ ] Harmoniser les périmètres temporels du hook (SMIC depuis 1990 vs salaire moyen depuis 1996) — trouver une période commune ou préciser explicitement la différence
- [ ] Vérifier si des données décile-par-décile suffisamment récentes et granulaires existent pour reproduire l'effet de diffusion nous-mêmes (§6.1), sinon citer clairement les coefficients DARES/OFCE comme sources externes avec leur période d'origine (2000-2005 / 2012, pas récentes)
- [ ] Vérifier taux de couverture conventionnelle pays par pays (OCDE/OIT) — données parfois anciennes, dater précisément
- [ ] Rechercher un éventuel coût/effet emploi chiffré récent (2024-2026) pour éviter de ne citer que des études anciennes au chapitre 7
- [ ] Décider si le classement métiers 2019-2024 et le pouvoir d'achat immobilier (sujets écartés, §2) méritent leur propre Lab plus tard
