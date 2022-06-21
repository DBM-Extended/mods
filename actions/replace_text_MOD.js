module.exports = {
  name: 'Replace Text',
  section: 'Other Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle(data) {
    const info = ['Replace first result', 'Replace all results'];
    return `${info[data.info]} "${data.text2}" for "${data.text3}" of "${data.text}"`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'text2', 'text3', 'info', 'storage', 'varName'],

  html(isEvent, data) {
    return `
    <div style="padding-top: 3px;">
	  <span class="dbminputlabel">Texto original</span>
		  <textarea id="text" rows="5" placeholder="Insert the text here..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	  </div>
	  <div>
		  <div style="padding-top: 8px; width: 100%;">
		  <span class="dbminputlabel">Replace</span><br>
			  <textarea id="text2" rows="1" class="round" style="width:100%;"></textarea>
		  </div><div style=" padding-top: 8px; width: 100%;">
			  Para isso:<br>
			  <textarea id="text3" rows="1" class="round" style="width:100%"></textarea>
		  </div>
	  </div>
	  <div style="padding-top: 8px; width: 100%;">
	  <span class="dbminputlabel">Model</span><br>
	  <select id="info" class="round">
		  <option value="0" selected>Replace the first result</option>
		  <option value="1">Replace all results</option>
	  </select>
	  </div>
	  <div style="padding-top: 8px;">
		  <div style="float: left; width: 35%;">
		  <span class="dbminputlabel">Store in</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
			  <span class="dbminputlabel">Variable name</span><br>
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
