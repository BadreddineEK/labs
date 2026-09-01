// Chapitre 5 - comparaison européenne T2 2026 (barres). Source : data/comparaison_europe.json
(function () {
  var el = document.getElementById('chart-comparaison');
  if (!el) return;
  var fr = function (x) { return (x > 0 ? '+' : '') + x.toFixed(1).replace('.', ','); };
  fetch('data/comparaison_europe.json').then(function (r) { return r.json(); }).then(function (d) {
    var rows = d.classement_dernier.slice().sort(function (a, b) { return b.valeur - a.valeur; });
    var W = 640, rowH = 54, pad = { top: 10, right: 70, left: 150 };
    var H = pad.top + rows.length * rowH + 10;
    var maxV = Math.max.apply(Math, rows.map(function (r) { return r.valeur; }));
    var scale = (W - pad.left - pad.right) / maxV;
    var bars = rows.map(function (r, i) {
      var y = pad.top + i * rowH;
      var w = Math.max(r.valeur * scale, 2);
      var isFR = r.geo === 'FR';
      var col = isFR ? '#a3472f' : '#35506b';
      return '<text x="' + (pad.left - 12) + '" y="' + (y + 33) + '" text-anchor="end" font-size="20" font-weight="' + (isFR ? '800' : '600') + '" fill="' + (isFR ? '#a3472f' : '#1d1b17') + '">' + r.pays + '</text>' +
        '<rect x="' + pad.left + '" y="' + (y + 12) + '" width="' + w.toFixed(1) + '" height="28" rx="4" fill="' + col + '"/>' +
        '<text x="' + (pad.left + w + 10) + '" y="' + (y + 33) + '" font-size="19" font-weight="700" fill="' + col + '">' + fr(r.valeur) + '&nbsp;%</text>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Croissance du PIB au 2e trimestre 2026 par pays">' + bars + '</svg>';
    var lg = document.getElementById('comparaison-legend');
    if (lg) lg.innerHTML = 'Croissance du PIB au 2ᵉ trimestre 2026 (variation t/t−1). France en rouge.';
    var tk = document.getElementById('comparaison-takeaway');
    if (tk) {
      var others = rows.filter(function (r) { return r.geo !== 'FR'; }).map(function (r) { return r.pays + ' (' + fr(r.valeur) + ')'; });
      tk.innerHTML = 'Sur ce trimestre, la France (0,0&nbsp;%) fait <em>moins bien</em> que ' + others.join(', ') + '. C\u2019est le point le plus solide du Lab, car il ne dépend d\u2019aucune définition.';
    }
  });
})();
