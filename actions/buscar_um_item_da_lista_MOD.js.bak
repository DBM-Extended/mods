module.exports = {
  name: 'Buscar um item da lista',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.4',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data) {
    const list = [
      'Server Members',
      'Server Channels',
      'Server Roles',
      'Server Emojis',
      'All Bot Servers',
      'Mentioned User Roles',
      'Command Author Roles',
      'Temp Variable',
      'Server Variable',
      'Global Variable',
    ];
    const info = ['exatamente igual a', 'inclua', 'matches regex','menor que', 'menor ou igual a', 'maior que', 'maior ou igual a', 'comprimento maior que', 'comprimento menor que', 'comprimento igual a', 'começa com', 'termina com'];
     return `Buscar ${info[parseInt(data.buscadoxin)]} "${data.item}" em "${data.varName}"`;
  },

  variableStorage(data, varType) {
    const prse2 = parseInt(data.buscadoxin);
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'Number'[prse2]];
  },

  fields: ['list', 'varName', 'buscadoxin', 'item', 'storage', 'varName2'],

  html(isEvent, data) {
    return `
<div style="float: left; width: 35%;">
<span class="dbminputlabel">Fonte da lista:</span><br>
  <select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
    ${data.lists[isEvent ? 1 : 0]}
  </select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
<span class="dbminputlabel">Nome da variavel:</span><br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>
</div><br><br><br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Buscar:</span><br>
			<select id="buscadoxin" class="round">
				<option value="0" selected>Exatamente igual a</option>
				<option value="1">Que inclua</option>
        <option value="2">Matches Regex</option>
        <option value="7">O comprimento é maior que</option>
        <option value="8">O comprimento é menor que</option>
        <option value="9">O comprimento e igual a</option>
        <option value="10">Começa com</option>
        <option value="11">Termina com</option>
        <option value="3">Menor que [Requer somente números na lista]</option>
        <option value="4">Menor ou igual a [Requer somente números na lista]</option>
        <option value="5">Maior que [Requer somente números na lista]</option>
        <option value="6">Maior ou igual a [Requer somente números na lista]</option>
			</select>
		</div>
<div style="padding-top: 8px;">
    <textarea id="item" rows="4" placeholder="Insira uma variável ou algum texto. Esses '' não são necessários!" style="width: 100%; font-family: monospace; white-space: nowrap;"></textarea>
</div><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em:</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da variavel:</span><br>
    <input id="varName2" class="round" type="text">
  </div>
</div><br><br><br>
<div><p>Esta ação procura um item em uma lista e retorna a posição.<br>
Observe que toda lista em JavaScript começa em 0<br>
Caso não encontre retornará sempre -1</p></div>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChange1 = function onChange1(event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById('positionHolder');
      if (value < 3) {
        dom.style.display = 'none';
      } else {
        dom.style.display = null;
      }
    };

    glob.listChange(document.getElementById('list'), 'varNameContainer');
  },

  async action(cache) {
        const data = cache.actions[cache.index];
    const storage = parseInt(data.list, 10);
    const varName = this.evalMessage(data.varName, cache);
    const list = await this.getList(storage, varName, cache);
    const buscadoxin = parseInt(data.buscadoxin);
    const item = this.evalMessage(data.item, cache);

    let result;
    
		switch (buscadoxin) {
			case 0:
				result = list.findIndex((i) => i === item);
				break;
			case 1:
				result = list.findIndex((i) => i.includes(item));
				break;
			case 2:
				result = list.findIndex((i) => Boolean(i.match(new RegExp('^' + item + '$', 'i'))));
				break;
      case 3:
        result = list.findIndex((i) => i < item);
        break;
      case 4:
        result = list.findIndex((i) => i <= item);
        break;
      case 5:
        result = list.findIndex((i) => i > item);
        break;
      case 6:
        result = list.findIndex((i) => i >= item);
        break;
      case 7:
        result = list.findIndex((i) => Boolean(i.length > item));
        break;
      case 8:
        result = list.findIndex((i) => Boolean(i.length < item));
        break;
      case 9:
        result = list.findIndex((i) => Boolean(i.length == item));
        break;
      case 10:
        result = list.findIndex((i) => i.startsWith(item));
        break;
      case 11:
        result = list.findIndex((i) => i.endsWith(item));
        break;
		}
    

    if (result !== undefined) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage2 = parseInt(data.storage, 10);
      this.storeValue(result, storage2, varName2, cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
