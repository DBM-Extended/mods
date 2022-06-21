/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Control Firebase Member Data',
  section: 'Other Stuff',
  
  subtitle(data) {
    const members = [
      'Mentioned User', 
      'Command Author', 
      'Temp Variable', 
      'Server Variable', 
      'Global Variable'
    ];
    return `${members[parseInt(data.member)]} (${data.dataName}) ${data.controlType === '1' ? '+=' : '='} ${data.value}`;
  },
  
  fields: [
    'member', 
    'varName', 
    'dataName', 
    'controlType', 
    'value'
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
        <div style="float: left; width: 50%;">
          Data Name:<br>
          <input id="dataName" type="text" class="round">
        </div>
        <div style="float: right; width: 45%;">
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
      <div style="padding-top: 8px;">
        Value:<br>
        <input id="value" class="round" type="text" placeholder="Use '' for insert text. Ex: 'Hello DBM'">
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
    const varName = this.evalMessage(data.varName, cache);
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    const dataName = this.evalMessage(data.dataName, cache);
    const controlType = parseInt(data.controlType);
    const value = this.eval(
      this.evalMessage(data.value, cache), 
      cache
    );
		
    if (member && dataName && value) {
      const membersData = firebase
        .database()
	.ref(`data/players/${member.id}/${dataName}`);
				
      if (controlType === 0) {
        await membersData.set(value);
      } else {
        const data = (await membersData.once('value')).val();
        await membersData.set(data + value);
      }
    }
		
    this.callNextAction(cache);
  },
    
  mod() {}
};
