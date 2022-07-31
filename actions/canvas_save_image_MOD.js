module.exports = {
  name: 'Canvas Save Image',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle (data) {
    return `Save to "${data.Path}"`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage2)
    if (type !== varType) return
    return ([data.varName2, 'Image URL'])
  },

  fields: ['storage', 'varName', 'Path', 'storage2', 'varName2'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div>
  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Source Image</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="padding-left: 2%; float: left; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Path (Save to Local)</span><br>
    <input id="Path" class="round" type="text" placeholder="resources/output.png"><br>
  </div>
</div><br><br>
<div>
  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Store In</span><br>
    <select id="storage2" onchange="glob.onComparisonChanged(this)" class="round">
      ${data.variables[0]}
    </select><br>
  </div>
  <div style="padding-left: 2%; float: left; width: 60%;" id="containerxin">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName2" class="round" type="text"><br>
  </div>
</div>`
  },

  init () {
    const { document, glob } = this

    glob.onComparisonChanged = function (event) {
      if (event.value == 0) {
        document.getElementById("containerxin").style.display = "none";
      } else
      {document.getElementById("containerxin").style.display = "block";}
    };

    glob.onComparisonChanged(document.getElementById("storage2"));
    glob.refreshVariableList(document.getElementById('storage'))
  },

  action (cache) {
    const data = cache.actions[cache.index]
    const fs = require('fs')
    const Canvas = require('canvas')
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    const canvas = Canvas.createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    const buffer = canvas.toBuffer()
    const Path = this.evalMessage(data.Path, cache)
    if (Path) {
      fs.writeFileSync(Path, buffer)
      const varName2 = this.evalMessage(data.varName2, cache)
      const storage2 = parseInt(data.storage2)
      if (varName2 && storage2) {
        this.storeValue(Path, storage2, varName2, cache)
      }
    }
    this.callNextAction(cache)
  },

  mod () {}
}
