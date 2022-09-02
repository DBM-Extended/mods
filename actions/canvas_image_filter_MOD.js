module.exports = {
  name: 'Canvas Image Filter',
  section: 'Image Editing',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle (data) {
    const storeTypes = ['', 'Temp Variable', 'Server Variable', 'Global Variable']
    const filter = ['Blur', 'Rotate Hue', 'Brightness', 'Contrast', 'Grayscale', 'Invert', 'Opacity', 'Saturate', 'Sepia']
    return `${storeTypes[parseInt(data.storage)]} (${data.varName}) -> ${filter[parseInt(data.info)]} (${data.value})`
  },

  fields: ['storage', 'varName', 'info', 'value'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
<div>
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Source Image</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="float: right; width: 50%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Filter</span><br>
    <select id="info" class="round" onchange="glob.onChange1(this)">
        <option value="0" selected>Blur</option>
        <option value="1">Hue Rotate</option>
        <option value="2">Brightness</option>
        <option value="3">Contrast</option>
        <option value="4">Grayscale</option>
        <option value="5">Invert</option>
        <option value="6">Opacity</option>
        <option value="7">Saturate</option>
        <option value="8">Sepia</option>
    </select><br>
  </div>
  <div style="float: right; width: 50%;">
  <span class="dbminputlabel"><span id="valuetext">Value</span></span><br>
    <input id="value" class="round" type="text" placeholder="0 = None filter"><br>
  </div>
</div>`
  },

  init () {
    const { glob, document } = this

    glob.refreshVariableList(document.getElementById('storage'))

    glob.onChange1 = function (event) {
      const value = parseInt(event.value)
      const valuetext = document.getElementById('valuetext')
      if (value === 1) {
        valuetext.innerHTML = 'Valor (Grau)'
      } else {
        valuetext.innerHTML = 'Valor (Percentage)'
      }
    }

    glob.onChange1(document.getElementById('info'))
  },

  action (cache) {
    const Canvas = require('canvas')
    const Filter = require('imagedata-filters')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    const info = parseInt(data.info)
    let value = this.evalMessage(data.value, cache)
    const canvas = Canvas.createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imgdata = ctx.getImageData(0, 0, image.width, image.height)
    let imagedata2
    switch (info) {
      case 0:
        value = (Number(value) / 100).toString()
        imagedata2 = Filter.blur(imgdata, { amount: value })
        break
      case 1:
        value = (Number(value) / 180 * Math.PI).toString()
        imagedata2 = Filter.hueRotate(imgdata, { amount: value })
        break
      case 2:
        value = ((100 - Number(value)) / 100).toString()
        imagedata2 = Filter.brightness(imgdata, { amount: value })
        break
      case 3:
        value = ((100 - Number(value)) / 100).toString()
        imagedata2 = Filter.contrast(imgdata, { amount: value })
        break
      case 4:
        value = (Number(value) / 100).toString()
        imagedata2 = Filter.grayscale(imgdata, { amount: value })
        break
      case 5:
        value = (Number(value) / 100).toString()
        imagedata2 = Filter.invert(imgdata, { amount: value })
        break
      case 6:
        value = ((100 - Number(value)) / 100).toString()
        imagedata2 = Filter.opacity(imgdata, { amount: value })
        break
      case 7:
        value = ((100 - Number(value)) / 100).toString()
        imagedata2 = Filter.saturate(imgdata, { amount: value })
        break
      case 8:
        value = (Number(value) / 100).toString()
        imagedata2 = Filter.sepia(imgdata, { amount: value })
    }
    ctx.putImageData(imagedata2, 0, 0)
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
