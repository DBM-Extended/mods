module.exports = {
    name: 'Edit Stored Json',
    section: 'JSON Things',
    subtitle(data) {
        return `${data.path}`
    },

    fields: ['path', 'code'],

    html(isEvent, data) {
        return `
  <div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
<style>.title { color: #ef596f} .subtitle { color: #86c96d}</style>
    <details>
        <summary style="cursor: pointer">Edit Stored Json Mod Description</summary>
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
 <div style="width: 100%; float: left; padding-top: 8px;">
  Path:<br>
  <input id="path" class="round" type="text" placeholder="./data/test.json">
  </div<
</div>
    <div style="width: 100%; float: right; margin-top: 15px;">
    Js Code:<br>
    <textarea style="resize: vertical; width: 100%;" rows="8" id="code" class="round" placeholder="json.item = 'Nice Item';"></textarea>
    </div>
<div>
</div>`
    },
    init() {
    },

    action: function (cache) {
        const data = cache.actions[cache.index];
        const path = this.evalMessage(data.path, cache);
        const code = this.evalMessage(data.code, cache);
        const fs = require("fs");
        let json = JSON.parse(fs.readFileSync(path, 'utf8'));
        if (code.length > 0) eval(code);
        else console.error("Edit Stored Json: no code is specified, the action is not used.");
        fs.writeFileSync(path, JSON.stringify(json));
        this.callNextAction(cache);
    },

    mod(DBM) {
    }
}
