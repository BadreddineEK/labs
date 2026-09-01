# CONSIGNES — Brief editorial et technique complet

> Contexte de reference pour tout agent (Copilot, Claude, etc.) travaillant sur ce Lab. Lire en entier avant de coder. Objectif : sortir un post dans les 2 jours suivant ce cadrage (delai court, prioriser l'essentiel).

## 1. Contexte strategique

Lab de la serie, actualite tres chaude (chiffres Insee du 28 aout 2026, encore commentes au moment du cadrage le 1er septembre 2026). Famille "enquete data" avec un vrai volet statistique original, pas un simple commentaire journalistique du chiffre du jour.

## 2. Exigence transversale : aspect technique/stat reel, pas du commentaire

**Point explicitement souleve lors du cadrage** : ce Lab doit comporter un vrai travail de calcul (stats), pas seulement de la mise en forme pedagogique d'un chiffre INSEE deja publie. Deux chapitres calcules sont OBLIGATOIRES (voir §5), le reste peut etre plus journalistique/pedagogique en complement.

## 3. Les faits verifies au moment du cadrage

- Le 28 aout 2026, l'Insee a revise le PIB du T2 2026 de +0,2% (premiere estimation, publiee le 30 juillet) a **0,0%** (estimation detaillee). Le T1 2026 a lui aussi ete revise, de -0,1% a **-0,2%**.
- Une recession technique se definit par 2 trimestres CONSECUTIFS de croissance NEGATIVE. Avec T1 a -0,2% et T2 a 0,0% (stable, pas negatif), la France n'est PAS techniquement en recession selon cette regle simplifiee.
- Pouvoir d'achat des menages : -0,6% par unite de consommation au T2 2026. Taux d'epargne : 17,2%.
- Comparaison europeenne T2 2026 (flash Eurostat) : zone euro +0,4%, Allemagne +0,2%, Italie +0,2%, Espagne +0,7%. La France (0,0% apres revision) est la moins bonne performance des grandes economies de la zone euro ce trimestre.
- Un rapport du Senat (annees 2000-2005) montre un ecart moyen de 0,45 point de PIB entre premiere estimation et compte definitif — a utiliser comme reference historique pour contextualiser la revision actuelle (0,2 point), voir §5.1.
- Une etude academique (AFSE, datation des cycles economiques francais) montre que la datation professionnelle d'une recession croise PIB, emploi, production industrielle, investissement et taux d'utilisation des capacites via des modeles a seuils — pas seulement la regle simplifiee "2 trimestres negatifs". Voir §5.2.

## 4. Regle d'or editoriale (heritee des Labs precedents)

- Zero bullshit, chaque chiffre source et date, avec le perimetre exact (premiere estimation vs estimation detaillee, bien distinguer).
- Ne jamais affirmer que la France est "en recession" ou "pas en recession" comme une verite simple : le Lab doit montrer que la reponse depend de la definition utilisee (echo direct a la lecon methodologique deja etablie dans Esperance de vie 2026 §2 et Sondages 2027).
- Toujours signaler qu'une estimation peut encore etre revisee (les comptes annuels definitifs arrivent plus tard).
- Rester neutre politiquement : ne pas commenter le gouvernement, le budget ou une echeance politique precise sans verification fraiche au moment de la redaction (ecarte du cadrage initial par manque de donnees suffisamment fraiches, voir §8).

## 5. Travail technique attendu (le coeur differenciant du Lab)

### 5.1 OBLIGATOIRE — Magnitude des revisions, calculee par nous
Constituer un petit echantillon des revisions recentes (comparer, pour les 8 a 12 derniers trimestres disponibles, la "premiere estimation" publiee a l'epoque vs la valeur telle que connue aujourd'hui dans les series Insee) et calculer la magnitude moyenne/mediane de revision sur cet echantillon recent. Comparer ce resultat a la reference historique du rapport du Senat (0,45 point sur 2000-2005) pour dire si la revision T2 2026 (0,2 point) est normale ou pas.
⚠️ Recuperer les "premieres estimations" historiques peut etre difficile si l'Insee ne publie pas de version "vintage" facilement accessible en open data — voir point ouvert §8.

### 5.2 OBLIGATOIRE — Diagnostic multi-indicateurs simplifie
Rassembler 4-5 series Insee (PIB, emploi salarie, production industrielle, investissement/FBCF, taux d'utilisation des capacites) sur les derniers trimestres et les presenter cote a cote, pour montrer que la regle "2 trimestres negatifs" est une simplification par rapport a la vraie methode utilisee par les economistes (reference AFSE, §3). PRESENTER EXPLICITEMENT comme une version allegee et exploratoire, PAS le modele econometrique complet de l'etude AFSE (qui utilise des modeles a seuils bien plus sophistiques).

### 5.3 Comparaison internationale calculee
Construire un tableau comparatif France/Allemagne/Italie/Espagne/zone euro a partir des series Eurostat harmonisees (pas de simple copie de chiffres de presse), avec les sources et dates precises de chaque estimation (flash vs detaillee, les pays ne publient pas toujours au meme rythme).

## 6. Structure narrative impose (7 chapitres)

1. Hook — le mot "recession" partout, le chiffre 0,0% qui vient d'etre publie/revise
2. Qu'est-ce qu'une recession, techniquement — regle simplifiee (2 trimestres negatifs) vs vraie methode multi-indicateurs des economistes (reference AFSE)
3. Calcule : la magnitude des revisions Insee — notre propre echantillon recent vs reference historique 2000-2005 (voir §5.1)
4. Calcule : diagnostic multi-indicateurs simplifie (voir §5.2), explicitement presente comme exploratoire
5. La France, derniere de la classe europeenne ce trimestre — comparaison Eurostat calculee (voir §5.3)
6. Le vrai mal, meme sans le mot "recession" — pouvoir d'achat -0,6%, epargne 17,2%
7. Ce que ca ne dit pas + limites (une estimation peut encore changer, ce n'est qu'un trimestre, la datation de recession n'est pas une science exacte)

## 7. Structure du dossier

```
recession-2026/
├── CONSIGNES.md
├── README.md
├── index.html            # 7 sections dans l'ordre du §6
├── css/
│   └── style.css
├── js/
│   ├── chart-hook-pib.js
│   ├── chart-definition-recession.js
│   ├── chart-magnitude-revisions.js       # resultats calcules §5.1
│   ├── chart-diagnostic-multi-indicateurs.js # resultats calcules §5.2
│   ├── chart-comparaison-europeenne.js    # resultats calcules §5.3
│   └── chart-pouvoir-achat-epargne.js
├── data/                 # JSON exportes par le pipeline (resultats calcules)
└── pipeline/
    ├── requirements.txt
    ├── fetch_data.py         # ingestion INSEE (comptes trimestriels), Eurostat
    ├── build_dataset.py
    ├── analyze_revisions.py  # §5.1
    └── build_diagnostic_multi.py # §5.2
```

## 8. Points ouverts a trancher avant mise en prod (delai court, 2 jours)

- [ ] PRIORITAIRE : verifier si l'Insee/data.gouv.fr expose facilement des donnees "vintage" (premiere estimation historique telle que publiee a l'epoque) pour §5.1, sinon reduire l'ambition a comparer seulement les 2-3 dernieres revisions connues (T1 et T2 2026) plutot qu'un vrai echantillon de 8-12 trimestres
- [ ] Verifier la fraicheur du contexte politique/budgetaire francais avant d'y faire meme une allusion neutre — ecarte du cadrage initial par manque de verification, ne pas ajouter sans nouvelle recherche
- [ ] Confirmer les chiffres Eurostat T2 2026 par pays a la source primaire (flash vs estimation detaillee, certains pays revisent aussi)
- [ ] Etant donne le delai de 2 jours, prioriser les chapitres 1, 2, 5, 6, 7 (faisables rapidement avec des donnees deja identifiees) et traiter 3 et 4 (les plus lourds techniquement) en version simplifiee si le temps manque, sans jamais sacrifier la mention explicite des limites
