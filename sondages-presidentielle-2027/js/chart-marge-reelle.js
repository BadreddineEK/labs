(function () {
  function svgMarge() {
    var el = document.getElementById('chart-marge');
    if (!el) return;
    var W = 640, H = 230, x0 = 70, x1 = 590, center = 330;
    var scale = function (v) { return center + v * 35; };
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Marge d’échantillonnage théorique selon la taille de l’échantillon">' +
      '<text x="30" y="50" font-size="19" font-weight="700" fill="#1d1b17">n = 1 000, proportion proche de 50 %</text>' +
      '<line x1="' + x0 + '" y1="95" x2="' + x1 + '" y2="95" stroke="#d3ccbc" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="' + scale(-3) + '" y1="95" x2="' + scale(3) + '" y2="95" stroke="#6a5a8c" stroke-width="14" stroke-linecap="round"/>' +
      '<circle cx="' + center + '" cy="95" r="8" fill="#6a5a8c"/><text x="' + center + '" y="82" text-anchor="middle" font-size="18" fill="#6a5a8c">estimation</text>' +
      '<text x="' + scale(-3) + '" y="126" text-anchor="middle" font-size="18" fill="#6a5a8c">−3 pts</text><text x="' + scale(3) + '" y="126" text-anchor="middle" font-size="18" fill="#6a5a8c">+3 pts</text>' +
      '<text x="30" y="176" font-size="18" fill="#615d54">Intervalle théorique à 95 %, uniquement si l’échantillon est tiré au hasard.</text><text x="30" y="204" font-size="18" fill="#615d54">Il ne mesure pas les biais de recrutement ou de redressement.</text></svg>';
  }
  function svg2022() {
    var el = document.getElementById('chart-marge-reelle');
    if (!el) return;
    el.innerHTML = '<svg viewBox="0 0 640 210" role="img" aria-label="Comparaison pédagogique entre marge affichée et écarts observés en 2022">' +
      '<text x="30" y="44" font-size="20" font-weight="700" fill="#1d1b17">Marge théorique affichée</text><rect x="300" y="22" width="140" height="30" rx="6" fill="#6a5a8c"/><text x="455" y="45" font-size="20" font-weight="700" fill="#6a5a8c">± 1,8 à 2 pts</text>' +
      '<text x="30" y="110" font-size="20" font-weight="700" fill="#1d1b17">Écarts observés selon les cas</text><rect x="300" y="88" width="290" height="30" rx="6" fill="#a3472f"/><text x="455" y="111" font-size="20" font-weight="700" fill="#a3472f">4 à 6 pts</text>' +
      '<text x="30" y="168" font-size="17" fill="#615d54">Ce n’est pas une comparaison candidat par candidat : elle illustre</text><text x="30" y="193" font-size="17" fill="#615d54">que l’incertitude réelle dépasse la seule variance d’échantillonnage.</text></svg>';
  }
  function svgSieges() {
    var el = document.getElementById('sieges-visual');
    if (!el) return;
    el.innerHTML = '<svg viewBox="0 0 640 210" role="img" aria-label="Projection de sièges 2024 et résultat réel">' +
      '<text x="35" y="45" font-size="20" font-weight="700" fill="#1d1b17">Projection nationale de sièges</text><rect x="320" y="25" width="230" height="30" rx="6" fill="#6a5a8c"/><text x="565" y="48" font-size="20" font-weight="700" fill="#6a5a8c">170–230</text>' +
      '<text x="35" y="112" font-size="20" font-weight="700" fill="#1d1b17">Résultat final</text><rect x="320" y="92" width="143" height="30" rx="6" fill="#a3472f"/><text x="478" y="115" font-size="20" font-weight="700" fill="#a3472f">143</text>' +
      '<text x="35" y="170" font-size="17" fill="#615d54">Les 577 circonscriptions ajoutent désistements, duels, triangulaires</text><text x="35" y="194" font-size="17" fill="#615d54">et participation locale : une projection n’est pas un sondage.</text></svg>';
  }
  svgMarge(); svg2022(); svgSieges();
})();
