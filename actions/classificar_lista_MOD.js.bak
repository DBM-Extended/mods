module.exports = {

	name: "Classificar lista",
	section: "Lists and Loops",
	short_description: "Classifica uma lista",
	meta: {
		version: '2.1.4',
		preciseCheck: false,
		author: '[XinXyla - 172782058396057602]',
		authorUrl: 'https://github.com/DBM-Brazil/mods',
		downloadURL: 'https://github.com/DBM-Brazil/mods',
	  },
	
	subtitle: function(data) {
		const list = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global'];
		const classic = ['Ordem crescente [0-9]','Ordem decrescente [9-0]','Ordem alfabética [A-Z]','Ordem alfabética reversa [Z-A]','Comprimento [ordem crescente]','Comprimento [ordem decrescente]'];
		return `(${classic[parseInt(data.sorte)]}) ${list[parseInt(data.list)]} (${data.varName}) para ${list[parseInt(data.storage)]} (${data.varName2})`;
	},
	
	
	variableStorage(data, varType) {
		if (parseInt(data.storage, 10) !== varType) return;
		return [data.varName2, 'List'];
	  },
	
	
	fields: ["list", "varName", "storage", "varName2", "sorte"],
	
	html: function(isEvent, data) {
		return `
	
	<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Fonte da Lista:</span><br>
			<select id="list" class="round" onchange="glob.refreshVariableList(this)">
				${data.variables[1]}
			</select><br>
		</div>
		<div id="varNameContainer" style=" float: right; width: 60%;">
		<span class="dbminputlabel">Nome da variável:</span><br>
			<input id="varName" class="round" type="text" list="variableList"><br>
		</div><br><br><br>
		<div style=" float: right; width: 100%;">
		<span class="dbminputlabel">Classificar lista:</span><br>
			<select id="sorte" class="round" style="width: 100%;">
			<option value="0" selected>Ordenar números ordem crescente [0-9]</option>
			<option value="1">Ordenar números ordem decrescente [9-0]</option>
				<option value="2">Classificar por ordem alfabética [A-Z]</option>
				<option value="3">Classificar por ordem alfabética reversa [Z-A]</option>
				<option value="4">Classificar por comprimento [ordem crescente]</option>
				<option value="5">Classificar por comprimento [ordem decrescente]</option>
			</select>
		</div>
	</div><br><br><br><br>
	<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Armazenar em:</span><br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer2" style="float: right; width: 60%;">
		<span class="dbminputlabel">Nome da Variável:</span><br>
			<input id="varName2" class="round" type="text">
		</div>
	</div>`
	},
	
	init: function() {
		const {glob, document} = this;
	
		glob.refreshVariableList(document.getElementById('list'));
	
	},
	
	  action: function(cache) {
		const data = cache.actions[cache.index];
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		const list = this.getVariable(storage, varName, cache);
		const sorte = parseInt(data.sorte);

    let result;
	

		switch(sorte) {
			case 0:
				result = list.sort((a ,b)=> a - b);
				break;
			case 1:
				result = list.sort((a ,b)=> b - a);
				break;
			case 2:
				result = list.sort();
				break;				
			case 3:
				result = list.sort().reverse();
				break;
			case 4:
				result = list.sort(function(a, b){return a.length - b.length});
				break;
			case 5:
				result = list.sort(function(a, b){return b.length - a.length});
				break;
		}
		
		if (result !== undefined) {
			const storage = parseInt(data.storage, 10);
			const varName2 = this.evalMessage(data.varName2, cache);
			this.storeValue(result, storage, varName2, cache);
		}
	
		this.callNextAction(cache);
	},
	
		mod() {},
};
