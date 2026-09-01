// Chapitre 3 - magnitude des révisions vs référence Sénat. Source : data/revisions.json
(function () {
  var el = document.getElementById('chart-revisions');
  if (!el) return;
  var fr = function (x) { return String(x).replace('.', ','); };
  fetch('data/revisions.json').then(function (r) { return r.json(); }).then(function (d) {
    var rev = d.revisions;
    var W = 640, H = 300, pad = { top: 34, right: 24, bottom: 50, left: 30 };
    var plotH = H - pad.top - pad.bottom, base = pad.top + plotH;
    var maxV = Math.max(d.ref_senat_points, d.magnitude_max) * 1.25;
    var y = function (v) { return base - (v / maxV) * plotH; };
    var n = rev.length, gap = 80, bw = 150;
    var x0 = pad.left + 40;
    var bars = rev.map(function (r, i) {
      var x = x0 + i * (bw + gap), yy = y(r.magnitude);
      return '<rect x="' + x + '" y="' + yy.toFixed(1) + '" width="' + bw + '" height="' + (base - yy).toFixed(1) + '" rx="4" fill="#35506b"/>' +
        '<text x="' + (x + bw / 2) + '" y="' + (yy - 10).toFixed(1) + '" text-anchor="middle" font-size="26" font-weight="800" fill="#35506b">' + fr(r.magnitude) + ' pt</text>' +
        '<text x="' + (x + bw / 2) + '" y="' + (base + 26) + '" text-anchor="middle" font-size="18" fill="#5f5b54">' + r.trimestre + '</text>';
    }).join('');
    var yr = y(d.ref_senat_points);
    var refLine = '<line x1="' + pad.left + '" y1="' + yr.toFixed(1) + '" x2="' + (W - pad.right) + '" y2="' + yr.toFixed(1) + '" stroke="#a3472f" stroke-width="2.5" stroke-dasharray="8 6"/>' +
      '<text x="' + (W - pad.right) + '" y="' + (yr - 10).toFixed(1) + '" text-anchor="end" font-size="17" font-weight="700" fill="#a3472f">référence historique : ' + fr(d.ref_senat_points) + ' pt</text>';
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Ampleur des révisions comparée à la référence historique">' +
      '<line x1="' + pad.left + '" y1="' + base + '" x2="' + (W - pad.right) + '" y2="' + base + '" stroke="#d3ccbc"/>' + bars + refLine + '</svg>';
    var lg = document.getElementById('revisions-legend');
    if (lg) lg.innerHTML = 'Ampleur de la révision (écart entre première estimation et estimation détaillée), en points de PIB.';
    var tk = document.getElementById('revisions-takeaway');
    if (tk) tk.innerHTML = 'En moyenne <em>' + fr(d.magnitude_moyenne) + ' point</em> de révision sur ces deux trimestres, sous la référence historique de ' + fr(d.ref_senat_points) + ' point (écart moyen entre première estimation et compte définitif, 2000-2005). Une révision de cette ampleur est banale.';
    var nu = document.getElementById('revisions-nuance');
    if (nu) nu.innerHTML = '<strong>Échantillon limité et horizons différents.</strong> Faute de données «\u00a0vintage\u00a0» facilement accessibles, je ne compare que deux trimestres. Surtout, notre écart couvre l\u2019horizon court (première estimation → estimation détaillée), quand la référence Sénat couvre le chemin complet jusqu\u2019au compte définitif. La révision du T2 pourrait donc encore s\u2019accentuer.';
  });
})();
