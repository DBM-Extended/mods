module.exports = {

  name: "Desconectar membro",
  section: "Other Stuff",
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

    fields: ["member", "varName", "reason"],



  html(isEvent, data) {
    return `
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Razão</span><br>
	<textarea id="reason" class="dbm_monospace" rows="5" placeholder="Insira a sua razão aqui..." style="white-space: nowrap; resize: none;"></textarea>
</div>`;
  },

  init() {},


  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    const reason = this.evalMessage(data.reason, cache);
    if (Array.isArray(member)) {
      this.callListFunc(member.voice.disconnect, [reason]).then(() => this.callNextAction(cache));
    } else if (member?.voice) {
      member
        .voice.disconnect(reason)
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },


  mod() {},
};
