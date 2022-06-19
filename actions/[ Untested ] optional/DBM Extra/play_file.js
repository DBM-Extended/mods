module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Play File",

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
short_description: "Plays an audio file.",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Requires Audio Libraries
//
// If 'true', this action requires audio libraries to run.
//---------------------------------------------------------------------

requiresAudioLibraries: true,

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `${data.url}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["url", "seek", "volume", "passes", "bitrate", "type", "keepcurrent"],

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
	Local URL:<br>
	<input id="url" class="round" type="text" value="resources/"><br>
</div>
<div style="float: left; width: 50%;">
	Seek Position:<br>
	<input id="seek" class="round" type="text" value="0"><br>
	Passes:<br>
	<input id="passes" class="round" type="text" value="1">
</div>
<div style="float: right; width: 50%;">
	Default Volume (0 = min; 100 = max):<br>
	<input id="volume" class="round" type="text" placeholder="Leave blank for automatic..."><br>
	Bitrate:<br>
	<input id="bitrate" class="round" type="text" placeholder="Leave blank for automatic...">
</div><br><br><br><br><br><br><br>
<div style="float: left; width: 45%;">
	Play Type:<br>
	<select id="type" class="round" onchange="glob.onChange(this)">
		<option value="0" selected>Add to Queue</option>
		<option value="1">Play Immediately</option>
	</select>
</div>
<div id="keepcurrentContainer" style="float: left; padding-left: 5%; width: 50%; display: none;">
	Currently playing Item:<br>
	<select id="keepcurrent" class="round">
		<option value="0" selected>Enqueue at first position</option>
		<option value="1">Ignore</option>
	</select>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const { glob, document } = this;

	glob.onChange = function(event) {
		const value = parseInt(event.value);
		const keepcurrent = document.getElementById('keepcurrentContainer');

		if(value > 0) {
			keepcurrent.style.display = null;
		} else {
			keepcurrent.style.display = 'none';
		}
	}

	glob.onChange(document.getElementById('type'));
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
	const defaultAudioOptions = this.getAddOns().settings.defaultAudioOptions;
	const options = {};

	if(data.seek) {
		options.seek = parseInt(this.evalMessage(data.seek, cache));
	} else {
		defaultAudioOptions.seek;
	}
	if(data.volume) {
		options.volume = parseInt(this.evalMessage(data.volume, cache)) / 100;
	} else if(cache.server) {
		options.volume = Audio.volumes[cache.server.id] || defaultAudioOptions.volume;
	} else {
		options.volume = defaultAudioOptions.volume;
	}
	if(data.passes) {
		options.passes = parseInt(this.evalMessage(data.passes, cache));
	} else {
		defaultAudioOptions.passes;
	}
	if(data.bitrate) {
		options.bitrate = parseInt(this.evalMessage(data.bitrate, cache));
	} else {
		options.bitrate = defaultAudioOptions.bitrate;
	}
	if(data.keepcurrent == "0") {
		options.keepcurrent = true;
	} else {
		options.keepcurrent = false;
	}

	const url = this.evalMessage(data.url, cache);
	if(url) {
		const info = ['file', options, url];
		if(data.type === "0") {
			Audio.addToQueue(info, cache);
		} else if(cache.server && cache.server.id !== undefined) {
			Audio.playItem(info, cache.server.id);
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