module.exports = {
  name: "Store Member Info",
  section: "Member Control",
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto do membro",
      "ID de membro",
      "Nome de usuário do membro",
      "Nome de exibição do membro",
      "Cor do Membro",
      "Nome do Servidor do Membro",
      "Última mensagem do membro (removido)",
      "Cargo mais alta do membro",
      "Cargo de elevação do membro",
      "Cargo de cor do membro",
      "Membro é proprietário?",
      "O membro está mudo?",
      "O membro é surdo?",
      "O membro é banível?",
      "Nome do status de jogo do membro",
      "Estado de Membro",
      "URL do avatar do membro",
      "Lista de cargos do Membro",
      "Quantidade de cargos do membro",
      "Canal de voz do membro",
      "Discriminador do membro",
      "Tag do Membro",
      "Conta do membro criada em",
      "Timestamp da conta criada pelo membro",
      "Membro entrou no servidor em",
      "Timestamp do membro que entrou no servidor",
      "ID da última mensagem (removido)",
      "Lista de permissões do membro",
      "Lista de Badges do Membro",
      "Status do cliente membro",
      "Status personalizado de membro",
      "URL do Avatar do Servidor Membro",
      "Membro expirou em",
      "Timestamp do membro expirou",
      "URL do banner do membro",
      "ID do Servidor do Membro",
    ];
    return `${presets.getMemberText(data.member, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Server Member";
        break;
      case 1:
        dataType = "Member ID";
        break;
      case 2:
      case 3:
        dataType = "Text";
        break;
      case 4:
        dataType = "Color";
        break;
      case 5:
        dataType = "Server";
        break;
      case 7:
      case 8:
      case 9:
        dataType = "Role";
        break;
      case 10:
      case 11:
      case 12:
      case 13:
        dataType = "Boolean";
        break;
      case 14:
      case 15:
        dataType = "Text";
        break;
      case 16:
      case 31:
        dataType = "Image URL";
        break;
      case 17:
        dataType = "List of Roles";
        break;
      case 18:
        dataType = "Number";
        break;
      case 19:
        dataType = "Voice Channel";
        break;
      case 20:
        dataType = "Member Discriminator";
        break;
      case 21:
        dataType = "Member Tag";
        break;
      case 22:
        dataType = "Date";
        break;
      case 23:
        dataType = "Timestamp";
        break;
      case 24:
        dataType = "Date";
        break;
      case 25:
        dataType = "Timestamp";
        break;
      case 27:
      case 28:
      case 29:
        dataType = "List";
        break;
      case 30:
        dataType = "Text";
        break;
      case 31:
        dataType = "Date";
        break;
      case 32:
        dataType = "Timestamp";
        break;
      case 33:
          dataType = "Timestamp";
          break;
          case 34:
            dataType = "Image URL";
            break;
            case 35:
              dataType = "Server ID";
              break;
    }
    return [data.varName2, dataType];
  },

  fields: ["member", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
    return `
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informação</span><br>
	<select id="info" class="round">
  <option value="0" selecionado>Objeto Membro</option>
  <option value="1">ID do membro</option>
  <option value="2">Nome de usuário do membro</option>
  <option value="3">Nome de exibição do membro [Apelido]</option>
  <option value="21">Tag do membro</option>
  <option value="20">Discriminador do membro</option>
  <option value="4">Cor do membro</option>
  <option value="15">Status de membro</option>
  <option value="16">URL do avatar do membro</option>
  <option value="34">URL do banner do membro</option>
  <option value="31">URL do Avatar do Servidor do Membro</option>
  <option value="5">Nome do Servidor do membro</option>
  <option value="35">ID do servidor do membro</option>
  <option value="6">Última mensagem do membro (removida)</option>
  <option value="26">ID da última mensagem do membro (removido)</option>
  <option value="7">Cargo mais alto do membro</option>
  <option value="8">Cargo de elevação do membro</option>
  <option value="9">Cargo de cor do membro</option>
  <option value="17">Lista de cargos do membro</option>
  <option value="18">Quantidade de cargos do membro</option>
  <option value="10">O membro é proprietário?</option>
  <option value="11">O membro está silenciado?</option>
  <option value="12">O membro está surdo?</option>
  <option value="13">O membro pode ser banido?</option>
  <option value="14">Nome do status de jogo do membro</option>
  <option value="30">Status personalizado do membro</option>
  <option value="19">Canal de voz do membro</option>
  <option value="22">Conta do membro criada em</option>
  <option value="23">Timestamp da conta criada pelo membro</option>
  <option value="24">Membro entrou no servidor em</option>
  <option value="25">Timestamp do membro que entrou no servidor</option>
  <option value="27">Lista de permissões do membro</option>
  <option value="28">Lista de badges do membro</option>
  <option value="29">Status do cliente membro [Web ou Mobile]</option>
  <option value="32">Tempo esgotado do membro em</option>
  <option value="33">Timestamp do membro expirado</option>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},


  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);

    if (!member) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = member;
        break;
      case 1:
        result = member.id;
        break;
      case 2:
        result = member.user?.username;
        break;
      case 3:
        result = member.displayName;
        break;
      case 4:
        result = member.displayHexColor;
        break;
      case 5:
        result = member.guild;
        break;
      case 7:
        result = member.roles.highest;
        break;
      case 8:
        result = member.roles.hoist;
        break;
      case 9:
        result = member.roles.color;
        break;
      case 10:
        result = member.id === member.guild?.ownerId;
        break;
      case 11:
        result = member.voice.mute;
        break;
      case 12:
        result = member.voice.deaf;
        break;
      case 13:
        result = member.bannable;
        break;
      case 14:
        if (member.presence?.activities.length) {
          const status = member.presence.activities.filter((s) => s.type !== "CUSTOM");
          result = status[0]?.name;
        }
        break;
      case 15:
        if (member.presence?.status) {
          const status = member.presence.status;
          switch(status) {
            case "online": { result = "Online"; break; }
            case "offline": { result = "Offline"; break; }
            case "idle": { result = "Ausente"; break; }
            case "dnd": { result = "Ocupado"; break; }
          }
        }
        break;
      case 16:
        if (member.user) {
          result = member.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        }
        break;
      case 17:
        result = [...member.roles.cache.values()];
        break;
      case 18:
        result = member.roles.cache.size;
        break;
      case 19:
        result = member.voice.channel;
        break;
      case 20:
        result = member.user?.discriminator;
        break;
      case 21:
        result = member.user?.tag;
        break;
      case 22:
        result = member.user?.createdAt;
        break;
      case 23:
        result = member.user?.createdTimestamp;
        break;
      case 24:
        result = member.joinedAt;
        break;
      case 25:
        result = member.joinedTimestamp;
        break;
      case 27:
        result = member.permissions.toArray();
        break;
      case 28:
        result = member.user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray();
        break;
      case 29:
        const status = member.presence?.clientStatus;
        result = status && Object.keys(status);
        break;
      case 30:
        result = member.presence?.activities.find((s) => s.type === "CUSTOM")?.state;
        break;
      case 31:
        result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 32:
        result = member.communicationDisabledUntil;
        break;
      case 33:
        result = member.communicationDisabledUntilTimestamp;
        break;
      case 34:
        const user = await member.user.fetch();
        result = member.user.bannerURL({ fomart: "png", size: 4096, dynamic: true });
        break;
        case 35:
          result = member.guild.id;
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
