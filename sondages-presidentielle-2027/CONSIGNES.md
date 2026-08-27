# CONSIGNES — Brief editorial et etat d'avancement

> Ce Lab est different des precedents : le travail central est methodologique/journalistique/redactionnel, pas un pipeline de donnees. Il n'y a donc PAS de dossier pipeline/. Le contenu ci-dessous est deja redige a 70-80%, l'agent doit surtout VERIFIER, AFFINER LE TON, et mettre en forme visuelle (carrousel LinkedIn + interactif web).

## 1. Contexte strategique

Lab de la serie, angle different des autres (Rentree/Esperance de vie/Stress hydrique/SMIC qui sont des enquetes chiffrees avec pipeline). Ici : sensibilisation methodologique grand public, avec un vrai niveau de rigueur statistique en profondeur. Sujet volontairement NON partisan : aucune prise de position sur qui va gagner, uniquement sur la fiabilite des outils de mesure.

## 2. Format en DEUX contenus separes (decision actee)

- **Contenu A** : post LinkedIn + carrousel court, hook grand public, autonome, redige dans `content/post-linkedin-acte1.md`
- **Contenu B** : Lab complet interactif sur labs.badreddineek.com, approfondissement methodologique, dans `index.html`
Le Lab (B) doit mentionner et renvoyer vers le post (A), et inversement le post (A) doit inciter a aller voir le Lab pour les curieux. Ne pas dupliquer le contenu, le Lab peut faire un rappel tres bref (1-2 phrases) du hook du post en ouverture.

## 3. Regle d'or editoriale (heritee des Labs precedents)

- Zero bullshit, chaque chiffre source et date, avec le perimetre exact.
- **Zero prise de position politique.** Ne jamais commenter qui est en tete, qui va gagner, ne jamais qualifier un parti positivement/negativement. Le sujet est la methode, pas le resultat.
- Toujours distinguer sondage regule (intentions de vote) et projection en sieges (non reguleee) — point souleve par Thé Conversation/statisticien, tres important suite a la legislative 2024 (RN annonce 170-230 sieges, resultat reel 143).
- Ne jamais presenter un ecart de sondage comme une "erreur" ou une "faute" des instituts sans expliquer le mecanisme statistique reel (biais structurel des access panels, methode des quotas, redressement).

## 4. CONTENU A — Post LinkedIn (redige, voir content/post-linkedin-acte1.md)

Hook : "Avez-vous deja ete sonde ?" + calcul (1 personne sur ~40 770 est interrogee pour un sondage donne, calcul propre a partir de 53M d'adultes / echantillon de 1300). Puis explication courte des panels d'acces en ligne (auto-selection), puis exemple d'un chiffre choc generique ("1 jeune sur 4 dit que...") decortique, ouverture vers le Lab complet.

## 5. CONTENU B — Structure du Lab (10 chapitres, contenu redige dans index.html)

1. Rappel bref du hook (2 phrases) + transition vers le sujet presidentielle
2. Comment on constitue un echantillon : methode des quotas vs aleatoire, historique (Kiaer 1895, Neyman 1934), specificite francaise
3. Les access panels et leurs biais reels (auto-selection, exclusion ~40% de la population par fracture numerique, sur-representation de certains profils politiques)
4. Le vrai probleme de la marge d'erreur : citation Pascal Ardilly devant le Senat, obligation legale (loi 2016-508) d'afficher une marge "par reference a la methode aleatoire" alors que la methode reellement utilisee est les quotas
5. Cas concret chiffre : presidentielle 2022, marge affichee ±1,8-2 points, ecart reel mesure entre les dernieres estimations et les resultats de 4 a 6 points (source The Conversation/statisticien)
6. Le redressement politique : boite noire, exemple Odoxa qui modere structurellement le RN par rapport a d'autres instituts (difference methodologique documentee, pas un biais suppose)
7. Le phenomene de convergence/gregarisme en fin de campagne : plusieurs instituts qui se rapprochent artificiellement en fin de course par peur de "rester a l'ecart"
8. Tableau comparatif des 7 instituts accredites 2027 (voir donnees verifiees ci-dessous)
9. Le cas legislatives 2024 : sondage regule (intentions) vs projection en sieges (non reguleee), pourquoi la projection s'est trompee de 30 a 90 sieges alors que les intentions de vote nationales etaient a peu pres correctes
10. La regle des 3 questions pour lire un sondage 2027 (echo direct au mini-chapitre pedagogique du Lab Esperance de vie 2026) + limites : les sondages restent utiles comme indicateurs de tendance, pas comme predictions exactes

## 6. Donnees verifiees a la source (pas de pipeline necessaire, donnees statiques)

Voir `data/instituts_2027.json` pour le tableau complet des 7 instituts.

Chiffres cles verifies :
- Echantillon typique : 1 000 a 2 000 personnes (variable selon institut)
- Population France adulte : ~53 millions
- Marge d'erreur legale affichee pour n=1000 : environ ±3 points a 95% de confiance
- Ecart reel mesure en 2022 (source citee) : 4 a 6 points, pas 1,8-2
- Legislatives 2024 : RN+allies annonces 170-230 sieges, resultat reel 143 sieges
- Fracture numerique excluant les access panels : ~40% de la population (source Insee Premiere 2019, a re-verifier version recente avant publication)
- Sur-representation RN mesuree sur acces panels non redresses aux regionales 2021 : environ +2 points par rapport au score reel

## 7. Points ouverts a verifier avant publication

- [ ] Reverifier le chiffre "40% exclus par fracture numerique" avec une source Insee plus recente que 2019
- [ ] Verifier si un statisticien/institut a publiquement commente/repondu a la critique Ardilly (pour equilibrer le point de vue, ne pas presenter comme une verite univoque)
- [ ] Verifier la date exacte et les details de l'episode "Tondelier-Ifop" septembre 2025 avant de le citer nommement
- [ ] Recalculer la probabilite d'etre sonde avec des hypotheses de panel plus precises si des chiffres officiels de taille de panel sont trouves (actuellement estimation 15-20k, a affiner)
- [ ] Trouver si une etude a mesure l'ampleur du phenomene de convergence/gregarisme pour la campagne 2027 specifiquement (les exemples actuels sont 2021/2022)

## 8. Structure du dossier

```
sondages-presidentielle-2027/
├── CONSIGNES.md
├── README.md
├── content/
│   └── post-linkedin-acte1.md   # texte complet pret a publier/adapter en carrousel
├── index.html                # Lab complet, contenu redige (pas des TODO)
├── css/
│   └── style.css
├── js/
│   ├── calc-proba-sondage.js       # calcul interactif "quelle est la proba d'etre sonde"
│   ├── table-instituts.js          # tableau comparatif interactif
│   └── chart-marge-reelle.js       # visualisation marge affichee vs ecart reel
└── data/
    └── instituts_2027.json     # donnees statiques verifiees, pas de pipeline necessaire
```

Pas de dossier pipeline/ pour ce Lab — aucune donnee brute a ingerer, tout est verifie manuellement et code en dur dans data/instituts_2027.json.
