module.exports = {

    name: 'Backup',
    section: 'Other Stuff',
    meta: {
      version: '2.1.5',
      preciseCheck: false,
      author: '[Tempest - 321400509326032897]',
      authorUrl: 'https://github.com/DBM-Brazil/mods',
      downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

    subtitle(data) {
      return `Backup ${data.pastaBackup}`;
    },

    fields: ['pastaBackup', 'backupNome', 'log', 'nextAction'],
  
    html(_isEvent, data) {
      return `
   <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
   <span class="dbminputlabel">Pasta a fazer Backup</span>
    <input id="pastaBackup" class="round" type="text" placeholder="Ex: data">
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Nome do Backup</span>
    <input id="backupNome" class="round" type="text" placeholder="Ex: backup">
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Log no console</span>
  <select id="log" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Chamar próxima action</span>
  <select id="nextAction" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const zip = require('zip-local');

        var pastaBackup = this.evalMessage(data.pastaBackup, cache);
        pastaBackup = "./" + pastaBackup.toString().replace("./", "");
        var backupNome = this.evalMessage(data.backupNome, cache);
        backupNome = backupNome.toString().replace(".zip", "").replace(".rar", "") + ".zip";
        const log = parseInt(data.log, 10);
        const nextAction = parseInt(data.nextAction, 10);

        zip.sync.zip(pastaBackup).compress().save(backupNome);

        switch (log) {
          case 0:
              console.log("Backup feito com sucesso!");
            break;
          case 1:
            break;
        }

        switch (nextAction) {
            case 0:
                this.callNextAction(cache);
              break;
            case 1:
                this.endActions(cache);
              break;
          }
    },
  
    mod() {},
  };
  
