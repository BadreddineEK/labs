# 💧 Stress hydrique 2026 — Lab

> 5e/6e Lab de la série. Suite logique du Lab Canicule. Angle hybride : alerte mondiale/nationale puis vrai travail de data science (pas de la simple curation journalistique).

## Le sujet

Août 2026 : 92% des nappes phréatiques françaises sont en baisse. Est-ce une vraie crise de l'eau comme au Moyen-Orient, ou un problème différent — une question de répartition, de fuites et d'équité plutôt que de rareté absolue ? Ce Lab commence à l'échelle mondiale (classement WRI du stress hydrique) avant de descendre au niveau national puis départemental, avec de vraies analyses calculées — pas des chiffres recopiés.

**Brief éditorial complet, exigences techniques et sources : voir [CONSIGNES.md](./CONSIGNES.md).**

## Ce qui différencie ce Lab

Ce n'est pas un travail de vulgarisation qui concatène des chiffres déjà publiés. Le Lab produit ses propres résultats à partir de données brutes (API Hub'Eau, SISPEA, Agreste, INSEE) :
- Un test de tendance statistique et un rang percentile historique sur les niveaux piézométriques (pas de prévision, volontairement)
- Une corrélation calculée entre taux de fuite réseau et facteurs socio-économiques
- Un clustering exploratoire des départements en typologies de stress hydrique

## Structure narrative

10 chapitres, de l'alerte BRGM août 2026 jusqu'aux limites méthodologiques, en passant par la mise en perspective mondiale (WRI) et le vrai sujet de fond français (usages, fuites, équité des redevances).

## Stack

Identique aux autres Labs : pipeline Python (jamais en production) qui exporte des JSON de résultats calculés, consommés par un frontend HTML/CSS/JS pur, déployé sur labs.badreddineek.com.

## Statut

🟡 Première tranche fonctionnelle : ingestion Hub'Eau, échantillon de stations actives, tendances Mann-Kendall et percentiles historiques exportés dans `data/tendance_percentile.json`, avec rendu local harmonisé aux autres Labs. Chapitre fuites calculé à partir de SISPEA (taux de fuite départemental, millésime 2019) croisé au revenu médian INSEE (`data/fuites_facteurs.json`) : médiane ~19 %, corrélation fuite × revenu non significative. Restent à joindre : usage agricole (Agreste), déficit pluviométrique et clustering départemental exploratoire.
