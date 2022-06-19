module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Remove Item from Queue",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Audio Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const storage = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];
	var text = null;

	switch(data.removeType) {
		case '0':
			text = 'Remove from End';
			break;
		case '1':
			text = 'Remove from Front';
			break;
		case '2':
			text = `Remove Item at Position ${data.position}`;
			break;
	}
	return text;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["removeType", "position"],

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
	<div style="float: left; width: 45%;">
		Remove Type:<br>
		<select id="removeType" class="round" onchange="glob.onChange(this)">
			<option value="0" selected>Remove from End</option>
			<option value="1">Remove from Front</option>
			<option value="2">Remove from Specific Position</option>
		</select>
	</div>
	<div id="positionHolder" style="float: right; width: 50%; display: none;">
		Position:<br>
		<input id="position" class="round" type="text">
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
		const dom = document.getElementById('positionHolder');
		if(value < 2) {
			dom.style.display = 'none';
		} else {
			dom.style.display = null;
		}
	};

	glob.onChange(document.getElementById('removeType'));
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
	
	if(queue) {
		const type = parseInt(data.removeType);
	
		switch(type) {
			case 0:
				if(queue.length > 0) queue.pop();
				break;
			case 1:
				if(queue.length > 0) queue.shift();
				break;
			case 2:
				const position = parseInt(this.evalMessage(data.position));
				if(position < 0) {
					queue.shift();
				} else if(position >= queue.length) {
					queue.pop();
				} else {
					queue.splice(position, 1);
				}
				break;
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