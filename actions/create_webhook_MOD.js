module.exports = {
  name: 'Create Webhook MOD',
  section: 'Webhook Control',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle(data) {
    return `${data.webhookName}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage2, 10) !== varType) return;
    return [data.varName2, 'Webhook'];
  },

  fields: ['webhookName', 'webhookIcon', 'storage', 'varName', 'storage2', 'varName2'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div style="width: 90%;">
<span class="dbminputlabel">Webhook Name</span><br>
  <input id="webhookName" class="round" type="text">
</div><br>
<div style="width: 90%;">
<span class="dbminputlabel">Webhook Icon URL</span><br>
  <input id="webhookIcon" class="round" type="text">
</div><br>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Source Channel</span><br>
    <select id="storage" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
      ${data.channels[0]}
    </select>
  </div>
  <div id="varNameContainer" style="display: none; float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Store in</span><br>
    <select id="storage2" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer2" style="display: none; float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName2" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;

    glob.channelChange(document.getElementById('storage'), 'varNameContainer');
    glob.variableChange(document.getElementById('storage2'), 'varNameContainer2');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const channel = await this.getChannel(storage, varName, cache);

    if (!channel && !channel.createWebhook) return this.callNextAction(cache);

    const avatar = this.evalMessage(data.webhookIcon, cache);
    const name = this.evalMessage(data.webhookName, cache);
    channel
      .createWebhook(name, { avatar })
      .then((webhook) => {
        const storage2 = parseInt(data.storage2, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        this.storeValue(webhook, storage2, varName2, cache);
        this.callNextAction(cache);
      })
      .catch(this.displayError.bind(this, data, cache));
  },

  mod() {},
};
