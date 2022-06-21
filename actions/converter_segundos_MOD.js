module.exports = {
name: "Converter segundos em A/D/H/M/S",
section: "Other Stuff",
meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
	short_description: "Converter segundos em anos, meses, dias, horas, minutos e segundos.",
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

subtitle: function(data) {
return `Convert ${data.time}`;
},

variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		return ([data.varName, 'Date']);
	},


fields: ["time", "storage", "varName"],

html: function(isEvent, data) {
	return `
	<div style="float: left; width: 95%; padding-top: 9px;">
		<p>Feito por XinXyla: Converter segundos em anos, dias, horas, minutos e segundos.</p>
	</div>
	<br><br>
	<div style="float: left; width: 70%; padding-top: 8px;">
		Converter segundos:
		<input id="time" class="round" type="text" placeholder="1522672056 ou use variáveis">
	</div>
	<div style="float: left; width: 35%; padding-top: 8px;">
		Resultado em:<br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
		Nome da Variável:<br>
		<input id="varName" class="round" type="text">
	</div><br><br>
	<div style=" float: left; width: 88%; padding-top: 8px;">
		<br>
	</div>`;
},

init: function() {
	const {glob, document} = this;

	glob.variableChange(document.getElementById('storage'), 'varNameContainer');
},

action: function(cache) {

	const data = cache.actions[cache.index];
	const time = this.evalMessage(data.time, cache);
	var   _this = this;
	
	let d, h, m, s;
	let result;

	if (isNaN(time)) {
		result.toString() = "Data invalida";
		console.log('Por favor insira um número');
	}
	else {

	   s = time;

		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		a = Math.floor(time / 60 / 60 / 24 / 365.242214);
		mes = Math.floor(time / 60 / 60 / 24 / 30.43685116666667 - (a * 12));
		d = Math.floor(h / 24 - (a * 365.242214) - (30.43685116666667 * mes));
		h = h % 24;


		result = (a > 1 ? ''+ a + ' anos ' : '') + (a == 1 ? ''+ a + ' ano ' : '') + (mes > 1 ? ''+ mes + ' meses ' : '') + (mes == 1 ? ''+ mes + ' mês ' : '') + (d > 1 ? d + ' dias ' : '') + (d == 1 ? ''+ d + ' dia ' : '') + (h > 1 ? h + ' horas ' : '') + (h == 1 ? ''+ h + ' hora ' : '') + (m > 0 ? m + ' min ' : '') + (s > 0 ? s + ' seg ' : '');

	}
	
	if (result.toString() === "Data invalida") result = undefined;

    // Storage.
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
    this.callNextAction(cache);
},

mod: function(DBM) {
}

};
