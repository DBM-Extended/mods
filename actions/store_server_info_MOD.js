module.exports = {

  name: "Store Server Info",
  section: "Server Control",
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

  subtitle(data, presets) {
    const info = [
      "Servidor (Objeto)",
      "ID do servidor",
      "Nome do servidor",
      "Acrônimo do nome do servidor",
      "Idioma Preferido do Servidor",
      "URL do ícone do servidor",
      "Nível de Verificação do Servidor",
      "Canal padrão do servidor",
      "Canal AFK do Servidor",
      "Canal do sistema do servidor",
      "Cargo padrão do servidor",
      "Dono do Servidor (Objeto)",
      "Bot do servidor",
      "Lista de Canais do Servidor",
      "Lista de Cargos do servidor",
      "Lista de Membros do Servidor",
      "Lista de emojis do servidor",
      "Contagem de membros do servidor",
      "Servidor criado em",
      "Tempo limite do servidor AFK",
      "Servidor disponível",
      "Servidor Grande",
      "Servidor conectado em",
      "Contagem de Canais do Servidor",
      "Contagem de emojis do servidor",
      "Incorporação de servidor habilitada",
      "Contagem de membros ocupados do servidor",
      "Contagem de membros online do servidor",
      "Contagem de membros offline do servidor",
      "Contagem de membros ociosos do servidor",
      "Contagem de bots do servidor",
      "Lista de IDs de Canais do Servidor",
      "Lista de IDs de Cargos de servidor",
      "Lista de IDs de membros do servidor",
      "",
      "Contagem Humana do Servidor",
      "",
      "Contagem de Cargos do Servidor",
      "Contagem de canais de texto do servidor",
      "Contagem de Canais de Voz do Servidor",
      "Servidor verificado",
      "Lista de banidos do servidor",
      "Lista de convites do servidor",
      "Filtro de conteúdo explícito do servidor",
      "Contagem de reforços do servidor",
      "Nível de aumento de servidor",
      "URL do banner do servidor",
      "Lista de recursos do servidor",
      "ID do Dono do servidor",
      "Código URL do Servidor Vanity",
      "ID do canal do widget do servidor",
      "ID do canal AFK do servidor",
      "Ativar barra de progresso do servidor",
      "Descrição do Servidor",
      "Servidor parceiro",
      "Canal de Regras do Servidor",
      "ID do canal da regra do servidor",
      "Canal de widget do servidor",
      "ID do canal do sistema do servidor",
      "Nível NSFW do Servidor",
      "Nível MFA/2FA do Servidor",
      "Timestamp do Servidor",
      "URL do Template",
      "Código do Template",
      "Nome do Template",
      "Descrição do Template",
      "Vezes que o Template foi usado",
      "ID do criador do Template",
      "Timestamp da criação do Template",
      "Timestamp da atualização do Template",
    ];
    return `${presets.getServerText(data.server, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Server";
        break;
      case 1:
        dataType = "Server ID";
        break;
      case 2:
      case 3:
      case 4:
        dataType = "Text";
        break;
      case 5:
        dataType = "Icon URL";
        break;
      case 6:
        dataType = "Text";
        break;
      case 7:
      case 8:
      case 9:
        dataType = "Channel";
        break;
      case 10:
        dataType = "Role";
        break;
      case 11:
        dataType = "Server Member";
        break;
      case 12:
        dataType = "Server Member";
        break;
      case 13:
        dataType = "Channels List";
        break;
      case 14:
        dataType = "Roles List";
        break;
      case 15:
        dataType = "Members List";
        break;
      case 16:
        dataType = "Emojis List";
        break;
      case 17:
        dataType = "Number";
        break;
      case 18:
        dataType = "Date";
        break;
      case 19:
        dataType = "Number";
        break;
      case 20:
      case 21:
        dataType = "Boolean";
        break;
      case 22:
        dataType = "Date";
        break;
      case 23:
      case 24:
        dataType = "Number";
        break;
      case 25:
        dataType = "Boolean";
        break;
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
        dataType = "Number";
        break;
      case 31:
      case 32:
      case 33:
        dataType = "IDs List";
        break;
      case 35:
        dataType = "Number";
        break;
      case 37:
      case 38:
      case 39:
        dataType = "Number";
        break;
      case 40:
        dataType = "Boolean";
        break;
      case 41:
        dataType = "Bans List";
        break;
      case 42:
        dataType = "Invites List";
        break;
      case 43:
        dataType = "Text";
        break;
      case 44:
      case 45:
        dataType = "Number";
        break;
      case 46:
        dataType = "Banner URL";
        break;
      case 47:
        dataType = "Server Features List";
        break;
      case 48:
      case 49:
        dataType = "Text";
        break;
      case 50:
      case 51:
        dataType = "Channel ID";
        break;
      case 52:
        dataType = "Boolean";
        break;
      case 53:
        dataType = "Text";
        break;
      case 54:
        dataType = "Boolean";
        break;
      case 55:
        dataType = "Channel";
        break;
      case 56:
        dataType = "Channel ID";
        break;
      case 57:
        dataType = "Channel";
        break;
      case 58:
        dataType = "Channel ID";
        break;
      case 59:
      case 60:
        dataType = "Text";
        break;
      case 61:
        dataType = "Timestamp";
        break;
        case 62:
          dataType = "URL";
          break;
          case 63:
            dataType = "Code";
            break;
            case 64:
              dataType = "Text";
              break;
              case 65:
                dataType = "Text";
                break;
                case 66:
                  dataType = "Number";
                  break;
                  case 67:
                    dataType = "ID User";
                    break;
                    case 68:
                      dataType = "Timestamp";
                      break;
                      case 69:
                        dataType = "Timestamp";
                        break;

    }
    return [data.varName2, dataType];
  },



  fields: ["server", "varName", "info", "storage", "varName2"],



  html(isEvent, data) {
    return `
<server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

<br><br><br>

<div>
	<div style="padding-top: 8px; width: 100%;">
		<span class="dbminputlabel">Informações</span><br>
		<select id="info" class="round">
      <optgroup label="Informações Gerais do Servidor">
      <option value="0">servidor (Objeto)</options>
      <option value="1">ID do servidor</options>
      <option value="2">Nome do servidor</options>
      <option value="3">Acrônimo do nome do servidor</options>
      <option value="53">Descrição do servidor</options>
      <option value="5">URL do ícone do servidor</options>
      <option value="7">Canal padrão do servidor</options>
      <option value="58">ID do canal do sistema do servidor</options>
      <option value="9">Canal do sistema do servidor</options>
      <option value="21">Servidor grande</options>
      <option value="43">Filtro de conteúdo explícito do servidor</options>
      <option value="10">Cargo padrão do servidor</options>
      <option value="12">Bot do servidor</options>
      <option value="20">Servidor disponível</options>
      </optgroup>
      <optgroup label="Informações AFK do Servidor">
      <option value="8">Canal AFK do servidor</options>
      <option value="51">ID do canal AFK do servidor</options>
      <option value="19">Tempo limite de AFK do servidor</options>
      </optgroup>
      <optgroup label="Informações sobre impulso do Servidor">
      <option value="44">Contagem de reforços do servidor</options>
      <option value="45">Nível de aumento de servidor</options>
      </optgroup>
      <optgroup label="Contagens de Servidores">
      <option value="17">Contagem de membros do servidor</options>
      <option value="35">Contagem Humana do Servidor</options>
      <option value="30">Contagem de bots do servidor</options>
      <option value="24">Contagem de emojis do servidor</options>
      <option value="37">Contagem de Cargos do servidor</options>
      <option value="23">Contagem de canais do servidor</options>
      <option value="38">Contagem de canais de texto do servidor</options>
      <option value="39">Contagem de canais de voz do servidor</options>
      </optgroup>
      <optgroup label="Informações da comunidade do servidor"">
      <option value="54">Servidor em parceria</options>
      <option value="55">Canal de regras do servidor</options>
      <option value="56">ID do canal da regra do servidor</options>
      <option value="4">Idioma preferencial do servidor</options>
      <option value="40">Servidor verificado</options>
      <option value="52">Barra de progresso do Server Premium ativada</options>
      <option value="46">URL do banner do servidor</options>
      <option value="47">Lista de recursos do servidor</options>
      <option value="49">Código de URL personalizado do servidor</options>
      <option value="57">Canal de widget do servidor</options>
      <option value="50">ID do canal do widget do servidor</options>
      <option value="25">Incorporação de servidor ativada</options>
      </optgroup>
      <optgroup label="Informações de datas do servidor">
      <option value="61">Carimbo de data e hora do servidor</options>
      <option value="18">Servidor criado em</options>
      <option value="22">Servidor conectado em</options>
      </optgroup>
      <optgroup label="Níveis do Servidor">
      <option value="59">Nível NSFW do servidor</options>
      <option value="6">Nível de verificação do servidor</options>
      <option value="60">Nível MFA/2FA do servidor</options>
      </optgroup>
      <optgroup label="Informações da Lista de Servidores">
      <option value="15">Lista de membros do servidor</options>
      <option value="33">Lista de IDs de membros do servidor</options>
      <option value="13">Lista de canais do servidor</options>
      <option value="31">Lista de IDs de canais de servidor</options>
      <option value="16">Lista de emojis do servidor</options>
      <option value="14">Lista de Cargos do servidor</options>
      <option value="32">Lista de IDs de funções de servidor</options>
      <option value="41">Lista de banidos do servidor</options>
      <option value="42">Lista de convites do servidor</options>
      </optgroup>
      <optgroup label="Informações do Dono do servidor">
      <option value="48">ID do Dono do servidor</options>
      <option value="11">Dono do Servidor (Objeto)</options>
      </optgroup>
      <optgroup label="Contagem de Status do Servidor">
      <option value="27">Contagem de membros online do servidor</options>
      <option value="29">Contagem de membros inativos do servidor</options>
      <option value="26">Contagem de membros ocupados do servidor</options>
      <option value="28">Contagem de membros offline do servidor</options>
      </optgroup>
      <optgroup label="Template do Servidor">
      <option value="62">URL do Template</options>
      <option value="63">Código do Template</options>
      <option value="64">Nome do Template</options>
      <option value="65">Descrição do Template</options>
      <option value="66">Vezes que o Template foi usado</options>
      <option value="67">ID do criador do Template</options>
      <option value="68">Timestamp da criação do Template</options>
      <option value="69">Timestamp da atualização do Template</options>
      </optgroup>
		</select>
	</div>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

   init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const targetServer = await this.getServerFromData(data.server, data.varName, cache);

    if (!targetServer) {
      return this.callNextAction(cache);
    }

    const fetchMembers = async (withPresences = false) => {
      if (targetServer.memberCount !== targetServer.members.cache.size) {
        await targetServer.members.fetch({ withPresences });
      }
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = targetServer;
        break;
      case 1:
        result = targetServer.id;
        break;
      case 2:
        result = targetServer.name;
        break;
      case 3:
        result = targetServer.nameAcronym;
        break;
      case 4: 
        result = targetServer.preferredLocale;
        break;
      case 5:
        result = targetServer.iconURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 6:
        result = targetServer.verificationLevel;
        break;
      case 7:
        result = targetServer.getDefaultChannel();
        break;
      case 8:
        result = targetServer.afkChannel;
        break;
      case 9:
        result = targetServer.systemChannel;
        break;
      case 10:
        result = targetServer.roles.resolve(targetServer.id);
        break;
      case 11:
        result = await targetServer.fetchOwner();
        break;
      case 12:
        result = targetServer.me;
        break;
      case 13:
        result = [...targetServer.channels.cache.values()];
        break;
      case 14:
        result = [...targetServer.roles.cache.values()];
        break;
      case 15:
        result = [...targetServer.members.cache.values()];
        break;
      case 16:
        result = [...targetServer.emojis.cache.values()];
        break;
      case 17:
        result = targetServer.memberCount;
        break;
      case 18:
        result = targetServer.createdAt;
        break;
      case 19:
        result = targetServer.afkTimeout ?? 0;
        break;
      case 20:
        result = targetServer.available;
        break;
      case 21:
        result = targetServer.large;
        break;
      case 22:
        result = targetServer.joinedAt;
        break;
      case 23:
        result = targetServer.channels.cache.size;
        break;
      case 24:
        result = targetServer.emojis.cache.size;
        break;
      case 25:
        result = !!targetServer.widgetEnabled;
        break;
      case 26:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "dnd").size;
        break;
      case 27:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "online").size;
        break;
      case 28:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "offline").size;
        break;
      case 29:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "idle").size;
        break;
      case 30:
        result = targetServer.members.cache.filter((m) => m.user?.bot).size;
        break;
      case 31:
        result = [...targetServer.channels.cache.keys()];
        break;
      case 32:
        result = [...targetServer.roles.cache.keys()];
        break;
      case 33:
        await fetchMembers();
        result = [...targetServer.members.cache.keys()];
        break;
      case 35:
        await fetchMembers();
        result = targetServer.members.cache.filter((m) => !m.user?.bot).size;
        break;
      case 37:
        result = targetServer.roles.cache.size;
        break;
      case 38:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_NEWS").size;
        break;
      case 39:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
        break;
      case 40:
        result = targetServer.verified;
        break;
      case 41:
        const bans = await targetServer.bans.fetch();
        result = [...bans.values()];
        break;
      case 42:
        const invites = await targetServer.invites.fetch();
        result = [...invites.values()];
        break;
      case 43:
        result = targetServer.explicitContentFilter;
        break;
      case 44:
        result = targetServer.premiumSubscriptionCount ?? 0;
        break;
      case 45:
        result = targetServer.premiumTier;
        break;
      case 46:
        result = targetServer.bannerURL({ format: "png", size: 4096 });
        break;
      case 47:
        result = targetServer.features;
        break;
      case 48:
        result = targetServer.ownerId;
        break;
      case 49:
        result = targetServer.vanityURLCode;
        break;
      case 50:
        result = targetServer.widgetChannelId;
        break;
      case 51:
          result = targetServer.afkChannelId;
        break;
      case 52:
        result = targetServer.premiumProgressBarEnabled;
        break;
      case 53:
        result = targetServer.description;
        break;
      case 54:
        result = targetServer.partnered;
        break;
      case 55:
        result = targetServer.rulesChannel;
        break;
      case 56:
        result = targetServer.rulesChannelId;
        break;
      case 57:
        result = targetServer.widgetChannel;
        break;
      case 58:
        result = targetServer.systemChannelId;
        break;
      case 59:
        result = targetServer.nsfwLevel;
        break;
      case 60:
        result = targetServer.mfaLevel;
        break;
      case 61:
        result = targetServer.createdTimestamp;
        break;
        case 62:
          result = `https://discord.new/${(await targetServer.fetchTemplates()).map(v => v.code)}`;
          break;
      case 63:
          result = `${(await targetServer.fetchTemplates()).map(v => v.code)}`;
          break;
          case 64:
          result = `${(await targetServer.fetchTemplates()).map(v => v.name)}`;
          break;
          case 65:
          result = `${(await targetServer.fetchTemplates()).map(v => v.description)}`;
          break;
          case 66:
          result = `${(await targetServer.fetchTemplates()).map(v => v.usageCount)}`;
          break;
          case 67:
          result = `${(await targetServer.fetchTemplates()).map(v => v.creatorId)}`;
          break;
          case 68:
          result = `${(await targetServer.fetchTemplates()).map(v => v.createdAt)}`;
          break;
          case 69:
          result = `${(await targetServer.fetchTemplates()).map(v => v.updatedAt)}`;
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
