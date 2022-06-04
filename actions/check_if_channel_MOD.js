module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Check If Channel",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Conditions",

//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

// Who made the mod (If not set, defaults to "DBM Mods")
author: "TheMonDon",

// The version of the mod (Defaults to 1.0.0)
version: "1.9.5", //Added in 1.9.5

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Check if a channel meets the conditions.",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const channels = ['Same Channel', 'Mentioned Channel', '1st Server Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const results = ["Continue Actions", "Stop Action Sequence", "Jump To Action", "Jump Forward Actions"];
	return `If True: ${results[parseInt(data.iftrue)]} ~ If False: ${results[parseInt(data.iffalse)]}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["channel", "varName", "info", "varName2", "iftrue", "iftrueVal", "iffalse", "iffalseVal"],

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
	<div>
		<p>Made by ${this.author}.</p><br>
	</div>
	<div style="float: left; width: 35%;">
		Source Channel:<br>
		<select id="channel" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
			${data.channels[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%; padding-top: 12px;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 20px;">
	<div style="float: left; width: 35%;">
		Check if Member:<br>
		<select id="info" class="round">
			<option value="1" selected>Is Deleteable?</option>
			<option value="2">Is Deleted?</option>
			<option value="3">Channel type is 'DM'?</option>
			<option value="4">Channel type is 'Text'?</option>
			<option value="5">Channel type is 'Voice'?</option>
			<option value="6">Channel type is 'Category'?</option>
			<option value="7">Channel type is 'News'?</option>
			<option value="8">Channel type is 'Store'?</option>
		</select>
	</div>
	<div id="varNameContainer2" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName2" class="round" type="text" list="variableList2"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	${data.conditions[0]}
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

	glob.channelChange(document.getElementById('channel'), 'varNameContainer');
	glob.onChangeTrue(document.getElementById('iftrue'));
	glob.onChangeFalse(document.getElementById('iffalse'));
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
	const channel = parseInt(data.channel);
	const varName = this.evalMessage(data.varName, cache);
	const info = parseInt(data.info);
	const targetChannel = this.getChannel(channel, varName, cache);
	if(!targetChannel) {
		this.callNextAction(cache);
		return;
	}
	let result;
	switch(info) {
		case 1:
			result = Boolean(targetChannel.deletable);
			break;
		case 2:
			result = Boolean(targetChannel.deleted);
			break;
		case 3:
			result = Boolean(targetChannel.type === 'dm');
			//if the above don't work try this 'Boolean(targetChannel instanceof DiscordJS.GroupDMChannel || targetChannel instanceof DiscordJS.DMChannel)'
			break;
		case 4:
			result = Boolean(targetChannel.type === 'text');
			break;
		case 5:
			result = Boolean(targetChannel.type === 'voice');
			break;
		case 6:
			result = Boolean(targetChannel.type === 'category');
			break;
		case 7:
			result = Boolean(targetChannel.type === 'news');
			break;
		case 8:
			result = Boolean(targetChannel.type === 'store');
			break;
		default:
			console.log('Please check your "Check if Channel" action! There is something wrong...');
			break;
	};
	this.executeResults(result, data, cache);
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
