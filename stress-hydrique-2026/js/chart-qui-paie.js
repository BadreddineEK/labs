// Chapitre 5 - equite : part de consommation vs part des redevances (chiffres publics, fourchettes).
(function () {
  var target = document.getElementById('quipaie-chart');
  if (!target) return;
  // Consommation nette : France Stratégie (moyenne annuelle, cohérent avec le chapitre 3).
  // Redevances : Cour des comptes / agences de l'eau. Valeurs représentatives (milieu de fourchette).
  var groups = [
    { label: 'Usagers domestiques', conso: 24, redevance: 59 },
    { label: 'Agriculture', conso: 45, redevance: 8 }
  ];
  var CONSO = '#2f6f73', REDEV = '#a3472f';
  var width = 640, height = 300, pad = { top: 20, right: 20, bottom: 64, left: 60 };
  var plotH = height - pad.top - pad.bottom;
  var groupW = 200, gap = 120, barW = 74;
  var x0 = pad.left + 30;
  var y = function (v) { return pad.top + (100 - v) / 100 * plotH; };
  var axis = '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + plotH) + '" stroke="#d3ccbc"/>' +
    [0, 25, 50, 75].map(function (t) {
      return '<line x1="' + pad.left + '" y1="' + y(t) + '" x2="' + (width - pad.right) + '" y2="' + y(t) + '" stroke="#efe9dd"/>' +
        '<text x="' + (pad.left - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end" font-size="12" fill="#8c887e">' + t + ' %</text>';
    }).join('');
  var content = groups.map(function (g, i) {
    var gx = x0 + i * (groupW + gap);
    function bar(offset, value, color, lbl) {
      var bx = gx + offset;
      var by = y(value);
      return '<rect x="' + bx + '" y="' + by + '" width="' + barW + '" height="' + (pad.top + plotH - by) + '" rx="4" fill="' + color + '"/>' +
        '<text x="' + (bx + barW / 2) + '" y="' + (by - 8) + '" text-anchor="middle" font-size="18" font-family="Georgia,serif" fill="#1d1b17">' + value + ' %</text>';
    }
    return bar(0, g.conso, CONSO) + bar(barW + 12, g.redevance, REDEV) +
      '<text x="' + (gx + barW + 6) + '" y="' + (pad.top + plotH + 26) + '" text-anchor="middle" font-size="15" fill="#1d1b17" font-weight="600">' + g.label + '</text>';
  }).join('');
  var legend = '<rect x="' + (pad.left) + '" y="' + (height - 20) + '" width="12" height="12" rx="2" fill="' + CONSO + '"/>' +
    '<text x="' + (pad.left + 18) + '" y="' + (height - 10) + '" font-size="13" fill="#615d54">part de la consommation</text>' +
    '<rect x="' + (pad.left + 210) + '" y="' + (height - 20) + '" width="12" height="12" rx="2" fill="' + REDEV + '"/>' +
    '<text x="' + (pad.left + 228) + '" y="' + (height - 10) + '" font-size="13" fill="#615d54">part des redevances</text>';
  target.innerHTML = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Part de consommation contre part des redevances, usagers domestiques et agriculture">' + axis + content + legend + '</svg>';
})();
