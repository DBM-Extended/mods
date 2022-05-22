module.exports = {
  name: 'Create Anchor',
  section: 'Other Stuff',
  
  meta: { version: "2.1.2", preciseCheck: true, author: "DBM Extended", authorUrl: "https://github.com/DBM-Extended/mods", downloadURL: "https://github.com/DBM-Extended/mods/tree/main/actions/anchor_create_MOD.js" },

  subtitle(data) {
    return data.description
      ? `<font color="${data.color}">${data.description}</font>`
      : `Create ${
          data.anchorName
            ? `the "<font color="${data.color}">${data.anchorName}</font>" anchor at the current position!`
            : 'an anchor!'
        }`;
  },

  fields: ['anchorName', 'color', 'description'],

  html() {
    return `
<div>
  <p>
    <u>Mod Info:</u><br>
    This mod creates an anchor point for you to jump to without<br>
    having to edit other jumps or skips.
  </p>
</div><br>
<div style="float: left; width: 74%;">
  Anchor Name:<br>
  <input type="text" class="round" id="anchorName"><br>
</div>
<div style="float: left; width: 24%;">
  Anchor Color:<br>
  <input type="color" id="color"><br>
</div>
<div>
  <div style="float: left; width: 98%;">
    Description:<br>
    <input type="text" class="round" id="description">
  </div>
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

  action(cache) {
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

  modInit(data, customData, index) {
    if (!customData.anchors) {
      customData.anchors = {};
    }
    customData.anchors[data.anchorName] = index;
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
