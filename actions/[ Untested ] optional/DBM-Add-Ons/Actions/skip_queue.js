module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Skip Queue",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Audio Control",

//---------------------------------------------------------------------
// DBM Add-Ons Infos (Optional)
//
// These are the informations about this Add-On.
//---------------------------------------------------------------------

// Who made the Add-On
author: "ACertainCoder",

// Who contributed to the Add-On
contributors: [],

// The version of the Add-On (Default: 1.0.0)
version: "1.0.0",

// A short description for this Add-On
short_description: "Skip items in the queue",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `Skip ${parseInt(data.amount) == 1 ? data.amount + " Item" : data.amount + " Items"}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["amount"],

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
<div style="float: left; width: 80%;">
	Amount to Skip:<br>
	<input id="amount" class="round" value="1">
</div>`;
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter,
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const Audio = this.getDBM().Audio;
	const server = cache.server;

	var queue = null;
	if(server) {
		queue = Audio.queue[server.id];
	}

	if(queue && queue.length > 0) {
		const amount = parseInt(this.evalMessage(data.amount, cache));
		let finalItem;

		for(let i = 0; i < amount; i++) {
			if(queue.length > 0) {
				finalItem = queue.shift();
			}
		}
		
		if(finalItem) {
			Audio.playItem(finalItem, server.id);
		}
	} else if(server) {
		Audio.playNext(server.id, true);
	}
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

mod: function (DBM) {

}

}; // End of module