module.exports = {

	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------

	name: "Play YouTube Livestream",

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

	subtitle: function (data) {
		return `${data.url}`;
	},

	//---------------------------------------------------------------------
	// DBM Mods Manager Variables (Optional but nice to have!)
	//
	// These are variables that DBM Mods Manager uses to show information
	// about the mods for people to see in the list.
	//---------------------------------------------------------------------

	// Who made the mod (If not set, defaults to "DBM Mods")
	author: "ZockerNico",

	// The version of the mod (Defaults to 1.0.0)
	version: "1.9.5", //Added in 1.9.5

	// A short description to show on the mod line for this mod (Must be on a single line)
	short_description: "This mod is able to play youtube livestreams via opus stream. The problem is that you can't change the volume...",

	// If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
	depends_on_mods: [
		{name:'WrexMODS',path:'aaa_wrexmods_dependencies_MOD.js'}
	],

	//---------------------------------------------------------------------

	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------

	variableStorage: function (data, varType) {
	},

	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------

	fields: ["url", "passes", "bitrate"],

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
	<div id="wrexdiv" style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: hidden;">
	<div>
		<div>
			<p>
				Made by ${this.author}.
			</p>
		</div>
		<div style="padding-top: 8px;">
			YouTube URL:<br>
			<input id="url" class="round" type="text" value="https://www.youtube.com/watch?v=GVC5adzPpiE"><br>
		</div>
		<div style="float: left; width: 50%;">
			Passes:<br>
			<input id="passes" class="round" type="text" value="1">
		</div>
		<div style="float: right; width: 50%;">
			Bitrate:<br>
			<input id="bitrate" class="round" type="text" placeholder="Leave blank for automatic...">
		</div>
	</div>
	<div style="float: left; width: 100%;">
		<p>
			<h3>Warning:</h3>
			1. Please put the Welcome action into a Bot Initalization event to be able to overwrite existing functions!<br>
			2. You won't be able to set the volume (it'll be very loud) or skip the livestream after it has started to play. Please don't aks why, because we can't change it at the moment.<br>
			3. Sometimes there can happen a connection issue why the bot stops playing the stream. For that reason, please use the Loop Queue Mod.<br>
			4. You'll need discord.js version 11.4 to run it. You can update it by using "npm i discord.js --save" in your CMD.<br>
			5. If you get this message after your discord.js update: "One of more of the core modules of this project need to be updated. Would you like to update them? This will require an internet connection.", click on "Cancel" because it would restore the old version of discord.js.
		</p>
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
		const _this = this;
		const Audio = this.getDBM().Audio;
		const options = {};
		options.seek = 0;
		options.live = true;
		options.volume = 0.5;
		if(data.passes) {
			options.passes = parseInt(this.evalMessage(data.passes, cache));
		};
		if(data.bitrate) {
			options.bitrate = parseInt(this.evalMessage(data.bitrate, cache));
		} else {
			options.bitrate = 'auto';
		};
		const url = this.evalMessage(data.url, cache);
		if(url) {
			const info = ['yt', options, url];
			setTimeout(function() {
				Audio.addToQueue(info, cache);
				_this.callNextAction(cache);
			}, 500);
		};
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
		//Everything that is needed to run this mod is placed in the Welcome action of DBM Mods.
	}

}; // End of module