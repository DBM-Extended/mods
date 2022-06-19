module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Unban MOD",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Member Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `${data.find}`;
},

//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

//https://github.com/LeonZ2019/
author: "LeonZ",
version: "1.1.0",

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Unban Member from banned list",

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["info", "find"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions.
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information,
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use.
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels,
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<div style="float: left; width: 40%;">
		Source Field:<br>
		<select id="info" class="round">
			<option value="0" selected>Member ID</option>
			<option value="1" selected>Member Username</option>
		</select>
	</div>
	<div style="float: right; width: 55%;">
		Search Value:<br>
		<input id="find" class="round" type="text">
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter,
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const server = cache.server;
	const data = cache.actions[cache.index];
	const info = parseInt(data.info);
	const find = this.evalMessage(data.find, cache);
	const list = server.fetchBans()
	list.then(bans => {
		const newban = bans.array()
		for (i = 0; i < newban.length; i++) {
			let member = newban[i]
			let result
			switch(info) {
				case 0:
					result = Boolean(member.id == find);
					break;
				case 1:
					result = Boolean(member.username == find);
					break;
				default:
					break;
			}
			if(result == true) {
				server.unban(member)
				this.callNextAction(cache);
			}
		}
	})
	this.callNextAction(cache);
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module
