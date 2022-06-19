module.exports = {

//---------------------------------------------------------------------
// Event Name
//
// This is the name of the event displayed in the editor.
//---------------------------------------------------------------------

name: "",

//---------------------------------------------------------------------
// DBM Add-Ons Infos (Optional)
//
// These are the informations about this Add-On.
//---------------------------------------------------------------------

// Who made the Add-On
author: "",

// Who contributed to the Add-On
contributors: [],

// The version of the Add-On (Default: 1.0.0)
version: "1.0.0",

// A short description for this Add-On
short_description: "",

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Is Event
//
// Must be true for this to be an event.
//---------------------------------------------------------------------

isEvent: true,

//---------------------------------------------------------------------
// Event Variables
//
// The variables associated with this event. Can only have 0, 1, or 2.
//---------------------------------------------------------------------

fields: [],

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for custom event triggers since it
// allows us to setup callbacks for the necessary events we would
// like to be notified about.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {
    const AddOns = DBM.Actions.getAddOns();
}

}; // End of module