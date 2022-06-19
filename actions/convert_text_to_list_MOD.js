module.exports = {
  name: 'Convert Text to List',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.4',
    preciseCheck: false,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle(data) {
    const storeTypes = ['', 'Temp Variable', 'Server Variable', 'Global Variable', 'Command Params'];
    return `Convert Text ${storeTypes[parseInt(data.storage, 10)]} (${data.varName}) to List ${
      storeTypes[parseInt(data.storage2, 10)]
    } (${data.varName2})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'List'];
  },

  fields: ['storage', 'varName', 'separator', 'storage2', 'varName2'],

  html(isEvent, data) {
    return `
<div>
<retrieve-from-variable allowSlashParams dropdownLabel="Variavel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
</div><br><br><br>
<div style="display: table; width: 105%;">
  <div style="display: table-cell;">
  <span class="dbminputlabel">Separator</span>
    <input id="separator" class="round" type="text">
  </div>
</div><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Store in:</span><br>
    <select id="storage2" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div style="float: right; width: 60%;">
  <span class="dbminputlabel">Variable name</span><br>
    <input id="varName2" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.refreshVariableList(document.getElementById('storage'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const text = this.getVariable(storage, varName, cache);
    const separator = this.evalMessage(data.separator, cache);
    const params = text.toString().split(new RegExp(separator));

    const storage2 = parseInt(data.storage2, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(params, storage2, varName2, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
