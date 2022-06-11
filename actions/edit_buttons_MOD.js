module.exports = {

  name: "Edit Buttons",
  section: "Messaging",
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle: function(data, presets) {

type = `${data.type}`;
switch (type) {
      case "all": {
        selects = 'Todos os botões';
        break;
        }
        case "sourceButton": {
        selects = 'Botão atual';
        break;
        }
          case "findButton": {
        selects = 'Botão específico';
        break;
        }
      }
    const info = ['Todos os botões', 'Botão atual', 'Botão especifico'];
     return `Editar "${selects}" em "${presets.getMessageText(data.storage, data.varName)}"`;
},

  fields: ["storage", "varName", "type", "alterartype", "alterarnome", "alteraremoji", "searchValue"],


  html: function(isEvent, data) {
    return `
    <div id="wrexdiv" style="height: 370px; overflow-y: scroll;padding:5px 10px">
<message-input dropdownLabel="Mensagem de origem" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br><br>

<div style="float: left; width: calc(50% - 12px);">
  <span class="dbminputlabel">Componentes para alterar</span><br>
  <select id="type" class="round" onchange="glob.onButtonSelectTypeChange(this)">
  <option value="all" selected>Todos os botões</option>
  <option value="sourceButton">Botão atual</option>
  <option value="findButton">Botão específico</option>
  </select>
</div>

<div style="float: right; width: calc(50% - 12px);">
<div id="nameContainer" style="width: 100%">
  <span class="dbminputlabel">ID do botão</span><br>
  <input id="searchValue" class="round" type="text">
</div>
</div>

<br><br><br><br>


  <span class="dbminputlabel">Alterar o nome para</span><br>
  <input id="alterarnome" class="round" type="text" name="is-eval">

  <br>

  <span class="dbminputlabel">Alterar o emoji para</span><br>
  <input id="alteraremoji" class="round" type="text" name="is-eval">

  <br>


<span class="dbminputlabel">Alterar o type para</span><br>
<input id="alterartype" value="PRIMARY" class="round" type="text" name="is-eval"><br>
PRIMARY (Azul)<br>
SECONDARY (Cinza)<br>
SUCCESS (Verde)<br>
DANGER (Vermelho)<br>
Ou use uma variavel, exemplo \${tempVars("cor")}</div>
`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },


  init() {
    const { glob, document } = this;
    

    glob.onButtonSelectTypeChange = function (event) {
      const input = document.getElementById("nameContainer");
      input.style.display = event.value === "findButton" || event.value === "findSelect" ? null : "none";
    };

    glob.onButtonSelectTypeChange(document.getElementById("type"));
},


  async action(cache) {

    const data = cache.actions[cache.index],
    alterartype = this.evalMessage(data.alterartype, cache),
    alteraremoji = this.evalMessage(data.alteraremoji, cache),
    alterarnome = this.evalMessage(data.alterarnome, cache);
    const message = await this.getMessageFromData(data.storage, data.varName, cache);

    const type = data.type;

    let sourceButton = null;
    if (cache.interaction.isButton()) {
      sourceButton = cache.interaction.customId;
    }

    let sourceSelect = null;
    if (cache.interaction.isSelectMenu()) {
      sourceSelect = cache.interaction.customId;
    }

    let components = null;
    let searchValue = null;

    if (message?.components) {

      const { MessageActionRow } = this.getDBM().DiscordJS;
      const oldComponents = message.components;
      const newComponents = [];

      for (let i = 0; i < oldComponents.length; i++) {

        const compData = oldComponents[i];
        const comps = (compData instanceof MessageActionRow) ? compData.toJSON() : compData;

        for (let j = 0; j < comps.components.length; j++) {

          const comp = comps.components[j];
          const id = comp.custom_id ?? comp.customId;

          switch (type) {
            case "all": {
              comp.style = alterartype;
              comp.label = alterarnome;
              comp.emoji = alteraremoji;
              break;
            }
            case "sourceButton": {
              if (id === sourceButton) comp.style = alterartype;
              if (id === sourceButton) comp.label = alterarnome;
              if (id === sourceButton) comp.emoji = alteraremoji;
              break;
            }
            case "findButton": {
              if (searchValue === null) searchValue = this.evalMessage(data.searchValue, cache);
              if (id === searchValue || comp.style === searchValue) comp.style = alterartype;
              if (id === searchValue || comp.label === searchValue) comp.label = alterarnome;
              if (id === searchValue || comp.emoji === searchValue) comp.emoji = alteraremoji;
              break;
            }
          }
        }

        newComponents.push(comps);

      }

      components = newComponents;

    }

    if (components) {
      if (Array.isArray(message)) {
        this.callListFunc(message, "edit", [{ components }]).then(() => this.callNextAction(cache));
      } else if (cache.interaction?.message?.id === message?.id && cache.interaction?.update && !cache.interaction?.replied) {
        cache.interaction
          .update({ components })
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      } else if (message?.edit) {
        message
          .edit({ components })
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      } else {
        if (message.components) {
          message.components = components;
        }
        this.callNextAction(cache);
      }
    } else {
      this.callNextAction(cache);
    }
  },



  mod() {},
};
