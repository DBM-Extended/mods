module.exports = {
  name: "Canvas Store Info",
  section: 'Other Stuff',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle(data, presets) {
    const info = [
      "Image Object",
      "Image Width",
      "Image Height",
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },


  variableStorage: function(data, varType) {
    const type = parseInt(data.storage);
    const prse2 = parseInt(data.info);
    const info2 = ['Object','Width','height'];
    if(type !== varType) return;
    return ([data.varName2, info2[prse2]]);
},


  fields: [ "storage", "varName", "info", "storage2", "varName2"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>

    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Source Image</span><br>
    <select id="storage" class="round" style="width: 100%" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select></td>
    <td><span class="dbminputlabel">Variable Name</span><br>
      <input id="varName" class="round" type="text" list="variableList">
    </td></tr>
    
    </table>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Information</span><br>
	<select id="info" class="round">
  <option value="0" selected>Image Object</option>
  <option value="1">Image Width</option>
  <option value="2">Image Height</option>
	</select>
</div>

<br>
<div style="float: left; width: 35%; padding-top: 8px;">
<span class="dbminputlabel">Result in</span><br>
		<select id="storage2" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Variable Name</span><br>
		<input id="varName2" class="round" type="text">
	</div>
  
  <style>td{padding:5px;}}</style>`;
  },

  init: function() {
    const {glob, document} = this;
  
    glob.variableChange(document.getElementById('storage2'), 'varNameContainer');
  },

  
  action(cache) {
    const Canvas = require('canvas');
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const imagedata = this.getVariable(storage, varName, cache);
    if(!imagedata) {
      this.callNextAction(cache);
      return;
    }
    const image = new Canvas.Image();
	  image.src = imagedata;
    const info = parseInt(data.info, 10);
  
    let result;
    switch (info) {
      case 0:
        result = image
         break;
         case 1:
          result = image.width
           break;
           case 2:
            result = image.height
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
