// Chapitre "cycles" - detection Bry-Boschan simplifiee sur le PIB en volume. Source : data/cycles_bry_boschan.json
(function () {
  var el = document.getElementById('chart-cycles');
  if (!el) return;
  fetch('data/cycles_bry_boschan.json').then(function (r) { return r.json(); }).then(function (d) {
    var pts = d.serie_niveau.filter(function (p) { return p.periode >= '2015-Q1'; });
    var W = 640, H = 300, pad = { top: 24, right: 20, bottom: 40, left: 30 };
    var plotH = H - pad.top - pad.bottom;
    var vals = pts.map(function (p) { return p.valeur; });
    var min = Math.min.apply(Math, vals), max = Math.max.apply(Math, vals);
    var x = function (i) { return pad.left + i * (W - pad.left - pad.right) / (pts.length - 1); };
    var y = function (v) { return pad.top + (max - v) / (max - min) * plotH; };
    var line = pts.map(function (p, i) { return x(i).toFixed(1) + ',' + y(p.valeur).toFixed(1); }).join(' ');
    var idxByPeriode = {}; pts.forEach(function (p, i) { idxByPeriode[p.periode] = i; });
    var markers = d.evenements.filter(function (e) { return idxByPeriode[e.periode] !== undefined; }).map(function (e) {
      var i = idxByPeriode[e.periode];
      var col = e.type === 'pic' ? '#a3472f' : '#3f6f4a';
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(e.niveau).toFixed(1) + '" r="7" fill="' + col + '"/>' +
        '<text x="' + x(i).toFixed(1) + '" y="' + (y(e.niveau) + (e.type === 'pic' ? -14 : 26)).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + col + '">' + e.type + '</text>';
    }).join('');
    var lastX = x(pts.length - 1);
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Niveau du PIB français avec points de retournement détectés">' +
      '<polyline points="' + line + '" fill="none" stroke="#35506b" stroke-width="3" stroke-linejoin="round"/>' + markers +
      '<text x="' + pad.left + '" y="' + (H - 10) + '" font-size="13" fill="#8c887e">' + pts[0].periode + '</text>' +
      '<text x="' + lastX + '" y="' + (H - 10) + '" text-anchor="end" font-size="13" fill="#8c887e">' + pts[pts.length - 1].periode + '</text></svg>';
    var lg = document.getElementById('cycles-legend');
    if (lg) lg.innerHTML = 'Niveau du PIB en volume (CVS-CJO), avec pics (brique) et creux (vert) détectés depuis 2015.';
    var tk = document.getElementById('cycles-takeaway');
    if (tk) {
      var derniers = d.evenements.slice(-2).map(function (e) { return e.type + ' en ' + e.periode; }).join(', puis ');
      tk.innerHTML = 'La méthode détecte ' + d.n_evenements + ' points de retournement depuis 2004, dont ' + derniers + '. Depuis ce dernier pic, l\u2019économie est en <em>' + d.phase_actuelle + '</em> — cohérent avec un 1ᵉʳ trimestre 2026 négatif.';
    }
  });
})();
