module.exports = {

  name: "Store Server Info",
  section: "Server Control",
  meta: {
    version: '2.1.4',
    preciseCheck: false,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle(data, presets) {
    const info = [
      "Server (Object)",
      "server ID",
      "Server Name",
      "Server name acronym",
      "Server Preferred Language",
      "Server icon URL",
      "Server Verification Level",
      "Server default channel",
      "Server AFK channel",
      "Server system channel",
      "Server default role",
      "Server Owner (Object)",
      "Server Bot",
      "Server Channel List",
      "Server's Position List",
      "Server Members List",
      "Server emoji list",
      "Server Member Count",
      "Server created on",
      "Server timeout AFK",
      "Server available",
      "Server Large",
      "Server connected on",
      "Server Channel count",
      "Server emoji count",
      "Server embed enabled",
      "Server busy member count",
      "Server online member count",
      "Server offline member count",
      "Server idle member count",
      "Server bot count",
      "List of Server Channel IDs",
      "List of Server Positions IDs",
      "List of Server Member IDs",
      "",
      "Server Human Count",
      "",
      "Server Position Count",
      "Server Text Channel Count",
      "Server Voice Channel Count",
      "Server Checked",
      "Server Banned List",
      "Server Invitation List",
      "Server explicit content filter",
      "Server boost count",
      "Server boost level",
      "Server banner URL",
      "Server resource list",
      "Server Owner ID",
      "Server Vanity Server URL code",
      "Server widget channel ID",
      "Server AFK channel ID",
      "Enable server progress bar",
      "Server Description",
      "Partner Server",
      "Server Rule Channel",
      "Server rule channel ID",
      "Server widget channel",
      "Server system channel ID",
      "Server NSFW level",
      "Server MFA/2FA level",
      "Server Timestamp",
      "Template URL",
      "Template Code",
      "Template Name",
      "Template Description",
      "Times the Template has been used",
      "Template creator ID",
      "Timestamp of Template creation",
      "Timestamp of Template update",
      "Total members in the voice channel",
      "List of members by ID present in the voice channels",
      "List of members present in the voice channels",
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
                        case 70:
                          dataType = "Number";
                          break;
                          case 71:
                            dataType = "List";
                            break;
                            case 72:
                              dataType = "List";
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
		<span class="dbminputlabel">Information</span><br>
		<select id="info" class="round">
      <optgroup label="General Server Information">
      <option value="0">Server (Object)</options>
      <option value="1">Server ID</options>
      <option value="2">Server name</options>
      <option value="3">Server name</options>
      <option value="53">Server description</options>
      <option value="5">URL of the server icon</options>
      <option value="7">Server's default channel</options>
      <option value="58">Server system channel ID</options>
      <option value="9">Server system channel</options>
      <option value="21">Large server</options>
      <option value="43">Server explicit content filter</options>
      <option value="10">Server default role</options>
      <option value="12">Server bot</options>
      <option value="20">Server available</options>
      </optgroup>
      <optgroup label="Server AFK information">
      <option value="8">Server AFK channel</options>
      <option value="51">Server AFK channel ID</options>
      <option value="19">Server AFK timeout</options>
      </optgroup>
      <optgroup label="Server boost information">
      <option value="44">Server boost count</options>
      <option value="45">Server boost level</options>
      </optgroup>
      <optgroup label="Server counts">
      <option value="17">Server member count</options>
      <option value="35">Server Human Count</options>
      <option value="30">Server bot count</options>
      <option value="24">Server emoji count</options>
      <option value="37">Server Job count</options>
      <option value="23">Server channel count</options>
      <option value="38">Server text channel count</options>
      <option value="39">Server voice channel count</options>
      <option value="70">Total members on voice channels</options>
      </optgroup>
      <optgroup label="Server community information"">
      <option value="54">Partnered server</options>
      <option value="55">Server rules channel</options>
      <option value="56">Server rule channel ID</options>
      <option value="4">Preferred server language</options>
      <option value="40">Server checked</options>
      <option value="52">Premium Server progress bar enabled</options>
      <option value="46">URL of the server banner</options>
      <option value="47">Server resource list</options>
      <option value="49">Server custom URL code</options>
      <option value="57">Server widget channel</options>
      <option value="50">Server widget channel ID</options>
      <option value="25">Server embedding enabled</options>
      </optgroup>
      <optgroup label="Server date information">
      <option value="61">Server timestamp</options>
      <option value="18">Server created on</options>
      <option value="22">Server connected on</options>
      </optgroup>
      <optgroup label="Server levels">
      <option value="59">Server NSFW level</options>
      <option value="6">Server verification level</options>
      <option value="60">Server MFA/2FA level</options>
      </optgroup>
      <optgroup label="Server List Information">
      <option value="15">Server member list</options>
      <option value="33">List of server member IDs</options>
      <option value="13">List of server channels</options>
      <option value="31">List of server channel IDs</options>
      <option value="16">List of server emojis</options>
      <option value="14">Server Positions list</options>
      <option value="32">List of Server Role IDs</options>
      <option value="41">Server Banned List</options>
      <option value="42">Server invite list</options>
      <option value="71">List of members by ID present on voice channels</options>
      <option value="72">List of members present on voice channels</options>
      </optgroup>
      <optgroup label="Server Owner Information">
      <option value="48">Server Owner ID</options>
      <option value="11">Server Owner (Object)</options>
      </optgroup>
      <optgroup label="Server Status Count">
      <option value="27">Server online member count</options>
      <option value="29">Server inactive member count</options>
      <option value="26">Server busy member count</options>
      <option value="28">Server offline member count</options>
      </optgroup>
      <optgroup label="Server Template">
      <option value="62">URL of Template</options>
      <option value="63">Template code</options>
      <option value="64">Template Name</options>
      <option value="65">Description of the Template</options>
      <option value="66">Times the Template has been used</options>
      <option value="67">Template creator ID</options>
      <option value="68">Timestamp of the Template creation</options>
      <option value="69">Template update timestamp</options>
      </optgroup>
		</select>
	</div>
</div>

<br>

<store-in-variable dropdownLabel="Store in" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
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
          case 70:
            result = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.size).reduce((s, a) => s + a, 0);
            break; 
            case 71:
              const str = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.map(member => member.user.id + ',').join('')).join('');  
              result = str.substring(0, str.length - 1).split(new RegExp(","));
              break;     
              case 72:
                result = targetServer.channels.cache.filter(d => d.type === 'GUILD_VOICE').map(d => d.members.map(member => member.user).join('')).join('');  
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
