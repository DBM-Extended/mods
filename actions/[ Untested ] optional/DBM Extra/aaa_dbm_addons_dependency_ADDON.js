/***********************************************************************************************************************************************\
*   Name: DBM Add-Ons Dependency                                                                                                                *
*   Author: ACertainCoder                                                                                                                       *
*   Contributors: None                                                                                                                          *
*   Description: This is the main Add-On which is required to run all other DBM Add-Ons.                                                        *
*   Version: beta                                                                                                                               *
\***********************************************************************************************************************************************/
const child_process = require("child_process");
const util = require("util");
const path = require("path");
const fs = require("fs");

const AddOns = {};

AddOns.name = "DBM Add-Ons Dependency";
AddOns.section = "DBM Add-Ons";
AddOns.author = "ACertainCoder";
AddOns.contributors = [];

AddOns.events = []; //Custom events of DBM Add-Ons

AddOns.short_description = "The main Add-On which overwrites some parts of the bot and gives all other Add-Ons access to needed functions.";
AddOns.description = [
    "What is this? Very simple!",
    "This mod (dependency) overwrites some parts of the bot and gives all other Add-Ons access to functions which those need in order to run properly.",
    "You can access these functions too by using `this.getAddOns()` in Run Script or the action you're currently looking at."
].join('\n'),

AddOns.version = "beta";
AddOns.settings = null;
AddOns.defaults = {
    "enableAddOns": true,           //Enable the Add-Ons dependency
    "restoreDefaults": false,       //Restores default settings
    "saveSettings": true,           //Overwrite settings file
    "overwriteBotFunctions": true,  //Overwrite functions inside of the bot
    "installNodeModules": true,     //Install Node-Modules that other Add-Ons need
    "saveVolumes": true,            //Saves the set volumes of each server                  | Requires "overwriteBotFunctions"
    "enableMentionPrefix": true,    //Lets the bot trigger commands if it got mentioned     | Requires "overwriteBotFunctions"
    "enableCustomPrefixes": true,   //Lets the bot use different prefixes in each server    | Requires "overwriteBotFunctions"
    "ignoreBotMessages": true,      //Ignore messages sent by other bots                    | Requires "overwriteBotFunctions"
    "ignoreOwnMessages": true,      //Ignore messages sent by the bot itself                | Requires "overwriteBotFunctions"
    "reconnectAutomatically": true, //Lets the bot reconnect to Discord if needed           | Requires "overwriteBotFunctions"
    "leaveVCsAutomatically": true,  //Leave voice channels if the bot has nothing to play   | Requires "overwriteBotFunctions"
    "defaultAudioOptions": {        //Used in the Play- actions and AutoPlay                | Requires "overwriteBotFunctions"
        "seek": 0,
        "passes": 1,
        "volume": null,
        "bitrate": null
    }
};
//TODO Add YouTube playlists & directories to AutoPlay
//TODO DBM crack check? (process.env)
//TODO DBM version check (DBM.version)
//TODO Constants?
//TODO Being able to edit the text of the time restriction
//TODO Being able to exclude users of time restriction tests
//TODO Saved cooldowns?

//TODO Add Item to AutoPlay: even if it already exits?
//TODO Remove Item from AutoPlay: first match / all matches?
//TODO DJSMember/DJSUser clearData
//TODO Reload Bot
//TODO Restart Bot

//? Is it possible to fix "${true ? `${msg.author}` : `${msg.member}`}" in Send Message



//Settings
//-----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Load Add-Ons settings
 * @param DBM Discord Bot Maker
 */
AddOns.loadSettings = function(DBM) {
    if(DBM.Files.data.settings.modules["DBM Add-Ons Settings"]) {
        const settings = DBM.Files.data.settings.modules["DBM Add-Ons Settings"].customData["DBM Add-Ons Settings"];

        Object.keys(this.defaults).forEach(setting => {
            if(typeof setting == 'object') {
                Object.keys(this.defaults[setting]).forEach(option => {
                    this.settings[setting][option] = settings[setting][option];
                });
            } else {
                this.settings[setting] = settings[setting];
            }
        });
    } else {
        this.settings = this.defaults;
    }

    this.checkSettings();
    this.saveSettings(DBM);
}

/**
 * Check Add-Ons settings
 */
AddOns.checkSettings = function() {
    var settingsMissing = Object.keys(this.defaults).filter(setting => this.settings[setting] === undefined || this.settings[setting] === null);

    if(settingsMissing.length > 0) {
        console.log(`WARNING: ${settingsMissing.map((setting, i) => `"${setting}"`).join(i+1 == settingsMissing.length ? ' & ' : ', ')} are not set! Loading defaults...`);
        settingsMissing.forEach(setting => {
            this.settings[setting] = this.defaults[setting];
        });
    }

    var overwriteBotFunctions = [
        "saveVolumes",
        "enableMentionPrefix",
        "enableCustomPrefixes",
        "ignoreBotMessages",
        "ignoreOwnMessages",
        "reconnectAutomatically",
        "leaveVCsAutomatically"
    ].filter(setting => this.settings[setting] != true);

    if(overwriteBotFunctions.length > 0) {
        console.log(`WARNING: ${overwriteBotFunctions.map((setting, i) => `"${setting}"`).join(i+1 == overwriteBotFunctions.length ? ' & ' : ', ')} does require "overwriteBotFunctions" to be enabled!`);
    }
}

/**
 * Save Add-Ons settings
 * @param DBM Discord Bot Maker
 */
AddOns.saveSettings = function(DBM) {
    DBM.Files.saveData('settings');
}



//AutoPlay
//-----------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Load AutoPlay data
 */
AddOns.loadAutoPlay = function() {
    var autoplaypath = path.join(process.cwd(), "data", "autoplay.json");
    var autoplay = null;

    if(fs.existsSync(autoplaypath)) {
        try {
            autoplay = JSON.parse(fs.readFileSync(autoplaypath, "utf8"));
        } catch(e) {
            autoplay = [];
            this.saveAutoPlay(autoplay);
        }
    } else {
        autoplay = [];
        this.saveAutoPlay(autoplay);
    }

    return autoplay;
}

/**
 * Save AutoPlay data
 * @param autoplay AutoPlay data
 */
AddOns.saveAutoPlay = function(autoplay) {
    var autoplaypath = path.join(process.cwd(), "data", "autoplay.json");
    
    fs.writeFileSync(autoplaypath, JSON.stringify(autoplay));
}



//Volumes
//-----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Load Volumes
 */
AddOns.loadVolumes = function() {
    var volumespath = path.join(process.cwd(), "data", "volumes.json");
    var volumes = null;

    if(fs.existsSync(volumespath)) {
        try {
            volumes = JSON.parse(fs.readFileSync(volumespath, "utf8"));
        } catch(e) {
            volumes = {};
            this.saveVolumes(volumes);
        }
    } else {
        volumes = {};
        this.saveVolumes(volumes);
    }

    return volumes;
}

/**
 * Save Volumes
 * @param volumes Volumes
 */
AddOns.saveVolumes = function(volumes) {
    if(this.settings.saveVolumes) {
        var volumespath = path.join(process.cwd(), "data", "volumes.json");
    
        fs.writeFileSync(volumespath, JSON.stringify(volumes));
    }
}



//Prefixes
//-----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Load Prefixes
 */
AddOns.loadPrefixes = function() {
    var prefixespath = path.join(process.cwd(), "data", "prefixes.json");
    var prefixes = null;

    if(fs.existsSync(prefixespath)) {
        try {
            prefixes = JSON.parse(fs.readFileSync(prefixespath, "utf8"));
        } catch(e) {
            prefixes = {};
            this.savePrefixes(prefixes);
        }
    } else {
        prefixes = {};
        this.savePrefixes(prefixes);
    }

    return prefixes;
}

/**
 * Save Prefixes
 * @param prefix Prefixes
 */
AddOns.savePrefixes = function(prefixes) {
    var prefixespath = path.join(process.cwd(), "data", "prefixes.json");

    fs.writeFileSync(prefixespath, JSON.stringify(prefixes));
}


//Node-Module Installer
//-----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Check if a Node-Module is installed
 * @param nodeModuleName The name of the Node-Module
 * @returns Boolean
 */
AddOns.checkNodeModule = function(nodeModuleName) {
    var nodeModule = null;

    try {
        nodeModule = require(nodeModuleName);
    } catch(error) {
        nodeModule = null;
    }

    return nodeModule ? true : false;
}

/**
 * Install a Node-Module
 * @param nodeModuleName The name of the Node-Module
 * @returns Object
 */
AddOns.installNodeModule = function(nodeModuleName) {
    console.log(`Installing "${nodeModuleName}"...`);

    try {
        child_process.execSync(`npm i ${nodeModuleName} --save`, {cwd: process.cwd(), stdio:[0,1,2]});
    } catch(e) {};

    if(this.checkNodeModule(nodeModuleName)) {
        return require(nodeModuleName);
    } else {
        return null;
    }
}

/**
 * Require a Node-Module and install it if needed
 * @param nodeModuleName The name of the Node-Module
 * @returns Object
 */
AddOns.require = function(nodeModuleName) {
    if(this.checkNodeModule(nodeModuleName)) {
        return require(nodeModuleName);
    } else {
        return this.installNodeModule(nodeModuleName);
    }
}

/**
 * Require all used Node-Modules
 * @param DBM Discord Bot Maker
 */
AddOns.requireNodeModules = function(DBM) {
    var actions = fs.readdirSync(DBM.Actions.actionsLocation);
    var installations = false;

    for(var i = 0; i < actions.length; i++) {
        let actionpath = path.join(DBM.Actions.actionsLocation, actions[i]);
        if(!fs.statSync(actionpath).isDirectory()) {
            actions[i] = require(actionpath);
        }
    }

    for(var i = 0; i < actions.length; i++) {
        let nodeModules = actions[i].node_modules;

        if(nodeModules instanceof Array && nodeModules.length > 0) {
            for(var j = 0; j < nodeModules.length; j++) {
                if(!this.checkNodeModule(nodeModules[j])) {
                    installations = true;
                    this.require(nodeModules[j]);
                } else {
                    require(nodeModules[j]);
                }
            }
        }
    }

    if(installations) {
        console.log("Node-Modules have been installed, restarting...");
        process.exit();
    }
}

/**
 * Require all used Node-Modules
 * @param DBM Discord Bot Maker
 */
AddOns.registerCustomEvents = function(DBM) {
    for(var i = 0; i < this.events.length; i++) {
        let event = this.events[i];

        DBM.Bot.bot.on(event.trigger, function() {
            var args = [];

            for(var j = 0; j < event.arguments; j++) {
                args.push(arguments[j]);
            }

            event.callback(...args);
        });
    }
}

//Overwrite Bot Functions
//-----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Overwrite certain bot functions
 * @param DBM Discord Bot Maker
 */
AddOns.overwriteBotFunctions = function(DBM) {
    //---------------------------------------------------------------------
    // Bot
    // Contains functions for controlling the bot.
    //---------------------------------------------------------------------

    if(this.settings.reconnectAutomatically) {
        DBM.Bot.onError = function(error) {
            if(process.send) process.send('BotError');
            
            if(error.message == 'Unexpected server response: 520') {
                console.log('Unable to connect to Discords API. Retrying...');
            } else if(error.message == 'read ECONNRESET') {
                console.log('Connection Reset! Reconnecting...');
            } else {
                console.error(error);
            }
        }

        DBM.Bot.setupBot = function() {
            this.bot.on('raw', this.onRawData);
            this.bot.on('error', this.onError);
            AddOns.registerCustomEvents(DBM);
        }
    }

    DBM.Bot.onMessage = function(msg) {
        if(AddOns.settings.ignoreOwnMessages && msg.author.id == this.bot.user.id) return;
        if(AddOns.settings.ignoreBotMessages && msg.author.bot) return;

        try {
            if(!this.checkCommand(msg)) {
                this.onAnyMessage(msg);
            }
        } catch(e) {
            console.error(e);
        }
    }

    if(this.settings.enableCustomPrefixes) {
        DBM.Bot.prefixes = AddOns.loadPrefixes();

        DBM.Bot.setTag = function(prefix, id) {
            this.prefixes[id] = prefix;
            AddOns.savePrefixes(this.prefixes);
        }
    }

    DBM.Bot.checkCommand = function(msg) {
        var command = this.checkTag(msg) || (AddOns.settings.enableMentionPrefix ? this.checkMention(msg) : null);

        if(command) {
            if(!this._caseSensitive) {
                command = command.toLowerCase();
            }
            const cmd = this.$cmds[command];
            if(cmd) {
                DBM.Actions.preformActions(msg, cmd);
                return true;
            }
        }
        return false;
    }
    
    DBM.Bot.checkTag = function(msg) {
        const tag = DBM.Files.data.settings.tag;
        const prefix = AddOns.settings.enableCustomPrefixes && msg.guild ? (this.prefixes[msg.guild.id] || tag) : tag;
        const separator = DBM.Files.data.settings.separator || '\\s+';

        if(msg.content) {
            var content = msg.content.split(new RegExp(separator))[0];
            if(content.startsWith(prefix)) {
                return content.substring(prefix.length);
            }
        }

        return null;
    }

    if(this.settings.enableMentionPrefix) {
        DBM.Bot.checkMention = function(msg) {
            const mention = new RegExp(`^(<@!?${this.bot.user.id}>)`);
            const separator = DBM.Files.data.settings.separator || '\\s+';

            if(msg.content) {
                var args = msg.content.split(new RegExp(separator));
                var matches = args[0].match(mention);
                if(matches) {
                    var content = msg.content.substring(matches[0].length).replace(/^\s+/, '');
                    msg.content = matches[0] + content;
                    return content.split(new RegExp(separator))[0];
                }
            }

            return null;
        }
    }

    //---------------------------------------------------------------------
    // Audio
    // Contains functions for voice channel stuff.
    //---------------------------------------------------------------------
    
    DBM.Audio.queue = {};
    DBM.Audio.volumes = AddOns.loadVolumes();
    DBM.Audio.connections = {};
    DBM.Audio.dispatchers = {};
    DBM.Audio.playingnow = {};
    DBM.Audio.loopitem = {};
    DBM.Audio.loopqueue = {};
    DBM.Audio.autoplay = {};
    DBM.Audio.autoplaydata = AddOns.loadAutoPlay();

    DBM.Audio.clearData = function(id) {
        this.queue[id] = null;
        this.volumes[id] = null;
        this.connections[id] = null;
        this.dispatchers[id] = null;
        this.playingnow[id] = null;
        this.loopitem[id] = false;
        this.loopqueue[id] = false;
        this.autoplay[id] = false;
    }

    DBM.Audio.isConnected = function(cache) {
        if(cache.server) {
            const id = cache.server.id;
            return this.dispatchers[id];
        } else {
            return null;
        }
    }

    DBM.Audio.isPlaying = function(cache) {
        if(cache.server) {
            const id = cache.server.id;
            return this.connections[id];
        } else {
            return null;
        }
    }

    DBM.Audio.setVolume = function(volume, cache) {
        if(cache.server) {
            const id = cache.server.id;

            if(this.connections[id]) {
                this.volumes[id] = volume;
                this.dispatchers[id].setVolumeLogarithmic(volume);
                AddOns.saveVolumes(this.volumes);
            }
        }
    }

    DBM.Audio.connectToVoice = function(voiceChannel) {
        const promise = voiceChannel.join();

        promise.then(function(connection) {
            this.connections[voiceChannel.guild.id] = connection;
            connection.on('disconnect', function() {
                this.clearData(voiceChannel.guild.id);
            }.bind(this));
        }.bind(this)).catch(console.error);

        return promise;
    }

    DBM.Audio.addToQueue = function(item, cache) {
        if(cache.server) {
            const id = cache.server.id;
            if(!this.queue[id]) {
                this.queue[id] = [];
            }

            this.queue[id].push(item);
            this.playNext(id);
        }
    }

    DBM.Audio.clearQueue = function(cache) {
        if(cache.server) {
            const id = cache.server.id;
            this.queue[id] = [];
            return true;
        } else {
            return false;
        }
    }

    DBM.Audio.playNext = function(id, forceSkip) {
        if(this.connections[id]) {
            if(!this.dispatchers[id] || forceSkip) {
                if(!this.queue[id]) {
                    this.queue[id] = [];
                }

                if(this.loopitem[id]) {
                    this.playItem(this.playingnow[id], id);
                } else if(this.loopqueue[id]) {
                    this.queue[id].push(this.playingnow[id]);
                    this.playItem(this.queue[id].shift(), id);
                } else {
                    if(this.queue[id].length > 0) {
                        this.playItem(this.queue[id].shift(), id);
                    } else if(this.autoplay[id] && this.autoplaydata.length > 0) {
                        var timeout = 0;
                        var autoplayItem = null;
                        var type = null;
                        var options = AddOns.settings.defaultAudioOptions;
                        var url = null;

                        do {
                            autoplayItem = this.autoplaydata[Math.round(Math.random()*(this.autoplaydata.length-1))];
                            type = autoplayItem[0];
                            url = autoplayItem[1];
                        } while(this.playingnow && this.playingnow[2] == autoplayItem[1] && timeout < 1000);

                        if(autoplayItem) {
                            this.playItem([type, options, url], id);
                        }
                    } else if(AddOns.settings.leaveVCsAutomatically) {
                        this.connections[id].disconnect();
                    }
                }
            }
        }
    }

    DBM.Audio.playItem = function(item, id) {
        if(this.connections[id]) {
            if(this.dispatchers[id]) {
                this.dispatchers[id].end('forced');
            }
            if(!this.queue[id]) {
                this.queue[id] = [];
            }

            const type = item[0];
            const options = item[1];
            const url = item[2];
            const volume = options.volume;
            const keepcurrent = options.keepcurrent;
            if(volume !== undefined) delete options.volume;
            if(keepcurrent !== undefined) delete options.keepcurrent;

            if(keepcurrent == false) {
                this.queue[id].shift();
            }
            this.playingnow[id] = item;

            var dispatcher = null;
            switch(type) {
                case 'file':
                    dispatcher = this.playFile(url, options, id);
                    break;
                case 'url':
                    dispatcher = this.playUrl(url, options, id);
                    break;
                case 'yt':
                    dispatcher = this.playYt(url, options, id);
                    break;
                default:
                    this.playingnow[id] = null;
                    break;
            }

            if(dispatcher) {
                dispatcher.on('start', function() {
                    if(typeof this.volumes[id] != 'number') {
                        this.volumes[id] = (typeof volume == 'number' ? volume : 1);
                        AddOns.saveVolumes(this.volumes);
                    }
                    dispatcher.setVolumeLogarithmic(this.volumes[id]);

                    DBM.Bot.bot.emit('DispatcherStart', item, id);
                }.bind(this));

                dispatcher.on('end', function(error) {
                    this.dispatchers[id] = null;
                    if(error != 'forced') {
                        this.playNext(id);
                    }

                    DBM.Bot.bot.emit('DispatcherStop', item, id, error);
                }.bind(this));

                this.dispatchers[id] = dispatcher;
            }
        }
    }

    DBM.Audio.playFile = function(url, options, id) {
        if(this.connections[id]) {
            return this.connections[id].playFile(DBM.Actions.getLocalFile(url), options);
        } else {
            return null;
        }
    }

    DBM.Audio.playUrl = function(url, options, id) {
        if(this.connections[id]) {
            return this.connections[id].playArbitraryInput(url, options);
        } else {
            return null;
        }
    }

    DBM.Audio.playYt = function(url, options, id) {
        if(this.connections[id] && this.ytdl) {
            const stream = this.ytdl(url, {
                filter: 'audioonly',
                quality: 'highestaudio'
            });
            return this.connections[id].playStream(stream, options);
        } else {
            return null;
        }
    }
}



//DBM Action
//-----------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    name: AddOns.name,
    section: AddOns.section,

    author: `${AddOns.author}${AddOns.contributors.length ? ", " + AddOns.contributors.join(", ") : ""}`,
    version: AddOns.version,
    short_description: AddOns.short_description,
	description: AddOns.description,
    node_modules: [], //Required Node-Modules

    requiresAudioLibraries: true,
    commandOnly: false,

    subtitle: function(data) {
        return `Install "${data.module}"`;
    },
    
    variableStorage: function(data, varType) {
        const type = parseInt(data.storage);
        if (type !== varType) return;
        let dataType = "Object";
        return ([data.varName, dataType]);
    },

    fields: ["nodeModule", "storage", "varName"],

    html: function(isEvent, data) {
        return `
        <style>
            .embed {
                background-color: #2f3136;
                color: #dcddde;
                margin: 4px;
                padding: 4px;
            }
        </style>
        <div style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: hidden;">
            <div style="width: 100%;">
                <h1>Add-Ons Dependency</h1>
                ${this.description.replace(/\n/g, '<br>').replace('`this.getAddOns()`', '<span class="embed">this.getAddOns()</span>')}
            </div>
            <div style="width: 100%; padding-top: 32px;">
                <h2>NodeModules-Installer</h2>
            </div>
            <div style="float: left; padding-top: 8px; width: 60%;">
                NodeModule-Name:<br>
                <input id="nodeModule" class="round">
            </div><br><br><br><br>
            <div>
                <div style="float: left; width: 35%;">
                    Store In:<br>
                    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
                        ${data.variables[0]}
                    </select>
                </div>
                <div id="varNameContainer" style="display: none; float: right; width: 60%;">
                    Variable Name:<br>
                    <input id="varName" class="round" type="text">
                </div>
            </div><br>
        </div>`
    },

    init: function() {
        const {glob, document} = this;

        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },

    action: function(cache) {
        const data = cache.actions[cache.index];
        const AddOns = this.getAddOns();
        const nodeModuleName = this.evalMessage(data.nodeModule, cache);
        const storage = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        var nodeModule = null;

        if(storage > 0) {
            if(data.module != "" && data.module != undefined) {
                nodeModule = AddOns.require(nodeModuleName);
            }
    
            if(nodeModule) {
                this.storeValue(nodeModule, storage, varName, cache);
            }
        }

        this.callNextAction(cache);
    },

    mod: function(DBM) {
        //Check if the bot was launched via DBM
        if(process.env["SteamGameId"]) {
            console.log("DBM Add-Ons");
            console.log("───────────");
            console.log("Please run your project with via the command");
            console.log("line in order to make DBM Add-Ons functioning.");
            process.exit();
        }

        //Make Add-Ons accessable via Run Script
        DBM.Actions.getAddOns = function() {
            return AddOns;
        }

        //Inject Add-Ons into the bot's initialization process
        const init = DBM.Bot.init.toString();
        var parts = [
            "DBM.Bot.init = ",
            init.slice(0, init.indexOf("\n")+1),
            "    const AddOns = DBM.Actions.getAddOns();\n",
            "    AddOns.loadSettings(DBM);\n",//Load Add-Ons settings
            "    if(AddOns.settings.enableAddOns) {\n",
            "        AddOns.requireNodeModules(DBM);\n",
            "        AddOns.overwriteBotFunctions(DBM);\n",
            "    }\n",
            init.slice(init.indexOf("\n")+1)
        ];
        eval(parts.join(""));
    }
}