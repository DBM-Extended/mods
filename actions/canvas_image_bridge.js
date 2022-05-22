module.exports = {

  name: 'Canvas Image Bridge',

  section: 'Image Editing',

  subtitle: function (data) {
    const bridge = ['Canvas to Jimp', 'Jimp to Canvas']
    const storeTypes = ['', 'Temp Variable', 'Server Variable', 'Global Variable']
    return `${bridge[parseInt(data.bridge)]} ${storeTypes[parseInt(data.storage)]} (${data.varName}) -> ${storeTypes[parseInt(data.storage2)]} (${data.varName2})`
  },

  variableStorage: function (data, varType) {
    const type = parseInt(data.storage2)
    if (type !== varType) return
    return ([data.varName2, 'Image'])
  },

  fields: ['storage', 'varName', 'type', 'varName2', 'storage2'],

  html: function (isEvent, data) {
    return `
  <div>
    <div style="float: left; width: 60%;">
      Bridge Direction:<br>
      <select id="type" class="round">
        <option value="0" selected>From Canvas to Jimp</option>
        <option value="1">From Jimp to Canvas</option>
      </select>
    </div>
  </div><br><br><br>
  <div>
    <div style="float: left; width: 35%;">
      Source Image:<br>
      <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
        ${data.variables[1]}
      </select>
    </div>
    <div style="float: right; width: 60%;">
      Variable Name:<br>
      <input id="varName" class="round" type="text" list="variableList">
    </div>
  </div><br><br><br>
  <div>
    <div style="float: left; width: 35%;">
      Store In:<br>
      <select id="storage2" class="round">
        ${data.variables[1]}
      </select>
    </div>
    <div style="float: right; width: 60%;">
      Variable Name:<br>
      <input id="varName2" class="round" type="text">
    </div>
  </div>`
  },

  init: function () {
    const { glob, document } = this
    glob.refreshVariableList(document.getElementById('storage'))
  },

  action: async function (cache) {
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const image = this.getVariable(storage, varName, cache)
    if (!image) {
      this.Canvas.onError(data, cache, 'Image not exist!')
      this.callNextAction(cache)
      return
    }
    try {
      const type = parseInt(data.type)
      const result = await this.Canvas.bridge(image, type)
      const storage2 = parseInt(data.storage2)
      const varName2 = this.evalMessage(data.varName2, cache)
      this.storeValue(result, storage2, varName2, cache)
      this.callNextAction(cache)
    } catch (err) {
      this.Canvas.onError(data, cache, err)
    }
  },

  mod: function (DBM) {
    DBM.Actions.Canvas.bridge = async function (image, type) {
      const Jimp = DBM.Actions.getMods().require('jimp')
      if (type && type === 0) {
        return await Jimp.read(this.Canvas.toBuffer(image))
      } else {
        return await image.getBufferAsync(Jimp.MIME_PNG)
      }
    }
  }
}
