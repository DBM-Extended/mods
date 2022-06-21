/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Store Firebase Member Data',
  section: 'Other Stuff',

  subtitle(data) {
    const members = [
      'Mentioned User',
      'Command Author',
      'Temp Variable',
      'Server Variable',
      'Global Variable',
    ];
    const storage = [
      '', 
      'Temp Variable', 
      'Server Variable', 
      'Global Variable'
    ];

    return `${members[parseInt(data.member)]} - ${storage[parseInt(data.storage)]} (${data.varName2})`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName2, 'Unknown Type'];
  },

  fields: [
    'member',
    'varName',
    'dataName',
    'defaultVal',
    'storage',
    'varName2',
  ],

  html(isEvent, data) {
    return `
      <div style="float: left; width: 35%;">
        Member:<br>
        <select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer');">
          ${data.members[isEvent ? 1 : 0]}
        </select>
      </div>
      <div id="varNameContainer" style="display: none; float: right; width: 60%;">
        Variable Name:<br>
        <input id="varName" class="round" type="text" list="variableList">
      </div>
      <br>
      <br>
      <br>
      <div style="padding-top: 8px;">
        <div style="float: left; width: 40%;">
          Data Name:<br>
          <input id="dataName" class="round" type="text">
        </div>
        <div style="float: left; width: 60%;">
          Default Value (if data doesn't exist):<br>
          <input id="defaultVal" class="round" type="text" value="0" placeholder="Use '' for insert text">
        </div>
      </div>
      <br>
      <br>
      <br>
      <div style="padding-top: 8px;">
        <div style="float: left; width: 35%;">
          Store In:<br>
          <select id="storage" class="round">
            ${data.variables[1]}
          </select>
        </div>
        <div id="varNameContainer2" style="float: right; width: 60%;">
          Variable Name:<br>
          <input id="varName2" class="round" type="text">
        </div>
      </div>
    `;
  },

  init() {
    const { glob, document } = this;

    glob.memberChange(
      document.getElementById('member'), 
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
    const type = parseInt(data.member);
    const varName = this.evalMessage(data.varName, cache);
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    const dataName = this.evalMessage(data.dataName, cache);
    const defVal = this.eval(
      this.evalMessage(
        data.defaultVal, 
        cache
      ),
      cache
    );

    let result;

    if (member && dataName) {
      const membersData = firebase
        .database()
        .ref(`data/players/${member.id}/${dataName}`);
        
      const memberData = await membersData.once('value');
      result = memberData
        .exists() ? 
        memberData.val() : 
        defVal;

      if (result !== undefined) {
        const storage = parseInt(data.storage);
        const varName2 = this.evalMessage(data.varName2, cache);
        this.storeValue(
          result, 
          storage, 
          varName2, 
          cache
        );
        this.callNextAction(cache);
      }
    }
  },

  mod() {}
};
