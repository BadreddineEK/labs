// Calcul interactif: proba d'etre sonde selon taille d'echantillon saisie par l'utilisateur
// Base: population adulte France ~53M (voir data/instituts_2027.json)
const POPULATION_ADULTE_FRANCE = 53000000;

function calculerProbaSondage(tailleEchantillon) {
  const proba = tailleEchantillon / POPULATION_ADULTE_FRANCE;
  const uneSur = Math.round(POPULATION_ADULTE_FRANCE / tailleEchantillon);
  return { proba, uneSur };
}

// TODO: brancher sur un input utilisateur + affichage dans la section intro
