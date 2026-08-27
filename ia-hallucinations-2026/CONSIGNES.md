# CONSIGNES — Brief editorial (cadrage PARTIEL, a completer)

> ⚠️ Ce Lab sort d'une pause de cadrage (hook initial jugee trop dilue, voir historique). Le hook a ete retrouve mais la structure reste a affiner avant de lancer la construction. Ne pas considerer ce brief comme final.

## 1. Contexte strategique

Lab de la serie, famille "explainer LLM" (fichier unique, pas de pipeline lourd type enquete data) mais avec une dimension demo/preuve inedite pour cette famille. A publier en position 2, juste apres Stress hydrique 2026 — fenetre d'actualite tres fraiche (etudes Pew Research et MIT, mi-aout 2026, moins de 2 semaines).

## 2. Origine et sujets ecartes

Cadrage initial ("les 4 dettes de l'IA": financiere, energetique, informationnelle, cognitive) abandonne car trop disperse et incoherent avec l'exigence "createur de la donnee, pas vulgarisateur". Retenu ici : un seul fil, l'hallucination et la fiabilite factuelle des LLM, avec une demonstration originale plutot que de la pure citation d'etudes.

Sujets ecartes, en reserve si besoin d'un autre Lab IA plus tard :
- Dette financiere / bulle des data centers (capex 725 Md$ 2026 Big Tech) — pourrait faire un Lab "finance" a part, exploitable avec le connecteur finance
- Dette energetique data centers France (Arcep, +38% conso electrique en 3 ans) — pourrait etre fusionne avec un futur Lab energie

## 3. Hook retenu (valide)

"J'ai demande a plusieurs IA une question dont je connais deja la reponse exacte, parce que je l'ai verifiee moi-meme dans mes propres Labs. Voici ou elles se trompent."

Concretement : reprendre 3-5 chiffres precis deja verifies dans les Labs precedents de la serie (ex: le taux de fuite reseau eau 18.8%, l'ecart d'esperance de vie 13/9 ans, le SMIC +43% depuis 1990) et interroger plusieurs IA (ChatGPT, Claude, Gemini, Copilot) sur ces memes faits, pour documenter concretement les ecarts, approximations ou hallucinations. C'est un test reproductible et original — personne d'autre n'a un corpus de faits maison deja verifies pour ce genre de benchmark.

## 4. Structure narrative PROVISOIRE (7 chapitres, A AFFINER)

1. Hook — le test avec plusieurs IA sur des faits deja verifies dans les Labs de la serie
2. Le mecanisme de l'hallucination — prediction probabiliste du prochain mot, aucune verite terrain integree par design
3. Le jeu du telephone — demo maison : un texte factuel reformule 15-20 fois en chaine par une IA, ce qu'il en reste a la fin. ATTENTION : preciser explicitement que ceci illustre intuitivement une derive iterative a l'INFERENCE, ce qui est DIFFERENT du vrai model collapse scientifique (qui se produit a l'ENTRAINEMENT). Ne pas laisser croire que c'est la meme chose.
4. Le vrai risque, plus grave : model collapse a l'entrainement — mecanisme scientifique reel (Wikipedia FR / arxiv 2410.16713), distinct du chapitre 3
5. Le web se remplit d'IA — 35% des pages publiees depuis ChatGPT montrent des signes de redaction IA, 10% du web actuel (Pew Research, 20 aout 2026)
6. Les avancees recentes qui corrigent ca — RAG/ancrage aux sources, meilleur filtrage des donnees synthetiques, watermarking (lien vers le Lab rag-under-the-hood deja existant dans le repo)
7. Ce que ca ne dit pas — nuance sur la position de power user de l'auteur (Claude/Copilot utilises pour construire cette meme serie de Labs), pour eviter tout effet d'hypocrisie souleve lors du cadrage

## 5. Points a trancher AVANT de lancer la construction (cadrage non termine)

- [ ] Choisir precisement les 3-5 chiffres a tester au chapitre 1 (proposition: taux de fuite eau 18.8%, ecart esperance de vie 13/9 ans, SMIC +43% depuis 1990 — a valider ou remplacer)
- [ ] Decider si le test du chapitre 1 se fait en direct/live (capture d'ecran des reponses IA a une date donnee) ou en amont, et comment le presenter sans que ca se demode trop vite (les IA changent de version regulierement)
- [ ] Verifier la citation exacte de l'etude MIT sur la "dette cognitive" avant de l'utiliser ou non dans ce Lab (elle a ete mise de cote lors du premier cadrage "4 dettes" — decider si elle a sa place ici en complement du chapitre 2, ou si elle reste hors sujet)
- [ ] Reverifier la nuance chapitre 3 vs chapitre 4 avec un oeil neuf avant de rediger, le risque de confusion pour le lecteur est reel
- [ ] Trouver le ton exact du chapitre 7 (auto-critique) sans that le Lab se sabote lui-meme
- [ ] Decider si ce Lab reste un fichier unique (comme rag-under-the-hood, transformer-architecture) ou merite une structure CONSIGNES+pipeline complete si le chapitre 1 necessite du code reproductible

## 6. Structure du dossier (provisoire)

```
ia-hallucinations-2026/
├── CONSIGNES.md          # ce fichier, cadrage partiel
├── README.md
├── index.html            # squelette, 7 sections
├── css/
│   └── style.css
└── js/
    ├── chart-hook-test-ia.js
    ├── chart-mecanisme-hallucination.js
    ├── demo-jeu-telephone.js
    ├── chart-model-collapse.js
    ├── chart-web-ia.js
    └── chart-avancees-rag.js
```
