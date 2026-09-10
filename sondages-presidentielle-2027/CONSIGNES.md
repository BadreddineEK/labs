# CONSIGNES - Brief editorial

## Angle

La presidentielle 2027 est le fil rouge d'un Lab de litteratie statistique. Le sujet est la lecture d'un chiffre de sondage ou d'une etude mediatique, pas la prediction electorale. Les exemples doivent aussi parler aux lecteurs qui rencontrent des statistiques sur les jeunes, la sante, le travail ou les usages numeriques.

## Regles editoriales

- Chaque chiffre public doit avoir une source, une date et un perimetre explicite.
- Zero prise de position politique : le Lab explique les outils de mesure, jamais les opinions mesurees ou un resultat electoral.
- Ne pas presenter un biais comme une fraude. Quotas, panels et redressement repondent a des contraintes reelles et ont aussi des limites.
- Ne pas reutiliser de chiffres non verifies sur la fracture numerique, les ecarts de 2022 ou la surrepresentation d'un vote dans les panels.

## Structure du Lab

1. Definir signal, bruit et biais.
2. Tirer un echantillon synthetique et calculer une proportion.
3. Comparer recrutement aleatoire, panel et quotas.
4. Appliquer des poids et calculer la taille effective.
5. Rejouer 500 enquêtes pour mesurer la couverture des intervalles.
6. Montrer que la formulation fabrique aussi la variable observee.
7. Revenir a un comparatif historique seulement si le sondage et le resultat sont tous deux sourcables.
8. Revenir a un cas reel documente par la Commission des sondages.
9. Donner une grille de lecture technique d'une notice.

## Sources principales

- Commission des sondages : article 2 de la loi du 19 juillet 1977 modifiee par la loi n°2016-508 du 25 avril 2016 et notices.
- Commission des sondages : mise au point du 10 juillet 2026 concernant une enquete publiee par FranceSoir.
- Ministere de l'Interieur : archives des resultats officiels de la presidentielle 2022. Cette source seule ne suffit pas a documenter une vague de sondage.
- Pascal Ardilly, *Les techniques de sondage*, pour les limites de l'interpretation probabiliste des quotas.
- INSEE pour la population adulte utilisee dans le calcul illustratif.

## Perimetre technique

Pas de pipeline Python. `js/survey-lab.js` genere les echantillons, poids, estimations, erreurs-types, intervalles et repetitions. Les donnees sont synthetiques et calibrées pour rendre visible le biais de panel. Les contenus post LinkedIn et carrousel doivent etre realignes dans une etape distincte, apres validation du Lab.
