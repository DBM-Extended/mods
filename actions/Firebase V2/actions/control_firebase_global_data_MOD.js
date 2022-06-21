/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Control Firebase Global Data',
  section: 'Other Stuff',
  
  subtitle(data) {
    return `(${data.dataName}) ${data.controlType === '1' ? '+=' : '='} ${data.value}`;
  },
  
  fields: [
    'dataName', 
    'controlType', 
    'value'
  ],
  
  html() {
    return `
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
      <br>
      <br>
      <br>
      <div style="padding-top: 8px;">
        Value:<br>
        <input id="value" class="round" type="text" placeholder="Use '' for insert text. Ex: 'Hello DBM'">
      </div>
    `;
  },
  
  init() {},
  
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
    const dataName = this.evalMessage(data.dataName, cache);
    const controlType = parseInt(data.controlType);
    const value = this.eval(
      this.evalMessage(data.value, cache), 
      cache
    );
    
    if (dataName && value) {
      const globalsData = firebase
        .database()
        .ref(`data/globals/${dataName}`);
      
      if (controlType === 0) {
        await globalsData.set(value);
      } else {
        const data = (await globalsData.once('value')).val();
        await globalsData.set(data + value);
      }
    }

    this.callNextAction(cache);
  },
  
  mod() {}
}; 
