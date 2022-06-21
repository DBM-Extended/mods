/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Delete Firebase Member Data',
  section: 'Other Stuff',

  subtitle(data) {
    const members = [
      'Mentioned User',
      'Command Author',
      'Temp Variable',
      'Server Variable',
      'Global Variable',
    ];
    return `${members[parseInt(data.member)]} (${data.dataName || 'All Datas'})`;
  },

  fields: ['member', 'varName', 'dataName'],

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
      <div style="float: left; width: 78%;">
        Data Name:<br>
        <input id="dataName" class="round" type="text" placeholder="Leave blank to delete all member datas...">
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
    
    if (member) {
      await firebase
        .database()
        .ref(
          dataName ? 
          `data/players/${member.id}/${dataName}` :
          `data/players/${member.id}`
        ).remove();
    }

    this.callNextAction(cache);
  },

  mod() {}
};
