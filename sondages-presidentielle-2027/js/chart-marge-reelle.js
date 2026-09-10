(function () {
  function quotas() {
    var el = document.getElementById('quotas-visual');
    if (!el) return;
    el.innerHTML = '<svg viewBox="0 0 640 265" role="img" aria-label="Comparaison entre tirage aléatoire et méthode des quotas">' +
      '<rect x="18" y="18" width="286" height="220" rx="8" fill="#eeedf2"/><rect x="336" y="18" width="286" height="220" rx="8" fill="#f3efe7"/>' +
      '<text x="42" y="58" font-size="22" font-weight="700" fill="#6a5a8c">TIRAGE ALÉATOIRE</text><text x="42" y="91" font-size="17" fill="#615d54">Chaque personne a une chance connue</text><text x="42" y="117" font-size="17" fill="#615d54">d’être tirée au sort.</text><circle cx="76" cy="160" r="11" fill="#6a5a8c"/><circle cx="119" cy="160" r="11" fill="#6a5a8c"/><circle cx="162" cy="160" r="11" fill="#6a5a8c"/><circle cx="205" cy="160" r="11" fill="#6a5a8c"/><text x="42" y="207" font-size="17" font-weight="700" fill="#6a5a8c">Marge classique calculable</text>' +
      '<text x="360" y="58" font-size="22" font-weight="700" fill="#a3472f">QUOTAS</text><text x="360" y="91" font-size="17" fill="#615d54">On compose un échantillon qui</text><text x="360" y="117" font-size="17" fill="#615d54">ressemble à la population sur</text><text x="360" y="143" font-size="17" fill="#615d54">quelques critères connus.</text><rect x="360" y="164" width="60" height="25" rx="4" fill="#a3472f"/><rect x="430" y="164" width="60" height="25" rx="4" fill="#6a5a8c"/><rect x="500" y="164" width="60" height="25" rx="4" fill="#3f6f4a"/><text x="360" y="215" font-size="17" font-weight="700" fill="#a3472f">Sélection individuelle inconnue</text></svg>';
  }
  function marge() {
    var el = document.getElementById('chart-marge');
    if (!el) return;
    var center = 330, scale = function (v) { return center + v * 35; };
    el.innerHTML = '<svg viewBox="0 0 640 230" role="img" aria-label="Marge d’échantillonnage théorique selon la taille de l’échantillon">' +
      '<text x="30" y="50" font-size="19" font-weight="700" fill="#1d1b17">n = 1 000, proportion proche de 50 %</text><line x1="70" y1="95" x2="590" y2="95" stroke="#d3ccbc" stroke-width="4" stroke-linecap="round"/><line x1="' + scale(-3) + '" y1="95" x2="' + scale(3) + '" y2="95" stroke="#6a5a8c" stroke-width="14" stroke-linecap="round"/><circle cx="330" cy="95" r="8" fill="#6a5a8c"/><text x="330" y="82" text-anchor="middle" font-size="18" fill="#6a5a8c">estimation</text><text x="' + scale(-3) + '" y="126" text-anchor="middle" font-size="18" fill="#6a5a8c">−3 pts</text><text x="' + scale(3) + '" y="126" text-anchor="middle" font-size="18" fill="#6a5a8c">+3 pts</text><text x="30" y="176" font-size="18" fill="#615d54">Intervalle théorique à 95 %, uniquement si l’échantillon est tiré au hasard.</text><text x="30" y="204" font-size="18" fill="#615d54">Il ne mesure pas les biais de recrutement, de réponse ou de redressement.</text></svg>';
  }
  function casReel() {
    var el = document.getElementById('chart-cas-reel');
    if (!el) return;
    var rows = [
      ['Institut déclaré', 'non', '#a3472f'], ['Notice déposée', 'non', '#a3472f'],
      ['Échantillon conforme aux quotas annoncés', 'écarts relevés', '#a3472f'], ['Redressement', 'absent', '#a3472f'],
      ['Ordre des questions', 'susceptible d’orienter', '#a3472f']
    ];
    el.innerHTML = '<svg viewBox="0 0 640 320" role="img" aria-label="Cinq manquements relevés par la Commission des sondages dans une enquête FranceSoir de 2026">' +
      '<text x="22" y="31" font-size="19" font-weight="700" fill="#1d1b17">Mise au point officielle, 10 juillet 2026</text>' + rows.map(function (r, i) { var y = 54 + i * 48; return '<text x="24" y="' + (y + 25) + '" font-size="18" fill="#1d1b17">' + r[0] + '</text><rect x="390" y="' + y + '" width="220" height="34" rx="17" fill="#f2e2d9"/><text x="500" y="' + (y + 23) + '" text-anchor="middle" font-size="17" font-weight="700" fill="' + r[2] + '">' + r[1] + '</text>'; }).join('') + '<text x="24" y="308" font-size="16" fill="#615d54">Source : Commission des sondages, enquête présidentielle publiée par FranceSoir.</text></svg>';
  }
  function notice() {
    var el = document.getElementById('notice-visual');
    if (!el) return;
    var cards = [['1', 'Qui commande ?', 'institut, média, financeur'], ['2', 'Qui répond ?', 'taille, dates, recueil'], ['3', 'Quelle question ?', 'texte exact et ordre'], ['4', 'Comment corrige-t-on ?', 'quotas et redressement']];
    el.innerHTML = '<svg viewBox="0 0 640 310" role="img" aria-label="Les quatre éléments à lire dans la notice d’un sondage">' +
      cards.map(function (c, i) { var x = 20 + (i % 2) * 308, y = 18 + Math.floor(i / 2) * 132; return '<rect x="' + x + '" y="' + y + '" width="292" height="112" rx="8" fill="#eeedf2"/><circle cx="' + (x + 31) + '" cy="' + (y + 32) + '" r="18" fill="#6a5a8c"/><text x="' + (x + 31) + '" y="' + (y + 39) + '" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">' + c[0] + '</text><text x="' + (x + 62) + '" y="' + (y + 30) + '" font-size="18" font-weight="700" fill="#1d1b17">' + c[1] + '</text><text x="' + (x + 62) + '" y="' + (y + 62) + '" font-size="16" fill="#615d54">' + c[2] + '</text>'; }).join('') + '<text x="20" y="292" font-size="15" fill="#615d54">La notice aide à poser les bonnes questions.</text></svg>';
  }
  quotas(); marge(); casReel(); notice();
})();
