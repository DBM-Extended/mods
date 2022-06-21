/*
*
*  DBM Firebase - v1.1.8
*  https://github.com/cappp/dbm-firebase
*
*/

module.exports = {
  name: 'Store Firebase Member Data List',
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
    return [data.varName, 'List'];
  },

  fields: [
    'dataName',
    'showDataGlobally',
    'numberBeforeStart',
    'sortType',
    'resultLimit',
    'resultFormat',
    'storage',
    'varName',
  ],

  html(isEvent, data) {
    return `
      <style>
        span.wrexlink, span.wrexlink2 {
          color: #99b3ff;
          text-decoration: underline;
          cursor: pointer;
        }

        span.wrexlink:hover, span.wrexlink2:hover { 
          color: #4676b9;
        }

        .code {
          background: #2C313C;
          color: white;
          padding: 3px;
          font-size: 12px;
          border-radius: 2px;
        }
      </style>
      <div style="width: 550px; height: 350px; overflow-y: scroll;">
        <div style="float: left; width: 60%;">
          Data Name:<br>
          <input id="dataName" type="text" class="round">
        </div>
        <div style="float: right; width: 35%; margin-right: 20px;">
          Show Data Globally:<br>
          <select id="showDataGlobally" class="round">
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <br>
        <br>
        <br>
        <div style="float: left; padding-top: 8px; width: 38%;">
          Number Before Start:<br>
          <select id="numberBeforeStart" class="round">
            <option value="0" selected>Yes</option>
            <option value="1">No</option>
          </select>
        </div>
        <div style="float: right; padding-top: 8px; width: 50%; margin-right: 30px;">
          Sort By:<br>
          <select id="sortType" class="round">
            <option value="0" selected>Descending</option>
            <option value="1">Ascending</option>
            <option value="2">Don't Sort</option>
          </select>
        </div>
        <br>
        <br>
        <br>
        <div style="padding-top: 16px; width: 41%;">
          Result Limit:<br>
          <input id="resultLimit" class="round" placeholder="Leave Blank for Show All" value="10">
        </div>
        <br>
        <div style="width: 80%;">
          Result Format (JavaScript String):<br>
          <textarea id="resultFormat" rows="3" placeholder="Default: '. ' + member + ' - ' + dataName + ': ' + dataValue" style="resize: none; width: 122%;" >'. ' + member + ' - ' + dataName + ': ' + dataValue</textarea>
        </div>
        <br>
        <div style="float: left; width: 35%;">
          Store In:<br>
          <select id="storage" class="round">
            ${data.variables[1]}
          </select>
        </div>
        <div id="varNameContainer" style="float: right; width: 60%;">
          Variable Name:<br>
          <input id="varName" class="round" type="text">
        </div>
      </div>
    `;
  },

  init() {
    const { document } = this;

    var wrexlinks = document.getElementsByClassName('wrexlink');
    for (var x = 0; x < wrexlinks.length; x++) {
      var wrexlink = wrexlinks[x];
      var url = wrexlink.getAttribute('data-url');

      if (url) {
        wrexlink.setAttribute('title', url);
        wrexlink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log('Launching URL: [' + url + '] in your default browser.');
          require('child_process').execSync('start ' + url);
        });
      }
    }

    var wrexlinks2 = document.getElementsByClassName('wrexlink2');
    for (var x2 = 0; x2 < wrexlinks2.length; x2++) {
      var wrexlink2 = wrexlinks2[x2];
      var url2 = wrexlink2.getAttribute('data-url2');
      
      if (url2) {
        wrexlink2.setAttribute('title', url2);
        wrexlink2.addEventListener('click', (e2) => {
          e2.stopImmediatePropagation();
          console.log('Launching URL: [' + url2 + '] in your default browser.');
          require('child_process').execSync('start ' + url2);
        });
      }
    }
  },

  async action(cache) {
    const mods = this.getMods();

    const fs = require('fs');
    const firebase = mods.require('firebase');
    const sort = mods.require('fast-sort');

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

    const client = this.getDBM().Bot.bot;

    const data = cache.actions[cache.index];
    const dataName = this.evalMessage(data.dataName, cache);
    const showDataGlobally = parseInt(data.showDataGlobally);
    const numberBeforeStart = parseInt(data.numberBeforeStart);
    const sortType = parseInt(data.sortType);
    const resultLimit = parseInt(
      this.evalMessage(
        data.resultLimit, 
        cache
      )
    );
    let resultFormat = this.evalMessage(data.resultFormat, cache);

    const tempList = [];
    let resultList = [];
    let resultListPosition = 0;

    if (dataName) {
      const players = await firebase
        .database()
        .ref('data/players')
        .orderByKey()
        .once('value');

      players.forEach(player => {
        if (!player.child(dataName).exists()) return;

        if (showDataGlobally === 0) {
          if (
            !cache.server.members.cache.get(player.key)
          ) return;
        } else {
          if (
            !client.users.cache.get(player.key)
          ) return;
        }

        tempList.push({
          userID: player.key,
          value: player.child(dataName).val(),
        });
      });
        
      let listType = sortType === 0 
        ? sort(tempList).desc(u => parseInt(u.value))
        : sortType === 1 
        ? sort(tempList).asc(u => parseInt(u.value))
        : tempList;

      listType.forEach(() => {
        let dataValue = listType[resultListPosition].value;
        const member = showDataGlobally === 0 
          ? cache.server.members.cache.get(listType[resultListPosition].userID)
          : client.users.cache.get(listType[resultListPosition].userID)

        resultList.push(
          numberBeforeStart === 0
            ? `${resultListPosition + 1}${
                resultFormat
                  ? eval(resultFormat)
                  : '. ' + member + ' - ' + dataName + ': ' + dataValue
              }`
            : `${
                resultFormat
                  ? eval(resultFormat)
                  : '. ' + member + ' - ' + dataName + ': ' + dataValue
              }`
        );

        resultListPosition++;
      });

      resultList.length = resultLimit;
      resultList = resultList.join('\n');

      if (resultList) {
        const storage = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        
        this.storeValue(
          resultList, 
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
