# 💰 SMIC 2026 — Lab

> Lab de la serie "enquete data". On parle toujours du SMIC, mais comprend-on vraiment son mecanisme ? Ce Lab explique le fonctionnement reel (indexation a 3 etages), calcule l'effet de diffusion/tassement salarial qui en decoule, et compare rigoureusement (Kaitz + PPA, pas en euros bruts) avec les pays qui n'ont pas de salaire minimum legal.

**Brief editorial complet, exigences techniques et sources : voir [CONSIGNES.md](./CONSIGNES.md).**

## Ce qui differencie ce Lab

- Le mecanisme du SMIC explique en detail (indexation inflation + garantie SHBOE + coup de pouce), pas juste "il augmente chaque annee"
- L'effet de diffusion/tassement salarial calcule/reproduit, pas seulement cite
- Un simulateur interactif base sur un vrai modele de diffusion
- Une comparaison internationale methodologiquement rigoureuse (indice de Kaitz + PPA), pas des euros bruts compares naivement

## Sujets ecartes (en reserve pour un autre Lab)

- Classement des metiers gagnants/perdants en pouvoir d'achat 2019-2024
- Pouvoir d'achat immobilier (m2 achetable, evolution et geographie)

## Stack

Identique aux autres Labs : pipeline Python qui exporte des JSON de resultats calcules, consommes par un frontend HTML/CSS/JS pur, deploye sur labs.badreddineek.com.

## Statut

🟡 Cadrage editorial et technique complet (voir CONSIGNES.md). En attente dans le backlog, apres Stress hydrique 2026 et Esperance de vie 2026.
