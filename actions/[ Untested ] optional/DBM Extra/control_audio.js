module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Control Audio",

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
short_description: "Controls the audio player.",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const changes = (parseInt(data.item) || 0) + (parseInt(data.loopItem) || 0) + (parseInt(data.loopQueue) || 0) + (parseInt(autoplay) || 0);
	return `Change ${changes} settings`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["item", "loopItem", "loopQueue", "autoplay"],

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
<div style="float: left; width: 45%;">
	Currently playing Item:<br>
	<select id="item" class="round">
		<option value="0" selected>Unchanged</option>
		<option value="1">Stop</option>
		<option value="2">Pause</option>
		<option value="3">Resume</option>
	</select><br>
</div>
<div style="float: right; width: 45%;">
	Loop Item:<br>
	<select id="loopItem" class="round">
		<option value="0" selected>Unchanged</option>
		<option value="1">Enable</option>
		<option value="2">Disable</option>
	</select><br>
</div>
<div style="float: left; width: 45%;">
	Loop Queue:<br>
	<select id="loopQueue" class="round">
		<option value="0" selected>Unchanged</option>
		<option value="1">Enable</option>
		<option value="2">Disable</option>
	</select><br>
</div>
<div style="float: right; width: 45%;">
	AutoPlay:<br>
	<select id="autoplay" class="round">
		<option value="0" selected>Unchanged</option>
		<option value="1">Enable</option>
		<option value="2">Disable</option>
	</select><br>
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
	const item = parseInt(data.item);
	const loopItem = parseInt(data.loopItem);
	const shuffleQueue = parseInt(data.shuffleQueue);
	const loopQueue = parseInt(data.loopQueue);
	const autoplay = parseInt(data.autoplay);

	var dispatcher = null;
	if(server) {
		dispatcher = Audio.dispatchers[server.id];
	}

	if(dispatcher) {
		switch(item) {
			case 1://Stop
				dispatcher.end('forced');
				break;
			case 2://Pause
				dispatcher.pause();
				break;
			case 3://Resume
				dispatcher.resume();
				break;
		}

		//Loop Item
		if(loopItem == 1) {
			//Enable
			Audio.loopitem[server.id] = true;
		} else if(loopItem == 2) {
			//Disable
			Audio.loopitem[server.id] = false;
		}

		//Loop Queue
		if(loopQueue == 1) {
			//Enable
			Audio.loopqueue[server.id] = true;
		} else if(loopQueue == 2) {
			//Disable
			Audio.loopqueue[server.id] = false;
		}

		//AutoPlay
		if(autoplay == 1) {
			//Enable
			Audio.autoplay[server.id] = true;
		} else if(autoplay == 2) {
			//Disable
			Audio.autoplay[server.id] = false;
		}
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

mod: function(DBM) {
}

}; // End of module