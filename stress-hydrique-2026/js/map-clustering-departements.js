/* Chapitre 7 - carte des typologies departementales issues du clustering exploratoire.
   Leaflet + GeoJSON departemental. Lazy-load. Presente comme exploratoire (CONSIGNES §5.4). */
(function () {
  if (typeof L === 'undefined') return;
  var host = document.getElementById('map-typologie');
  if (!host) return;

  var PALETTE = ['#2f6f73', '#a3472f', '#b5651d', '#4a7a55', '#6a5a8c', '#8c887e'];

  var started = false;
  function init() {
    if (started) return; started = true;
    Promise.all([
      fetch('data/typologie_departements.json').then(function (r) { return r.json(); }),
      fetch('data/departements.geojson').then(function (r) { return r.json(); })
    ]).then(function (res) {
      var data = res[0], geo = res[1];
      var byCode = {};
      data.departements.forEach(function (d) { byCode[d.code_departement] = d; });
      var colorByCluster = {};
      data.clusters.forEach(function (c, i) { colorByCluster[c.cluster] = PALETTE[i % PALETTE.length]; });

      var map = L.map('map-typologie', { scrollWheelZoom: false, attributionControl: false, zoomControl: true });
      L.control.attribution({ prefix: false }).addAttribution('SISPEA \u00b7 Open-Meteo \u00b7 INSEE \u00b7 Fond IGN/Etalab').addTo(map);

      var layer = L.geoJSON(geo, {
        style: function (f) {
          var d = byCode[f.properties.code];
          return { fillColor: d ? colorByCluster[d.cluster] : '#e4ded1', fillOpacity: 0.82, color: '#fdfcf9', weight: 0.8 };
        },
        onEachFeature: function (f, lyr) {
          var d = byCode[f.properties.code];
          var txt = '<div class="ips-tip"><b>' + f.properties.nom + '</b><br>'
            + (d ? 'Typologie : <b>' + d.typologie + '</b>' : 'hors p\u00e9rim\u00e8tre (m\u00e9tropole hors Paris/petite couronne)') + '</div>';
          lyr.bindTooltip(txt, { sticky: true });
          lyr.on('mouseover', function () { lyr.setStyle({ weight: 2.5, color: '#1d1b17' }); });
          lyr.on('mouseout', function () { layer.resetStyle(lyr); });
        }
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [8, 8] });

      var meta = document.getElementById('map-typologie-meta');
      if (meta) meta.textContent = data.n_clusters + ' typologies \u00b7 ' + data.n_departements + ' d\u00e9partements \u00b7 silhouette ' + String(data.silhouette).replace('.', ',');
      var lg = document.getElementById('map-typologie-legend');
      if (lg) lg.innerHTML = data.clusters.map(function (c) {
        return '<span class="sw"><span class="chip" style="background:' + colorByCluster[c.cluster] + '"></span>' + c.nom + ' (' + c.n_departements + ')</span>';
      }).join('');
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { init(); io.disconnect(); } });
    }, { rootMargin: '200px' });
    io.observe(host);
  } else { init(); }
})();
