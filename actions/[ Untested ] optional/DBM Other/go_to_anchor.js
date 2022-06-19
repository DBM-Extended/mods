module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Go To Action Anchor",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "DBM-Enhanced",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data) {
	  if (!data['color']) {
		  data.color = "#000000"
	  }
	  if (data['comment']) {
    return `<font color="${data.color}"><b>[</b>Jumper<b>]</b> ${data.comment}</font>`;
	  } else {
		 return `<font color="${data.color}"><b>[</b>Jumper<b>]</b> ${data.anchorName}</font>`; 
	  }
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["anchorName", "color", "comment"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
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

  html(isEvent, data) {
    return `
    <div style="float: left; width: 99%;">
      Anchor Color:<br>
      <input type="color" id="color"><br><br>
      <span class="dbminputlabel">Anchor ID</span><br>
      <input id="anchorName" class="round" type="text"><br>
	  <span class="dbminputlabel">Comment: (Supports some HTML Tags)</span><br>
      <input id="comment" class="round" type="text"><br>
    </div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const anchorName = this.evalMessage(data.anchorName, cache);
    cache.goToAnchor(anchorName);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
