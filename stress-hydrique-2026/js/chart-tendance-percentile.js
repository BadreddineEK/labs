(function () {
	var target = document.getElementById('tendance-chart');
	if (!target) return;
	fetch('data/tendance_percentile.json').then(function (response) { return response.json(); }).then(function (data) {
		if (!data.stations || !data.stations.length) return;
		var station = data.stations[0];
		var points = data.serie_annuelle.filter(function (point) { return point.bss_id === station.bss_id; });
		if (!points.length) return;
		var width = 640, height = 250, pad = { top: 22, right: 18, bottom: 42, left: 46 };
		var levels = points.map(function (point) { return point.niveau; });
		var min = Math.min.apply(Math, levels), max = Math.max.apply(Math, levels);
		var x = function (index) { return pad.left + index * (width - pad.left - pad.right) / Math.max(points.length - 1, 1); };
		var y = function (value) { return pad.top + (max - value) * (height - pad.top - pad.bottom) / Math.max(max - min, 1); };
		var polyline = points.map(function (point, index) { return x(index).toFixed(1) + ',' + y(point.niveau).toFixed(1); }).join(' ');
		var circles = points.map(function (point, index) { return '<circle cx="' + x(index).toFixed(1) + '" cy="' + y(point.niveau).toFixed(1) + '" r="3.5"/>'; }).join('');
		target.innerHTML = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Evolution annuelle du niveau de la nappe à la station ' + station.bss_id + '">' +
			'<line x1="' + pad.left + '" y1="' + (height - pad.bottom) + '" x2="' + (width - pad.right) + '" y2="' + (height - pad.bottom) + '" stroke="#d3ccbc"/>' +
			'<polyline points="' + polyline + '" fill="none" stroke="#2f6f73" stroke-width="3" stroke-linejoin="round"/>' +
			'<g fill="#2f6f73">' + circles + '</g>' +
			'<text x="' + pad.left + '" y="' + (height - 12) + '" fill="#8c887e" font-size="13">' + points[0].annee + '</text>' +
			'<text x="' + (width - pad.right) + '" y="' + (height - 12) + '" text-anchor="end" fill="#8c887e" font-size="13">' + points[points.length - 1].annee + '</text>' +
			'<text x="' + (width - pad.right) + '" y="24" text-anchor="end" fill="#2f6f73" font-size="14">' + station.departement + ' · ' + station.bss_id + '</text></svg>';
		var summary = document.getElementById('tendance-summary');
		if (summary) {
			var fr = function (x) { return String(x).replace('.', ','); };
			summary.textContent = 'Sur cette station, le test de Mann-Kendall conclut : ' + station.tendance.interpretation + ' (p = ' + fr(station.tendance.p_value.toFixed(2)) + '). Le dernier niveau se situe au ' + fr(station.percentile_actuel.percentile) + 'e percentile de son historique 2000-' + station.annee_fin + '.';
		}
	}).catch(function () {});
})();
