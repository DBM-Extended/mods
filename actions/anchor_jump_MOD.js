module.exports = {
  name: 'Jump to Anchor',
  section: 'Other Stuff',
  meta: { version: "2.1.4", preciseCheck: true, author: "DBM Extended", authorUrl: "https://github.com/DBM-Extended/mods", downloadURL: "https://github.com/DBM-Extended/mods/tree/main/actions/anchor_jump_MOD.js" },

  subtitle(data) {
    return data.description
      ? `<font color="${data.color}">${data.description}</font>`
      : `Jump to ${
          data.jump_to_anchor
            ? `the "<font color="${data.color}">${data.anchorName}</font>" anchor in your command if it exists!`
            : 'an anchor!'
        }`;
  },

  fields: ['description', 'anchorName', 'color'],

  html() {
    return `
<div>
  <p>
    <u>Mod Info:</u><br>
    This mod will jump to the specified anchor point<br>
    without requiring you to edit any other skips or jumps.<br>
    <b>This is sensitive and must be exactly the same as your anchor name.</b>
  </p>
</div><br>
<div style="float: left; width: 74%;">
  Jump to Anchor Name:<br>
  <input type="text" class="round" id="anchorName"><br>
</div>
<div style="float: left; width: 24%;">
  Anchor Color:<br>
  <input type="color" id="color"><br>
</div>
<div style="float: left; width: 98%;">
  Description:<br>
  <input type="text" class="round" id="description"><br>
</div>`;
  },

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  action(cache) {
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
