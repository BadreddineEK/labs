(function () {
  var host = document.getElementById('table-instituts-container');
  if (!host) return;
  fetch('data/instituts_2027.json').then(function (r) { return r.json(); }).then(function (data) {
    var rows = data.instituts.map(function (i) {
      return '<tr><td><strong>' + i.nom + '</strong><br><span style="font-size:.82em;color:#8c887e">fondé ' + i.fonde + '</span></td><td>' + i.methode + '</td><td>' + i.echantillon + '</td><td>' + i.partenaires.join(', ') + '</td></tr>';
    }).join('');
    host.innerHTML = '<table class="tbl"><thead><tr><th>Institut</th><th>Mode indiqué</th><th>Échantillon courant</th><th>Partenaires cités</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }).catch(function () {
    host.textContent = 'Le tableau n’a pas pu être chargé.';
  });
})();
