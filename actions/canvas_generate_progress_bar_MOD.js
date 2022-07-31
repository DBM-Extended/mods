module.exports = {
  name: 'Canvas Generate Progress Bar',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle (data) {
    const storeTypes = ['', 'Temp Variable', 'Server Variable', 'Global Variable']
    const type = ['Basic', 'Circle']
    const index = parseInt(data.type)
    return `Progress bar ${type[index]} - ${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },
  fields: ['storage', 'varName', 'type', 'width', 'height', 'lineWidth', 'lineCap', 'percent', 'color', "tipocor2", "gradiente2" , 'colorfundo', "tipocor", "gradiente" , "blur", "shadowcor" ,  "blur2", "shadowcor2" , "rotacao"],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>

    <table style="width:100%;">
		<tr>
			<td>
				<span class="dbminputlabel">Store in</span><br>
				<select id="storage" class="round" style="width: 100%">
					${data.variables[1]}
				</select>
			</td>
			<td>
				<span class="dbminputlabel">Variable Name</span><br>
				<input id="varName" class="round" type="text" list="variableList">
			</td>
		</tr>
	</table><br>
    <tab-system style="margin-top: 0">
		<tab label="Bar" icon="align left">
				<div style="padding:8px">
        <table style="width:100%">
        <tr>
        <td style="width:50% !important">
        <span class="dbminputlabel">Type</span><br>
        <select id="type" class="round" onchange="glob.onChange1(this)">
          <option value="0" selected>Basic</option>
          <option value="1">Circle</option><br>
        </select>
        </td>
        <td style="width:50% !important">
        <span class="dbminputlabel">Type of line</span><br>
        <select id="lineCap" class="round">
          <option value="0" selected>Square</option>
          <option value="1">Round</option>
        </select>
        </td>
        </tr></table>

        <table style="width:100%"><tr>
<td style="width:33% !important">
<span class="dbminputlabel"><span id="Change1text">Width</span></span><br>
<input id="width" class="round" type="text">
</td>
<td style="width:33% !important">
<span class="dbminputlabel"><span id="Change2text">Height</span></span><br>
    <input id="height" class="round" type="text">
</td>
<td style="width:33% !important">
<span class="dbminputlabel">Thickness</span><br>
    <input id="lineWidth" class="round" type="text">
</td>
</tr></table>

<div style="padding: 12px 4px 0px 4px">
<span class="dbminputlabel">Percentage</span><br>
    <input id="percent" class="round" type="text"></div>

    <div id="conteudo2g" style="padding: 12px 4px 4px 4px">
<span class="dbminputlabel">Rotate (Degrees)</span><br>
    <input id="rotacao" class="round" value="0" type="text"></div>
   
    </div>

</tab>
<tab label="Cor" icon="align left">
<div style="padding:2px">
<table style="width:100%;height:250px"><tr><td style="width:50%;vertical-align:top">
<span class="dbminputlabel">Bar Color</span><br>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:6px">

<span class="dbminputlabel">Color Type</span><br>
<select id="tipocor2" class="round" onchange="glob.onChange2(this)">
  <option value="0" selected>None</option>
  <option value="1">Color (HEX or RGBA)</option>
  <option value="2">Color Gradient</option>
</select><br>
<div id="gradient2">
<span class="dbminputlabel">Gradient</span>
<textarea id="gradiente2" name="gradientes" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
</div>

<div id="cor2">
<span class="dbminputlabel">Background Color (HEX or RGBA)</span><br>
    <table style="width:100%"><tr><th><input id="colorfundo" name="actionxinxyla" class="round" type="text" placeholder="Optional"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('colorfundo').type = 'color'
      document.getElementById('2btr1').style.display = 'none';
      document.getElementById('2btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Color</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('colorfundo').type = 'text';
        document.getElementById('2btr1').style.display = 'block';
        document.getElementById('2btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Text</button></a><th></tr></table>
</td><td style="width:50%;vertical-align:top">
<span class="dbminputlabel">Bar Color de Progresso</span><br>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:6px">
<span class="dbminputlabel">Color Type</span>
<select id="tipocor" class="round" onchange="glob.onChange0(this)">
  <option value="0" selected>Color (HEX or RGBA)</option>
  <option value="1">Color Gradient</option>
</select>
<br>
<div id="gradient">
<span class="dbminputlabel">Gradient</span>
<textarea id="gradiente" name="gradientes" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
</div>

<div id="cor">
<span class="dbminputlabel">Color (HEX or RGBA)</span><br>
    <table style="width:100%"><tr><th><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Required"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Color</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Text</button></a><th></tr></table>
</div>
</td></tr></table>


</div>

</div>
</tab>

<tab label="Shadow" icon="align left">
<div style="padding:2px">
<table style="width:100%"><tr><td style="width:50%;vertical-align:top">
<span class="dbminputlabel">Bar Shadow</span><br>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px">
<span class="dbminputlabel">Blur</span><br>
    <input id="blur2" class="round" value="0" type="text">
    <br>
    <span class="dbminputlabel">Shadow Color</span><br>
    <table style="width:100%"><tr><th><input id="shadowcor2" name="actionxinxyla" class="round" type="text" placeholder="Optional"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="4btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('shadowcor2').type = 'color'
      document.getElementById('4btr1').style.display = 'none';
      document.getElementById('4btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Color</button></a><a id="4btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('shadowcor2').type = 'text';
        document.getElementById('4btr1').style.display = 'block';
        document.getElementById('4btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Text</button></a><th></tr></table>
    </div>
</td>
<td style="width:50%;vertical-align:top">
<span class="dbminputlabel">Progress Bar Shadow</span><br>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px">
<span class="dbminputlabel">Blur</span><br>
    <input id="blur" class="round" value="0" type="text">
   <br>
    <span class="dbminputlabel">Shadow Color</span><br>
    <table style="width:100%"><tr><th><input id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Optional"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('shadowcor').type = 'color'
      document.getElementById('3btr1').style.display = 'none';
      document.getElementById('3btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Color</button></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('shadowcor').type = 'text';
        document.getElementById('3btr1').style.display = 'block';
        document.getElementById('3btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Text</button></a><th></tr></table>
       </div>
</td></tr></table>


</div>
</tab>
</tab-system>

<style>
td{padding:5px}</style>`
  },

  init () {
    const { glob, document } = this

    glob.onChange0 = function (event) {
      switch (parseInt(event.value)) {
        case 0:
        gradient.style.display = 'none'
        cor.style.display = null
        break
        case 1:
        gradient.style.display = null
        cor.style.display = 'none'
        break
      }
      }
      glob.onChange0(document.getElementById('tipocor'))

      glob.onChange2 = function (event) {
        switch (parseInt(event.value)) {
          case 0:
            gradient2.style.display = 'none'
            cor2.style.display = 'none'
          break
          case 1:
          gradient2.style.display = 'none'
          cor2.style.display = null
          break
          case 2:
          gradient2.style.display = null
          cor2.style.display = 'none'
          break
        }
        }
        glob.onChange2(document.getElementById('tipocor2'))

    glob.onChange1 = function (event) {
      const Change1text = document.getElementById('Change1text')
      const Change2text = document.getElementById('Change2text')
      if (event.value === '0') {
        Change1text.innerHTML = 'Width'
        Change2text.innerHTML = 'Height'
        conteudo2g.style.display = 'none'
      } else if (event.value === '1') {
        Change1text.innerHTML = 'Raio'
        Change2text.innerHTML = 'Size'
        conteudo2g.style.display = null
      }
    }
    glob.onChange1(document.getElementById('type'))
  },

  action (cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const tipocor = parseInt(data.tipocor);
    const tipocor2 = parseInt(data.tipocor2);
    const type = parseInt(data.type)
    const width = parseInt(data.width)
    const height = parseInt(data.height)
    const rotacao = this.evalMessage(data.rotacao, cache)
    const percent = this.evalMessage(data.percent, cache)
    const shadowcor = this.evalMessage(data.shadowcor, cache);
    let blur = parseInt(this.evalMessage(data.blur, cache));
    if (isNaN(blur)) {
      blur = 0;
    }
    const shadowcor2 = this.evalMessage(data.shadowcor2, cache);
    let blur2 = parseInt(this.evalMessage(data.blur2, cache));
    if (isNaN(blur2)) {
      blur2 = 0;
    }
    const lineWidth = parseInt(data.lineWidth)
    const lineCap = parseInt(data.lineCap)
    let Cap
    switch (lineCap) {
      case 0:
        Cap = 'square'
        break
      case 1:
        Cap = 'round'
        break
    }
    const color = this.evalMessage(data.color, cache)
    const colorfundo = this.evalMessage(data.colorfundo, cache)
    let canvas
    if (type === 0) {
      canvas = Canvas.createCanvas(width, height)
    } else if (type === 1) {
      canvas = Canvas.createCanvas(height, height)
    }
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = lineWidth
    if (type === 0) {
      ctx.lineCap = Cap
      ctx.stroke()
      ctx.beginPath()
          if(tipocor2 > 0){
          if(tipocor2 == 2) {
            eval(String(this.evalMessage(data.gradiente2, cache)))
            ctx.strokeStyle = gradient;
              } else
          {   
            
          ctx.strokeStyle = colorfundo}
          if(lineCap == 1){
            const center = lineWidth / 2
                const top = height / 2 - center
                const bottom = height / 2 + center
                ctx.moveTo(center, top)
                ctx.lineTo(width - lineWidth, top)
                ctx.arcTo(width, top, width, height / 2, center)
                ctx.arcTo(width, bottom, top, bottom, center)
                ctx.lineTo(center, bottom)
                ctx.arcTo(0, bottom, 0, height / 2, center)
                ctx.arcTo(0, top, center, top, center)
                ctx.closePath()
                ctx.clip()
                ctx.beginPath()
                ctx.moveTo(-center, height / 2)
                ctx.lineTo(width * percent / 100 - center, height / 2)
          }
          ctx.shadowColor = shadowcor2
          ctx.shadowBlur = blur2
          ctx.moveTo(0, height / 2)
          ctx.lineTo(width * 100 / 100, height / 2)
          ctx.lineCap = Cap
          ctx.stroke()
      
        }

          ctx.beginPath()
          if(tipocor == 1) {
            eval(String(this.evalMessage(data.gradiente, cache)))
            ctx.strokeStyle = gradient;
              } else
          {ctx.strokeStyle = color}
          ctx.moveTo(0, height / 2)
          ctx.shadowColor = shadowcor
          ctx.shadowBlur = blur;
          ctx.lineTo(width * percent / 100, height / 2)
          ctx.lineCap = Cap
          ctx.stroke()
    } else if (type === 1) {
      ctx.translate(height / 2, height / 2)
      ctx.rotate(rotacao * Math.PI / 180)
      if(tipocor2 > 0){
        if(tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
            } else
        {ctx.strokeStyle = colorfundo}
        ctx.shadowColor = shadowcor2
        ctx.shadowBlur = blur2
      ctx.beginPath()
      ctx.arc(0, 0, width, 0, Math.PI * 2 * 100 / 100, false)
      ctx.lineCap = Cap
      ctx.stroke()}

      ctx.beginPath()
      if(tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
          } else
      {ctx.strokeStyle = color}
      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;
      ctx.beginPath()
      ctx.arc(0, 0, width, 0, Math.PI * 2 * percent / 100, false)
    }
    ctx.lineCap = Cap
    ctx.stroke()
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
