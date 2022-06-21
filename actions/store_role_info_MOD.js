module.exports = {


  name: "Store Role Info",
  section: "Role Control",
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

  subtitle(data, presets) {
    const info = [
      "Role Object",
      "ID do Cargo",
      "Nome do Cargo",
      "Cor do Cargo",
      "Posição do Cargo",
      "Timestamp de criação do Cargo",
      "O Cargo é mencionavel?",
      "O Cargo é separado dos outros",
      "O Cargo é gerenciavel",
      "Lista de membros do Cargo",
      "Data da criação do Cargo",
      "Lista de permissões do Cargo",
      "Quantidade de Membros do Cargo",
      "Icone do Cargo",
      "Tag do Cargo",
      "Servidor do Cargo",
      "ID do Servidor do Cargo",
      "O Cargo e editavel?",
      "Lista de IDs de membros do Cargo",
    ];
    return `${presets.getRoleText(data.role, data.varName)} - ${info[parseInt(data.info, 10)]} para (${data.varName2})`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Role";
        break;
      case 1:
        dataType = "Role ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
        dataType = "Color";
        break;
      case 4:
        dataType = "Number";
        break;
      case 5:
        dataType = "Timestamp";
        break;
      case 6:
      case 7:
        dataType = "Boolean";
        break;
      case 8:
        dataType = "Boolean";
        break;
      case 9:
        dataType = "Member List";
        break;
      case 10:
        dataType = "Date";
        break;
      case 11:
      case 12:
        dataType = "Number";
        break;
      case 13:
        dataType = "Image URL";
        break;
      case 14:
        dataType = "Object";
        break;
      case 15:
        dataType = "Server";
        break;
      case 16:
        dataType = "Server ID";
        break;
      case 17:
        dataType = "Boolean";
        break;
      case 18:
        dataType = "List";
        break;
    }
    return [data.varName2, dataType];
  },


  fields: ["role", "varName", "info", "storage", "varName2"],


  html(isEvent, data) {
    return `
<role-input dropdownLabel="Função de origem" selectId="role" variableContainerId="varNameContainer" variableInputId="varName"></role-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informações de origem</span><br>
	<select id="info" class="round">
    <optgroup label="Informações do Cargo">
		<option value="0" selected>Cargo - Objeto</option>
		<option value="1">ID do Cargo</option>
		<option value="2">Nome do Cargo</option>
		<option value="3">Cor do Cargo</option>
		<option value="4">Posição do Cargo</option>
    <option value="14">Tag do Cargo</option>
    <option value="13">Icone do Cargo</option>
    <option value="12">Quantidade de Membros do Cargo</option>
    </optgroup>
    <optgroup label="Condições do Cargo">
		<option value="6">O Cargo é mencionavel?</option>
		<option value="17">O Cargo e editavel?</option>
    <option value="7">O Cargo é separado dos outros?</option>
    <option value="8">O Cargo é gerenciado pelo bot/integração?</option>
    </optgroup>
    <optgroup label="Datas do Cargo">
		<option value="5">Timestamp de criação do Cargo</option>
    <option value="10">Data da criação do Cargo</option>
    </optgroup>
    <optgroup label="Informações do Cargo">
    <option value="15">Servidor do Cargo</option>
    <option value="16">ID do Servidor do Cargo</option>
    </optgroup>
    <optgroup label="Informações do Cargo em Listas">
    <option value="9">Lista de membros do Cargo</option>
    <option value="18">Lista de IDs de membros do Cargo</option>
    <option value="11">Lista de permissões do Cargo</option>
    </optgroup>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },



  init() {},


  async action(cache) {
    const data = cache.actions[cache.index];
    const targetRole = await this.getRoleFromData(data.role, data.varName, cache);
    const info = parseInt(data.info, 10);
    if (!targetRole) {
      this.callNextAction(cache);
      return;
    }
    let result;
    switch (info) {
      case 0:
        result = targetRole;
        break;
      case 1:
        result = targetRole.id;
        break;
      case 2:
        result = targetRole.name;
        break;
      case 3:
        result = targetRole.hexColor;
        break;
      case 4:
        result = targetRole.position;
        break;
      case 5:
        result = targetRole.createdTimestamp;
        break;
      case 6:
        result = targetRole.mentionable;
        break;
      case 7:
        result = targetRole.hoist;
        break;
      case 8:
        result = targetRole.managed;
        break;
      case 9:
        result = [...targetRole.members.values()];
        break;
      case 10:
        result = targetRole.createdAt;
        break;
      case 11:
        result = targetRole.permissions.toArray().join(', ').replace(/_/g, ' ').toLowerCase();
        break;
      case 12:
        result = targetRole.members.size;
        break;
      case 13:
        result = targetRole.iconURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 14:
        result = targetRole.tags;
        break;
      case 15:
        result = targetRole.guild;
        break;
      case 16:
        result = targetRole.guild.id;
        break;
      case 17:
        result = targetRole.editable;
        break;
      case 18:
        result = [...targetRole.members.keys()];
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
