module.exports = {

    name: 'Create Timestamp Discord',
    section: 'Other Stuff',
    meta: {
      version: '2.1.5',
      preciseCheck: false,
      author: '[Tempest - 321400509326032897]',
      authorUrl: 'https://github.com/DBM-Brazil/mods',
      downloadURL: 'https://github.com/DBM-Brazil/mods',
    },


    subtitle: function(data) {
      const info = ['Tempo Curto','Muito tempo','Data abreviada','Data longa','Data longa com tempo curto','Data longa com dia da semana e horário curto','Relativo'];
      const prse = parseInt(data.saida);
      return `${info[prse]}`;
  },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Date'];
    },
  
    fields: ['date', 'saida', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
    <div>
    <span class="dbminputlabel" style="padding-top: 8px;">Data</span><br>
    <input id="date" class="round"; style="width: 100%;" type="text" placeholder="Exemplo: \${new Date}">
  </div>
  <br>
  <div>
    <span class="dbminputlabel">Saída</span><br>
    <select id="saida" class="round">
    <option value="0" selecionado>Tempo curto</option>
    <option value="1">Muito tempo</option>
    <option value="2">Data abreviada</option>
    <option value="3">Data longa</option>
    <option value="4">Data longa com tempo curto</option>
    <option value="5">Data longa com dia da semana e horário curto</option>
    <option value="6">Relativo</option>
    </select>
  </div>
  <br>
  <div style="float: left; width: 35%; padding-top: 8px;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName" class="round" type="text">
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const moment = require('moment');
        const saida = parseInt(data.saida, 10);
        
        var date = moment(Date.parse(this.evalMessage(data.date, cache)));

        if(isNaN(date)) {
            console.error("Action Create Timestamp Discord: Formato de data inválido!");
            result = "Formato de data inválido!";
        } else {
            date = date + "-";
            date = date.replace("000-", "");
            date = date.toString();

            switch (saida) {
                    case 0:
                        result = "<t:" + date + ":t>";
                        break;
                    case 1:
                        result = "<t:" + date + ":T>";
                        break;
                    case 2:
                        result = "<t:" + date + ":d>";
                        break;
                    case 3:
                        result = "<t:" + date + ":D>";
                        break;
                    case 4:
                        result = "<t:" + date + ":f>";
                        break;
                    case 5:
                        result = "<t:" + date + ":F>";
                        break;
                    case 6:
                        result = "<t:" + date + ":R>";
                        break;
            }
        }

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
  
