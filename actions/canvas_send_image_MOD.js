module.exports = {
  name: 'Canvas Send Image',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle(data, presets) {
    return `${presets.getSendTargetText(data.channel, data.varName2)} - Source Image (${data.varName})`;
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage2)
    if (type !== varType) return
    return ([data.varName3, 'Message'])
  },

  fields: ['storage', 'varName', 'channel', 'varName2', 'message', 'compress', 'spoiler', 'storage2', 'varName3' ,"storage4", "varName4",],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Source Image</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Send To</span><br>
    <select id="channel" class="round" onchange="glob.sendTargetChange(this, 'varNameContainer2')">
      ${data.sendTargets[isEvent ? 1 : 0]}
    </select>
  </div>
  <div id="varNameContainer2" style="display: none; float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName2" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
<span class="dbminputlabel">Message</span><br>
  <textarea id="message" rows="1" placeholder="Insert message here..." style="width: 100%"></textarea>
</div><br>
<div>
  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Image Spoiler</span><br>
    <select id="spoiler" class="round">
      <option value="0" selected>No</option>
      <option value="1">Yes</option>
    </select><br>
  </div>
  <div style="padding-left: 5%; float: left; width: 50%;">
  <span class="dbminputlabel">Compression Level</span><br>
    <select id="compress" class="round">
      <option value="0">1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
      <option value="4">5</option>
      <option value="5">6</option>
      <option value="6">7</option>
      <option value="7">8</option>
      <option value="8">9</option>
      <option value="9" selected>10</option>
    </select><br>
  </div>
</div><br><br>
<div>
<br>
  <div id="embed1"><table><tr><td><span class="dbminputlabel">Embed Object</span><br>
    <select id="storage4" class="round">
      ${data.variables[1]}
    </select>
  </td><td><span class="dbminputlabel">Variable Name</span><br>
    <input id="varName4" placeholder="Optional" class="round" type="text" list="variableList">
  </td></tr></table>
  </div><br>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Store in</span><br>
    <select id="storage2" class="round" onchange="glob.variableChange(this, 'varNameContainer3')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer3" style="display: none; float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName3" class="round" type="text">
  </div>

</div>
<style>
table{width:100%}
td{width:50%;padding:0px 5px 0px 0px;}
</style>`
  },

  init () {
    const { glob, document } = this

    glob.refreshVariableList(document.getElementById('storage'))
    glob.sendTargetChange(document.getElementById('channel'), 'varNameContainer2')
    glob.variableChange(document.getElementById('storage2'), 'varNameContainer3')
  },

  async action (cache) {
    const data = cache.actions[cache.index];
    const { DiscordJS } = this.getDBM();
    const Canvas = require('canvas')
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const embed = this.getVariable(data.storage4, data.varName4, cache)
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    let messageOptions = {};
    if (embed !== undefined) {
    messageOptions.embeds = [embed];
  } else {}
    const channel = parseInt(data.channel)
    const varName2 = this.evalMessage(data.varName2, cache)
    const target = await this.getSendTargetFromData(channel, varName2, cache);
    const compress = parseInt(data.compress)
    const image = new Canvas.Image()
    image.src = imagedata
    const canvas = Canvas.createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    const name = `${parseInt(data.spoiler) === 1 ? 'SPOILER_' : ''}image.png`
    const buffer = canvas.toBuffer('image/png', { compressionLevel: compress })
    const message = this.evalMessage(data.message, cache)
     if (message.length > 0) {messageOptions.content = message;}
  messageOptions.files = [new DiscordJS.MessageAttachment(buffer, name)];
    if (target?.send) {
      target.send(messageOptions)
        .then((msgobject) => {
          const varName3 = this.evalMessage(data.varName3, cache)
          const storage2 = parseInt(data.storage2)
          this.storeValue(msgobject, storage2, varName3, cache)
          this.callNextAction(cache)
        })
    } else {
      this.callNextAction(cache)
    }
  },

  mod () {}
}
