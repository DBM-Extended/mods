module.exports = {

//---------------------------------------------------------------------
// Editor Extension Name
//
// This is the name of the editor extension displayed in the editor.
//---------------------------------------------------------------------

name: "DBM Add-Ons Settings",

//---------------------------------------------------------------------
// DBM Add-Ons Infos (Optional)
//
// These are the informations about this mod.
//---------------------------------------------------------------------

// Who made the extension
author: "ACertainCoder",

// Who contributed to the extension
contributors: [],

// The version of the extension (Default: 1.0.0)
version: "1.0.0",

// A short description for this extension
short_description: "Configure DBM Add-Ons",

// Settings
settings: [
    "enableAddOns",
    "restoreDefaults",
    "saveSettings",
    "overwriteBotFunctions",
    "installNodeModules",
    "saveVolumes",
    "enableMentionPrefix",
    "enableCustomPrefixes",
    "ignoreBotMessages",
    "ignoreOwnMessages",
    "reconnectAutomatically",
    "leaveVCsAutomatically"
],

// Default audio options
defaultAudioOptions: [
    "seek",
    "passes",
    "volume",
    "bitrate"
],

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Is Command Extension
//
// Must be true to appear in "command" context menu.
// This means each "command" will hold its own copy of this data.
//---------------------------------------------------------------------

isCommandExtension: false,

//---------------------------------------------------------------------
// Is Event Extension
//
// Must be true to appear in "event" context menu.
// This means each "event" will hold its own copy of this data.
//---------------------------------------------------------------------

isEventExtension: false,

//---------------------------------------------------------------------
// Is Editor Extension
//
// Must be true to appear in the main editor context menu.
// This means there will only be one copy of this data per project.
//---------------------------------------------------------------------

isEditorExtension: true,

//---------------------------------------------------------------------
// Extension Fields
//
// These are the fields for the extension. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the command's/event's JSON data.
//---------------------------------------------------------------------

fields: [
    "enableAddOns",
    "restoreDefaults",
    "saveSettings",
    "overwriteBotFunctions",
    "installNodeModules",
    "saveVolumes",
    "enableCustomPrefixes",
    "ignoreBotMessages",
    "ignoreOwnMessages",
    "reconnectAutomatically",
    "leaveVCsAutomatically",
    //defaultAudioOptions
    "seek",
    "passes",
    "volume",
    "bitrate"
],

//---------------------------------------------------------------------
// Default Fields
//
// The default values of the fields.
//---------------------------------------------------------------------

defaultFields: {
    enableAddOns: true,
    restoreDefaults: false,
    saveSettings: true,
    overwriteBotFunctions: true,
    installNodeModules: true,
    saveVolumes: true,
    enableMentionPrefix: true,
    enableCustomPrefixes: true,
    ignoreBotMessages: true,
    ignoreOwnMessages: true,
    reconnectAutomatically: true,
    leaveVCsAutomatically: true,
    //defaultAudioOptions
    seek: 0,
    passes: 1,
    volume: null,
    bitrate: null
},

//---------------------------------------------------------------------
// Extension Dialog Size
//
// Returns the size of the extension dialog.
//---------------------------------------------------------------------

size: function() {
    return { width: 600, height: 680 };
},

//---------------------------------------------------------------------
// Extension HTML
//
// This function returns a string containing the HTML used for
// the context menu dialog.
//---------------------------------------------------------------------

html: function(data) {
    return `
    <div style="padding: 10px 10px 10px 10px;">

        <div style="width: 100%;">
            <h1>DBM Add-Ons Settings</h1>
        </div><br>

        <div style="float: left; width: 280px">
            Enable DBM Add-Ons:<br>
            <select id="enableAddOns" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Restore default settings:<br>
            <select id="restoreDefaults" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Overwrite settings file automatically:<br>
            <select id="saveSettings" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Overwrite bot functions:<br>
            <select id="overwriteBotFunctions" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Install Node-Modules on startup:<br>
            <select id="installNodeModules" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Save volumes:<br>
            <select id="saveVolumes" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Enable custom prefixes:<br>
            <select id="enableCustomPrefixes" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Enable mention prefix:<br>
            <select id="enableMentionPrefix" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Ignore bot messages:<br>
            <select id="ignoreBotMessages" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Ignore own messages:<br>
            <select id="ignoreOwnMessages" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Reconnect automatically:<br>
            <select id="reconnectAutomatically" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div>

        <div style="float: right; width: 280px">
            Leave voice channels automatically:<br>
            <select id="leaveVCsAutomatically" class="round" style="width: 90%">
                <option value="0">Yes</option>
                <option value="1">No</option>
            </select><br>
        </div><br><br><br>
        <!-- If only one last selection: 560px / 45% -->


        <div style="width: 100%; padding-top: 32px;">
            <h2>Default audio options</h2>
        </div><br>


        <div style="float: left; width: 280px">
            Seek Position:<br>
            <input id="seek" class="round" type="text" value="${data.seek}" style="width: 90%"><br>
        </div>

        <div style="float: right; width: 280px">
            Volume (0 = min; 100 = max):<br>
            <input id="volume" class="round" type="text" value="${data.volume * 100 || ""}" placeholder="Leave blank for automatic..." style="width: 90%"><br>
        </div><br><br><br>

        <div style="float: left; width: 280px">
            Passes:<br>
            <input id="passes" class="round" type="text" value="${data.passes}" style="width: 90%"><br>
        </div>

        <div style="float: right; width: 280px">
            Bitrate:<br>
            <input id="bitrate" class="round" type="text" value="${data.bitrate || ""}" placeholder="Leave blank for automatic..." style="width: 90%"><br>
        </div><br><br><br>

    </div>`
},

//---------------------------------------------------------------------
// Extension Dialog Init Code
//
// When the HTML is first applied to the extension dialog, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
    const { glob, document } = this;

    module.exports.settings.forEach(setting => {
        document.getElementById(setting).value = `${module.exports.defaultFields[setting] == true ? 0 : 1}`;
    });
},

//---------------------------------------------------------------------
// Extension Dialog Close Code
//
// When the dialog is closed, this is called. Use it to save the data.
//---------------------------------------------------------------------

close: function(document, data) {
    // Settings
    module.exports.settings.forEach(setting => {
        data[setting] = parseInt(document.getElementById(setting).value) == 0 ? true : false;
        module.exports.defaultFields[setting] = data[setting];
    });

    // Default audio options
    module.exports.defaultAudioOptions.forEach(option => {
        var value = parseInt(document.getElementById(option).value);
        if(data[option] != value) {
            data[option] = value;
            if(option == 'volume') data[option] /= 100;
        }
    });
},

//---------------------------------------------------------------------
// Extension On Load
//
// If an extension has a function for "load", it will be called
// whenever the editor loads data.
//
// The "DBM" parameter is the global variable. Store loaded data within it.
//---------------------------------------------------------------------

load: function(DBM, projectLoc) {
    module.exports.DBM = DBM;

    if(DBM.Files.data.settings.modules["DBM Add-Ons Settings"]) {
        const settings = DBM.Files.data.settings.modules["DBM Add-Ons Settings"].customData["DBM Add-Ons Settings"];

        //Load settings
        module.exports.settings.forEach(setting => {
            module.exports.defaultFields[setting] = settings[setting];
        });
    
        //Load default audio options
        module.exports.defaultAudioOptions.forEach(option => {
            module.exports.defaultFields[option] = settings.defaultAudioOptions[option];
        });
    }
},

//---------------------------------------------------------------------
// Extension On Save
//
// If an extension has a function for "save", it will be called
// whenever the editor saves data.
//
// The "data" parameter contains all data. Use this to modify
// the data that is saved. The properties correspond to the
// data file names:
//
//  - data.commands
//  - data.settings
// etc...
//---------------------------------------------------------------------

save: function(DBM, data, projectLoc) {

},

//---------------------------------------------------------------------
// Editor Extension Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for editor extensions since it
// allows us to setup modifications for the necessary functions
// we want to change.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {
    
}

}; // End of module