// Chapitre part de la France dans le PIB de l'UE, 2005-2025. Source : data/part_pib_europe.json
(function () {
  var el = document.getElementById('chart-part-pib-europe');
  if (!el) return;
  var COL = { France: '#a3472f', Italie: '#b5651d', Pologne: '#3f6f4a' };
  fetch('data/part_pib_europe.json').then(function (r) { return r.json(); }).then(function (d) {
    var pts = d.points;
    var W = 640, H = 300, pad = { top: 20, right: 60, bottom: 30, left: 34 };
    var plotH = H - pad.top - pad.bottom;
    var noms = Object.keys(COL);
    var allVals = []; pts.forEach(function (p) { noms.forEach(function (n) { if (p[n] != null) allVals.push(p[n]); }); });
    var min = 0, max = Math.max.apply(Math, allVals) * 1.1;
    var x = function (i) { return pad.left + i * (W - pad.left - pad.right) / (pts.length - 1); };
    var y = function (v) { return pad.top + (max - v) / (max - min) * plotH; };
    var lines = noms.map(function (nom) {
      var line = pts.map(function (p, i) { return x(i).toFixed(1) + ',' + y(p[nom]).toFixed(1); }).join(' ');
      var last = pts[pts.length - 1];
      return '<polyline points="' + line + '" fill="none" stroke="' + COL[nom] + '" stroke-width="3.5" stroke-linejoin="round"/>' +
        '<text x="' + (W - pad.right + 8) + '" y="' + (y(last[nom]) + 5).toFixed(1) + '" font-size="15" font-weight="700" fill="' + COL[nom] + '">' + nom + '</text>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Part de la France, de l\'Italie et de la Pologne dans le PIB de l\'UE, 2005-2025">' + lines +
      '<text x="' + pad.left + '" y="' + (H - 6) + '" font-size="13" fill="#8c887e">' + pts[0].annee + '</text>' +
      '<text x="' + (pad.left + (W - pad.left - pad.right)) + '" y="' + (H - 6) + '" text-anchor="end" font-size="13" fill="#8c887e">' + pts[pts.length - 1].annee + '</text></svg>';
    var tk = document.getElementById('part-pib-europe-takeaway');
    if (tk) {
      var p0 = d.premiere_annee, p1 = d.derniere_annee;
      var fr0 = String(p0.France).replace('.', ','), fr1 = String(p1.France).replace('.', ',');
      var it0 = String(p0.Italie).replace('.', ','), it1 = String(p1.Italie).replace('.', ',');
      var pl0 = String(p0.Pologne).replace('.', ','), pl1 = String(p1.Pologne).replace('.', ',');
      tk.innerHTML = 'France&nbsp;: ' + fr0 + '&nbsp;% → ' + fr1 + '&nbsp;% du PIB de l\u2019UE (' + p0.annee + '-' + p1.annee + '). Italie&nbsp;: ' + it0 + '&nbsp;% → ' + it1 + '&nbsp;%. Pologne&nbsp;: ' + pl0 + '&nbsp;% → ' + pl1 + '&nbsp;%. ' + d.lecture;
    }
  });
})();
