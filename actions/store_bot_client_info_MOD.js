module.exports = {
  name: 'Store Bot Client Info',
  section: 'Bot Client Control',
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[Snull - 612775910449610763]<br>[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data) {
    const info = [
      'Tempo de atividade em milissegundos',
      'Pronto em?',
      'Ping',
      'Valor da Guilda',
      'Quantia do usuário',
      'Ping arredondado',
      'Tempo de atividade em segundos',
      'Tempo de atividade em minutos',
      "Token de Bots",
      'Valor das conexões de voz',
      'Quantidade total de canais',
      'Quantidade total de emojis',
      'Esta opção foi removida',
      'Tempo de atividade em dias',
      'Tempo de atividade em dias (arredondado)',
      'Uso de memória (RAM)',
      'Objetos dos Servidores de bot',
      'Nomes dos Servidores de bot',
      'Bot Guilds IDs',
      'Prefixo atual do bot',
      'ID do cliente do bot',
      'Versão do Discord JS',
      'Tempo de atividade em horas',
      'Atualizando o tempo de atividade em dias',
      'Atualizando o tempo de atividade em horas',
      'Atualizando o tempo de atividade em minutos',
      'Atualizando o tempo de atividade em segundos',
      'Uso de memória (RAM) em MB',
      "SO dos Bots (Plataforma de Processo)",
      'Uso da CPU em MB',
      "Diretório de Bots",
      'Versão do Node JS',
      'Quantidade Total de Comandos',
      'Quantidade Total de Eventos',
      'Pronto em? [timestamp]',
      'Contagem de núcleos de CPU',
      'Memória Total (GB)',
      'Memória Total (MB)',
      'Memória disponível (GB)',
      'Memória disponível (MB)',
      'Memoria disponivel (%)',
      'Memória usada (GB)',
      'Memória usada (MB)',
      'Memoria usada (%)',
      'ID do proprietário do bot',
      'Os comandos diferenciam maiúsculas de minúsculas?',
      'ID da última mensagem',
      'Média de CPU (1m, 5m, 15m)',
      'Uso atual da CPU',
    ];
    return `Bot Client - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0: // Uptime in Milliseconds
      case 22: // Uptime in Hours
      case 27: // Memory (RAM) Usage in MB
      case 29: // CPU Usage in MB
      case 32: // Amount of Commands
      case 33: // Amount of Events
      case 34: // Ready At ? [Timestamp]
      case 35: // CPU Core Amount
      case 36: // Total Memory (GB)
      case 37: // Total Memory (MB)
      case 38: // Available Memory (GB)
      case 39: // Available Memory (MB)
      case 40: // Available Memory (%)
      case 41: // Used Memory (GB)
      case 42: // Used Memory (MB)
      case 43: // Used Memory (%)
      case 48: // CPU Usage (%)
      case 2: // Ping
      case 3: // Guild Amount
      case 4: // User Amount
      case 5: // Rounded Ping
      case 6: // Uptime in Seconds
      case 7: // Uptime in Minutes
      case 9: // Voice Connections Amount
      case 10: // Total Amount of Channels
      case 11: // Total Amount of Emojis
      case 15: // Memory (Ram) Usage
        dataType = 'Number';
        break;
      case 1: // Ready At
        dataType = 'Date';
        break;
      case 8: // Bots' Token
        dataType = 'Token';
        break;
      case 16: // Bot Guilds Objects
        dataType = 'Guild';
        break;
      case 17: // Bot Guilds Names
        dataType = 'Guild Name';
        break;
      case 18: // Bot Guilds IDs
        dataType = 'Guild ID';
        break;
      case 19: // Bot Current Prefix
        dataType = 'Bot Tag';
        break;
      case 20: // Bot Client ID
        dataType = 'Bot ID';
        break;
      case 13: // Uptime in Days
      case 14: // Uptime in Days (Rounded)
      case 23: // Refreshing Uptime in Days
      case 24: // Refreshing Uptime in Hours
      case 25: // Refreshing Uptime in Minutes
      case 26: // Refreshing Uptime in Seconds
        dataType = 'Time';
        break;
      case 28: // Bots' OS (Process Platform)
        dataType = 'OS Name';
        break;
      case 30: // Bots' Directory
        dataType = 'Directory';
        break;
      case 21: // Discord JS Version
      case 31: // Node JS Version
        dataType = 'Version Number';
        break;
      case 44: // Bot Owner ID
        dataType = 'Bot Owner ID';
        break;
      case 45: // Are Commands Case Sensitive?
        dataType = 'Boolean';
        break;
      case 46: // Last Message ID
        dataType = 'Last Message ID';
        break;
      case 47: // CPU Load Average
        dataType = 'Average CPU Usage Array';
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ['info', 'storage', 'varName2'],

  html(_isEvent, data) {
    return `
<div style="float: left; width: 100%; padding-top: 8px;">
<span class="dbminputlabel">Informação</span><br>
  <select id="info" class="round">
    <optgroup label="Uptimes">
    <option value="23">Atualizando o tempo de atividade em dias</option>
    <option value="24">Atualizando o tempo de atividade em horas</option>
    <option value="25">Atualizando o tempo de atividade em minutos</option>
    <option value="26">Atualizando o tempo de atividade em segundos</option>
    <option value="0">Tempo de atividade em milissegundos</option>
  </optgroup>
  <optgroup label="Valores">
    <option value="3">Quantidade Total de Servidores</option>
    <option value="4">Quantidade total de usuários</option>
    <option value="10">Quantidade total de canais</option>
    <option value="11">Quantidade total de emojis</option>
    <option value="32">Quantidade total de comandos</option>
    <option value="33">Quantidade total de eventos</option>
    <option value="9">Total de conexões de voz</option>
  </optgroup>
  <optgroup label="Matrizes de Servidores">
    <option value="16">Objetos de Servidores do bot</option>
    <option value="17">Nomes dos Servidores do bot</option>
    <option value="18">IDs dos Servidores do bot</option>
  <optgroup label="Informações do bot">
    <option value="19">Prefixo atual do bot</option>
    <option value="20">ID do cliente do bot</option>
    <option value="44">ID do proprietário do bot</option>
    <option value="28">Bot OS (Plataforma de Processo)</option>
    <option value="30">Diretório de bot</option>
    <option value="8">Bot Token (cuidado)</option>
    <option value="45">Os comandos diferenciam maiúsculas de minúsculas?</option>
    <option value="46">ID da última mensagem</option>
  </optgroup>
  <optgroup label="Medidas do Sistema">
    <option value="29">Uso da CPU (MB)</option>
    <option value="47">Uso médio da CPU [1m, 5m, 15m] (%)</option>
    <option value="48">Uso da CPU (%)</option>
    <option value="35">Contagem de núcleos de CPU</option>
    <option value="36">Memória total (GB)</option>
    <option value="37">Memória total (MB)</option>
    <option value="38">Memória disponível (GB)</option>
    <option value="39">Memória disponível (MB)</option>
    <option value="40">Memória disponível (%)</option>
    <option value="41">Memória usada (GB)</option>
    <option value="42">Memória usada (MB)</option>
    <option value="43">Memória usada (%)</option>
  </optgroup>
  <optgroup label="Medidas do bot">
    <option value="27">Uso de memória (RAM) em MB</option>
    <option value="1">Bot iniciado em</option>
    <option value="34">Bot iniciado em [timestamp unix]</option>
    <option value="2">Ping</option>
    <option value="5">Ping arredondado</option>
  </optgroup>
  <optgroup label="Versões">
  <option value="21">Versão do Discord JS</option>
  <option value="31">Versão do Node JS</option>
    </optgroup>
  </select>
</div><br><br><br>
<div>
  <div style="float: left; width: 35%; padding-top: 8px;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName2" class="round" type="text"><br>
  </div>
</div>`;
  },

  init() {},

  async action(cache) {
    const botClient = this.getDBM().Bot.bot;
    const { Bot } = this.getDBM();
    const os = require('os');
    if (process.platform === 'win32') this.getMods().require('loadavg-windows'); // Make loadavg work on windows.
    const DBM = this.getDBM();
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const msToDay = 1000 * 60 * 60 * 24;

    if (!botClient) return this.callNextAction(cache);

    let result;
    switch (info) {
      case 0: // Uptime in Milliseconds //Deprecated in 1.8.5
        result = botClient.uptime;
        break;
      case 1: // Ready At
        result = botClient.readyAt;
        break;
      case 2: // Ping
        result = botClient.ws.ping;
        break;
      case 3: // Guild Amount
        result = botClient.guilds.cache.size;
        break;
      case 4: // User Amount
        result = botClient.guilds.cache.map(g => g.memberCount).reduce((a, g) => a + g);
        break;
      case 5: // Rounded Ping
        result = Math.round(botClient.ws.ping);
        break;
      case 6: // Uptime in Seconds // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000);
        break;
      case 7: // Uptime in Minutes // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000 / 60);
        break;
      case 8: // Bots' Token
        result = botClient.token;
        break;
      case 9: // Voice Connections Amount
        result = botClient.voice.adapters.size;
        break;
      case 10: // Total Amount of Channels
        result = botClient.channels.cache.size;
        break;
      case 11: // Total Amount of Emojis
        result = botClient.emojis.cache.size;
        break;
      case 13: // Uptime in Days // Deprecated in 1.8.5
        result = botClient.uptime / msToDay;
        break;
      case 14: // Uptime in Days (Rounded) // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / msToDay);
        break;
      case 15: // Memory (Ram) Usage // Deprecated in 1.8.8
        result = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`;
        break;
      case 16: // Bot Guilds Objects
        result = botClient.guilds.cache.array();
        break;
      case 17: // Bot Guilds Names
        result = botClient.guilds.cache.map((g) => g.name);
        break;
      case 18: // Bot Guilds IDs
        result = botClient.guilds.cache.map((g) => g.id);
        break;
      case 19: // Bot Current Prefix
        result = DBM.Files.data.settings.tag;
        break;
      case 20: // Bot Client ID
        result = DBM.Files.data.settings.client;
        break;
      case 21: // Discord JS Version
        result = DBM.DiscordJS.version;
        break;
      case 22: // Uptime in Hours // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000 / 60 / 60);
        break;
      case 23: // Refreshing Uptime in Days
        result = Math.floor((process.uptime() % 31536000) / 86400);
        break;
      case 24: // Refreshing Uptime in Hours
        result = Math.floor((process.uptime() % 86400) / 3600);
        break;
      case 25: // Refreshing Uptime in Minutes
        result = Math.floor((process.uptime() % 3600) / 60);
        break;
      case 26: // Refreshing Uptime in  Seconds
        result = Math.round(process.uptime() % 60);
        break;
      case 27: // Memory (RAM) Usage in MB
        result = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        break;
      case 28: // Bots' OS (Process Platform)
        if (process.platform) {
          const { platform } = process;
          if (platform === 'win32') result = 'Windows';
          else if (platform === 'aix') result = 'Aix';
          else if (platform === 'linux') result = 'Linux';
          else if (platform === 'darwin') result = 'Darwin';
          else if (platform === 'openbsd') result = 'OpenBSD';
          else if (platform === 'sunos') result = 'Solaris';
          else if (platform === 'freebsd') result = 'FreeBSD';
        }
        break;
      case 29: // CPU Usage in MB
        result = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
        break;
      case 30: // Bots' Directory
        result = process.cwd();
        break;
      case 31: // Node JS Version
        result = process.versions.node;
        break;
      case 32: // Amount of Commands
        result = DBM.Files.data.commands.length;
        break;
      case 33: // Amount of Events
        result = DBM.Files.data.events.length;
        break;
      case 34: // Ready At ? [Timestamp]
        result = botClient.readyTimestamp;
        break;
      case 35: // CPU Core Amount
        result = os.cpus().length;
        break;
      case 36: // Total Memory (GB)
        result = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        break;
      case 37: // Total Memory (MB)
        result = (os.totalmem() / 1024 / 1024).toFixed(0);
        break;
      case 38: // Available Memory (GB)
        result = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        break;
      case 39: // Available Memory (MB)
        result = (os.freemem() / 1024 / 1024).toFixed(0);
        break;
      case 40: // Available Memory (%)
        result = Math.floor((os.freemem() / os.totalmem()) * 100);
        break;
      case 41: // Used Memory (GB)
        result = ((os.totalmem() - os.freemem() / 1024) / 1024 / 1024).toFixed(2);
        break;
      case 42: // Used Memory (MB)
        result = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(0);
        break;
      case 43: // Used Memory (%)
        result = Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);
        break;
      case 44: // Bot Owner ID
        result = DBM.Files.data.settings.ownerId;
        break;
      case 45: // Are Commands Case Sensitive?
        result = Bot._caseSensitive;
        break;
      case 46: // Last Message ID
        result = botClient.user.lastMessageID;
        break;
      case 47: // CPU Usage Average [1m, 5m, 15m]
        result = os.loadavg();
        break;
      case 48: // Current CPU Usage
        result = os.loadavg[0];
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
