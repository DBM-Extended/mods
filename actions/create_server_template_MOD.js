module.exports = {
  name: 'Create Server Template',
  section: 'Server Control',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: '[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Brazil/mods',
      downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

  subtitle (data) {
    return `${data.templatename}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName2, 'URL'])
  },

  fields: ['server',"varName",'templatename', 'templatedescricao', 'storage', 'varName2'],

  html (isEvent, data) {
    return `
<div>
<server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>
<br><br><br>
<div style="float: left; width: 100%;">
<span class="dbminputlabel">Nome do Modelo</span><br>
<input id="templatename" class="round" type="text">
</div>
<br><br><br>
<div style="padding-top: 3px;">
<span class="dbminputlabel">Descrição</span><br>
		  <textarea id="templatedescricao" name="templatedescricao" rows="3" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
      Máximo de 120 caracteres
	  </div>
    <br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variável</span><br>
    <input id="varName2" class="round" type="text">
  </div>
</div>`
  },

    init () {},

  async action(cache) {
    const data = cache.actions[cache.index]
    const targetServer = await this.getServerFromData(data.server, data.varName, cache);
    if (!targetServer) {
      return this.callNextAction(cache);
    }
    const templatename = this.evalMessage(data.templatename, cache)
    const templatedescricao = this.evalMessage(data.templatedescricao, cache)
    result = targetServer.createTemplate(templatename, templatedescricao).catch((err) => {
      console.log('Já existe um template no servidor')
      console.error(err)
    })

    if (result = `https://discord.new/${(await targetServer.fetchTemplates()).map(v => v.code)}`) {
      const storage = parseInt(data.storage)
      const varName2 = this.evalMessage(data.varName2, cache)
      this.storeValue(result, storage, varName2, cache)
      this.callNextAction(cache)
    }
  },


  mod () {}
}
