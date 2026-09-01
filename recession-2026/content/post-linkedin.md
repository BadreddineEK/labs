« La France est en récession. »
« Non, la croissance est juste à zéro. »

Fin août, les deux versions ont tourné en boucle. Et selon celle qu'on choisit, on n'a pas du tout la même histoire.

J'ai donc regardé les données publiques (Insee, Eurostat) et refait les calculs, plutôt que de m'arrêter au mot.

Le point de départ : le 28 août 2026, l'Insee a révisé sa première estimation du 2ᵉ trimestre, de +0,2 % à 0,0 %. Et le 1ᵉʳ trimestre, de −0,1 % à −0,2 %.

Voici ce que j'ai trouvé :

→ Récession technique = deux trimestres négatifs d'affilée. Le T1 est négatif (−0,2 %), mais le T2 est stable (0,0 %). Selon cette règle stricte : non. Le verdict tient à un seul dixième de point.

→ Mais les économistes ne s'arrêtent pas à cette règle. J'ai implémenté une version simplifiée d'un algorithme de datation des cycles (Bry-Boschan, 1971) sur le PIB français : le dernier pic détecté date de fin 2025. Depuis, l'économie ralentit. Ce n'est pas un accident soudain de l'été 2026.

→ La révision qui a choqué (+0,2 % → 0,0 %) n'a rien d'anormal. Sur les deux trimestres, l'écart moyen est de 0,15 point, sous la référence historique de 0,45 point. Une première estimation est faite pour être révisée — même si, sur un horizon plus long (jusqu'au compte définitif), l'écart pourrait encore s'accentuer.

→ Le point qui, lui, ne dépend d'aucune définition : ce trimestre, la France (0,0 %) est la dernière des grandes économies de la zone euro, derrière l'Italie (+0,2), l'Allemagne (+0,3), la zone euro (+0,4) et l'Espagne (+0,7). Et en étendant la comparaison sur ces deux dernières années, la France ralentit un peu plus que ses pairs, pas seulement ce trimestre.

→ Le signal le plus lent, et peut-être le plus important : la part de la France dans le PIB de l'Union européenne recule depuis vingt ans, de 18,4 % en 2005 à 15,9 % en 2025. Mais elle n'est pas seule : l'Italie recule encore plus sur la même période (15,6 % → 12 %), pendant que des pays comme la Pologne montent (2,6 % → 4,9 %). C'est une redistribution européenne, pas un décrochage franco-français isolé.

→ Et la dette, souvent citée sans repère : à 115,6 % du PIB fin 2025, la France n'est ni la meilleure ni la pire de sa cohorte. Loin devant l'Allemagne (63,5 %), mais nettement sous l'Italie (137,1 %). Une zone intermédiaire, avec une trajectoire de hausse plus rapide que ses pairs récemment.

Et le vrai malaise, même sans le mot : le pouvoir d'achat par unité de consommation recule de 0,6 % au 2ᵉ trimestre, et le taux d'épargne monte à 17,2 % (les ménages, prudents, mettent de côté plutôt que de dépenser). Pour la mécanique complète côté salaires (SMIC, diffusion salariale), j'ai un autre Lab dédié.

Ma conclusion, après avoir regardé les chiffres : « récession ou pas » n'a pas de réponse unique, c'est une question de définition. L'étiquette compte moins que la direction : une croissance à l'arrêt, un poids économique qui s'effrite en Europe depuis vingt ans, et des ménages sous pression.

J'assume les limites : ces chiffres sont des estimations encore susceptibles d'être révisées, l'algorithme de détection de cycles est une version pédagogique simplifiée (pas le modèle complet des comités de datation), les projections de dette sont conditionnelles à l'absence de nouvelle mesure, et faute de données « vintage » facilement accessibles, l'échantillon de révisions se limite à deux trimestres. Tout est détaillé, daté et sourcé.

Le détail de ce Lab (méthode, sources, code) est en commentaire.

---
Premier commentaire :
Le Lab complet, interactif et sourcé : https://labs.badreddineek.com/recession-2026
