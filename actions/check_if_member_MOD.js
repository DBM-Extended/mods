module.exports = {
  name: 'Check If Member MOD',
  section: 'Conditions',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

    subtitle(data, presets) {
      const info = [
        "Is Bot?",
        "Is Bannable?",
        "Is Kickable?",
        "",
        "Is In Voice Channel?",
        "Is User Manageable?",
        "Is Bot Owner?",
        "Is Muted?",
        "Is Deafened?",
        "Is Command Author?",
        "Is Current Server Owner?",
        "Is In AFK Channel?",
        "Boosted the server?",
        "Is User?",
      ];
      return `${info[parseInt(data.info, 10)]} > ${presets.getConditionsText(data)}`;
    },

  fields: ['member', 'varName', 'info', 'varName2', "comparison", "branch"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div>
<member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
</div><br><br><br><br>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Check if member</span><br>
    <select id="info" class="round">
      <option value="0" selected>Is Bot?</option>
      <option value="13">Is User?</option>
      <option value="1">Is Bannable?</option>
      <option value="2">Is Kickable?</option>
      <option value="4">Is In Voice Channel?</option>
      <option value="5">Is User Manageable?</option>
      <option value="6">Is Bot Owner?</option>
      <option value="7">Is Muted?</option>
      <option value="8">Is Deafened?</option>
      ${!isEvent && '<option value="9">Is Command Author?</option>'}
      ${!isEvent && '<option value="10">Is Current Server Owner?</option>'}
      <option value="11">Is In AFK Channel?</option>
      <option value="12">Boosted the server?</option>
    </select>
  </div>
</div><br><br><br><br>
<hr class="subtlebar"><br>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.member, 10);
    const varName = this.evalMessage(data.varName, cache);
    const member = await this.getMember(type, varName, cache);
    const autor = await this.getMember(1, varName, cache);
    const targetServer = await this.getServerFromData(0, data.varName, cache);
    const info = parseInt(data.info, 10);
    const { Files } = this.getDBM();
    
    if (!member) {
      console.error('You need to provide a member of some kind for the "Check If Member" action');
      return this.executeResults(false, data, cache);
    }

    let result = false;
    switch (info) {
      case 0:
        result = member.user?.bot || member.bot;
        break;
      case 1:
        result = member.bannable;
        break;
      case 2:
        result = member.kickable;
        break;
      case 4:
        result = Boolean(member.voice?.channel);
        break;
      case 5:
        result = member.manageable;
        break;
      case 6: {
        const fs = require('fs');
        const filePath = require('path').join(__dirname, '../data', 'multiple_bot_owners.json');
        if (!fs.existsSync(filePath)) {
          result = member.id === Files.data.settings.ownerId;
        } else {
          result =
            JSON.parse(fs.readFileSync(filePath, 'utf8')).includes(member.id) ||
            member.id === Files.data.settings.ownerId;
        }
        break;
      }
      case 7:
        result = Boolean(member.voice?.mute);
        break;
      case 8:
        result = Boolean(member.voice?.deaf);
        break;
      case 9:
        result = member.id === autor.id;
        break;
      case 10:
        result = member.id === targetServer.ownerId;
        break;
      case 11:
        result = member.voice?.channel === targetServer.afkChannel;
        break;
      case 12:
        result = Boolean(member.premiumSinceTimestamp);
        break;
        case 13:
          if(member.user?.bot || member.bot){result = false}else{result = true}
          break;
      default:
        console.log('Check your "Check if member MOD" action! There is something wrong...');
        break;
    }
    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
