/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Control Firebase Server Data',
  section: 'Other Stuff',
  
  subtitle(data) {
    const channels = [
      'Current Server', 
      'Temp Variable', 
      'Server Variable', 
      'Global Variable'
    ];
    return `${channels[parseInt(data.server)]} (${data.dataName}) ${data.controlType === '1' ? '+=' : '='} ${data.value}`;
  },
  
  fields: [
    'server', 
    'varName', 
    'dataName', 
    'controlType', 
    'value'
  ],
  
  html(isEvent, data) {
    return `
      <div style="float: left; width: 35%">
        Server:<br>
        <select id="server" class="round" onchange="glob.serverChange(this, 'varNameContainer')">
          ${data.servers[isEvent ? 1 : 0]}
        </select>
      </div>
      <div id="varNameContainer" style="display: none; float: right; width: 60%">
        Variable Name:<br>
        <input id="varName" class="round" type="text" list="variableList">
      </div>
      <br>
      <br>
      <br>
      <div style="padding-top: 8px">
        <div style="float: left; width: 50%">
          Data Name:<br>
          <input id="dataName" type="text" class="round">
        </div>
        <div style="float: right; width: 45%">
          Control Type:<br>
          <select id="controlType" class="round">
            <option value="0" selected>Set Value</option>
            <option value="1">Add Value</option>
          </select>
        </div>
      </div>
      <br>
      <br>
      <br>
      <div style="padding-top: 8px">
        Value:<br>
        <input id="value" class="round" type="text" placeholder="Use '' for insert text. Ex: 'Hello DBM'">
      </div>
    `;
  },
  
  init() {
    const { glob, document } = this;

    glob.serverChange(
      document.getElementById('server'), 
      'varNameContainer'
    );
  },
  
  async action(cache) {
    const fs = require('fs');
    const firebase = this.getMods().require('firebase');

    if (!fs.existsSync('./data/fbConfig.json')) {
      return console.log(
        'You do not have the fbConfig.json file in your bot to continue use Firebase. Visit this repository to learn how to do it: https://github.com/cappp/dbm-firebase'
      );
    }
		
    if (firebase.apps.length === 0) {
      firebase.initializeApp(JSON.parse(
        fs.readFileSync(
          './data/fbConfig.json', 
          'utf-8'
        )
      ));
    }
    
    const data = cache.actions[cache.index];
    const serverType = parseInt(data.server);
    const varName = this.evalMessage(data.varName, cache);
    const server = await this.getServerFromData(data.server, data.varName, cache);
    const dataName = this.evalMessage(data.dataName, cache);
    const controlType = parseInt(data.controlType);
    const value = this.eval(
      this.evalMessage(data.value, cache), 
      cache
    );

    if (server && dataName && value) {
      const serversData = firebase
        .database()
        .ref(`data/servers/${server.id}/${dataName}`);

      if (controlType === 0) {
        await serversData.set(value);
      } else {
        const data = (await serversData.once('value')).val();
        await serversData.set(data + value);
      }
    }

    this.callNextAction(cache);
  },
  
  mod() {}
};
