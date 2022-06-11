module.exports = {
  name: 'Translate',
  section: 'Other Stuff',
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data) {
    if(parseInt(data.opcao, 10) == 0) {
      return `Traduzir para [${data.translateTo}]`;
    }
    else {
      return `Traduzir para idioma do membro`;
    }
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['opcao', 'translateTo', 'translateMessage', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
<div style="width: 40%;">
    Traduzir para:
    <select id="opcao" class="round" onchange="glob.change(this)">
      <option value="0" selected>Sigla</option>
      <option value="1">Idioma do membro</option>
    </select>
</div>
<div id="input" style="width: 30%;">
  Traduzir para:<br>
  <input id="translateTo" placeholder="Apenas 2 letras." class="round" type="text" maxlength="2"><br>
</div>
<div>
  Traduzir mensagem<br>
  <textarea id="translateMessage" rows="9" placeholder="Insira a mensagem que deseja traduzir aqui..." style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
</div>
<div style="padding-top: 30px;">
  <div style="float: left; width: 35%;">
    Armazenar em:<br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer" style="display: none; float: right; width: 60%;">
    Nome da variável:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    glob.change = function onChange(value) {
        if(parseInt(document.getElementById("opcao").value) ==  1) {
          document.getElementById("input").style.display = "none";
        }
        if(parseInt(document.getElementById("opcao").value) ==  0) {
          document.getElementById("input").style.display = "block";
        }
    }
    glob.change();
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    var translateTo = this.evalMessage(data.translateTo, cache);
    if(parseInt(data.opcao, 10) == 1) {
      translateTo = cache.interaction.locale;
      translateTo = translateTo.toString().slice(0, 2);
    }
    const translateMessage = this.evalMessage(data.translateMessage, cache);
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);

    const Mods = this.getMods();
    const translate = Mods.require('node-google-translate-skidz');

    if (!translateTo || translateTo.length > 2) return console.log('"Traduzir para" só pode contém 2 letras.');
    if (!translateMessage) return console.log('Você precisa escrever algo para traduzir.');

    let result;
    try {
      const { translation } = await translate(translateMessage, translateTo);
      result = translation;
    } catch {}

    if (result) this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },
  mod() {},
};
