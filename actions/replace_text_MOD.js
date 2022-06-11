module.exports = {
  name: 'Replace Text',
  section: 'Other Stuff',
  meta: {
    version: '2.1.4',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

  subtitle(data) {
    const info = ['Substitua o primeiro resultado', 'Substitua todos os resultados'];
    return `${info[data.info]} "${data.text2}" por "${data.text3}" de "${data.text}"`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'text2', 'text3', 'info', 'storage', 'varName'],

  html(isEvent, data) {
    return `
    <div style="padding-top: 3px;">
	  Texto original:
		  <textarea id="text" rows="5" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	  </div>
	  <div>
		  <div style="padding-top: 8px; width: 100%;">
		  Substituir:<br>
			  <textarea id="text2" rows="1" class="round" style="width:100%;"></textarea>
		  </div><div style=" padding-top: 8px; width: 100%;">
			  Para isso:<br>
			  <textarea id="text3" rows="1" class="round" style="width:100%"></textarea>
		  </div>
	  </div>
	  <div style="padding-top: 8px; width: 100%;">
	  Modelo:<br>
	  <select id="info" class="round">
		  <option value="0" selected>Substitua o primeiro resultado</option>
		  <option value="1">Substitua todos os resultados</option>
	  </select>
	  </div>
	  <div style="padding-top: 8px;">
		  <div style="float: left; width: 35%;">
		  Armazenar em:<br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
			  Nome da variável:<br>
			  <input id="varName" class="round" type="text">
		  </div>
	  </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const text = this.evalMessage(data.text, cache);
    const oldValue = this.evalMessage(data.text2, cache);
    const newValue = this.evalMessage(data.text3, cache);
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = text.replace(oldValue, newValue);
        break;
      case 1:
        result = text.split(oldValue).join(newValue);
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
