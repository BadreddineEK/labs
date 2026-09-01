// Chapitre 2 - règle "2 trimestres négatifs consécutifs" appliquée à T1/T2 2026. Source : data/pib_hook.json
(function () {
  var el = document.getElementById('chart-definition');
  if (!el) return;
  var fr = function (x) { return (x > 0 ? '+' : '') + x.toFixed(1).replace('.', ','); };
  fetch('data/pib_hook.json').then(function (r) { return r.json(); }).then(function (d) {
    var by = {}; d.points.forEach(function (p) { by[p.periode] = p.valeur; });
    var items = [
      { p: '2026-Q1', lab: '1ᵉʳ trimestre 2026', v: by['2026-Q1'] },
      { p: '2026-Q2', lab: '2ᵉ trimestre 2026', v: by['2026-Q2'] }
    ];
    var W = 640, H = 250, midX = W / 2;
    var rows = items.map(function (it, i) {
      var neg = it.v < -0.001;
      var col = neg ? '#a3472f' : '#b8b2a6';
      var tag = neg ? 'négatif' : 'stable';
      var yTop = 40 + i * 92;
      return '<text x="30" y="' + (yTop + 20) + '" font-size="22" font-weight="600" fill="#1d1b17">' + it.lab + '</text>' +
        '<text x="30" y="' + (yTop + 52) + '" font-size="16" fill="#8c887e">croissance ' + fr(it.v) + ' %</text>' +
        '<rect x="' + (midX + 20) + '" y="' + yTop + '" width="150" height="56" rx="10" fill="' + (neg ? '#f2e2d9' : '#eae6dd') + '"/>' +
        '<text x="' + (midX + 95) + '" y="' + (yTop + 35) + '" text-anchor="middle" font-size="22" font-weight="700" fill="' + col + '">' + tag + '</text>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Application de la règle des deux trimestres négatifs">' + rows +
      '<line x1="30" y1="' + (H - 34) + '" x2="' + (W - 30) + '" y2="' + (H - 34) + '" stroke="#e4ded1"/>' +
      '<text x="30" y="' + (H - 8) + '" font-size="18" font-weight="700" fill="#a3472f">Deux trimestres négatifs d’affilée&nbsp;? Non, un seul.</text></svg>';
    var lg = document.getElementById('definition-legend');
    if (lg) lg.innerHTML = 'La règle de la récession technique exige deux trimestres consécutifs négatifs.';
    var tk = document.getElementById('definition-takeaway');
    if (tk) tk.innerHTML = 'Le 1ᵉʳ trimestre est négatif (−0,2&nbsp;%), mais le 2ᵉ est stable (0,0&nbsp;%). Selon cette définition stricte, la France <em>n\u2019est pas</em> en récession technique. Le verdict tient à un seul dixième de point.';
  });
})();
