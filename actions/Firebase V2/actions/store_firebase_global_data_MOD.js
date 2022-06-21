/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Store Firebase Global Data',
  section: 'Other Stuff',

  subtitle(data) {
    const storage = [
      '', 
      'Temp Variable', 
      'Server Variable', 
      'Global Variable'
    ];
    return `${storage[parseInt(data.storage)]} (${data.varName})`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName2, 'Unknown Type'];
  },

  fields: [
    'dataName', 
    'defaultVal', 
    'storage', 
    'varName'
  ],

  html(isEvent, data) {
    return `
      <div style="float: left; width: 40%;">
        Data Name:<br>
        <input id="dataName" class="round" type="text">
      </div>
      <div style="float: left; width: 60%;">
        Default Value (if data doesn't exist):<br>
        <input id="defaultVal" class="round" type="text" value="0" placeholder="Use '' for insert text">
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
          <input id="varName" class="round" type="text">
        </div>
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
    const defVal = this.eval(
      this.evalMessage(
        data.defaultVal, 
        cache
      ), 
      cache
    );

    let result;

    if (dataName) {
      const globalsData = firebase
        .database()
        .ref(`data/globals/${dataName}`);
      
      const globalData = await globalsData.once('value');
      result = globalData
        .exists() ? 
        globalData.val() : 
        defVal;

      if (result !== undefined) {
        const storage = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        
        this.storeValue(
          result, 
          storage, 
          varName, 
          cache
        );
        this.callNextAction(cache);
      }
    }
  },

  mod() {}
};
