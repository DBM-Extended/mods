module.exports = {
  name: 'Fetch User',
  section: 'Member Control',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: 'DBM Extended',
      authorUrl: 'https://github.com/DBM-Extended/mods',
      downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle (data) {
    return `${data.User}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'User'])
  },

  fields: ['User', 'storage', 'varName'],

  html (isEvent, data) {
    return `
<div> Created by XinXyla | Translated by DBMEx<br><br>
  <div style="padding-top: 8px;">
    Search user - ID:<br>
    <textarea class="round" id="User" rows="1" placeholder="" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
  </div><br>
</div>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  Store in:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
    Variable name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`
  },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const User = this.evalMessage(data.User, cache)
    const client = this.getDBM().Bot.bot

    client.users.fetch(User).catch(console.error).then((User) => {
      const storage = parseInt(data.storage)
      const varName = this.evalMessage(data.varName, cache)
      this.storeValue(User, storage, varName, cache)
      this.callNextAction(cache)
    })
  },


  mod () {}
}
