module.exports = {
  name: 'Store Category Info',
  section: 'Channel Control',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

  subtitle(data) {
    const categories = ['You cheater!', 'Temp Variable', 'Server Variable', 'Global Variable'];
    const info = [
      "ID da Categoria",
      "Nome da Categoria",
      "Servidor da Categoria",
      "Posição da Categoria",
      "A categoria é gerenciável?",
      "A categoria é apagável?",
      "Lista de canais da categoria",
      "Total de canais da categoria",
      "Lista de canais de texto da categoria",
      "Total de canais de texto da categoria",
      "Lista de canais de voz da categoria",
      "Total de canais de voz da categoria",
      "Lista de canais de palco da categoria",
      "Total de canais de palco da categoria",
    ];
    return `${categories[parseInt(data.category, 10)]} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = 'Category ID';
        break;
      case 1:
        dataType = 'Text';
        break;
      case 2:
        dataType = 'Server';
        break;
      case 3:
      case 7:
      case 9:
      case 11:
        dataType = 'Number';
        break;
      case 4:
      case 5:
        dataType = 'Boolean';
        break;
      case 6:
        dataType = 'List';
        break;
        case 7:
          dataType = 'Number';
          break;
          case 8:
            dataType = 'List';
            break;
            case 9:
              dataType = 'Number';
              break;
              case 10:
                dataType = 'List';
                break;
                case 11:
                  dataType = 'Number';
                  break;
                  case 12:
                    dataType = 'List';
                    break;
                    case 13:
                      dataType = 'Number';
                      break;
        break;
      default:
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ['category', 'varName', 'info', 'storage', 'varName2'],

  html(isEvent, data) {
    return `
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Categoria de origem</span><br>
    <select id="category" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="padding-top: 8px; width: 70%;">
  <span class="dbminputlabel">Informações de origem</span><br>
    <select id="info" class="round">
      <optgroup label="Principal">
      <option value="0">ID da Categoria</option>
      <option value="1">Nome da Categoria</option>
      <option value="2">Servidor da Categoria</option>
      <option value="3">Posição da Categoria</option>
      <option value="4">A categoria é gerenciável?</option>
      <option value="5">A categoria é apagável?</option>
      </optgroup>
      <optgroup label="Informações">
      <option value="6">Lista de canais da categoria</option>
      <option value="7">Total de canais da categoria</option>
      <option value="8">Lista de canais de texto da categoria</option>
      <option value="9">Total de canais de texto da categoria</option>
      <option value="10">Lista de canais de voz da categoria</option>
      <option value="11">Total de canais de voz da categoria</option>
      <option value="12">Lista de canais de palco da categoria</option>
      <option value="13">Total de canais de palco da categoria</option>
    </select>
  </div>
</div><br>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName2" class="round" type="text"><br>
  </div>
</div>
<style>
  div.embed { /* <div class="embed"></div> */
    position: relative;
  }

  embedleftline { /* <embedleftline></embedleftline> OR if you want to change the Color: <embedleftline style="background-color: #HEXCODE;"></embedleftline> */
    background-color: #eee;
    width: 4px;
    border-radius: 3px 0 0 3px;
    border: 0;
    height: 100%;
    margin-left: 4px;
    position: absolute;
  }

  div.embedinfo { /* <div class="embedinfo"></div> */
    background: rgba(46,48,54,.45) fixed;
    border: 1px solid hsla(0,0%,80%,.3);
    padding: 10px;
    margin:0 4px 0 7px;
    border-radius: 0 3px 3px 0;
  }

  span.embed-auth { /* <span class="embed-auth"></span> (Title thing) */
    color: rgb(255, 255, 255);
  }

  span.embed-desc { /* <span class="embed-desc"></span> (Description thing) */
    color: rgb(128, 128, 128);
  }

  span { /* Only making the text look, nice! */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
</style>`;
  },

  init() {
    const { glob, document } = this;
    glob.refreshVariableList(document.getElementById('category'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const category = parseInt(data.category, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    const targetCategory = this.getVariable(category, varName, cache);
    if (!targetCategory) return this.callNextAction(cache);

    let result;
    switch (info) {
      case 0:
        result = targetCategory.id;
        break;
      case 1:
        result = targetCategory.name;
        break;
      case 2:
        result = targetCategory.guild;
        break;
      case 3:
        result = targetCategory.position;
        break;
      case 4:
        result = targetCategory.manageable;
        break;
      case 5:
        result = targetCategory.deletable;
        break;
      case 6:
        result = targetCategory.children.filter(channels => channels).map(channels => channels).join(",");
        break;
      case 7:
        result = targetCategory.children.size;
        break;
      case 8:
        result = targetCategory.children.filter((c) => ['GUILD_TEXT', 'GUILD_NEWS'].includes(c.type)).map(channels => channels).join(",");
        break;
      case 9:
        result = targetCategory.children.filter((c) => ['GUILD_TEXT', 'GUILD_NEWS'].includes(c.type)).size;
        break;
        case 10:
          result = targetCategory.children.filter((c) => ['GUILD_VOICE'].includes(c.type)).map(channels => channels).join(",");
          break;
        case 11:
          result = targetCategory.children.filter((c) => ['GUILD_VOICE'].includes(c.type)).size;
          break;
          case 12:
            result = targetCategory.children.filter((c) => ['GUILD_STAGE_VOICE'].includes(c.type)).map(channels => channels).join(",");
            break;
          case 13:
            result = targetCategory.children.filter((c) => ['GUILD_STAGE_VOICE'].includes(c.type)).size;
            break;
      default:
        break;
    }
    if (result) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
