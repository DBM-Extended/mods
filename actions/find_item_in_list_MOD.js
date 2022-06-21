module.exports = {
  name: 'Find Item in List',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.5',
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
    return `Buscar "${data.item}" em ${list[parseInt(data.list, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'Number'];
  },

  fields: ['list', 'varName', 'item', 'storage', 'varName2'],

  html(isEvent, data) {
    return `
<div style="float: left; width: 35%;">
  Fonte da lista:<br>
  <select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
    ${data.lists[isEvent ? 1 : 0]}
  </select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
  Nome da variavel:<br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>
</div><br><br><br>
<div style="padding-top: 8px;">
  Buscar item:<br>
  <textarea id="item" rows="4" placeholder="Insira uma variável ou algum texto. Esses '' não são necessários!" style="width: 100%; font-family: monospace; white-space: nowrap;"></textarea>
</div><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
    Armazenar em:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%;">
    Nome da variavel:<br>
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
    const item = this.evalMessage(data.item, cache);

    const result = list.findIndex((i) => i === item);

    if (result !== undefined) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage2 = parseInt(data.storage, 10);
      this.storeValue(result, storage2, varName2, cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
