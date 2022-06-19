module.exports = {

	name: "Bot Typing",

	section: "Messaging",

	subtitle: function(data) {
		const names = ['Same Channel', 'Mentioned Channel', 'Default Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
		const names2 = ['Starts Typing', 'Stops Typing']
		const index2 = parseInt(data.EliteArtzIsPro);
		const index = parseInt(data.storage);
		return index < 3 ? `${names[index]} - ${names2[index2]}` : `${names[index]} - ${data.varName} - ${names2[index2]}`;
	},


	fields: ["storage", "varName", "EliteArtzIsPro"],

	html: function(isEvent, data) {
		return `
		<div>
			<p>
				<u>Mod Info:</u><br>
				Created by Lasse! (Merged by EliteArtz)
			</p>
		</div><br>
	<div>
		<div style="float: left; width: 35%;">
			Typing Option:<br>
			<select id="EliteArtzIsPro" class="round">
				<option value="0" selected>Start Typing</option>
				<option value="1">Stop Typing</option>
			</select>
		</div><br>
	</div><br><br>
	<div>
		<div style="float: left; width: 35%;">
			Channel to start typing in:<br>
			<select id="storage" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
				${data.channels[isEvent ? 1 : 0]}
			</select>
		</div>
		<div id="varNameContainer" style="display: none; float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName" class="round" type="text" list="variableList"><br>
		</div>
	</div><br><br><br>
	<div>
		<p>
			You can stop the typing with <b>Stop Typing</b>
		</p>
	</div><br>`
	},

	init: function() {
		const {glob, document} = this;

		glob.channelChange(document.getElementById('storage'), 'varNameContainer');
	},

	action: function(cache) {
		const data = cache.actions[cache.index];
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.VarName, cache);
		const time = parseInt(this.evalMessage(data.time, cache));
		const channel = this.getChannel(storage, varName, cache);


		try { 
			if (data.EliteArtzIsPro === "0") { 
				channel.startTyping(); 
			} else {
				channel.stopTyping(true); 
			}
		} catch (e) {
			console.error("ERROR! " + e + e.stack); 
		}

		this.callNextAction(cache);
	},

	mod: function(DBM) {
	}

	};