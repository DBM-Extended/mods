module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Remove Item from AutoPlay",

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
short_description: "Removes an item from AutoPlay",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const itemTypes = ['file', 'url', 'yt'];

	return `Remove ${itemTypes[parseInt(data.itemType)]} "${data.url}"`;
},

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName, 'Boolean']);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["itemType", "url", "storage", "varName"],

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
<div style="float: left; width: 35%;">
	Item Type:<br>
	<select id="itemType" class="round" onchange="glob.onChange(this)">
		<option value="0" selected>File</option>
		<option value="1">URL</option>
		<option value="2">YouTube Video</option>
	</select>
</div>
<div style="float: right; width: 60%;">
	<span id="type">URL</span>:<br>
	<input id="url" class="round" type="text"><br>
</div><br><br><br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		Store Success In:<br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
			${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text">
	</div>
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
	const {glob, document} = this;

	glob.onChange = function(event) {
		const value = parseInt(event.value);
		const type = document.getElementById('type').innerHTML;
		
		if(value > 0) {
			type = 'URL';
		} else {
			type = 'Path';
		}
	}

	glob.variableChange(document.getElementById('storage'), 'varNameContainer');
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
	const AddOns = this.getAddOns();
	const Audio = this.getDBM().Audio;
	const itemTypes = ['file', 'url', 'yt'];
	const itemType = itemTypes[parseInt(data.itemType)];
	const url = this.evalMessage(data.url, cache);

	var item = null;
	var success = false;
	for(var i = 0; i < Audio.autoplaydata.length; i++) {
		item = Audio.autoplaydata[i];

		if(item[0] == itemType && item[1] == url) {
			Audio.autoplaydata.splice(i, 1);
			success = true;
			break;
		}
	}

	AddOns.saveAutoPlay(Audio.autoplaydata);

	const varName = this.evalMessage(data.varName, cache);
	const storage = parseInt(data.storage);
	this.storeValue(success, storage, varName, cache);

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