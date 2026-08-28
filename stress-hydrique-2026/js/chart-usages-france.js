// Chapitre 3 - part de l'agriculture dans les prelevements : annee vs ete (chiffres publics, sources).
(function () {
  var target = document.getElementById('usages-chart');
  if (!target) return;
  var bars = [
    { label: 'En moyenne annuelle', value: 45, color: '#b5651d' },
    { label: 'Au cœur de l\u2019été', value: 80, color: '#a3472f' }
  ];
  var width = 640, height = 230, pad = { top: 20, right: 20, bottom: 46, left: 60 };
  var plotH = height - pad.top - pad.bottom;
  var barW = 150, gap = 90;
  var x0 = pad.left + 40;
  var y = function (v) { return pad.top + (100 - v) / 100 * plotH; };
  var axis = '<line x1="' + pad.left + '" y1="' + (pad.top) + '" x2="' + pad.left + '" y2="' + (pad.top + plotH) + '" stroke="#d3ccbc"/>' +
    [0, 25, 50, 75, 100].map(function (t) {
      return '<line x1="' + (pad.left - 4) + '" y1="' + y(t) + '" x2="' + (width - pad.right) + '" y2="' + y(t) + '" stroke="#efe9dd"/>' +
        '<text x="' + (pad.left - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end" font-size="12" fill="#8c887e">' + t + ' %</text>';
    }).join('');
  var rects = bars.map(function (b, i) {
    var bx = x0 + i * (barW + gap);
    var by = y(b.value);
    return '<rect x="' + bx + '" y="' + by + '" width="' + barW + '" height="' + (pad.top + plotH - by) + '" rx="4" fill="' + b.color + '"/>' +
      '<text x="' + (bx + barW / 2) + '" y="' + (by - 10) + '" text-anchor="middle" font-size="24" font-family="Georgia,serif" fill="#1d1b17">' + b.value + ' %</text>' +
      '<text x="' + (bx + barW / 2) + '" y="' + (pad.top + plotH + 26) + '" text-anchor="middle" font-size="14" fill="#615d54">' + b.label + '</text>';
  }).join('');
  target.innerHTML = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Part de l agriculture dans les prelevements d eau, annuelle contre estivale">' + axis + rects + '</svg>';
})();
