/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Delete Firebase Global Data',
  section: 'Other Stuff',
  
  subtitle(data) {
    return `(${data.dataName || 'All Datas'})`;
  },
  
  fields: ['dataName'],
  
  html() {
    return `
      <div style="float: left; width: 78%;">
        Data Name:<br>
        <input id="dataName" class="round" type="text" placeholder="Leave blank to delete all global datas...">
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
    
    await firebase
      .database()
      .ref(
        dataName ? 
        `data/globals/${dataName}` : 
        'data/globals'
      ).remove();
    
    this.callNextAction(cache);
  },
  
  mod() {}
};
