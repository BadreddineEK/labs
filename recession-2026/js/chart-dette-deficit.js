// Chapitre dette/déficit - France vs Allemagne/Italie/Espagne. Source : data/dette_deficit.json
(function () {
  var fr = function (x) { return String(x).replace('.', ','); };

  var elD = document.getElementById('chart-dette-comparaison');
  var elF = document.getElementById('chart-deficit-comparaison');
  if (!elD && !elF) return;

  fetch('data/dette_deficit.json').then(function (r) { return r.json(); }).then(function (d) {
    function barChart(target, rows, unit, negatifOk) {
      var W = 640, rowH = 52, pad = { top: 6, right: 70, left: 150 };
      var H = pad.top + rows.length * rowH + 6;
      var maxV = Math.max.apply(Math, rows.map(function (r) { return Math.abs(r.valeur); }));
      var scale = (W - pad.left - pad.right) / maxV;
      var bars = rows.map(function (r, i) {
        var y = pad.top + i * rowH;
        var w = Math.max(Math.abs(r.valeur) * scale, 2);
        var isFR = r.geo === 'FR';
        var col = isFR ? '#a3472f' : '#35506b';
        return '<text x="' + (pad.left - 12) + '" y="' + (y + 32) + '" text-anchor="end" font-size="19" font-weight="' + (isFR ? '800' : '600') + '" fill="' + (isFR ? '#a3472f' : '#1d1b17') + '">' + r.pays + '</text>' +
          '<rect x="' + pad.left + '" y="' + (y + 10) + '" width="' + w.toFixed(1) + '" height="26" rx="4" fill="' + col + '"/>' +
          '<text x="' + (pad.left + w + 10) + '" y="' + (y + 30) + '" font-size="18" font-weight="700" fill="' + col + '">' + fr(r.valeur) + unit + '</text>';
      }).join('');
      target.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Comparaison entre pays">' + bars + '</svg>';
    }
    if (elD) {
      var rows = d.dette_comparaison.pays.slice().sort(function (a, b) { return b.valeur - a.valeur; });
      barChart(elD, rows, '&nbsp;%');
      var lg = document.getElementById('dette-legend');
      if (lg) lg.innerHTML = 'Dette publique, % du PIB, ' + d.dette_comparaison.annee + '. France en rouge.';
      var tk = document.getElementById('dette-takeaway');
      if (tk) {
        var deA = d.dette_comparaison.pays.filter(function (p) { return p.geo === 'DE'; })[0].valeur;
        var itA = d.dette_comparaison.pays.filter(function (p) { return p.geo === 'IT'; })[0].valeur;
        tk.innerHTML = 'La France (' + fr(d.dette_comparaison.pays.filter(function (p) { return p.geo === 'FR'; })[0].valeur) + '&nbsp;%) n\u2019est ni la meilleure ni la pire&nbsp;: loin devant l\u2019Allemagne (' + fr(deA) + '&nbsp;%), mais nettement sous l\u2019Italie (' + fr(itA) + '&nbsp;%). Une zone intermédiaire, avec une trajectoire de hausse plus rapide que ses pairs récemment.';
      }
    }
    if (elF) {
      var rowsF = d.deficit_comparaison.pays.slice().sort(function (a, b) { return a.valeur - b.valeur; });
      barChart(elF, rowsF, '&nbsp;%');
      var lgF = document.getElementById('deficit-legend');
      if (lgF) lgF.innerHTML = 'Déficit public, % du PIB, ' + d.deficit_comparaison.annee + ' (négatif = déficit). France en rouge.';
    }
  });
})();
