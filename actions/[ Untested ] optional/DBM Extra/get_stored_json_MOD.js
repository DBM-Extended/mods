module.exports = {
    name: 'Get Stored Json',
    section: 'JSON Things',
    subtitle(data) {
        return `${data.path}`
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage)
        if (type !== varType) return
        const dataType = 'JSON'
        return ([data.varName, dataType])
    },

    fields: ['path', 'format', 'code', 'storage', 'varName'],

    html(isEvent, data) {
        return `
  <div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
<style>.title { color: #ef596f} .subtitle { color: #86c96d}</style>
    <details>
        <summary style="cursor: pointer">Get Stored Json Mod Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.<br>
        Some examples:<div style="padding: 0 15px 0 15px; background: rgba(0,0,0,0.13); border-radius: 3px">
        <pre>
        
        {
          <span class="title">"homeTown"</span>: <span class="subtitle">"Metro City"</span>,
          <span class="title">"active"</span>: true,
          <span class="title">"members"</span>: [
            {
              <span class="title">"power"</span>: [
                <span class="subtitle">"Radiation resistance"</span>
              ]
            }
          ]
        }
        </pre></div>
        <div style="padding: 0 15px 0 15px; background: rgba(0,0,0,0.13); border-radius: 3px">
        <pre>
        
        Js Code:
        json.homeTown - <span class="subtitle">Metro City</span>
        json['active'] - true
        json['members'][0]['power'][0] - <span class="subtitle">Radiation resistance</span>
        </pre></div>
    </details>
</div>
 <div style="width: 100%; float: left">
  Path:<br>
  <input id="path" class="round" type="text" placeholder="./data/test.json">
  </div<
</div>
    <div style="width: 20%; float: left; margin-top: 15px;">
    Format:<br>
    <select class="round" id="format">
    <option value="0">Json</option>
    <option value="1">String</option></select>
    </div>
    <div style="width: 75%; float: right; margin-top: 15px;">
    Js Code:<br>
    <input id="code" class="round" type="text" placeholder="json.item-name">
    </div>
<div>
  <div style="float: left; width: 35%; margin-top: 15px;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%; margin-top: 15px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`
    },
    init() {
    },

    action: function (cache) {
        const data = cache.actions[cache.index]
        const storage = parseInt(data.storage)
        const varName = this.evalMessage(data.varName, cache)
        const path = this.evalMessage(data.path, cache)
        const code = this.evalMessage(data.code, cache)
        const format = parseInt(data.format, cache)
        let json = require(require("path").join(process.cwd(), path));
        if (code.length > 0) json = eval(code);
        if (format === 1) json = JSON.stringify(json);

        this.storeValue(json, storage, varName, cache)
        this.callNextAction(cache)
    },

    mod(DBM) {
    }
}
