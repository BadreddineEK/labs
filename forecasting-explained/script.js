/* ================================================================
   FORECASTING EXPLAINED — Interactive Charts & Interactions
   Canvas API · No dependencies
================================================================ */

'use strict';

// ── TRANSLATIONS ──────────────────────────────────────────────────

const translations = {
  en: {
    'nav.anatomy':    'Anatomy',
    'nav.difficulty': 'Difficulty',
    'nav.metrics':    'Metrics',
    'nav.validation': 'Validation',
    'nav.stationarity': 'Stationarity',
    'nav.lagfeatures':  'Lag Features',
    'nav.models':     'Models',
    'nav.ideas':      'Key Ideas',

    'hero.eyebrow':  'An interactive explainer',
    'hero.sub':      'It is pattern reading under uncertainty.',
    'hero.body':     'A visual exploration of how we predict time: what makes a good forecast, why it fails, and what the data is really telling us.',
    'hero.past':     'Past',
    'hero.forecast': 'Forecast',

    'what.title':     'What is a forecast?',
    'what.lead':      'A forecast is a structured bet about the future, informed by patterns in the past. It is not a crystal ball. It is not a guess. It is a calibrated estimate with known limitations.',
    'what.observed':  'Observed',
    'what.forecasted':'Forecasted',
    'what.interval':  'Uncertainty range',

    'anatomy.title':          'What hides inside a time series.',
    'anatomy.intro':          'A time series is never just "data going up and down." The first three layers below are classical decomposition components. The fourth, a structural break, is an external event — not part of the classical decomposition, but just as present in real data. Toggle each layer to see what it contributes.',
    'anatomy.trend':          'Trend',
    'anatomy.trendDesc':      'The long-term direction: up, down, or shifting.',
    'anatomy.seasonality':    'Seasonality',
    'anatomy.seasonalityDesc':'Recurring patterns: weekly, monthly, yearly cycles.',
    'anatomy.noise':          'Noise',
    'anatomy.noiseDesc':      'Random variation: unavoidable, partially modelable.',
    'anatomy.shock':          'Structural Break',
    'anatomy.shockDesc':      'Not a decomposition component. A sudden level shift from an external event — requires separate detection and handling from the rest of the model.',
    'anatomy.msgFull':        'All layers active. This is your data: a mix of patterns, cycles, noise, and surprises.',

    'hard.title':        'The further you look, the less you see.',
    'hard.intro':        'Forecasting is hard for reasons that are structural, not just technical. Understanding these limits is the first step toward better predictions.',
    'hard.horizonTitle': 'The horizon problem',
    'hard.horizonDesc':  'Every step further into the future compounds uncertainty. Drag the slider to see how confidence intervals grow and eventually become uninformative.',
    'hard.horizonLabel': 'Forecast horizon:',
    'hard.shockTitle':   'The shock problem',
    'hard.shockDesc':    'Models are trained on the past. Structural breaks come from the future. When the underlying system changes abruptly, historical patterns become misleading.',
    'hard.injectBtn':    'Inject a shock',
    'hard.resetBtn':     'Reset',
    'hard.noiseTitle':   'The noise problem',
    'hard.noiseDesc':    'At low noise, the underlying trend is obvious. As randomness increases, signal and noise become indistinguishable. Overfitting mistakes noise for pattern.',
    'hard.noiseLabel':   'Noise level:',

    'takeaways.title':   'What to remember.',
    'takeaways.q1':      '"Every forecast is a bet. A well-calibrated bet."',
    'takeaways.q2':      '"The goal is not certainty. It is structured doubt."',
    'takeaways.q3':      '"The best forecasters are not always right. They know when they are probably wrong."',
    'takeaways.t1title': 'Decompose before you predict.',
    'takeaways.t1text':  'Separate trend, seasonality, and noise. Each component needs a different model or assumption. Treating them as one block is the most common source of poor forecasts.',
    'takeaways.t2title': 'Widen your intervals when the ground shifts.',
    'takeaways.t2text':  'Structural breaks invalidate past distributions. When the context changes (regulations, crises, new products), uncertainty must be explicitly widened, not assumed away.',
    'takeaways.t3title': 'Model the uncertainty, not just the mean.',
    'takeaways.t3text':  'A single forecast line is a simplification. The business decision lives in the distribution: in the tails, in the worst cases, in the confidence range. Communicate intervals, not just point estimates.',

    'metrics.title':         'Not all errors are equal.',
    'metrics.intro':         'How you measure forecast quality shapes what you optimize \u2014 and what you ignore. MAE, RMSE, and MAPE tell different stories about the same mistake.',
    'metrics.outlierLabel':  'Outlier size:',
    'metrics.small':         'Small',
    'metrics.large':         'Large',
    'metrics.maeName':       'Mean Absolute Error',
    'metrics.maeNote':       'Every error counts the same. Intuitive. Easy to explain to a stakeholder.',
    'metrics.rmseName':      'Root Mean Squared Error',
    'metrics.rmseNote':      'Large errors are penalized quadratically. Watch it spike as the outlier grows.',
    'metrics.mapeName':      'Mean Abs. Percentage Error',
    'metrics.mapeNote':      'Scale-independent, interpretable as %. Explodes when actuals are near zero.',
    'metrics.insight':       '\"There is no universal best metric. Pick the one that reflects the true cost of your errors.\"',

    'val.title':       'You cannot shuffle time.',
    'val.intro':       'A random train/test split is standard for tabular ML. On a time series, it is a methodological error. Training on data from the future leaks information the model should never see.',
    'val.wrongLabel':  '\u2715 Random split (wrong)',
    'val.wrongDesc':   'Training data is scattered across the full timeline. The model has seen data from the future.',
    'val.rightLabel':  '\u2713 Walk-forward (correct)',
    'val.rightDesc':   'Training always ends before the test window. Each fold simulates a real deployment.',
    'val.prevBtn':     '\u2190 Prev',
    'val.nextBtn':     'Next \u2192',
    'val.trainLabel':  'Training',
    'val.testLabel':   'Validation',
    'val.futureLabel': 'Future (unseen)',
    'val.insight':     '\"Evaluate your model the way it will be deployed: train on the past, test on the future.\"',

    'models.title':        'Choose your tools wisely.',
    'models.intro':        'No model wins every battle. Each family makes different assumptions about your data. Knowing those assumptions is more important than memorizing hyperparameters.',
    'models.naiveTag':     'Baseline',
    'models.naiveName':    'Na\u00efve / Seasonal Na\u00efve',
    'models.naiveAssumes': 'Assumes: the future repeats the recent past or the same season last year.',
    'models.naiveDesc':    'Always compute a na\u00efve baseline first. If your complex model cannot beat it, go back to the drawing board.',
    'models.naiveWhen':    '\u2192 Use as benchmark. Every model should beat this.',
    'models.etsTag':       'Classical',
    'models.etsName':      'Exponential Smoothing (ETS)',
    'models.etsAssumes':   'Assumes: trend and seasonality evolve smoothly via exponential weighting.',
    'models.etsDesc':      'A state space model. Handles multiple seasonalities. Interpretable components. Underrated in practice.',
    'models.etsWhen':      '\u2192 Strong seasonal patterns. Classic business forecasting.',
    'models.arimaTag':     'Statistical',
    'models.arimaName':    'ARIMA / SARIMA',
    'models.arimaAssumes': 'Assumes: the series is stationary (or can be made so by differencing d times).',
    'models.arimaDesc':    'Models autocorrelation structure. Requires stationarity testing (ADF, KPSS). Sensitive to outliers and structural breaks.',
    'models.arimaWhen':    '\u2192 Complex autocorrelation. Use ACF/PACF to select p, q.',
    'models.mlTag':        'ML',
    'models.mlName':       'LightGBM / XGBoost',
    'models.mlAssumes':    'Assumes: nothing explicitly \u2014 learns from engineered lag features.',
    'models.mlDesc':       'Powerful with many exogenous variables. Requires careful feature engineering and strictly temporal cross-validation. Highly prone to data leakage.',
    'models.mlWhen':       '\u2192 Many covariates. Non-linear patterns. Large history available.',
    'models.insight':      '\"A simple model that understands your data beats a complex one that doesn\u2019t.\"',

    'canvas.past':            'Past',
    'canvas.forecast':        'Forecast →',
    'canvas.trueSignal':      'true signal',
    'canvas.observedData':    'observed data',
    'canvas.modelForecast':   'model forecast',
    'canvas.actualPostShock': 'actual (post-shock)',
    'canvas.shock':           'shock',

    'stat.title':          'ARIMA needs a stable baseline.',
    'stat.intro':          'A stationary series has a constant mean and variance over time. ARIMA requires it. Non-stationary series must be transformed \u2014 by differencing \u2014 before modeling.',
    'stat.btnOriginal':    'Original series',
    'stat.btnDiff1':       'First difference (\u2207y)',
    'stat.btnSeasonal':    'Seasonal difference (\u2207\u2088y)',
    'stat.explOriginal':   'Clear upward trend. The mean is not constant \u2014 it grows with time. ARIMA(p,0,q) on this series would be meaningless.',
    'stat.explDiff1':      '\u2207y\u209c = y\u209c \u2212 y\u209c\u208b\u2081. First differencing removes the trend. Seasonal oscillation remains. ADF: p = 0.076 (> 0.05, not yet stationary).',
    'stat.explSeasonal':   '\u2207\u2088y\u209c = y\u209c \u2212 y\u209c\u208b\u2088. Seasonal differencing removes both trend and seasonal pattern. Rolling mean is flat. ADF: p = 0.001 \u2014 stationary.',
    'stat.rollingMean':    '\u2190 rolling mean',
    'stat.stationary':     'stationary \u2713',
    'stat.nonStationary':  'non-stationary',
    'stat.adfLabel':       'ADF',
    'stat.insight':        '"Before fitting ARIMA: test for stationarity. If ADF p > 0.05, you must difference first."',

    'lag.title':           'ML models don\u2019t see time.',
    'lag.intro':           'Tree-based models (LightGBM, XGBoost) have no concept of order. You transform the time series into a tabular dataset: each row is one time step, each column is a lagged value or calendar feature. The model never sees the sequence.',
    'lag.currentRowLabel': 'Current row:',
    'lag.insight':         '"Feature engineering is the model for tree-based forecasting. Lag selection, encoding, and leakage prevention matter more than hyperparameters."',

    'footer.role': ', Data Scientist',
  },

  fr: {
    'nav.anatomy':    'Anatomie',
    'nav.difficulty': 'Difficultés',
    'nav.metrics':    'Métriques',
    'nav.validation': 'Validation',
    'nav.stationarity': 'Stationnarité',
    'nav.lagfeatures':  'Lag Features',
    'nav.models':     'Modèles',
    'nav.ideas':      'A retenir',

    'hero.eyebrow':  'Un explainer interactif',
    'hero.sub':      'C\'est lire des patterns dans l\'incertitude.',
    'hero.body':     'Une exploration visuelle de la prédiction dans le temps: ce qui rend une prévision fiable, pourquoi elle échoue, et ce que les données essaient vraiment de dire.',
    'hero.past':     'Passé',
    'hero.forecast': 'Prévision',

    'what.title':     'C\'est quoi une prévision ?',
    'what.lead':      'Une prévision, c\'est un pari structuré sur le futur, fondé sur les patterns du passé. Ce n\'est pas une boule de cristal. Ce n\'est pas une intuition. C\'est une estimation calibrée, avec ses limites connues.',
    'what.observed':  'Observé',
    'what.forecasted':'Prédit',
    'what.interval':  'Plage d\'incertitude',

    'anatomy.title':          'Ce que cache une série temporelle.',
    'anatomy.intro':          'Une série temporelle n\'est jamais juste "des données qui montent et descendent." Les trois premières couches sont les composantes de la décomposition classique. La quatrième, la rupture structurelle, est un événement externe — pas issu de la décomposition, mais tout aussi présent dans les vraies données. Activez chaque couche pour voir sa contribution.',
    'anatomy.trend':          'Tendance',
    'anatomy.trendDesc':      'La direction long terme: à la hausse, à la baisse, ou en rupture.',
    'anatomy.seasonality':    'Saisonnalité',
    'anatomy.seasonalityDesc':'Les patterns récurrents: cycles hebdomadaires, mensuels, annuels.',
    'anatomy.noise':          'Bruit',
    'anatomy.noiseDesc':      'La variation aléatoire: inévitable, partiellement modélisable.',
    'anatomy.shock':          'Rupture structurelle',
    'anatomy.shockDesc':      'Pas une composante de décomposition classique. Un changement de niveau brutal dû à un événement externe — détection et traitement distincts du reste du modèle.',
    'anatomy.msgFull':        'Toutes les couches actives. Voici vos données: un mélange de patterns, de cycles, de bruit et de surprises.',

    'hard.title':        'Plus on regarde loin, moins on voit.',
    'hard.intro':        'La prévision est difficile pour des raisons structurelles, pas seulement techniques. Comprendre ces limites, c\'est déjà la moitié du chemin.',
    'hard.horizonTitle': 'Le problème de l\'horizon',
    'hard.horizonDesc':  'Chaque pas vers le futur amplifie l\'incertitude. Bougez le slider pour voir les intervalles de confiance s\'élargir jusqu\'à devenir inutiles.',
    'hard.horizonLabel': 'Horizon de prévision :',
    'hard.shockTitle':   'Le problème des chocs',
    'hard.shockDesc':    'Les modèles apprennent du passé. Les ruptures viennent du futur. Quand le système change brusquement, les patterns historiques deviennent trompeurs.',
    'hard.injectBtn':    'Injecter un choc',
    'hard.resetBtn':     'Réinitialiser',
    'hard.noiseTitle':   'Le problème du bruit',
    'hard.noiseDesc':    'A faible bruit, la tendance est claire. Quand le bruit augmente, signal et aléatoire deviennent indiscernables. Le surapprentissage confond les deux.',
    'hard.noiseLabel':   'Niveau de bruit :',

    'takeaways.title':   'Ce qu\'il faut retenir.',
    'takeaways.q1':      '"Chaque prévision est un pari. Un pari bien calibré."',
    'takeaways.q2':      '"L\'objectif n\'est pas la certitude. C\'est le doute structuré."',
    'takeaways.q3':      '"Les meilleurs prévisionnistes ne sont pas toujours dans le vrai. Ils savent quand ils ont probablement tort."',
    'takeaways.t1title': 'Décomposez avant de prédire.',
    'takeaways.t1text':  'Séparez tendance, saisonnalité et bruit. Chaque composante nécessite une approche différente. Les traiter ensemble en bloc est la cause la plus fréquente de mauvaises prévisions.',
    'takeaways.t2title': 'Élargissez vos intervalles quand le terrain bouge.',
    'takeaways.t2text':  'Les ruptures structurelles invalident les distributions passées. Quand le contexte change (réglementation, crises, nouveaux produits), l\'incertitude doit être explicitement élargie, pas ignorée.',
    'takeaways.t3title': 'Modélisez l\'incertitude, pas seulement la moyenne.',
    'takeaways.t3text':  'Une seule ligne de prévision est une simplification. La décision business vit dans la distribution: dans les queues, dans les pires cas, dans la plage de confiance. Communiquez des intervalles, pas seulement des estimations ponctuelles.',

    'metrics.title':         'Les erreurs n’ont pas toutes le même poids.',
    'metrics.intro':         'La façon dont vous mesurez la qualité d’une prévision détermine ce que vous optimisez — et ce que vous ignorerez. MAE, RMSE et MAPE racontent des histoires différentes sur la même erreur.',
    'metrics.outlierLabel':  'Taille de l’aberrant :',
    'metrics.small':         'Petit',
    'metrics.large':         'Grand',
    'metrics.maeName':       'Erreur Absolue Moyenne',
    'metrics.maeNote':       'Chaque erreur a le même poids. Intuitive, facile à expliquer.',
    'metrics.rmseName':      'Racine de l’Erreur Quadratique Moyenne',
    'metrics.rmseNote':      'Les grandes erreurs sont pénalisées quadratiquement. Observez-la augmenter avec l’aberrant.',
    'metrics.mapeName':      'Erreur Absolue en Pourcentage',
    'metrics.mapeNote':      'Indépendante de l’échelle. Explose quand les valeurs réelles sont proches de zéro.',
    'metrics.insight':       '"Il n’y a pas de métrique universellement meilleure. Choisissez celle qui reflète le coût réel de vos erreurs."',

    'val.title':       'On ne mélange pas le passé et le futur.',
    'val.intro':       'Diviser aléatoirement en train/test est standard en ML tabulaire. Sur une série temporelle, c’est une faute méthodologique. Entraîner sur des données du futur introduit une fuite d’information dans le modèle.',
    'val.wrongLabel':  '✕ Division aléatoire (faux)',
    'val.wrongDesc':   'Les données d’entraînement sont dispersées sur toute la timeline. Le modèle a vu des données du futur.',
    'val.rightLabel':  '✓ Walk-forward (correct)',
    'val.rightDesc':   'L’entraînement se termine toujours avant la fenêtre de test. Chaque fold simule un déploiement réel.',
    'val.prevBtn':     '← Préc.',
    'val.nextBtn':     'Suiv. →',
    'val.trainLabel':  'Entraînement',
    'val.testLabel':   'Validation',
    'val.futureLabel': 'Futur (inconnu)',
    'val.insight':     '"Évaluez votre modèle comme il sera déployé : entraînez sur le passé, testez sur le futur."',

    'models.title':        'Choisissez vos outils avec discernement.',
    'models.intro':        'Aucun modèle ne gagne tous les combats. Chaque famille fait des hypothèses différentes sur vos données. Connaître ces hypothèses est plus important que mémoriser des hyperparamètres.',
    'models.naiveTag':     'Référence',
    'models.naiveName':    'Naìf / Naìf Saisonnier',
    'models.naiveAssumes': 'Suppose : le futur reproduit le passé récent ou la même saison l’année précédente.',
    'models.naiveDesc':    'Calculez toujours un modèle naìf en premier. Si votre modèle complexe ne le bat pas, recommencez.',
    'models.naiveWhen':    '→ Référence de base. Tout modèle doit le surpasser.',
    'models.etsTag':       'Classique',
    'models.etsName':      'Lissage Exponentiel (ETS)',
    'models.etsAssumes':   'Suppose : tendance et saisonnalité évoluent doucement via des moyennes exponentielles.',
    'models.etsDesc':      'Un modèle à espace d’états. Gère plusieurs saisonnalités. Composantes interprétables. Sous-estimé en pratique.',
    'models.etsWhen':      '→ Patterns saisonniers forts. Prévision business classique.',
    'models.arimaTag':     'Statistique',
    'models.arimaName':    'ARIMA / SARIMA',
    'models.arimaAssumes': 'Suppose : la série est stationnaire (ou peut l’être par différenciation d fois).',
    'models.arimaDesc':    'Modélise la structure d’autocorrélation. Nécessite des tests de stationnarité (ADF, KPSS). Sensible aux aberrants et ruptures structurelles.',
    'models.arimaWhen':    '→ Autocorrélation complexe. Utilisez ACF/PACF pour choisir p, q.',
    'models.mlTag':        'ML',
    'models.mlName':       'LightGBM / XGBoost',
    'models.mlAssumes':    'Suppose : rien explicitement — apprend depuis des features de lags construites.',
    'models.mlDesc':       'Puissant avec de nombreuses variables exogènes. Nécessite une ingénierie des features et une validation croisée strictement temporelle. Très sensible aux fuites de données.',
    'models.mlWhen':       '→ Nombreuses covariables. Patterns non-linéaires. Grande historique disponible.',
    'models.insight':      '"Un modèle simple qui comprend vos données surpasse un modèle complexe qui ne les comprend pas."',

    'stat.title':          'ARIMA a besoin d’un terrain stable.',
    'stat.intro':          'Une série stationnaire a une moyenne et une variance constantes dans le temps. ARIMA l’exige. Les séries non-stationnaires doivent être transformées — par différenciation — avant la modélisation.',
    'stat.btnOriginal':    'Série originale',
    'stat.btnDiff1':       'Première différence (∇y)',
    'stat.btnSeasonal':    'Différence saisonnière (∇₈y)',
    'stat.explOriginal':   'Tendance clairement croissante. La moyenne n’est pas constante — elle croît avec le temps. Un ARIMA(p,0,q) sur cette série n’aurait aucun sens.',
    'stat.explDiff1':      '∇yₜ = yₜ − yₜ₋₁. La première différenciation supprime la tendance. L’oscillation saisonnière persiste. ADF : p = 0.076 (> 0.05, pas encore stationnaire).',
    'stat.explSeasonal':   '∇₈yₜ = yₜ − yₜ₋₈. La différenciation saisonnière supprime tendance et saisonnalité. La moyenne mobile est stable. ADF : p = 0.001 — stationnaire.',
    'stat.rollingMean':    '← moy. mobile',
    'stat.stationary':     'stationnaire ✓',
    'stat.nonStationary':  'non-stationnaire',
    'stat.adfLabel':       'ADF',
    'stat.insight':        '"Avant d’ajuster un ARIMA : testez la stationnarité. Si p > 0.05, il faut différencier d’abord."',

    'lag.title':           'Les modèles ML ne voient pas le temps.',
    'lag.intro':           'Les modèles par arbres (LightGBM, XGBoost) n’ont aucun concept d’ordre. On transforme la série en dataset tabulaire : chaque ligne est un pas de temps, chaque colonne une valeur décalée ou une variable calendaire. Le modèle ne « voit » jamais la séquence.',
    'lag.currentRowLabel': 'Ligne courante :',
    'lag.insight':         '"L’ingénierie des features EST le modèle pour la prévision par arbres. Sélection des lags et prévention des fuites comptent plus que les hyperparamètres."',

    'canvas.past':            'Passé',
    'canvas.forecast':        'Prévision →',
    'canvas.trueSignal':      'signal vrai',
    'canvas.observedData':    'données observées',
    'canvas.modelForecast':   'prévision modèle',
    'canvas.actualPostShock': 'réel (post-choc)',
    'canvas.shock':           'choc',

    'footer.role': ', Data Scientist',
  },
};

// Dynamic anatomy messages per language
const anatomyMessagesFR = {
  allOff: 'Aucune composante active: il ne reste rien à lire.',
  trend: 'Tendance seule: la direction long terme, sans rien d\'autre.',
  seasonality: 'Saisonnalité seule: les cycles récurrents, sans dérive.',
  noise: 'Bruit seul: de l\'aléatoire pur. Aucun modèle n\'apprend de ça.',
  shock: 'Rupture seule: le système a changé. Tout ce qui précède est obsolète.',
  trendSeasonality: 'Tendance + saisonnalité: une base réaliste. La prévision commence ici.',
  full: 'Toutes les couches actives. Voici vos données: patterns, cycles, bruit et surprises.',
  noTrend: 'Sans tendance, la série oscille sans direction.',
  noSeasonality: 'Sans saisonnalité, les cycles disparaissent. Le pattern perd son rythme.',
  noNoise: 'Sans bruit, la série est trop lisse. Elle semble artificiellement propre.',
  noShock: 'Sans rupture, passé et futur sont supposés continus.',
};

function getCurrentLang() {
  return document.documentElement.getAttribute('data-lang') || 'en';
}

function t(key) {
  const lang = getCurrentLang();
  return (translations[lang] || translations.en)[key] || translations.en[key] || key;
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      // Preserve child elements (like <strong id="horizon-value">)
      if (el.children.length > 0) {
        // Only update text nodes, keep child elements intact
        const firstText = Array.from(el.childNodes).find(n => n.nodeType === 3);
        if (firstText) {
          // For labels with strong children, just update the label prefix
          if (key === 'hard.horizonLabel' || key === 'hard.noiseLabel' || key === 'metrics.outlierLabel') {
            firstText.textContent = t[key] + ' ';
          }
        }
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Update lang toggle label (shows the OTHER language)
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = lang === 'en' ? 'FR' : 'EN';

  // Refresh dynamic slider value labels
  const horizonVal = document.getElementById('horizon-value');
  if (horizonVal) horizonVal.textContent = horizonLabel(state.horizon);
  const noiseVal = document.getElementById('noise-value');
  if (noiseVal) noiseVal.textContent = noiseLabel(state.noiseLevel);
  const outlierVal = document.getElementById('outlier-value');
  if (outlierVal) {
    const pct = state.outlierPct;
    outlierVal.textContent = pct < 35 ? t['metrics.small'] : pct < 65 ? '\u00b7\u00b7\u00b7' : t['metrics.large'];
  }

  // Update anatomy message dynamically
  updateAnatomyMessage();

  // Update stationarity explanation text when language switches
  const _statExplKeys = { original: 'stat.explOriginal', diff1: 'stat.explDiff1', seasonal: 'stat.explSeasonal' };
  const statExplEl = document.getElementById('stat-explanation');
  if (statExplEl && _statMode && _statExplKeys[_statMode] && t[_statExplKeys[_statMode]]) {
    statExplEl.textContent = t[_statExplKeys[_statMode]];
  }

  // Redraw canvases so embedded text labels switch language
  setTimeout(() => {
    drawWhatCanvas();
    drawAnatomyCanvas();
    drawHorizonCanvas();
    drawShockCanvas();
    drawNoiseCanvas();
    drawMetricsCanvas(state.outlierPct);
    drawValidationCanvas(state.validationFold);
    drawStationarityCanvas();
    drawLagCanvas(state.lagRow);
  }, 30);
}

function initLangToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('fe-lang') || 'en';
  document.documentElement.setAttribute('data-lang', saved);
  applyTranslations(saved);

  toggle.addEventListener('click', () => {
    const current = getCurrentLang();
    const next = current === 'en' ? 'fr' : 'en';
    document.documentElement.setAttribute('data-lang', next);
    localStorage.setItem('fe-lang', next);
    applyTranslations(next);
  });
}

// ── GLOBAL STATE ─────────────────────────────────────────────────
const state = {
  anatomy: {
    trend: true,
    seasonality: false,
    noise: false,
    shock: false,
  },
  horizon: 4,
  noiseLevel: 15,
  shockActive: false,
  outlierPct: 20,
  validationFold: 1,
  statMode: 'original',
  lagRow: 7,
};

// ── UTILITIES ─────────────────────────────────────────────────────

/** Seeded pseudo-random number generator (LCG) — reproducible charts */
function createRng(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

/** Linear interpolation */
const lerp = (a, b, t) => a + (b - a) * t;

/** Clamp */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/** Get CSS custom property value */
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Get resolved color accounting for dark mode */
function color(name) { return cssVar(`--color-${name}`); }

/** Format horizon label */
function horizonLabel(weeks) {
  const lang = getCurrentLang();
  if (lang === 'fr') {
    if (weeks === 1) return '1 semaine';
    if (weeks < 5) return `${weeks} semaines`;
    if (weeks < 9) return `${Math.round(weeks / 4)} mois`;
    return `${Math.round(weeks / 4)} mois`;
  }
  if (weeks === 1) return '1 week';
  if (weeks < 5) return `${weeks} weeks`;
  if (weeks < 9) return `${Math.round(weeks / 4)} month${weeks < 8 ? '' : 's'}`;
  return `${Math.round(weeks / 4)} months`;
}

/** Noise label */
function noiseLabel(v) {
  const lang = getCurrentLang();
  if (lang === 'fr') {
    if (v < 25) return 'Faible';
    if (v < 60) return 'Moyen';
    if (v < 85) return 'Elevé';
    return 'Extrême';
  }
  if (v < 25) return 'Low';
  if (v < 60) return 'Medium';
  if (v < 85) return 'High';
  return 'Extreme';
}

/** Setup a Hi-DPI canvas */
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width || canvas.offsetWidth || 600;
  const h = rect.height || canvas.offsetHeight || 200;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, w, h };
}

// ── DATA GENERATORS ───────────────────────────────────────────────

/** Generate base time series components */
function generateSeries(n = 100, rng = createRng(42)) {
  const trend = Array.from({ length: n }, (_, i) => {
    const normalized = i / (n - 1);
    return 0.3 + normalized * 0.4 + Math.pow(normalized, 1.5) * 0.15;
  });

  const seasonality = Array.from({ length: n }, (_, i) => {
    return 0.12 * Math.sin((i / n) * Math.PI * 8) +
           0.06 * Math.sin((i / n) * Math.PI * 22);
  });

  const noise = Array.from({ length: n }, () => (rng() - 0.5) * 0.08);

  // Shock at ~70%
  const shockAt = Math.floor(n * 0.68);
  const shock = Array.from({ length: n }, (_, i) => {
    if (i < shockAt) return 0;
    return -0.22 * (1 - Math.exp(-(i - shockAt) * 0.15));
  });

  return { trend, seasonality, noise, shock, shockAt };
}

/** Combine components based on state */
function combineSeries(components, s) {
  const { trend, seasonality, noise, shock } = components;
  return trend.map((t, i) => {
    let v = 0.15; // base level
    if (s.trend) v += t;
    if (s.seasonality) v += seasonality[i];
    if (s.noise) v += noise[i];
    if (s.shock) v += shock[i];
    return v;
  });
}

/** Scale data to canvas coordinates */
function scaleData(data, w, h, padX = 0.06, padY = 0.15) {
  const minV = Math.min(...data);
  const maxV = Math.max(...data);
  const range = maxV - minV || 0.001;
  const xStep = (w * (1 - padX * 2)) / (data.length - 1);
  const xOff = w * padX;
  const yRange = h * (1 - padY * 2);
  const yOff = h * padY;
  return data.map((v, i) => ({
    x: xOff + i * xStep,
    y: h - yOff - ((v - minV) / range) * yRange,
  }));
}

// ── DRAWING PRIMITIVES ─────────────────────────────────────────────

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = color('border');
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 6]);
  const gridLines = 4;
  for (let i = 1; i < gridLines; i++) {
    const y = (h / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawLine(ctx, pts, strokeColor, lineWidth = 1.5, alpha = 1) {
  if (pts.length < 2) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp = {
      x: (pts[i - 1].x + pts[i].x) / 2,
      y: (pts[i - 1].y + pts[i].y) / 2,
    };
    ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, cp.x, cp.y);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.stroke();
  ctx.restore();
}

function drawConfidenceBand(ctx, pts, spread, fillColor) {
  if (pts.length < 2) return;
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y - spread[0]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y - spread[i]);
  for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(pts[i].x, pts[i].y + spread[i]);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawVerticalDivider(ctx, x, h) {
  ctx.save();
  ctx.strokeStyle = color('border');
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x, 10);
  ctx.lineTo(x, h - 10);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// ── HERO CANVAS ────────────────────────────────────────────────────

let heroAnimFrame = null;
let heroProgress = 0;

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const rng = createRng(7);
  const n = 80;
  const splitAt = 55;

  // Generate a clean wave-like series
  const pastData = Array.from({ length: splitAt }, (_, i) => {
    const norm = i / (n - 1);
    return 0.35 +
      0.25 * Math.sin(norm * Math.PI * 5) +
      0.10 * Math.sin(norm * Math.PI * 12) +
      (rng() - 0.5) * 0.05 +
      norm * 0.15;
  });

  const lastVal = pastData[pastData.length - 1];
  const forecastN = n - splitAt;

  const forecastMean = Array.from({ length: forecastN }, (_, i) => {
    const t = i / forecastN;
    return lastVal + 0.12 * t + 0.05 * Math.sin(t * Math.PI * 3);
  });

  function draw(progress) {
    const { ctx, w, h } = setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    const pastPts = scaleData(pastData, w, h);

    // How many past points to show based on progress
    const pastShow = Math.floor(clamp(progress * 1.4, 0, 1) * splitAt);
    drawLine(ctx, pastPts.slice(0, Math.max(2, pastShow)), color('text-muted'), 2);

    // Future starts after past is done
    if (progress > 0.7) {
      const futureProgress = (progress - 0.7) / 0.3;
      const futureShow = Math.floor(futureProgress * forecastN);

      if (futureShow > 0) {
        const splitX = pastPts[pastPts.length - 1].x;
        const allData = [...pastData, ...forecastMean];
        const allPts = scaleData(allData, w, h);
        const futurePts = allPts.slice(splitAt, splitAt + Math.max(2, futureShow));

        drawVerticalDivider(ctx, splitX, h);

        // Confidence band
        const bandPts = allPts.slice(splitAt, splitAt + Math.max(2, futureShow));
        const maxSpread = h * 0.12;
        const band = bandPts.map((_, i) => (i / forecastN) * maxSpread * futureProgress);
        drawConfidenceBand(ctx, bandPts, band, color('accent-dim'));

        // Forecast line
        drawLine(ctx, futurePts, color('accent'), 1.5, 0.85);

        // Future hatch label region
        ctx.save();
        ctx.fillStyle = color('accent-dim');
        ctx.fillRect(splitX, 10, w - splitX - 10, h - 20);
        ctx.restore();

        drawLine(ctx, futurePts, color('accent'), 1.5);
      }
    }
  }

  function animate() {
    if (heroProgress < 1) {
      heroProgress = Math.min(1, heroProgress + 0.008);
      draw(heroProgress);
      heroAnimFrame = requestAnimationFrame(animate);
    }
  }

  // Start when visible
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && heroProgress === 0) {
      setTimeout(() => animate(), 400);
    }
  }, { threshold: 0.3 });
  observer.observe(canvas);
}

// ── WHAT CANVAS ────────────────────────────────────────────────────

const _whatRng = createRng(13);
const _whatSplitAt = 40;
const _whatPastData = (() => {
  const n = 60;
  return Array.from({ length: _whatSplitAt }, (_, i) => {
    const norm = i / n;
    return 0.3 + norm * 0.35 + 0.08 * Math.sin(norm * Math.PI * 7) + (_whatRng() - 0.5) * 0.04;
  });
})();
const _whatForecastMean = (() => {
  const n = 60;
  const lastVal = _whatPastData[_whatSplitAt - 1];
  return Array.from({ length: n - _whatSplitAt }, (_, i) => {
    return lastVal + 0.08 * (i / (n - _whatSplitAt));
  });
})();

function drawWhatCanvas() {
  const canvas = document.getElementById('what-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  const allData = [..._whatPastData, ..._whatForecastMean];
  const allPts = scaleData(allData, w, h);
  const splitX = allPts[_whatSplitAt - 1].x;

  const futurePts = allPts.slice(_whatSplitAt);
  const band = futurePts.map((_, i) => (i / futurePts.length) * h * 0.14);
  drawConfidenceBand(ctx, futurePts, band, color('accent-dim'));
  drawVerticalDivider(ctx, splitX, h);
  drawLine(ctx, allPts.slice(0, _whatSplitAt), color('text-muted'), 2);
  drawLine(ctx, allPts.slice(_whatSplitAt - 1), color('accent'), 1.5, 0.9);

  ctx.fillStyle = color('text-faint');
  ctx.font = `400 11px ${cssVar('--font-mono')}`;
  ctx.textAlign = 'center';
  ctx.fillText(t('canvas.past'), splitX * 0.35, h - 6);
  ctx.fillStyle = color('accent');
  ctx.fillText(t('canvas.forecast'), splitX + (w - splitX) * 0.45, h - 6);
}

let _whatObserved = false;

function initWhatCanvas() {
  const canvas = document.getElementById('what-canvas');
  if (!canvas) return;

  drawWhatCanvas();

  if (!_whatObserved) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) drawWhatCanvas();
    }, { threshold: 0.4 });
    observer.observe(canvas);
    _whatObserved = true;
  }
}

// ── ANATOMY CANVAS ─────────────────────────────────────────────────

const anatomyComponents = generateSeries(120, createRng(42));

function drawAnatomyCanvas() {
  const canvas = document.getElementById('anatomy-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  const combined = combineSeries(anatomyComponents, state.anatomy);
  const pts = scaleData(combined, w, h);
  drawLine(ctx, pts, color('text'), 1.5);

  // Shock marker
  if (state.anatomy.shock) {
    const shockIdx = anatomyComponents.shockAt;
    if (shockIdx < pts.length) {
      const sx = pts[shockIdx].x;
      ctx.save();
      ctx.strokeStyle = color('accent');
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(sx, 8);
      ctx.lineTo(sx, h - 8);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color('accent');
      ctx.font = `400 10px ${cssVar('--font-mono')}`;
      ctx.fillText(t('canvas.shock'), sx + 4, 18);
      ctx.restore();
    }
  }
}

const anatomyMessages = {
  allOff: 'No components active: there is nothing left to read.',
  trend: 'Trend only: the long-term direction, stripped of everything else.',
  seasonality: 'Seasonality only: recurring cycles, no drift.',
  noise: 'Noise only: pure randomness. No model can learn from this.',
  shock: 'Structural break only: the system shifted. Everything before is obsolete.',
  trendSeasonality: 'Trend + seasonality: a realistic base. Forecasting starts here.',
  full: 'All layers active. This is your data: a mix of patterns, cycles, noise, and surprises.',
  noTrend: 'Without trend, the series oscillates without direction.',
  noSeasonality: 'Without seasonality, cycles vanish. The pattern loses its rhythm.',
  noNoise: 'Without noise, the series is too clean. It looks artificially smooth.',
  noShock: 'Without the structural break, past and future are assumed continuous.',
};

function getAnatomyMessageKey() {
  const s = state.anatomy;
  const active = Object.values(s).filter(Boolean).length;
  if (active === 0) return 'allOff';
  if (active === 4) return 'full';
  if (s.trend && s.seasonality && !s.noise && !s.shock) return 'trendSeasonality';
  if (s.trend && !s.seasonality && !s.noise && !s.shock) return 'trend';
  if (!s.trend && s.seasonality && !s.noise && !s.shock) return 'seasonality';
  if (!s.trend && !s.seasonality && s.noise && !s.shock) return 'noise';
  if (!s.trend && !s.seasonality && !s.noise && s.shock) return 'shock';
  if (!s.trend) return 'noTrend';
  if (!s.seasonality) return 'noSeasonality';
  if (!s.noise) return 'noNoise';
  return 'noShock';
}

function updateAnatomyMessage() {
  const el = document.getElementById('anatomy-message');
  if (!el) return;
  const key = getAnatomyMessageKey();
  const lang = getCurrentLang();
  const msg = lang === 'fr'
    ? (anatomyMessagesFR[key] || anatomyMessages[key])
    : anatomyMessages[key];
  el.textContent = msg;
}

function initAnatomyToggles() {
  const buttons = document.querySelectorAll('.toggle-btn[data-component]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const comp = btn.dataset.component;
      state.anatomy[comp] = !state.anatomy[comp];
      btn.classList.toggle('active', state.anatomy[comp]);
      btn.setAttribute('aria-pressed', state.anatomy[comp]);
      drawAnatomyCanvas();
      updateAnatomyMessage();
    });
  });
}

// ── HORIZON CANVAS ─────────────────────────────────────────────────

function drawHorizonCanvas() {
  const canvas = document.getElementById('horizon-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  const horizon = state.horizon;
  const n = 60;
  const splitAt = 30;
  const totalShow = splitAt + horizon;
  const rng = createRng(99);

  const pastData = Array.from({ length: splitAt }, (_, i) => {
    const norm = i / n;
    return 0.35 + norm * 0.30 + 0.07 * Math.sin(norm * Math.PI * 6) + (rng() - 0.5) * 0.04;
  });

  const lastVal = pastData[splitAt - 1];
  const forecastMean = Array.from({ length: horizon }, (_, i) => {
    return lastVal + 0.005 * i + 0.02 * Math.sin(i * 0.5);
  });

  const allData = [...pastData, ...forecastMean];
  const allPts = scaleData(allData.slice(0, totalShow), w, h);
  const splitX = allPts[splitAt - 1].x;

  // Confidence band — grows with horizon
  const futurePts = allPts.slice(splitAt);
  const maxBand = (horizon / 52) * h * 0.45 + h * 0.04;
  const band = futurePts.map((_, i) => {
    const t = (i + 1) / horizon;
    return Math.pow(t, 0.7) * maxBand;
  });

  drawConfidenceBand(ctx, futurePts, band, color('accent-dim'));
  drawVerticalDivider(ctx, splitX, h);
  drawLine(ctx, allPts.slice(0, splitAt), color('text-muted'), 2);
  drawLine(ctx, allPts.slice(splitAt - 1), color('accent'), 1.5, 0.8);

  // Horizon label
  ctx.fillStyle = color('accent');
  ctx.font = `500 10px ${cssVar('--font-mono')}`;
  ctx.textAlign = 'center';
  if (futurePts.length > 0) {
    ctx.fillText(`+${horizonLabel(horizon)}`, splitX + (w - splitX) * 0.5, 18);
  }
}

function initHorizonSlider() {
  const slider = document.getElementById('horizon-slider');
  const label = document.getElementById('horizon-value');
  if (!slider) return;

  slider.addEventListener('input', () => {
    state.horizon = parseInt(slider.value);
    label.textContent = horizonLabel(state.horizon);
    drawHorizonCanvas();
  });
}

// ── SHOCK CANVAS ────────────────────────────────────────────────────

function generateShockSeries() {
  const n = 70;
  const splitAt = 35;
  const rng = createRng(55);

  const past = Array.from({ length: n }, (_, i) => {
    const norm = i / n;
    return 0.55 +
      0.08 * Math.sin(norm * Math.PI * 7) +
      (rng() - 0.5) * 0.05 +
      norm * 0.15;
  });

  // Naive forecast: just continuation
  const lastSlope = past[n - 1] - past[n - 10];
  const naive = Array.from({ length: 25 }, (_, i) => {
    return past[n - 1] + (lastSlope / 10) * i;
  });

  // Actual with shock at split (simulated post-split)
  const shock = Array.from({ length: 25 }, (_, i) => {
    const t = i / 25;
    return past[n - 1] - 0.30 + (rng() - 0.5) * 0.07 + t * 0.05;
  });

  return { past, naive, shock, n };
}

const shockSeriesData = generateShockSeries();

function drawShockCanvas() {
  const canvas = document.getElementById('shock-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  const { past, naive, shock, n } = shockSeriesData;

  const allNaive = [...past, ...naive];
  const allShock = [...past, ...shock];

  const ptsPast = scaleData(allNaive, w, h).slice(0, n);
  const ptsNaive = scaleData(allNaive, w, h).slice(n - 1);
  const ptsShock = state.shockActive ? scaleData(allShock, w, h).slice(n - 1) : null;

  const splitX = ptsPast[ptsPast.length - 1].x;
  drawVerticalDivider(ctx, splitX, h);
  drawLine(ctx, ptsPast, color('text-muted'), 2);

  // Naive forecast
  drawLine(ctx, ptsNaive, color('accent'), 1.5, 0.6);

  // Shock actual
  if (ptsShock) {
    drawLine(ctx, ptsShock, '#C0392B', 1.5);

    // Legend
    ctx.fillStyle = color('accent');
    ctx.globalAlpha = 0.7;
    ctx.font = `400 10px ${cssVar('--font-mono')}`;
    ctx.fillText(t('canvas.modelForecast'), splitX + 6, 18);
    ctx.fillStyle = '#C0392B';
    ctx.globalAlpha = 1;
    ctx.fillText(t('canvas.actualPostShock'), splitX + 6, 34);
  }
}

function initShockButtons() {
  const injectBtn = document.getElementById('inject-shock-btn');
  const resetBtn = document.getElementById('reset-shock-btn');
  if (!injectBtn) return;

  injectBtn.addEventListener('click', () => {
    state.shockActive = true;
    drawShockCanvas();
  });

  resetBtn.addEventListener('click', () => {
    state.shockActive = false;
    drawShockCanvas();
  });
}

// ── NOISE CANVAS ────────────────────────────────────────────────────

function drawNoiseCanvas() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  const level = state.noiseLevel / 100;
  const n = 80;
  const rng = createRng(77);

  // True underlying signal
  const trueSignal = Array.from({ length: n }, (_, i) => {
    const norm = i / n;
    return 0.3 + norm * 0.45 + 0.08 * Math.sin(norm * Math.PI * 6);
  });

  // Observed = signal + noise
  const observed = trueSignal.map(v => v + (rng() - 0.5) * level * 0.55);

  const ptsTrue = scaleData(trueSignal, w, h);
  const ptsObs = scaleData(observed, w, h);

  // Observed — noisy
  drawLine(ctx, ptsObs, color('text-muted'), 1.2, 0.8);

  // True signal — always visible but dimmed to accent when noise high
  const signalAlpha = lerp(0.9, 0.35, level);
  drawLine(ctx, ptsTrue, color('accent'), 2, signalAlpha);

  // Labels
  ctx.font = `400 10px ${cssVar('--font-mono')}`;
  ctx.fillStyle = color('accent');
  ctx.globalAlpha = signalAlpha;
  ctx.fillText(t('canvas.trueSignal'), 10, 16);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = color('text-muted');
  ctx.fillText(t('canvas.observedData'), 10, 30);
  ctx.globalAlpha = 1;
}

function initNoiseSlider() {
  const slider = document.getElementById('noise-slider');
  const label = document.getElementById('noise-value');
  if (!slider) return;

  slider.addEventListener('input', () => {
    state.noiseLevel = parseInt(slider.value);
    label.textContent = noiseLabel(state.noiseLevel);
    drawNoiseCanvas();
  });
}

// ── METRICS CANVAS ─────────────────────────────────────────────────

const _mrng      = createRng(91);
const _mHistN    = 16;
const _mTestN    = 8;
const _mN        = _mHistN + _mTestN;
const _mOutlierI = 4; // which test-window index has the controllable outlier

const _mHistory = Array.from({ length: _mHistN }, (_, i) => {
  const norm = i / (_mN - 1);
  return 0.3 + norm * 0.35 + 0.06 * Math.sin(norm * Math.PI * 7) + (_mrng() - 0.5) * 0.025;
});

const _mForecast = (() => {
  const last = _mHistory[_mHistN - 1];
  return Array.from({ length: _mTestN }, (_, i) => last + 0.04 * (i + 1) / _mTestN);
})();

const _mBaseDevs = Array.from({ length: _mTestN }, () => (_mrng() - 0.5) * 0.035);

function _mActuals(pct) {
  const mag = (pct / 100) * 0.42;
  return _mForecast.map((f, i) => {
    const v = f + _mBaseDevs[i];
    return i === _mOutlierI ? v + mag : v;
  });
}

function _computeMetrics(actuals, forecasts) {
  const n = actuals.length;
  let sa = 0, ss = 0, sp = 0;
  for (let i = 0; i < n; i++) {
    const e = actuals[i] - forecasts[i];
    sa += Math.abs(e);
    ss += e * e;
    sp += Math.abs(e) / Math.max(Math.abs(actuals[i]), 0.001);
  }
  return { MAE: sa / n, RMSE: Math.sqrt(ss / n), MAPE: (sp / n) * 100 };
}

function drawMetricsCanvas(pct) {
  const outlierPct = pct ?? state.outlierPct ?? 20;
  const canvas = document.getElementById('metrics-canvas');
  if (!canvas) return;

  const actuals = _mActuals(outlierPct);
  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  // Unified scale across history + forecast + actuals
  const allVals = [..._mHistory, ..._mForecast, ...actuals];
  const minV = Math.min(...allVals) - 0.02;
  const maxV = Math.max(...allVals) + 0.02;
  const vRange = maxV - minV || 0.001;
  const padX = 0.06, padY = 0.15;
  const xStep = (w * (1 - padX * 2)) / (_mN - 1);
  const xOff  = w * padX;
  const yBand = h * (1 - padY * 2);
  const yOff  = h * padY;
  const toX = i => xOff + i * xStep;
  const toY = v => h - yOff - ((v - minV) / vRange) * yBand;

  const histPts   = _mHistory.map((v, i) => ({ x: toX(i),         y: toY(v) }));
  const fcastPts  = _mForecast.map((v, i) => ({ x: toX(_mHistN + i), y: toY(v) }));
  const actualPts = actuals.map((v, i)    => ({ x: toX(_mHistN + i), y: toY(v) }));
  const splitX    = histPts[histPts.length - 1].x;

  drawVerticalDivider(ctx, splitX, h);

  // Error bars
  fcastPts.forEach((fp, i) => {
    const ap = actualPts[i];
    const top = Math.min(fp.y, ap.y);
    const barH = Math.abs(ap.y - fp.y);
    ctx.fillStyle = i === _mOutlierI ? 'rgba(231,76,60,0.80)' : 'rgba(231,76,60,0.22)';
    ctx.fillRect(fp.x - 2.5, top, 5, barH);
  });

  // History
  drawLine(ctx, histPts, color('text-muted'), 2);

  // Forecast (dashed)
  ctx.save();
  ctx.setLineDash([5, 3]);
  drawLine(ctx, [histPts[histPts.length - 1], ...fcastPts], color('accent'), 1.5, 0.65);
  ctx.restore();

  // Actual
  drawLine(ctx, [histPts[histPts.length - 1], ...actualPts], color('text'), 2, 0.88);

  // Labels
  ctx.font = `400 10px ${cssVar('--font-mono')}`;
  ctx.textAlign = 'left';
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = color('text-faint');
  ctx.fillText(t('canvas.past'), 8, 14);
  ctx.fillStyle = color('accent');
  ctx.fillText(t('canvas.modelForecast'), splitX + 6, 14);
  ctx.fillStyle = color('text');
  ctx.fillText(t('canvas.observedData'), splitX + 6, 28);
  ctx.globalAlpha = 1;

  // Update metric value elements
  const m = _computeMetrics(actuals, _mForecast);
  const setEl = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  setEl('mae-value',  m.MAE.toFixed(3));
  setEl('rmse-value', m.RMSE.toFixed(3));
  setEl('mape-value', m.MAPE.toFixed(1) + '%');

  // Visual cue: RMSE card border turns red when outlier is large
  const rmseCard = document.getElementById('card-rmse');
  if (rmseCard) {
    if (outlierPct > 45) {
      rmseCard.style.borderLeft = '3px solid #E74C3C';
    } else {
      rmseCard.style.borderLeft = '';
    }
  }
}

let _metricsObserved = false;

function initMetricsSection() {
  const slider   = document.getElementById('outlier-slider');
  const valLabel = document.getElementById('outlier-value');
  if (!slider) return;

  const update = () => {
    const pct = +slider.value;
    state.outlierPct = pct;
    if (valLabel) {
      valLabel.textContent = pct < 35 ? t('metrics.small') : pct < 65 ? '\u00b7\u00b7\u00b7' : t('metrics.large');
    }
    drawMetricsCanvas(pct);
  };

  slider.addEventListener('input', update);

  const canvas = document.getElementById('metrics-canvas');
  if (canvas && !_metricsObserved) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) update();
    }, { threshold: 0.3 }).observe(canvas);
    _metricsObserved = true;
  }

  update();
}

// ── VALIDATION CANVAS ──────────────────────────────────────────────

const VAL_TOTAL = 60;
const VAL_FOLDS = 5;
const VAL_BASE  = 20; // fold 1 training size
const VAL_STEP  = 8;  // training grows by this each fold
const VAL_TEST  = 8;  // fixed test window

function drawValidationCanvas(fold) {
  const canvas = document.getElementById('val-canvas');
  if (!canvas) return;

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);

  const rowH = Math.floor((h - 10) / VAL_FOLDS);
  const gap  = 4;
  const barH = rowH - gap;
  const tw   = w - 34; // usable width (leave 30px for fold label)
  const xOff = 30;

  for (let f = 0; f < VAL_FOLDS; f++) {
    const foldNum   = f + 1;
    const trainEnd  = VAL_BASE + f * VAL_STEP;
    const testStart = trainEnd;
    const testEnd   = testStart + VAL_TEST;
    const isCurrent = foldNum === fold;
    const alpha     = isCurrent ? 1 : 0.28;
    const y         = 5 + f * rowH;

    // Training bar
    ctx.globalAlpha = alpha * 0.72;
    ctx.fillStyle   = color('accent');
    ctx.fillRect(xOff, y, (trainEnd / VAL_TOTAL) * tw, barH);

    // Test bar
    ctx.globalAlpha = alpha;
    ctx.fillStyle   = '#E67E22';
    ctx.fillRect(xOff + (testStart / VAL_TOTAL) * tw, y, (VAL_TEST / VAL_TOTAL) * tw, barH);

    // Future bar
    if (testEnd < VAL_TOTAL) {
      ctx.globalAlpha = alpha * 0.28;
      ctx.fillStyle   = color('text-faint');
      ctx.fillRect(xOff + (testEnd / VAL_TOTAL) * tw, y, ((VAL_TOTAL - testEnd) / VAL_TOTAL) * tw, barH);
    }

    // Fold label
    ctx.globalAlpha = isCurrent ? 1 : 0.4;
    ctx.fillStyle   = color('text-muted');
    ctx.font        = `400 9px ${cssVar('--font-mono')}`;
    ctx.textAlign   = 'left';
    ctx.fillText(`F${foldNum}`, 2, y + barH * 0.75);
  }

  ctx.globalAlpha = 1;

  const foldLabel = document.getElementById('val-fold-label');
  if (foldLabel) foldLabel.textContent = `Fold ${fold} / ${VAL_FOLDS}`;
}

function initRandomSplitViz() {
  const container = document.getElementById('val-random-bars');
  if (!container || container.children.length > 0) return;
  const rng = createRng(77);
  for (let i = 0; i < 32; i++) {
    const bar = document.createElement('span');
    Object.assign(bar.style, { flex: '1', height: '100%', display: 'inline-block', borderRadius: '1px' });
    const isTest = rng() < 0.22;
    bar.style.background = isTest ? '#E74C3C' : 'var(--color-accent)';
    bar.style.opacity    = isTest ? '0.85'    : '0.42';
    container.appendChild(bar);
  }
}

let _valObserved = false;

function initValidationSection() {
  const prevBtn = document.getElementById('val-prev-btn');
  const nextBtn = document.getElementById('val-next-btn');
  if (!prevBtn || !nextBtn) return;

  const draw = () => drawValidationCanvas(state.validationFold);

  prevBtn.addEventListener('click', () => {
    if (state.validationFold > 1) { state.validationFold--; draw(); }
  });
  nextBtn.addEventListener('click', () => {
    if (state.validationFold < VAL_FOLDS) { state.validationFold++; draw(); }
  });

  initRandomSplitViz();

  const canvas = document.getElementById('val-canvas');
  if (canvas && !_valObserved) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) draw();
    }, { threshold: 0.3 }).observe(canvas);
    _valObserved = true;
  }

  draw();
}

// ── STATIONARITY ──────────────────────────────────────────────────
const _statRng = createRng(33);
const _statN = 64;
const _statPeriod = 8;
const _statOriginal = Array.from({ length: _statN }, (_, i) => {
  const norm = i / _statN;
  return 0.2 + norm * 0.58 + 0.14 * Math.sin((i / _statPeriod) * Math.PI * 2) + (_statRng() - 0.5) * 0.04;
});
const _statDiff1 = _statOriginal.map((v, i) => i === 0 ? 0 : v - _statOriginal[i - 1]);
const _statSeasonalDiff = _statOriginal.map((v, i) => i < _statPeriod ? 0 : v - _statOriginal[i - _statPeriod]);
const _statModes = {
  original: { data: _statOriginal,     startIdx: 0,           adfP: 0.614 },
  diff1:    { data: _statDiff1,        startIdx: 1,           adfP: 0.076 },
  seasonal: { data: _statSeasonalDiff, startIdx: _statPeriod, adfP: 0.001 },
};
let _statMode = 'original';

function drawStationarityCanvas(modeArg) {
  if (modeArg !== undefined) _statMode = modeArg;
  const canvas = document.getElementById('stat-canvas');
  if (!canvas) return;
  const { ctx, w, h } = setupCanvas(canvas);
  const { data, startIdx, adfP } = _statModes[_statMode];

  const pad = { top: 18, right: 18, bottom: 28, left: 38 };
  const series = data.slice(startIdx);
  const minV = Math.min(...series);
  const maxV = Math.max(...series);
  const range = maxV - minV || 1;
  const sx = i => pad.left + (i / (series.length - 1)) * (w - pad.left - pad.right);
  const sy = v => pad.top + (1 - (v - minV) / range) * (h - pad.top - pad.bottom);

  drawGrid(ctx, w, h, pad);

  // Main series line
  ctx.beginPath();
  ctx.strokeStyle = color('accent-dim');
  ctx.lineWidth = 1.5;
  series.forEach((v, i) => {
    if (i === 0) ctx.moveTo(sx(i), sy(v));
    else ctx.lineTo(sx(i), sy(v));
  });
  ctx.stroke();

  // Rolling mean (window = 10)
  const winSize = 10;
  const meanColor = adfP < 0.05 ? '#1C6B5A' : '#c0392b';
  ctx.beginPath();
  ctx.strokeStyle = meanColor;
  ctx.lineWidth = 2.5;
  let first = true;
  series.forEach((_, i) => {
    if (i < winSize - 1) return;
    const avg = series.slice(i - winSize + 1, i + 1).reduce((a, b) => a + b, 0) / winSize;
    if (first) { ctx.moveTo(sx(i), sy(avg)); first = false; }
    else ctx.lineTo(sx(i), sy(avg));
  });
  ctx.stroke();

  // Rolling mean label
  const lang = getCurrentLang();
  const tObj = translations[lang];
  ctx.fillStyle = meanColor;
  ctx.font = '700 10px ' + cssVar('--font-mono');
  ctx.textAlign = 'left';
  ctx.fillText(tObj['stat.rollingMean'] || 'rolling mean', pad.left + 2, pad.top + 12);

  // x-axis tick labels
  ctx.fillStyle = color('text-muted');
  ctx.font = '500 9px ' + cssVar('--font-sans');
  ctx.textAlign = 'center';
  [0, Math.floor((series.length - 1) / 2), series.length - 1].forEach(i => {
    ctx.fillText(startIdx + i, sx(i), h - 6);
  });

  // ADF badge
  const badge = document.getElementById('stat-adf-badge');
  if (badge) {
    const stationary = adfP < 0.05;
    badge.className = 'stat-adf-badge ' + (stationary ? 'stat-adf-badge--ok' : 'stat-adf-badge--bad');
    const label = tObj['stat.adfLabel'] || 'ADF p =';
    const verdict = stationary
      ? (tObj['stat.stationary'] || 'stationary')
      : (tObj['stat.nonStationary'] || 'non-stationary');
    badge.textContent = label + ' ' + adfP.toFixed(3) + ' \u2014 ' + verdict;
  }
}

let _statObserved = false;
function initStationaritySection() {
  const btns = document.querySelectorAll('.stat-btn');
  const explEl = document.getElementById('stat-explanation');
  const explKeyMap = { original: 'stat.explOriginal', diff1: 'stat.explDiff1', seasonal: 'stat.explSeasonal' };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      _statMode = mode;
      state.statMode = mode;
      if (explEl) {
        const tObj = translations[getCurrentLang()];
        explEl.textContent = tObj[explKeyMap[mode]] || '';
      }
      drawStationarityCanvas(mode);
    });
  });

  // Set initial explanation text
  if (explEl) {
    const tObj = translations[getCurrentLang()];
    explEl.textContent = tObj[explKeyMap['original']] || '';
  }

  if (!_statObserved) {
    _statObserved = true;
    const c = document.getElementById('stat-canvas');
    if (c) {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) drawStationarityCanvas();
      }, { threshold: 0.3 }).observe(c);
    }
  }
}

// ── LAG FEATURES ─────────────────────────────────────────────────
const _lagRng = createRng(17);
const _lagN = 15;
const _lagMax = 7;
const _lagSeries = Array.from({ length: _lagN }, () => Math.round((_lagRng() * 8 + 1.5) * 10) / 10);

function drawLagCanvas(tIdx) {
  state.lagRow = tIdx;
  const canvas = document.getElementById('lag-canvas');
  if (!canvas) return;
  const { ctx, w, h } = setupCanvas(canvas);

  const pad = { top: 24, right: 20, bottom: 28, left: 12 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const minV = Math.min(..._lagSeries);
  const maxV = Math.max(..._lagSeries);
  const range = maxV - minV || 1;
  const sx = i => pad.left + (i / (_lagN - 1)) * plotW;
  const sy = v => pad.top + (1 - (v - minV) / range) * plotH;

  drawGrid(ctx, w, h, pad);

  // Full series — dim background line
  ctx.beginPath();
  ctx.strokeStyle = color('text-muted');
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1.5;
  _lagSeries.forEach((v, i) => {
    if (i === 0) ctx.moveTo(sx(i), sy(v));
    else ctx.lineTo(sx(i), sy(v));
  });
  ctx.stroke();
  ctx.globalAlpha = 1;

  const lagOffsets = [1, 2, 3, 7];
  const targetX = sx(tIdx);
  const targetY = sy(_lagSeries[tIdx]);

  // Dashed connectors from lag points to target
  lagOffsets.forEach(lag => {
    const lagI = tIdx - lag;
    if (lagI < 0) return;
    ctx.beginPath();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = color('accent-dim');
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    ctx.moveTo(sx(lagI), sy(_lagSeries[lagI]));
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  });

  // Lag circles + labels
  lagOffsets.forEach(lag => {
    const lagI = tIdx - lag;
    if (lagI < 0) return;
    ctx.beginPath();
    ctx.arc(sx(lagI), sy(_lagSeries[lagI]), 5, 0, Math.PI * 2);
    ctx.fillStyle = color('accent-dim');
    ctx.fill();
    ctx.fillStyle = color('text-muted');
    ctx.font = '500 9px ' + cssVar('--font-mono');
    ctx.textAlign = 'center';
    ctx.fillText('lag ' + lag, sx(lagI), sy(_lagSeries[lagI]) - 9);
  });

  // Target circle (larger, accent)
  ctx.beginPath();
  ctx.arc(targetX, targetY, 7, 0, Math.PI * 2);
  ctx.fillStyle = color('accent');
  ctx.fill();
  ctx.fillStyle = color('bg');
  ctx.font = '700 9px ' + cssVar('--font-mono');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('y', targetX, targetY);
  ctx.textBaseline = 'alphabetic';

  // x-axis index labels
  ctx.fillStyle = color('text-muted');
  ctx.font = '500 9px ' + cssVar('--font-sans');
  ctx.textAlign = 'center';
  [0, Math.floor((_lagN - 1) / 2), _lagN - 1].forEach(i => {
    const diff = i - tIdx;
    const label = diff === 0 ? 't' : diff < 0 ? 't\u2212' + Math.abs(diff) : 't+' + diff;
    ctx.fillText(label, sx(i), h - 5);
  });

  buildLagTable(tIdx);
}

function buildLagTable(tIdx) {
  const table = document.getElementById('lag-table');
  if (!table) return;

  const lagOffsets = [1, 2, 3, 7];
  const rows = [];
  for (let r = Math.max(_lagMax, tIdx - 2); r <= Math.min(_lagN - 1, tIdx + 2); r++) {
    rows.push(r);
  }

  let html = '<thead><tr><th>t</th>';
  lagOffsets.forEach(l => { html += '<th>lag_' + l + '</th>'; });
  html += '<th class="lag-col-header--target">\u2192 y<sub>t</sub></th></tr></thead><tbody>';

  rows.forEach(r => {
    const cls = r === tIdx ? ' class="is-current"' : '';
    html += '<tr' + cls + '><td>' + r + '</td>';
    lagOffsets.forEach(l => {
      const lagI = r - l;
      html += '<td>' + (lagI >= 0 ? _lagSeries[lagI].toFixed(3) : '\u2014') + '</td>';
    });
    html += '<td class="is-target">' + _lagSeries[r].toFixed(3) + '</td></tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
}

let _lagObserved = false;
function initLagSection() {
  const slider = document.getElementById('lag-slider');
  const rowLabel = document.getElementById('lag-row-value');

  if (slider) {
    slider.addEventListener('input', () => {
      const v = parseInt(slider.value, 10);
      state.lagRow = v;
      if (rowLabel) rowLabel.textContent = 't = ' + v;
      drawLagCanvas(v);
    });
  }

  if (!_lagObserved) {
    _lagObserved = true;
    const c = document.getElementById('lag-canvas');
    if (c) {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) drawLagCanvas(state.lagRow);
      }, { threshold: 0.3 }).observe(c);
    }
  }
}

// ── SCROLL REVEAL ──────────────────────────────────────────────────

function initScrollReveal() {
  const sections = document.querySelectorAll('.reveal-section');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Trigger canvas draws when sections become visible
          if (entry.target.querySelector('#what-canvas')) {
            setTimeout(() => initWhatCanvas(), 150);
          }
          if (entry.target.querySelector('#anatomy-canvas')) {
            setTimeout(() => drawAnatomyCanvas(), 150);
          }
          if (entry.target.querySelector('#horizon-canvas')) {
            setTimeout(() => drawHorizonCanvas(), 150);
          }
          if (entry.target.querySelector('#shock-canvas')) {
            setTimeout(() => drawShockCanvas(), 150);
          }
          if (entry.target.querySelector('#noise-canvas')) {
            setTimeout(() => drawNoiseCanvas(), 150);
          }
          if (entry.target.querySelector('#metrics-canvas')) {
            setTimeout(() => drawMetricsCanvas(state.outlierPct), 150);
          }
          if (entry.target.querySelector('#val-canvas')) {
            setTimeout(() => drawValidationCanvas(state.validationFold), 150);
          }
          if (entry.target.querySelector('#stat-canvas')) {
            setTimeout(() => drawStationarityCanvas(), 150);
          }
          if (entry.target.querySelector('#lag-canvas')) {
            setTimeout(() => drawLagCanvas(state.lagRow), 150);
          }
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach(s => observer.observe(s));
}
// ── NAV SMOOTH SCROLL ───────────────────────────────────────────────────────

function initNavLinks() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
// ── NAV BEHAVIOR ───────────────────────────────────────────────────

function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // ── Hamburger toggle ────────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');

  function closeDrawer() {
    nav.classList.remove('nav-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const opening = !nav.classList.contains('nav-open');
      nav.classList.toggle('nav-open', opening);
      hamburger.setAttribute('aria-expanded', opening);
      if (drawer) drawer.setAttribute('aria-hidden', !opening);
    });
  }

  // Close when a drawer link is tapped
  if (drawer) {
    drawer.querySelectorAll('.nav-drawer-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Close on outside click
  document.addEventListener('click', e => {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on scroll (UX: user chose a destination)
  window.addEventListener('scroll', closeDrawer, { passive: true, once: false });

  // ── Show/hide on scroll ──────────────────────────────────────
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (y > 80) {
      nav.classList.add('is-visible');
    } else {
      nav.classList.remove('is-visible');
    }

    if (y > 100) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    lastY = y;
  }, { passive: true });
}

// ── DARK MODE ──────────────────────────────────────────────────────

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Respect system preference on first load
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('fe-theme');
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fe-theme', next);

    // Redraw all canvases with updated colors
    setTimeout(() => {
      drawAnatomyCanvas();
      drawHorizonCanvas();
      drawShockCanvas();
      drawNoiseCanvas();
      initWhatCanvas();
      drawMetricsCanvas(state.outlierPct);
      drawValidationCanvas(state.validationFold);
      drawStationarityCanvas();
      drawLagCanvas(state.lagRow);
    }, 50);
  });
}

// ── RESIZE HANDLER ─────────────────────────────────────────────────

function initResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      drawWhatCanvas();
      drawAnatomyCanvas();
      drawHorizonCanvas();
      drawShockCanvas();
      drawNoiseCanvas();
      drawMetricsCanvas(state.outlierPct);
      drawValidationCanvas(state.validationFold);
      drawStationarityCanvas();
      drawLagCanvas(state.lagRow);
    }, 200);
  });
}

// ── INIT ───────────────────────────────────────────────────────────

function init() {
  initThemeToggle();
  initLangToggle();
  initNav();
  initNavLinks();
  initHeroCanvas();
  initScrollReveal();
  initAnatomyToggles();
  initHorizonSlider();
  initShockButtons();
  initNoiseSlider();
  initMetricsSection();
  initValidationSection();
  initStationaritySection();
  initLagSection();
  initResizeHandler();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
