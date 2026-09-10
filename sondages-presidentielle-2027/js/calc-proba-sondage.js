(function () {
  var population = 53000000;
  var input = document.getElementById('sample-size');
  var label = document.getElementById('sample-label');
  var result = document.getElementById('proba-result');
  if (!input || !label || !result) return;
  function format(n) { return new Intl.NumberFormat('fr-FR').format(n); }
  function render() {
    var sample = Number(input.value);
    label.textContent = format(sample);
    result.innerHTML = 'Avec <strong>' + format(sample) + ' personnes</strong>, cela représente environ <strong>1 adulte sur ' + format(Math.round(population / sample)) + '</strong>, soit <strong>' + (sample / population * 100).toFixed(4).replace('.', ',') + '&nbsp;%</strong> de la population adulte.';
  }
  input.addEventListener('input', render);
  render();
})();
