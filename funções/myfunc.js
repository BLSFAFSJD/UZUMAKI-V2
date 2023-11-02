exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " DIA, " : " DIAS, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " HORA, " : " HORAS, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " MINUTO, " : " MINUTOS, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " SEGUNDO" : " SEGUNDOS") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

let file = require.resolve(__filename)
	delete require.cache[file]