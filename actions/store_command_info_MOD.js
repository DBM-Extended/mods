module.exports = {
  name: 'Store Command Info MOD',
  section: 'Bot Client Control',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle(data) {
    const info = [
      'Command Name',
      'Command ID',
      'Command Type',
      'Command Restriction',
      'Primary Permission Required',
      'Command Aliases',
      'Command Time Restriction',
      'Command Actions Total',
      'Secondary Permission required', 
	  'Command Aliases',
      'Command Description',
      'Command Parameters',
    ];
    const storage = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];
    return `${info[parseInt(data.info, 10)]} - ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = 'Text';
        break;
      case 1:
        dataType = 'Text';
        break;
      case 2:
        dataType = 'Text';
        break;
      case 3:
        dataType = 'Text';
        break;
      case 4:
        dataType = 'Text';
        break;
      case 5:
        dataType = 'List';
        break;
      case 6:
        dataType = 'Number';
        break;
      case 7:
        dataType = 'Number';
        break;
        case 8:
        dataType = 'Number';
        break;
        case 9:
          dataType = 'Text';
          break;
          case 10:
            dataType = 'List';
            break;
        break;
      default:
        break;
    }
    return [data.varName, dataType];
  },

  fields: ['searchCommandBy', 'valueToSearch', 'info', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>

<div style="float: left; width: 44%">
<span class="dbminputlabel">Search command</span><br>
  <select id="searchCommandBy" class="round" onchange="glob.onChangeSame(this)">
  <option value="2" selected>Same command by text</option>
  <option value="3">Same interaction command</option>
    <option value="0">Name</option>
    <option value="1">ID</option>
  </select>
</div>
<div id="vtsContainer" style="display: none; float: right; width: 55%">
<span class="dbminputlabel">Search</span><br>
  <input id="valueToSearch" type="text" class="round">
</div><br><br><br>
<div style="float: left; width: 100%; padding-top: 8px">
<span class="dbminputlabel">Information</span><br>
  <select id="info" class="round">
  <option value="0" selected>Command Name</option>
  <option value="1">Command ID</option>
  <option value="2">Command Type</option>
  <option value="3">Command Restriction</option>
  <option value="4">Primary Permission Required</option>
  <option value="8">Secondary Permission Required</option>
  <option value="5">Command Aliases</option>
  <option value="6">Command Time Constraint</option>
  <option value="7">Number Of Command Actions</option>
  <option value="9">Command Description</option>
  <option value="10">Command Parameters</option>
  </select>
</div><br><br><br>
<div style="float: left; width: 35%; padding-top: 12px">
<span class="dbminputlabel">Store in</span><br>
  <select id="storage" class="round">
    ${data.variables[1]}
  </select>
</div>
<div id="varNameContainer" style="float: right; width: 60%; padding-top: 12px">
<span class="dbminputlabel">Variable Name</span><br>
  <input id="varName" class="round" type="text">
</div>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChangeSame = function onChangeSame(searchCommandBy) {
      if (parseInt(searchCommandBy.value, 10) === 2 || parseInt(searchCommandBy.value, 10) === 3) {
        document.getElementById('vtsContainer').style.display = 'none';
      } else {
        document.getElementById('vtsContainer').style.display = null;
      }
    };

    glob.onChangeSame(document.getElementById('searchCommandBy'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const jp = this.getMods().require('jsonpath');
    var interaction = cache.interaction;

    if(parseInt(data.searchCommandBy, 10) === 0){
    command = jp.query(this.getDBM().Files.data.commands,
            `$..[?(@.name=="${this.evalMessage(data.valueToSearch, cache)}")]`,)
    }

    if(parseInt(data.searchCommandBy, 10) === 1){
      command = jp.query(this.getDBM().Files.data.commands, `$..[?(@._id=="${this.evalMessage(data.valueToSearch, cache)}")]`)
      }

      if(parseInt(data.searchCommandBy, 10) === 2){
        command = jp.query(
          this.getDBM().Files.data.commands,
          `$..[?(@.name=="${cache.msg.content
            .slice(this.getDBM().Files.data.settings.tag.length || cache.server.tag.length)
            .split(/ +/)
            .shift()}")]`,
        )
        }

        if(parseInt(data.searchCommandBy, 10) === 3){
         command = jp.query(
            this.getDBM().Files.data.commands,
            `$..[?(@.name=="${interaction.commandName}")]`,
          );
          }

 

    let result;
    switch (parseInt(data.info, 10)) {
      case 0:
 if(parseInt(data.searchCommandBy, 10) === 2){
          result = cache.msg.content
              .slice(this.getDBM().Files.data.settings.tag.length || cache.server.tag.length)
              .split(/ +/)
              .shift()
          } else {
            result =
            jp.query(command, '$..name').length > 1 ? jp.query(command, '$..name')[0] : jp.query(command, '$..name'); }
        break;
      case 1:
        result = jp.query(command, '$.._id');
        break;
      case 2:
        if(jp.query(command, '$..comType') == "0"){ result = "Command by text" }
        if(jp.query(command, '$..comType') == "1"){ result = "Include the word in the message" }
        if(jp.query(command, '$..comType') == "2"){ result = "Regular expression" }
        if(jp.query(command, '$..comType') == "3"){ result = "Any message" }
        if(jp.query(command, '$..comType') == "4"){ result = "Slash command" }
        if(jp.query(command, '$..comType') == "5"){ result = "User Command Menu" }
        if(jp.query(command, '$..comType') == "6"){ result = "Message command menu" }
        break;
      case 3:
        if(jp.query(command, '$..restriction') == "0"){ result = "None" }
        if(jp.query(command, '$..restriction') == "1"){ result = "Only on the server" }
        if(jp.query(command, '$..restriction') == "2"){ result = "Only the server owner" }
        if(jp.query(command, '$..restriction') == "3"){ result = "Direct messages only" }
        if(jp.query(command, '$..restriction') == "4"){ result = "Only the bot owner" }
        break;
      case 4:
        result = JSON.stringify(jp.query(command, '$..permissions')).slice(2, -2).replace('_', ' ').toLowerCase();
        break;
      case 5:
        result = jp.query(command, '$.._aliases') === '' ? 'none' : jp.query(command, '$.._aliases');
        break;
      case 6:
        result =
          jp.query(command, '$.._timeRestriction') === ''
            ? 'none'
            : parseInt(jp.query(command, '$.._timeRestriction'), 10);
        break;
      case 7:
        result =
          parseInt(jp.query(command, '$..name').length, 10) - 1 === ''
            ? 'none'
            : parseInt(jp.query(command, '$..name').length, 10) - 1;
        break;
        case 8:
          result = JSON.stringify(jp.query(command, '$..permissions2')).slice(2, -2).replace('_', ' ').toLowerCase();
          break;
          case 9:
            desc = jp.query(command, '$..description')
            result = desc[0];
            break;
            case 10:
              result = jp.query(command, '$..parameters');
              break;
      default:
        break;
    }

    if (!result) result = 'invalido';

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
