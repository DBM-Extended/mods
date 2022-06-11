module.exports = {


name: "Get String Length",
section: "Other Stuff",
meta: {
	version: '2.1.4',
	preciseCheck: false,
	author: '[XinXyla - 172782058396057602]',
	authorUrl: 'https://github.com/DBM-Brazil/mods',
	downloadURL: 'https://github.com/DBM-Brazil/mods',
  },


subtitle: function(data) {
	return `${data.girdi || "None"}`;
},


variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName, 'Number']);
},



fields: ["storage", "varName", "girdi"],


html: function(isEvent, data) {
	return `
<div>

    <br>

	<div>
		Texto:<br>
		<textarea id="girdi" class="round" rows="5" cols="60"></textarea>
	</div>

	<br>

    <div>
		<div style="float: left; width: 35%;">
			Armazenar em:<br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer" style="float: right; width: 60%;">
			Nome da Variavel:<br>
			<input id="varName" class="round" type="text">
		</div>
	 </div>

	</div>`
},

init: function() {
},


action: function(cache) {
	const data = cache.actions[cache.index];
	const type = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const girdi = this.evalMessage(data.girdi, cache);
	const storage = this.getVariable(type, varName, cache);

	this.storeValue(girdi.length, type, varName, cache);
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
