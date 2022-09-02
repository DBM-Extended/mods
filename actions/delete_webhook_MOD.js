module.exports = {
  name: 'Delete Webhook MOD',
  section: 'Webhook Control',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle(data) {
    const names = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];
    return `${names[parseInt(data.webhook, 10)]} - ${data.varName}`;
  },

  fields: ['webhook', 'varName'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div style="float: left; width: 35%;">
<span class="dbminputlabel">Webhook Source</span><br>
  <select id="webhook" class="round" onchange="glob.refreshVariableList(this)">
    ${data.variables[1]}
  </select>
</div>
<div id="varNameContainer" style="float: right; width: 60%;">
<span class="dbminputlabel">Variable Name</span><br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.refreshVariableList(document.getElementById('webhook'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.webhook, 10);
    const varName = this.evalMessage(data.varName, cache);
    const Mods = this.getMods();
    const webhook = Mods.getWebhook(storage, varName, cache);

    if (Array.isArray(webhook)) {
      this.callListFunc(webhook, 'delete', []).then(() => {
        this.callNextAction(cache);
      });
    } else if (webhook && webhook.delete) {
      webhook
        .delete()
        .then((webhook) => {
          this.callNextAction(cache);
        })
        .catch(this.displayError.bind(this, data, cache));
    }
    this.callNextAction(cache);
  },

  mod() {},
};