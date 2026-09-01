// Chapitre 4 - diagnostic multi-indicateurs (tableau). Source : data/diagnostic_multi.json
(function () {
  var el = document.getElementById('diagnostic-multi-table');
  if (!el) return;
  var fr = function (x) { return (x > 0 ? '+' : '') + String(x).replace('.', ','); };
  var fmt = function (i) { var v = i.valeur; if (v === 0) return '0,0'; var niv = /niveau/.test(i.mesure); return ((!niv && v > 0) ? '+' : '') + String(v).replace('.', ','); };
  var lbl = function (p) { var a = p.split('-'); return a[1].replace('Q', 'T') + ' ' + a[0].slice(2); };
  var SIG = { negatif: ['neg', 'négatif'], positif: ['pos', 'positif'], stable: ['stable', 'stable'], inconnu: ['stable', '—'] };
  fetch('data/diagnostic_multi.json').then(function (r) { return r.json(); }).then(function (d) {
    var rows = d.indicateurs.map(function (i) {
      var s = SIG[i.direction] || SIG.stable;
      var val = i.valeur == null ? 'n.d.' : fmt(i) + '&nbsp;' + i.unite;
      return '<tr><td><b>' + i.nom + '</b><br><span style="font-size:.82rem;color:#8c887e">' + i.mesure + ' · ' + lbl(i.periode) + '</span></td>' +
        '<td class="num">' + val + '</td>' +
        '<td><span class="sig ' + s[0] + '">' + s[1] + '</span></td></tr>';
    }).join('');
    el.innerHTML = '<table class="tbl"><thead><tr><th>Indicateur</th><th style="text-align:right">Dernier point</th><th>Signal</th></tr></thead><tbody>' + rows + '</tbody></table>';
    var tk = document.getElementById('diagnostic-takeaway');
    if (tk) tk.innerHTML = '<em>' + d.n_negatifs + ' indicateur sur ' + d.n_total + '</em> est nettement négatif (l\u2019investissement). Le PIB est stable, l\u2019emploi tient, l\u2019utilisation des capacités reste proche de sa moyenne. Aucun signal univoque de récession — c\u2019est bien pour ça qu\u2019on croise les séries.';
  });
})();
