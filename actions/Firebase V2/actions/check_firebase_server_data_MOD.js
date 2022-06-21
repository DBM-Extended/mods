/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Check Firebase Server Data',
  section: 'Other Stuff',
  
  subtitle(data) {
    const results = [
      'Continue Actions', 
      'Stop Action Sequence', 
      'Jump To Action', 
      'Jump Forward Actions'
    ];
    return `If True: ${results[parseInt(data.iftrue)]} ~ If False: ${results[parseInt(data.iffalse)]}`;
  },
  
  fields: [
    'server', 
    'varName', 
    'dataName', 
    'comparison', 
    'value', 
    'iftrue', 
    'iftrueVal', 
    'iffalse', 
    'iffalseVal'
  ],
  
  html(isEvent, data) {
    return `
      <div style="width: 550px; height: 350px; overflow-y: scroll;">
        <br>
        <div style="float: left; width: 35%;">
          Server:<br>
          <select id="server" class="round" onchange="glob.serverChange(this, 'varNameContainer');">
            ${data.servers[isEvent ? 1 : 0]}
          </select>
        </div>
        <div id="varNameContainer" style="display: none; float: right; width: 60%;">
          Variable Name:<br>
          <input id="varName" class="round" type="text" list="variableList">
        </div>
        <br><br><br>
        <div style="padding-top: 8px;">
          <div style="float: left; width: 50%;">
            Data Name:<br>
            <input id="dataName" class="round" type="text">
          </div>
          <div style="float: left; width: 45%;">
            Comparison Type:<br>
              <select id="comparison" class="round">
              <option value="0">Exists</option>
              <option value="1" selected>Equals</option>
              <option value="2">Equals Exactly</option>
              <option value="3">Less Than</option>
              <option value="13">Less Than or Equal to</option>
              <option value="4">Greater Than</option>
              <option value="14">Greater Than or Equal to</option>
              <option value="5">Includes</option>
              <option value="6">Matches Regex</option>
              <option value="12">Matches Full Regex</option>
              <option value="7">Length is Bigger Than</option>
              <option value="8">Length is Smaller Than</option>
              <option value="9">Length Equals</option>
              <option value="10">Starts With</option>
              <option value="11">Ends With</option>
            </select>
          </div>
        </div>
        <br>
        <br>
        <br>
        <div style="padding-top: 8px;">
          Value to Compare to:<br>
          <input id="value" class="round" type="text" name="is-eval" placeholder="Use '' for comparate text. Ex: 'Hello DBM'">
        </div>
        <div style="padding-top: 16px;">
          ${data.conditions[0]}
        </div>
      </div>
    `;
  },
  
  init() {
    const { glob, document } = this;
	  
    glob.serverChange(
      document.getElementById('server'), 
      'varNameContainer'
    );
    glob.onChangeTrue(document.getElementById('iftrue'));
    glob.onChangeFalse(document.getElementById('iffalse'));
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
    const type = parseInt(data.server);
    const varName = this.evalMessage(data.varName, cache);
    const server = await this.getServerFromData(data.server, data.varName, cache);
    const dataName = this.evalMessage(data.dataName, cache);

    let result = false;

    if (server && dataName) {
      const serversData = firebase
        .database()
        .ref(`data/servers/${server.id}/${dataName}`);

      const val1 = (await serversData.once('value')).val();
      const compare = parseInt(data.comparison);
      let val2 = this.evalMessage(data.value, cache);

      if (compare !== 6) val2 = this.eval(val2, cache);
      if (val2 === false) val2 = this.evalMessage(data.value, cache);

      switch (compare) {
        case 0:
          result = val1 !== undefined;
          break;
        case 1:
          result = val1 == val2;
          break;
        case 2:
          result = val1 === val2;
          break;
        case 3:
          result = val1 < val2;
          break;
        case 4:
          result = val1 > val2
          break;
        case 5:
          if (typeof (val1.includes) === 'function') {
            result = val1.includes(val2);
          }
          break;
        case 6:
          result = Boolean(
            val1.match(
              new RegExp(`^${val2}$`, 'i')
            )
          );
          break;
        case 7:
          result = val1.length > val2;
          break;
        case 8:
          result = val1.length < val2;
          break;
        case 9:
          result = val1.length === val2;
          break;
        case 10:
          result = val1.startsWith(val2);
          break;
        case 11:
          result = val1.endsWith(val2);
          break;
        case 12:
          result = Boolean(val1.match(new RegExp(val2)));
          break;
        case 13:
          result = val1 <= val2;
          break;
        case 14:
          result = val1 >= val2;
          break;
      }
    }

    this.executeResults(result, data, cache);
  },
  
  mod() {}
};
