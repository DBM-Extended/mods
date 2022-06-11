module.exports = {
  name: "Store interaction Info",
  section: 'Other Stuff',
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto da interação",
      "ID da interação",
      "Linguagem do autor",
      "Tipo de interação",
      "Token da interação",
      "Canal da interação",
      "ID do canal da interação",
      "Objeto > Opções da Interação",
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },


  variableStorage: function(data, varType) {
    const type = parseInt(data.storage);
    const prse2 = parseInt(data.info);
    const info2 = ['Object','ID', 'Language','Type','Token','Channel','Channel ID','Object > Options'];
    if(type !== varType) return;
    return ([data.varName2, info2[prse2]]);
},


  fields: ["info", "storage", "varName2"],

  html(isEvent, data) {
    return `
    <div>
<div style="padding-top: 8px;">
	<span class="dbminputlabel">informação</span><br>
	<select id="info" class="round">
  <option value="0 selected">Objeto da interação</option>
  <option value="1">ID da interação</option>
  <option value="2">Linguagem do autor</option>
  <option value="3">Tipo de interação</option>
  <option value="4">Token da interação</option>
  <option value="5">Canal da interação</option>
  <option value="6">ID do canal da interação</option>
  <option value="7">Objeto > Opções da Interação</option>
	</select>
</div>

<br>

<div style="float: left; width: 35%; padding-top: 8px;">
<span class="dbminputlabel">Resultado em</span><br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName2" class="round" type="text">
	</div>`;
  },

  init: function() {
    const {glob, document} = this;
  
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },


  async action(cache) {
    const data = cache.actions[cache.index];
    const interaction = cache.interaction;
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = interaction;
        break;
      case 1:
        result = interaction.id;
        break;
      case 2:
        result = interaction.locale;
        break;
      case 3:
        result = interaction.type;
        break;
        case 4:
        result = interaction.token;
        break;
        case 5:
        result = interaction.channel;
        break;
        case 6:
          result = interaction.channel.id;
          break;
        case 7:
        result = interaction.options._hoistedOptions;
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
