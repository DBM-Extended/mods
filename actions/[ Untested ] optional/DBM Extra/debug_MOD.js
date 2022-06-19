module.exports = {
    name: 'Debug Mode',
    section: 'Tools',
    subtitle(data) {
        if (data.action === '1') return `Status: <span style="color: #883c51">${data.status.replace('0', "Off").replace('1', "On")}</span>`;
        if (data.status === '0') return `Status: <span style="color: #d55170">${data.status.replace('0', "Off").replace('1', "On")}</span>`;
        if (data.status === '1') return `Status: <span style="color: #24a2ae">${data.status.replace('0', "Off").replace('1', "On")}</span>`;
    },

    fields: ['status', 'action', 'log', 'command_log'],

    html(isEvent, data) {
        return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Debug Mod Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Use this action if some action in your command is not working. Start with the first action, put this Debug Mode in front of it, if the log shows the       date and the number of executed actions, the command works. Going through the actions this way, you can find the error.
    </details>
</div>
<div style="padding-top: 8px; width: 45%; float: left;">
 Status:
  <select id="status" class="round">
    <option value="0" selected>Off</option>
    <option value="1">On</option>
  </select>
</div>
<div style="margin-left: 5%; padding-top: 8px; width: 50%; float: left;">
  End Behavior:
  <select id="action" class="round">
    <option value="0" selected>Call Next Action Automatically</option>
    <option value="1">Do Not Call Next Action</option>
  </select>
</div>
<div style="padding-top: 8px; width: 100%; float: left;">
  Send Message to Console:
  <textarea style="width: 100%; resize: vertical" id="log"></textarea>
</div>
<div style="padding-top: 8px; width: 100%; float: left;">
  Run Command in Console:
  <textarea style="width: 100%; resize: vertical" id="command_log"></textarea>
</div>
</div>`
    },

    init() {
    },

    action: function (cache) {
        const data = cache.actions[cache.index]
        const log = this.evalMessage(data.log, cache)
        const command_log = this.evalMessage(data.command_log, cache)
        const status = parseInt(data.status)
        const action = parseInt(data.action)
        if (status === 1) {
            let count_actions = cache.index + 1;
            let date = new Date();
            console.log(
                "Performed actions: " + count_actions + '\n' +
                "Date: " + date
            );
            if (log.length > 0) {
                console.log(log);
            }
            if (command_log.length > 0) {
                const response = require('child_process').execSync(command_log).toString()
                console.log(response);
            }
        }
        if (action === 0) {
            this.callNextAction(cache)
        }
    },

    mod(DBM) {
    }
}
