// Chapitre part de la France dans le PIB de l'UE, 2005-2025.
// Source : data/part_pib_europe.json
// Rendu : graphique en aires empilées à 100 % sur 3 années observées.
// Les bandes représentent la part de chaque pays dans le PIB nominal de l'UE27.
// "Reste de l'UE" complète toujours à 100 %.

(function () {
  var el = document.getElementById('chart-part-pib-europe');
  if (!el) return;

  var COLORS = {
    France: '#a3472f',
    Italie: '#b5651d',
    Pologne: '#3f6f4a',
    Reste: '#d9dde2'
  };

  fetch('data/part_pib_europe.json')
    .then(function (r) {
      if (!r.ok) throw new Error('Impossible de charger part_pib_europe.json');
      return r.json();
    })
    .then(function (d) {
      var byYear = {};
      d.points.forEach(function (p) {
        byYear[p.annee] = p;
      });

      var years = [2005, 2015, d.derniere_annee.annee]
        .filter(function (year, index, array) {
          return byYear[year] && array.indexOf(year) === index;
        });

      if (years.length < 2) return;

      var countries = ['France', 'Italie', 'Pologne'];

      var W = 760;
      var H = 360;
      var pad = { top: 24, right: 20, bottom: 46, left: 20 };
      var plotW = W - pad.left - pad.right;
      var plotH = H - pad.top - pad.bottom;

      function x(index) {
        return pad.left + (index * plotW) / (years.length - 1);
      }

      function y(value) {
        return pad.top + ((100 - value) / 100) * plotH;
      }

      var values = years.map(function (year) {
        var point = byYear[year];

        var france = Number(point.France) || 0;
        var italy = Number(point.Italie) || 0;
        var poland = Number(point.Pologne) || 0;
        var rest = Math.max(0, 100 - france - italy - poland);

        return {
          annee: year,
          France: france,
          Italie: italy,
          Pologne: poland,
          Reste: rest
        };
      });

      function boundaryPath(countryIndex) {
        var boundary = values.map(function (row) {
          var cumulative = 0;

          if (countryIndex >= 0) cumulative += row.France;
          if (countryIndex >= 1) cumulative += row.Italie;
          if (countryIndex >= 2) cumulative += row.Pologne;

          return x(values.indexOf(row)).toFixed(1) + ',' + y(cumulative).toFixed(1);
        });

        return boundary.join(' ');
      }

      function areaPoints(lowerIndex, upperIndex) {
        var top = values.map(function (row, index) {
          var cumulative = 0;

          if (upperIndex >= 0) cumulative += row.France;
          if (upperIndex >= 1) cumulative += row.Italie;
          if (upperIndex >= 2) cumulative += row.Pologne;

          return x(index).toFixed(1) + ',' + y(cumulative).toFixed(1);
        });

        var bottom = values
          .map(function (row, index) {
            var cumulative = 0;

            if (lowerIndex >= 0) cumulative += row.France;
            if (lowerIndex >= 1) cumulative += row.Italie;
            if (lowerIndex >= 2) cumulative += row.Pologne;

            return x(index).toFixed(1) + ',' + y(cumulative).toFixed(1);
          })
          .reverse();

        return top.concat(bottom).join(' ');
      }

      // Ordre d'empilement, du bas vers le haut :
      // France → Italie → Pologne → reste de l'UE.
      var franceArea = areaPoints(-1, 0);
      var italyArea = areaPoints(0, 1);
      var polandArea = areaPoints(1, 2);

      var restTop = values.map(function (row, index) {
        return x(index).toFixed(1) + ',' + y(100).toFixed(1);
      });

      var restBottom = values
        .map(function (row, index) {
          return x(index).toFixed(1) + ',' + y(row.France + row.Italie + row.Pologne).toFixed(1);
        })
        .reverse();

      var restArea = restTop.concat(restBottom).join(' ');

      var separators = [
        boundaryPath(0),
        boundaryPath(1),
        boundaryPath(2)
      ].map(function (points) {
        return '<polyline points="' + points + '" fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>';
      }).join('');

      var yearsLabels = years.map(function (year, index) {
        return (
          '<line x1="' + x(index).toFixed(1) + '" y1="' + pad.top + '" ' +
          'x2="' + x(index).toFixed(1) + '" y2="' + (H - pad.bottom).toFixed(1) + '" ' +
          'stroke="#ffffff" stroke-opacity="0.45" stroke-width="1"/>' +
          '<text x="' + x(index).toFixed(1) + '" y="' + (H - 12) + '" ' +
          'text-anchor="middle" font-size="15" font-weight="700" fill="#5f5b54">' +
          year +
          '</text>'
        );
      }).join('');

      function labelAtLastYear(name, value, offset) {
        var lastX = x(values.length - 1);
        var last = values[values.length - 1];
        var cumulativeBelow = 0;

        if (name === 'Italie') cumulativeBelow = last.France;
        if (name === 'Pologne') cumulativeBelow = last.France + last.Italie;
        if (name === 'Reste') cumulativeBelow = last.France + last.Italie + last.Pologne;

        var center = cumulativeBelow + value / 2;

        return (
          '<text x="' + (lastX - 12) + '" y="' + (y(center) + offset).toFixed(1) + '" ' +
          'text-anchor="end" font-size="15" font-weight="700" fill="' + COLORS[name] + '">' +
          name + ' · ' + String(value).replace('.', ',') + ' %' +
          '</text>'
        );
      }

      var last = values[values.length - 1];

      var labels = [
        labelAtLastYear('France', last.France, 4),
        labelAtLastYear('Italie', last.Italie, 4),
        labelAtLastYear('Pologne', last.Pologne, 4)
      ].join('');

      el.innerHTML =
        '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
        'aria-label="Part de la France, de l’Italie et de la Pologne dans le PIB nominal de l’Union européenne, avec le reste de l’Union, en 2005, 2015 et 2025">' +
        '<polygon points="' + restArea + '" fill="' + COLORS.Reste + '"/>' +
        '<polygon points="' + polandArea + '" fill="' + COLORS.Pologne + '"/>' +
        '<polygon points="' + italyArea + '" fill="' + COLORS.Italie + '"/>' +
        '<polygon points="' + franceArea + '" fill="' + COLORS.France + '"/>' +
        separators +
        yearsLabels +
        labels +
        '<text x="' + pad.left + '" y="' + (pad.top + 18) + '" font-size="13" font-weight="700" fill="#68707a">Part du PIB nominal de l’UE27</text>' +
        '</svg>';

      var tk = document.getElementById('part-pib-europe-takeaway');

      if (tk) {
        var p0 = d.premiere_annee;
        var p1 = d.derniere_annee;

        tk.innerHTML =
          'France&nbsp;: ' + String(p0.France).replace('.', ',') + '&nbsp;% → ' +
          String(p1.France).replace('.', ',') + '&nbsp;% du PIB de l’UE (' +
          p0.annee + '-' + p1.annee + '). Italie&nbsp;: ' +
          String(p0.Italie).replace('.', ',') + '&nbsp;% → ' +
          String(p1.Italie).replace('.', ',') + '&nbsp;%. Pologne&nbsp;: ' +
          String(p0.Pologne).replace('.', ',') + '&nbsp;% → ' +
          String(p1.Pologne).replace('.', ',') + '&nbsp;%. ' +
          d.lecture;
      }
    })
    .catch(function (error) {
      console.error(error);
      el.innerHTML =
        '<p style="color:#a3472f;font-size:14px">Le graphique n’a pas pu être chargé.</p>';
    });
})();