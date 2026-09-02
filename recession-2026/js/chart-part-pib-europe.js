// Chapitre part de la France dans le PIB de l'UE, 2005-2025. Source : data/part_pib_europe.json
// Rendu en bump/slope chart (3 repères 2005/2015/2025) pour varier des barres et des deltas utilisés ailleurs.
(function () {
  var el = document.getElementById('chart-part-pib-europe');
  if (!el) return;
 var COL = {
    Allemagne: '#365b78',
    France: '#a3472f',
    Italie: '#b5651d',
    Espagne: '#6c8da6',
    Pologne: '#3f6f4a'
    };
  fetch('data/part_pib_europe.json').then(function (r) { return r.json(); }).then(function (d) {
    var pts = d.points;
    var byAnnee = {}; pts.forEach(function (p) { byAnnee[p.annee] = p; });
    var reperes = [2005, 2015, d.derniere_annee.annee].filter(function (a, i, arr) { return byAnnee[a] && arr.indexOf(a) === i; });
    var noms = Object.keys(COL);
    var W = 700, H = 340, pad = { top: 24, right: 112, bottom: 38, left: 20 };
    var plotH = H - pad.top - pad.bottom;
    var allVals = []; reperes.forEach(function (a) { noms.forEach(function (n) { if (byAnnee[a][n] != null) allVals.push(byAnnee[a][n]); }); });
    var min = 0, max = Math.max.apply(Math, allVals) * 1.15;
    var x = function (i) { return pad.left + i * (W - pad.left - pad.right) / (reperes.length - 1); };
    var y = function (v) { return pad.top + (max - v) / (max - min) * plotH; };
    var segments = noms.map(function (nom) {
      var seg = reperes.map(function (a, i) { return x(i).toFixed(1) + ',' + y(byAnnee[a][nom]).toFixed(1); }).join(' ');
      var dots = reperes.map(function (a, i) {
        var v = byAnnee[a][nom];
        return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="7" fill="' + COL[nom] + '"/>' +
          '<text x="' + x(i).toFixed(1) + '" y="' + (y(v) - 14).toFixed(1) + '" text-anchor="middle" font-size="14" font-weight="700" fill="' + COL[nom] + '">' + String(v).replace('.', ',') + '</text>';
      }).join('');
      var last = byAnnee[reperes[reperes.length - 1]][nom];
      return '<polyline points="' + seg + '" fill="none" stroke="' + COL[nom] + '" stroke-width="3" stroke-linejoin="round"/>' + dots +
        '<text x="' + (W - pad.right + 12) + '" y="' + (y(last) + 5).toFixed(1) + '" font-size="15" font-weight="700" fill="' + COL[nom] + '">' + nom + '</text>';
    }).join('');
    var ticks = reperes.map(function (a, i) {
      return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="14" font-weight="600" fill="#5f5b54">' + a + '</text>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Évolution en 3 repères de la part de la France, de l\'Italie et de la Pologne dans le PIB de l\'UE">' + segments + ticks + '</svg>';
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
