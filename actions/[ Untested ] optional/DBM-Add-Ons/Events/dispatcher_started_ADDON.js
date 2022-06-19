module.exports = {

//---------------------------------------------------------------------
// Event Name
//
// This is the name of the event displayed in the editor.
//---------------------------------------------------------------------

name: "Dispatcher started",

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
short_description: "Triggers when a dispatchers starts.",

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

fields: ["Started Item:"],

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
    const onDispatcherStart = function(item, id) {
        const { Bot, Actions } = DBM;
        const events = Bot.$evts[module.exports.name];

        if(!events) return;

        for(var i = 0; i < events.length; i++) {
            const event = events[i];
            const server = Bot.bot.guilds.get(id);
            const temp = {};

            if(event.temp) temp[event.temp] = {
                "type": item[0],
                "options": item[1],
                "url": item[2]
            };

            Actions.invokeEvent(event, server, temp);
        }
    }

    AddOns.events.push({
        "trigger": "DispatcherStart",
        "arguments": 2,
        "callback": onDispatcherStart
    });
}

}; // End of module