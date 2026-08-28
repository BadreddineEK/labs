// Chapitre fuites : classement departemental calcule (SISPEA) + resultat de correlation.
(function () {
  var target = document.getElementById('fuites-chart');
  if (!target) return;
  fetch('data/fuites_facteurs.json').then(function (r) { return r.json(); }).then(function (d) {
    var deps = (d.departements_robustes || []).slice(0, 12);
    if (!deps.length) return;
    var width = 640, rowH = 30, pad = { top: 10, right: 60, left: 168, bottom: 24 };
    var height = pad.top + pad.bottom + deps.length * rowH;
    var max = Math.max.apply(Math, deps.map(function (x) { return x.taux_fuite; }));
    var scale = function (v) { return v / max * (width - pad.left - pad.right); };
    var bars = deps.map(function (x, i) {
      var y = pad.top + i * rowH;
      var w = scale(x.taux_fuite);
      return '<text x="' + (pad.left - 10) + '" y="' + (y + 19) + '" text-anchor="end" font-size="14" fill="#615d54">' + x.nom + '</text>' +
        '<rect x="' + pad.left + '" y="' + (y + 5) + '" width="' + w.toFixed(1) + '" height="' + (rowH - 12) + '" rx="3" fill="#2f6f73"/>' +
        '<text x="' + (pad.left + w + 8) + '" y="' + (y + 19) + '" font-size="13" fill="#1d1b17">' + String(x.taux_fuite).replace('.', ',') + ' %</text>';
    }).join('');
    target.innerHTML = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Taux de fuite des reseaux d eau potable, departements les plus touches">' + bars + '</svg>';
    var median = document.getElementById('fuites-median');
    if (median) median.textContent = String(d.national.taux_fuite_median).replace('.', ',') + ' %';
  }).catch(function () {});

  var corrTarget = document.getElementById('fuites-correlation');
  if (!corrTarget) return;
  fetch('data/fuites_facteurs.json').then(function (r) { return r.json(); }).then(function (d) {
    if (!d.correlation_revenu) return;
    var c = d.correlation_revenu.correlations.revenu_median;
    var r = c.pearson_r, p = c.pearson_p, n = d.correlation_revenu.n;
    var significatif = p < 0.05;
    var force = Math.abs(r) < 0.2 ? 'quasi nul' : Math.abs(r) < 0.4 ? 'faible' : 'mod\u00e9r\u00e9';
    corrTarget.innerHTML = 'Sur les ' + n + ' d\u00e9partements suffisamment couverts, le lien entre taux de fuite et revenu m\u00e9dian est <strong>' + force +
      '</strong> (r = ' + String(r.toFixed(2)).replace('.', ',') + ', p = ' + String(p.toFixed(2)).replace('.', ',') + '). ' +
      (significatif ? 'Il est statistiquement significatif.' : 'Il n\u2019est pas statistiquement significatif : les fuites ne s\u2019expliquent pas par la richesse du territoire.');
  }).catch(function () {});
})();
