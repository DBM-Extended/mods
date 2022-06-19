module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Set Custom Prefix",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Server Control",

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
short_description: "This Add-On will change the custom prefix for a server.",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function (data) {
	const servers = ['Current Server', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `Change ${servers[parseInt(data.server)]}'s prefix to "${data.prefix}"`;
},

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function (data, varType) {
	const type = parseInt(data.storage);
	if (type !== varType) return;
	let dataType = 'Unknown Type';
	return ([data.varName, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["server", "varName", "prefix"],

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

html: function (isEvent, data) {
	return `
<div>
	<div style="float: left; width: 35%;">
		<br>Source Server:<br>
		<select id="server" class="round" onchange="glob.serverChange(this, 'varNameContainer')">
			${data.servers[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		<br>Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList">
	</div>
	<div style="float: left; width: 104.5%;">
		<br>New Prefix:<br>
		<input id="prefix" class="round" type="text">
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

init: function () {
	const { glob, document } = this;

	glob.variableChange(document.getElementById('storage'), 'varNameContainer');
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter,
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function (cache) {
	const data = cache.actions[cache.index];
	const AddOns = this.getAddOns();
	const prefix = this.evalMessage(data.prefix, cache);
	const server = this.getServer(parseInt(data.server), this.evalMessage(data.varName, cache), cache);

	if(AddOns.settings.overwriteBotFunctions && AddOns.settings.enableCustomPrefixes) {
		if(prefix !== undefined && prefix !== '' && server) {
			this.getDBM().Bot.setTag(prefix, server.id);
		}
	} else {
		console.log('WARNING: Custom prefixes do require "overwriteBotFunctions" and "enableCustomPrefixes" to be enabled!');
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