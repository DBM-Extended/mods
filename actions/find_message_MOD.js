module.exports = {
  name: 'Find Message',
  section: 'Messaging',
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[Snull - 612775910449610763]<br>[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data) {
    const channels = [
      'Mesmo Canal',
      'Canal Mencionado',
      '1º Canal do Servidor',
      'Variável Temporaria',
      'Variável do Servidor',
      'Variável Global',
    ];
    const info = ['Localizar por conteúdo', 'Localizar por ID'];
    return `${channels[parseInt(data.channel, 10)]} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'Message'];
  },

  fields: ['channel', 'varName', 'info', 'search', 'storage', 'varName2'],

  html(isEvent, data) {
    return `

<div>
<table style="width: 100%;"><tr><td style="width: 60%">
  <span class="dbminputlabel">Canal</span><br>
    <select id="channel" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
      ${data.channels[isEvent ? 1 : 0]}
    </select>
    </td><td style="width: 40%">
  <div id="varNameContainer" style="display: none; float: right; width: 90%;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList">
  </div></td></tr></table>
<div><br>
  <div style="float: left; width: 70%;">
  <span class="dbminputlabel">Encontrar por</span><br>
    <select id="info" class="round">
      <option value="0" selected>Localizar por conteúdo</option>
      <option value="1">Localizar por ID</option>
    </select>
  </div><br><br><br>
  <div style="float: left; width: 70%;">
  <span class="dbminputlabel">Buscar por</span><br>
    <input id="search" class="round" type="text"><br>
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
</div><br><br><br>
<div>
<br><br><p>
  <u>Nota:</u><br>
  Este MOD só pode encontrar mensagens por <b>conteúdo</b> nas últimas 100 mensagens.<br>
  Se houver várias mensagens com o mesmo conteúdo, o bot estará sempre usando a mensagem mais antiga (após o início).
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.channelChange(document.getElementById('channel'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = parseInt(data.channel, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    const search = this.evalMessage(data.search, cache);
    const targetChannel = await this.getChannel(channel, varName, cache);
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);

    if (!targetChannel) return this.callNextAction(cache);
    if (!search) {
      console.error('Erro: Insira algo para pesquisar na ação Find Message.');
      return this.callNextAction(cache);
    }

    switch (info) {
      case 0:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            const message = messages.find((el) => el.content.includes(search));
            if (message !== undefined) {
              this.storeValue(message, storage, varName2, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 1:
        targetChannel.messages
          .fetch(search)
          .then((message) => {
            if (message !== undefined) {
              this.storeValue(message, storage, varName2, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error();
            this.callNextAction(cache);
          });
        break;
      default:
        this.callNextAction(cache);
    }
  },

  mod() {},
};
