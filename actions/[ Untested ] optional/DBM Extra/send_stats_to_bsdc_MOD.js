module.exports = {
	name: 'Send BSDC Stats',
	section: 'Other Stuff',

	subtitle(data) {
		return `Servers: ${data.serversCount}; Shards: ${data.shardsCount};`;
	},

	fields: ['sdcToken', 'shardsCount', 'serversCount', 'clientID', 'packageList'],

html() {
	return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Send BSDC Stats Mod Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Send monitoring statistics to BSDC https://bots.server-discord.com.<br>
		- Make sure you put a delay between sending statistics.<br>
		- Specify 0 shards if you don't have any.<br>
		- To send, you need the npm package - node-fetch.
    </details>
</div>
  <div style="float: left; width: 49.5%; padding-top: 8px;">
  BSDC Token:<br>
    <input id="sdcToken" class="round" type="text" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...">
  </div>
  <div style="float: right; width: 45.5%; padding-top: 8px;">
	Servers Count:<br>
	<input id="serversCount" class="round" type="text" placeholder="0">
  </div>
  <div style="float: left; width: 49.5%; margin-top: 15px;">
    Client ID:<br>
    <input id="clientID" class="round" type="text" placeholder="837359492685103114">
  </div>
  <div style="float: right; width: 45.5%; margin-top: 15px;">
  	Shards Count:<br>
  	<input id="shardsCount" class="round" type="text" placeholder="0">
  </div>
</div>`
	},

	init() { },

	async action(cache) {
		const data = cache.actions[cache.index]
		const token = this.evalMessage(data.sdcToken, cache)
		const shard = this.evalMessage(data.shardsCount, cache)
		const server = this.evalMessage(data.serversCount, cache)
		const clientID = this.evalMessage(data.clientID, cache)
		const Mods = this.getMods()
		const fetch = Mods.require('node-fetch')
		await fetch(`https://api.server-discord.com/v2/bots/${clientID}/stats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `SDC ${token}`,
			},
			body: JSON.stringify({ servers: server, shards: shard }),
		}).catch((err) => console.error(`#${cache.index + 1} ${this.name}: ${err.stack}`));
		this.callNextAction(cache)
	},

	mod() { }
}