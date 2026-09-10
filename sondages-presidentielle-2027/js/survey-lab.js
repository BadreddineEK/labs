(function () {
  'use strict';

  var truth = 0.42;
  var groups = [
    { name: '18–29 ans', pop: 0.18, panel: 0.28, support: 0.36, region: 'urbain' },
    { name: '30–49 ans', pop: 0.34, panel: 0.36, support: 0.41, region: 'urbain' },
    { name: '50–64 ans', pop: 0.27, panel: 0.22, support: 0.44, region: 'mixte' },
    { name: '65 ans et +', pop: 0.21, panel: 0.14, support: 0.462, region: 'rural' }
  ];
  var els = {};
  ['sample-control', 'sample-output', 'mode-control', 'weight-control', 'run-poll', 'run-many', 'run-status', 'sample-chart', 'truth-value', 'estimate-value', 'estimate-note', 'error-value', 'effective-value', 'poll-interpretation', 'repeat-chart', 'coverage-value', 'coverage-note', 'weight-chart', 'case-chart', 'notice-grid'].forEach(function (id) { els[id] = document.getElementById(id); });
  if (!els['sample-control']) return;

  var simulatorIntro = document.querySelector('#simulator .section-head');
  if (simulatorIntro) {
    var introText = simulatorIntro.querySelector('.section-intro');
    if (introText) introText.textContent = 'La population fictive compte 100 000 électeurs. La simulation connaît la vraie intention de vote, puis vous montre ce que votre échantillon permet réellement d’en dire.';
    simulatorIntro.insertAdjacentHTML('beforeend', '<div class="model-card"><strong>Fiche du modèle</strong><span><b>Population</b> synthétique · 100 000 personnes</span><span><b>Variable</b> soutien à une option fictive</span><span><b>Vérité pédagogique</b> 42 %</span><span><b>Résultat</b> aucune estimation de 2027</span></div>');
  }
  var hero = document.querySelector('.hero');
  if (hero) {
    hero.insertAdjacentHTML('afterend', '<section id="hook" class="hook wrap"><p class="eyebrow">Le test que les titres oublient</p><div class="hook-grid"><div><h2>A : <strong>16 %</strong> · B : <strong>14 %</strong></h2><p>Échantillon : 1 000 personnes. Question : <em>peut-on réellement affirmer que A est devant&nbsp;?</em></p></div><div class="hook-answer"><strong>Pas si vite.</strong><span>Un écart de 2 points peut être plus petit que l’incertitude autour des estimations. Le Lab vous montre pourquoi.</span></div></div><a class="hook-cta" href="#simulator">Voir ce que cache l’écart <span aria-hidden="true">↓</span></a></section>');
  }
  var main = document.querySelector('main');
  var historical = document.getElementById('historical');
  var weights = document.getElementById('weights');
  var question = document.getElementById('question');
  if (main && historical && weights && question) {
    question.after(historical);
    historical.innerHTML = '<div class="section-head"><p class="eyebrow">06 · Quand le sondage rencontre le réel</p><h2>Un exemple historique attend encore sa source primaire.</h2><p class="section-intro">La comparaison entre une dernière intention de vote et un résultat électoral peut être très instructive. Mais elle n’est publiable ici que si l’on peut retrouver l’institut, le commanditaire, les dates exactes du terrain, la taille et la base de l’échantillon, ainsi que la notice complète.</p></div><div class="source-gap"><strong>Section mise en attente</strong><p>Les chiffres précédemment affichés pour le premier tour de 2022 ne sont pas conservés : leur attribution complète n’est pas identifiable dans les fichiers du Lab. Aucun ordre de grandeur ne doit remplacer une source primaire.</p><p>Les résultats officiels du ministère de l’Intérieur sont disponibles, mais ils ne suffisent pas à documenter la dernière vague de sondage. La comparaison sera réintroduite lorsque les deux objets seront traçables.</p><a href="https://www.archives-resultats-elections.interieur.gouv.fr/resultats/presidentielle-2022/index.php" target="_blank" rel="noopener">Voir les résultats officiels 2022 →</a></div>';
  }
  var questionNote = document.querySelector('#question .question-demo small');
  if (questionNote) questionNote.textContent = 'Exemple synthétique : il illustre l’effet combiné du cadrage, des modalités de réponse et de la formulation, pas l’effet de quelques mots isolés.';
  var caseTitle = document.querySelector('#case h2');
  if (caseTitle) caseTitle.textContent = 'Quand un chiffre ne peut plus être audité';
  var repeatedHead = document.querySelector('#repeated .section-head');
  if (repeatedHead) repeatedHead.insertAdjacentHTML('beforeend', '<div class="method-note"><strong>À lire correctement :</strong> en tirage aléatoire, la couverture empirique peut être comparée à 95 %. Pour un panel, des quotas ou un redressement, l’intervalle normal reste une référence de modèle : il ne couvre pas toutes les sources d’erreur.</div>');
  var chapterLabels = { weights: '04 · Voir le redressement agir', question: '05 · Le chiffre dépend aussi des mots', historical: '06 · Quand le sondage rencontre le réel', case: '07 · Quand un chiffre ne peut plus être audité', notice: '08 · Votre kit de lecture' };
  Object.keys(chapterLabels).forEach(function (id) { var label = document.querySelector('#' + id + ' .eyebrow'); if (label) label.textContent = chapterLabels[id]; });

  function fmt(value, decimals) { return value.toLocaleString('fr-FR', { minimumFractionDigits: decimals || 0, maximumFractionDigits: decimals || 0 }); }
  function pct(value, decimals) { return fmt(value * 100, decimals === undefined ? 1 : decimals) + ' %'; }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function randn() { var u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function pick(distribution) { var r = Math.random(), total = 0; for (var i = 0; i < distribution.length; i += 1) { total += distribution[i]; if (r <= total) return i; } return distribution.length - 1; }
  function getSettings() { return { n: Number(els['sample-control'].value), mode: els['mode-control'].value, weight: els['weight-control'].value }; }
  function sampleDistribution(mode) {
    if (mode === 'random') return groups.map(function (g) { return g.pop; });
    if (mode === 'panel') return groups.map(function (g) { return g.panel; });
    return groups.map(function (g) { return g.pop * (g.region === 'urbain' ? 1.01 : 0.99); });
  }
  function weightsFor(mode, weight) {
    if (weight === 'none' || mode === 'random') return groups.map(function () { return 1; });
    return groups.map(function (g) { var base = g.pop / g.panel; return weight === 'full' ? base * (g.name === '18–29 ans' ? 1.08 : 0.98) : base; });
  }
  function drawSample(settings) {
    var distribution = sampleDistribution(settings.mode), weights = weightsFor(settings.mode, settings.weight), counts = groups.map(function () { return 0; });
    for (var i = 0; i < settings.n; i += 1) counts[pick(distribution)] += 1;
    var raw = counts.reduce(function (sum, count, index) { return sum + count * groups[index].support; }, 0) / settings.n;
    var weightSum = counts.reduce(function (sum, count, index) { return sum + count * weights[index]; }, 0);
    var estimate = counts.reduce(function (sum, count, index) { return sum + count * weights[index] * groups[index].support; }, 0) / weightSum;
    var weightSquare = counts.reduce(function (sum, count, index) { return sum + count * weights[index] * weights[index]; }, 0);
    var effective = weightSum * weightSum / weightSquare;
    var se = Math.sqrt(estimate * (1 - estimate) / effective);
    return { counts: counts, weights: weights, raw: raw, estimate: estimate, effective: effective, se: se, low: estimate - 1.96 * se, high: estimate + 1.96 * se };
  }
  function sampleSvg(result) {
    var max = Math.max.apply(null, result.counts), width = 620, rowH = 38;
    var rows = result.counts.map(function (count, index) { var y = 35 + index * rowH, bar = count / max * 260; return '<text x="0" y="' + (y + 16) + '" class="axis-label" fill="#69706a">' + groups[index].name + '</text><rect x="125" y="' + y + '" width="' + bar + '" height="22" rx="2" fill="#245c55"/><text x="' + (135 + bar) + '" y="' + (y + 16) + '" class="axis-label" fill="#1b1d1b">' + fmt(count) + '</text>'; }).join('');
    return '<svg class="chart-svg" viewBox="0 0 ' + width + ' 190" role="img" aria-label="Composition de l’échantillon par âge"><text x="0" y="18" class="axis-label" fill="#69706a">RÉPONDANTS PAR GROUPE</text>' + rows + '</svg>';
  }
  function updatePoll(result, settings) {
    var error = result.estimate - truth;
    els['sample-output'].textContent = fmt(settings.n);
    els['sample-chart'].innerHTML = sampleSvg(result);
    els['truth-value'].textContent = pct(truth);
    els['estimate-value'].textContent = pct(result.estimate);
    els['error-value'].textContent = (error >= 0 ? '+' : '') + fmt(error * 100, 1) + ' pt';
    els['effective-value'].textContent = fmt(Math.round(result.effective));
    els['estimate-note'].textContent = settings.weight === 'none' ? 'proportion brute' : 'proportion pondérée';
    var direction = Math.abs(error) < 0.015 ? 'très proche de la vérité' : error > 0 ? 'surestime le signal' : 'sous-estime le signal';
    els['poll-interpretation'].innerHTML = '<strong>Lecture :</strong> votre échantillon ' + direction + '. L’intervalle théorique est [' + pct(clamp(result.low, 0, 1)) + ' ; ' + pct(clamp(result.high, 0, 1)) + ']. Il décrit une fluctuation de tirage sous les hypothèses du modèle, pas une garantie contre les biais de recrutement.';
    renderWeights(result, settings);
  }
  function renderWeights(result, settings) {
    var max = Math.max.apply(null, result.weights), rows = result.weights.map(function (weight, index) { var y = 38 + index * 34, raw = 44, weighted = 44 * weight; return '<text x="0" y="' + (y + 12) + '" class="axis-label" fill="#69706a">' + groups[index].name + '</text><rect x="125" y="' + y + '" width="' + raw + '" height="12" fill="#c26339"/><rect x="185" y="' + y + '" width="' + weighted / max * 150 + '" height="12" fill="#245c55"/><text x="350" y="' + (y + 12) + '" class="axis-label" fill="#69706a">×' + weight.toFixed(2) + '</text>'; }).join('');
    els['weight-chart'].innerHTML = '<svg class="chart-svg" viewBox="0 0 440 185" role="img" aria-label="Comparaison des poids bruts et redressés"><text x="0" y="18" class="axis-label" fill="#69706a">ORANGE : BRUT · VERT : POIDS APPLIQUÉ</text>' + rows + '<text x="125" y="178" class="axis-label" fill="#69706a">poids relatif dans le calcul</text></svg>';
  }
  function repeatSvg(values, truthValue, low, high) {
    var width = 700, height = 250, left = 42, right = 18, top = 28, bottom = 38, min = Math.max(0, Math.min.apply(null, values.concat([truthValue])) - 0.07), max = Math.min(1, Math.max.apply(null, values.concat([truthValue])) + 0.07);
    function x(value) { return left + (value - min) / (max - min) * (width - left - right); }
    var dots = values.map(function (value, index) { return '<circle cx="' + x(value) + '" cy="' + (top + (index % 17) * 10) + '" r="3" fill="#e8bd54" opacity=".7"/>'; }).join('');
    var labels = [min, (min + max) / 2, max].map(function (value) { return '<text x="' + x(value) + '" y="' + (height - 12) + '" text-anchor="middle" class="axis-label" fill="#b6c9c0">' + pct(value, 0) + '</text>'; }).join('');
    return '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Distribution de 500 estimations avec vérité et intervalle"><line x1="' + x(truthValue) + '" y1="' + top + '" x2="' + x(truthValue) + '" y2="' + (height - bottom) + '" stroke="#c26339" stroke-width="3"/><line x1="' + x(low) + '" y1="' + (height - 27) + '" x2="' + x(high) + '" y2="' + (height - 27) + '" stroke="#8fb8a9" stroke-width="6" stroke-linecap="round"/><text x="' + x(truthValue) + '" y="18" text-anchor="middle" class="axis-label" fill="#f0c66a">VÉRITÉ</text>' + dots + labels + '</svg>';
  }
  function runMany(settings) {
    var values = [], covered = 0, total = 500;
    for (var i = 0; i < total; i += 1) { var result = drawSample(settings); values.push(result.estimate); if (truth >= result.low && truth <= result.high) covered += 1; }
    var min = Math.max(0, Math.min.apply(null, values) - 0.03), max = Math.min(1, Math.max.apply(null, values) + 0.03);
    els['repeat-chart'].innerHTML = repeatSvg(values, truth, truth - 1.96 * Math.sqrt(truth * (1 - truth) / settings.n), truth + 1.96 * Math.sqrt(truth * (1 - truth) / settings.n)) + '<p class="chart-summary">Les 500 estimations s’étendent de ' + pct(Math.min.apply(null, values), 1) + ' à ' + pct(Math.max.apply(null, values), 1) + '. La vérité pédagogique est ' + pct(truth) + '.</p>';
    els['coverage-value'].textContent = pct(covered / total, 0);
    els['coverage-note'].textContent = settings.mode === 'random' ? 'Dans un tirage aléatoire, la couverture se rapproche de 95 % quand les hypothèses du modèle sont respectées.' : 'La couverture peut s’éloigner de 95 % : l’intervalle ne connaît pas le biais introduit par le recrutement.';
    els['run-status'].textContent = '500 tirages simulés · dispersion de ' + pct(Math.max(0, max - min), 1);
  }
  function run() { var settings = getSettings(); var result = drawSample(settings); updatePoll(result, settings); els['run-status'].textContent = 'Échantillon de ' + fmt(settings.n) + ' répondants tiré.'; }
  els['sample-control'].addEventListener('input', run);
  els['mode-control'].addEventListener('change', run);
  els['weight-control'].addEventListener('change', run);
  els['run-poll'].addEventListener('click', run);
  els['run-many'].addEventListener('click', function () { run(); runMany(getSettings()); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }); }, { threshold: 0.12 });
    document.querySelectorAll('.lab-section, .opening').forEach(function (section) { section.classList.add('reveal'); observer.observe(section); });
  }

  var caseRows = [['Institut déclaré', 'NON'], ['Notice déposée', 'NON'], ['Échantillon représentatif', 'ÉCARTS'], ['Redressement', 'ABSENT'], ['Ordre des questions', 'À RISQUE']];
  els['case-chart'].innerHTML = '<div class="case-list">' + caseRows.map(function (row) { return '<div class="case-row"><span>' + row[0] + '</span><b>' + row[1] + '</b></div>'; }).join('') + '</div>';
  var noticeRows = [['01', 'Producteur', 'Qui commande et réalise ?'], ['02', 'Population', 'Qui est censé être représenté ?'], ['03', 'Terrain', 'Quand, combien, par quel mode ?'], ['04', 'Questionnaire', 'Quel texte exact et quel ordre ?'], ['05', 'Corrections', 'Quels quotas, poids et redressements ?'], ['06', 'Incertitude', 'Quelle marge, avec quelles hypothèses ?']];
  els['notice-grid'].innerHTML = noticeRows.map(function (row) { return '<article class="notice-card"><b>' + row[0] + '</b><strong>' + row[1] + '</strong><p>' + row[2] + '</p></article>'; }).join('');
  var historicalCaption = document.querySelector('#historical .fig-cap');
  if (historicalCaption) historicalCaption.innerHTML += ' <a href="https://www.archives-resultats-elections.interieur.gouv.fr/resultats/presidentielle-2022/index.php" target="_blank" rel="noopener">Résultats officiels du ministère de l’Intérieur</a>.';
  run();
  runMany(getSettings());
})();
