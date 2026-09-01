// Chapitre profondeur - croissance longue FR/DE/IT/ES/EA depuis 2016. Source : data/croissance_longue.json
(function () {
  var el = document.getElementById('chart-croissance-longue');
  if (!el) return;
  var COL = { France: '#a3472f', Allemagne: '#35506b', Italie: '#b5651d', Espagne: '#4a7a55', 'Zone euro': '#8c887e' };
  fetch('data/croissance_longue.json').then(function (r) { return r.json(); }).then(function (d) {
    var periodes = d.periodes.filter(function (p) { return p >= '2016-Q1'; });
    var offset = d.periodes.length - periodes.length;
    var W = 640, H = 300, pad = { top: 20, right: 20, bottom: 30, left: 34 };
    var plotH = H - pad.top - pad.bottom;
    var allVals = [];
    Object.keys(d.pays).forEach(function (k) { d.pays[k].slice(offset).forEach(function (v) { if (v != null) allVals.push(v); }); });
    var min = Math.min.apply(Math, allVals.concat([0])), max = Math.max.apply(Math, allVals);
    var x = function (i) { return pad.left + i * (W - pad.left - pad.right) / (periodes.length - 1); };
    var y = function (v) { return pad.top + (max - v) / (max - min) * plotH; };
    var zeroY = y(0);
    var lines = Object.keys(d.pays).map(function (nom) {
      var serie = d.pays[nom].slice(offset);
      var pts = [];
      serie.forEach(function (v, i) { if (v != null) pts.push(x(i).toFixed(1) + ',' + y(v).toFixed(1)); });
      var w = nom === 'France' ? 4 : 2;
      var op = nom === 'France' ? 1 : 0.55;
      return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + COL[nom] + '" stroke-width="' + w + '" stroke-opacity="' + op + '" stroke-linejoin="round"/>';
    }).join('');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Croissance trimestrielle du PIB, France et pairs européens depuis 2016">' +
      '<line x1="' + pad.left + '" y1="' + zeroY.toFixed(1) + '" x2="' + (W - pad.right) + '" y2="' + zeroY.toFixed(1) + '" stroke="#d3ccbc"/>' + lines +
      '<text x="' + pad.left + '" y="' + (H - 6) + '" font-size="13" fill="#8c887e">' + periodes[0] + '</text>' +
      '<text x="' + (W - pad.right) + '" y="' + (H - 6) + '" text-anchor="end" font-size="13" fill="#8c887e">' + periodes[periodes.length - 1] + '</text></svg>';
    var lg = document.getElementById('croissance-longue-legend');
    if (lg) lg.innerHTML = Object.keys(COL).map(function (n) {
      return '<span style="color:' + COL[n] + '">\u25a0</span> ' + n;
    }).join(' &nbsp; ') + ' <span style="opacity:.7">(France en trait épais)</span>';
    var tk = document.getElementById('croissance-longue-takeaway');
    if (tk) {
      var fr = d.moyenne_fr_2025_2026, au = d.moyenne_autres_2025_2026;
      var frTxt = String(fr).replace('.', ',') + ' %', auTxt = String(au).replace('.', ',') + ' %';
      tk.innerHTML = 'Depuis début 2025, la croissance trimestrielle moyenne française (' + frTxt + ') est <em>en dessous</em> de celle de ses pairs (' + auTxt + ' en moyenne). Verdict&nbsp;: <b>' + d.verdict + '</b>.';
    }
  });
})();
