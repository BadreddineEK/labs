(function () {
	var target = document.getElementById('tendance-chart');
	if (!target) return;
	fetch('data/tendance_percentile.json').then(function (response) { return response.json(); }).then(function (data) {
		if (!data.stations || !data.stations.length) return;
		var fr = function (x) { return String(x).replace('.', ','); };

		// Repartition honnete sur TOUT l'echantillon (pas de cherry-picking).
		var baisse = 0, hausse = 0, stable = 0;
		data.stations.forEach(function (s) {
			var t = s.tendance;
			if (t.trend === 'decreasing' && t.h) baisse++;
			else if (t.trend === 'increasing' && t.h) hausse++;
			else stable++;
		});

		// Station illustrative = la plus longue serie (tie-break : plus de points).
		var pointsByStation = {};
		data.serie_annuelle.forEach(function (p) { (pointsByStation[p.bss_id] = pointsByStation[p.bss_id] || []).push(p); });
		var station = data.stations.slice().sort(function (a, b) {
			var sa = a.annee_fin - a.annee_debut, sb = b.annee_fin - b.annee_debut;
			if (sb !== sa) return sb - sa;
			return (pointsByStation[b.bss_id] || []).length - (pointsByStation[a.bss_id] || []).length;
		})[0];
		var points = (pointsByStation[station.bss_id] || []).slice().sort(function (a, b) { return a.annee - b.annee; });
		if (!points.length) return;

		var width = 640, height = 250, pad = { top: 22, right: 18, bottom: 42, left: 46 };
		var levels = points.map(function (point) { return point.niveau; });
		var min = Math.min.apply(Math, levels), max = Math.max.apply(Math, levels);
		var x = function (index) { return pad.left + index * (width - pad.left - pad.right) / Math.max(points.length - 1, 1); };
		var y = function (value) { return pad.top + (max - value) * (height - pad.top - pad.bottom) / Math.max(max - min, 1); };
		var polyline = points.map(function (point, index) { return x(index).toFixed(1) + ',' + y(point.niveau).toFixed(1); }).join(' ');
		var circles = points.map(function (point, index) { return '<circle cx="' + x(index).toFixed(1) + '" cy="' + y(point.niveau).toFixed(1) + '" r="3.5"/>'; }).join('');
		target.innerHTML = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Exemple : évolution annuelle du niveau de la nappe à la station ' + station.bss_id + '">' +
			'<line x1="' + pad.left + '" y1="' + (height - pad.bottom) + '" x2="' + (width - pad.right) + '" y2="' + (height - pad.bottom) + '" stroke="#d3ccbc"/>' +
			'<polyline points="' + polyline + '" fill="none" stroke="#2f6f73" stroke-width="3" stroke-linejoin="round"/>' +
			'<g fill="#2f6f73">' + circles + '</g>' +
			'<text x="' + pad.left + '" y="' + (height - 12) + '" fill="#8c887e" font-size="13">' + points[0].annee + '</text>' +
			'<text x="' + (width - pad.right) + '" y="' + (height - 12) + '" text-anchor="end" fill="#8c887e" font-size="13">' + points[points.length - 1].annee + '</text>' +
			'<text x="' + (width - pad.right) + '" y="24" text-anchor="end" fill="#2f6f73" font-size="14">exemple · ' + station.departement + '</text></svg>';

		var summary = document.getElementById('tendance-summary');
		if (summary) {
			var n = data.stations.length;
			var parts = [];
			if (baisse) parts.push(baisse + (baisse > 1 ? ' baissent' : ' baisse') + ' significativement');
			if (hausse) parts.push(hausse + (hausse > 1 ? ' montent' : ' monte'));
			if (stable) parts.push(stable + (stable > 1 ? ' sont stables' : ' est stable'));
			summary.textContent = 'Sur les ' + n + ' longues séries que j\u2019ai pu constituer, les tendances divergent : ' +
				parts.join(', ') + '. Pas de signal unique, donc pas de « collapse » généralisé à cette échelle. '
				+ 'L\u2019exemple ci-dessus (' + station.departement + ') situe son niveau récent au ' + fr(station.percentile_actuel.percentile) + 'e percentile de son historique.';
		}
	}).catch(function () {});
})();
