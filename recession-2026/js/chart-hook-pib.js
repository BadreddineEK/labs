// Chapitre 1 - PIB France, derniers trimestres (barres, ligne zéro). Source : data/pib_hook.json
(function () {
  var el = document.getElementById('chart-pib-hook');
  if (!el) return;
  var fr = function (x) { return (x > 0 ? '+' : '') + x.toFixed(1).replace('.', ','); };
  var lbl = function (p) { var a = p.split('-'); return a[1].replace('Q', 'T') + ' ' + a[0].slice(2); };
  fetch('data/pib_hook.json').then(function (r) { return r.json(); }).then(function (d) {
    var pts = d.points.slice(-6);
    var W = 640, H = 300, pad = { top: 30, right: 20, bottom: 46, left: 30 };
    var plotH = H - pad.top - pad.bottom, mid = pad.top + plotH / 2;
    var maxA = Math.max.apply(Math, pts.map(function (p) { return Math.abs(p.valeur); }), 0.4);
    var n = pts.length, gap = 26;
    var bw = (W - pad.left - pad.right - gap * (n - 1)) / n;
    var y = function (v) { return mid - (v / maxA) * (plotH / 2); };
    var bars = pts.map(function (p, i) {
      var x = pad.left + i * (bw + gap);
      var v = p.valeur, yy = y(v), h = Math.abs(mid - yy);
      var col = v < -0.001 ? '#a3472f' : (v > 0.001 ? '#35506b' : '#b8b2a6');
      var top = v >= 0 ? yy : mid;
      var last = (p.periode === d.dernier.periode);
      return '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(h, 2).toFixed(1) + '" rx="3" fill="' + col + '"' + (last ? ' stroke="#1d1b17" stroke-width="2"' : '') + '/>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (v >= 0 ? yy - 8 : yy + 24).toFixed(1) + '" text-anchor="middle" font-size="20" font-weight="700" fill="' + col + '">' + fr(v) + '</text>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 16) + '" text-anchor="middle" font-size="16" fill="#8c887e">' + lbl(p.periode) + '</text>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Croissance trimestrielle du PIB français">' +
      '<line x1="' + pad.left + '" y1="' + mid + '" x2="' + (W - pad.right) + '" y2="' + mid + '" stroke="#d3ccbc" stroke-width="1.5"/>' + bars + '</svg>';
    var lg = document.getElementById('pib-hook-legend');
    if (lg) lg.innerHTML = 'Variation du PIB par rapport au trimestre précédent. Le 2ᵉ trimestre 2026 est stable à 0,0&nbsp;%, après un 1ᵉʳ trimestre à −0,2&nbsp;%.';
  });
})();
