# THIS COMMAND REQUIRES THE FOLLOWING NODE MODULES TO WORK: `quick.db`, `json5`, and `image-url-validator`
If you don't have quick.db, open up your command prompt / cmd.exe (in your bot's directory) and type this:
```css
npm i quick.db
```
If you're *still* having issues with it, run the below command in powershell as an administrator and wait (it takes a while and can take up to 10 minutes or so), then install `npm i quick.db` in cmd (in your bot directory) again after that:
```css
npm install --vs2015 -g windows-build-tools
```
***STILL*** having issues? Alright, since your computer doesn't like being set up properly, we have to do this sequence:
Powershell (as Administrator):
```css
npm i node-gyp
npm install --global --production windows-build-tools
```
or
```css
npm -g --add-python-to-path install windows-build-tools node-gyp
```
Now, after you do one of the above, and wait for it to finish, go back to cmd (in your bot directory), and type this one final time:
```css
npm i quick.db
```
If there are still issues, your last resort is to follow the creator's installation guide [here](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md). *Note:* this may or may not work if you don't run this on Windows.

For best results, place the bot with admin permissions, and with the highest role. Regardless of your setup however, this cannot kick/ban the server owner, based on the Discord API; it can still delete their offending message though.
To setup this system, you must either be the server owner, have `administrator` permission, or have `Ban Members`, `Kick Members`, and `Manage Messages` permissions. In addition, the bot must also have these permissions : `kick, ban, and manage messages`. This is not the case when the system is turned on, it just applies to setting up the bot. At the bare minimum, the bot requires `manage messages` permission to properly function and delete the messages.

### Due to the previous and the updated version being drastically different, the old version is no longer supported and may have incompatibility issues. To ensure you have a working version please run the included reset command and follow the instructions.

`BadWordFilter` is an "any message sent" command type; all other commands are normal commands. Each one of these commands should have 1 action "Run Script" set to "Evaluate Text Directly", and "Do not call next action". To use them, copy all the code for each command and paste it into the Run Script for each respective command.

## Guide on how to use the system:
For this example, the prefix will be `!`. Yours may vary, and if so, substitute your prefix instead. The default alias is `bws`.
```css
!BadWordsSetup help          (Shows you the help page. This also occurs if you don't type anything after the command.)
!BadWordsSetup enable        (Enables the system if it isn't enabled already.)
!BadWordsSetup disable       (Disables the system if it isn't disabled already.)
!BadWordsSetup status        (Checks if the system is enabled or disabled.)
!BadWordsSetup addword       (Starts an await response sequence to add 1 word/phrase at a time.)
!BadWordsSetup download      (Sends an attachment or link containing a list of all the bad words for your server.)
!BadWordsSetup upload        (Uploads a list of bad words to use in your server. Make sure to use the !convert command if need be. All words are in this format: `{word:"the word"}`. You can view the format by running !BadWordsSetup download)
!BadWordsSetup channels      (Allows you to specify individual channels (bad words and disciplinary actions) to send a message to whenever a user types a bad word.)
!BadWordsSetup defaults      (A selection of default actions you can choose from, ranging from default embed options to how it matches words to how it identifies the user and more!)
!BadWordsSetup filters       (Choose channel(s) or role(s) that are exempt from the system.)
!BadWordsSetup rules         (A selection of various rules to choose from that changes how the system behaves when it sees a bad word.)
!BadWordsSetup transferfrom  (Sends an attachment or link containing all settings in the Bad Word System including bad words.)
!BadWordsSetup transferto    (Uploads a file containg all settings for the Bad Word System. This is useful if you want to copy the settings from one server to another.)
!BadWordsSetup version       (Shows you the versions of the commands you have so far. This is helpful to know if you have the most up-to-date version of the system, and which ones (if any) are out-of-date. The current versions are: config:2.2.1, filter:2.1.0, reset:1.0.1, convert:1.0.2
```

For the upload command, attach a file, and run the command in the "add a comment" field, or alternatively, run the command and add a link to the file (must be a .txt file) **`!BadWordsSetup upload http://www.site.com/list.txt`**

## Channels option guide   
<details>
  <summary>Click to view/hide</summary>
  <p>
<!--  -->
    
**`!BadWordsSetup channels status`**   Shows the badwordlog and actionlog channels if they've been set.

**`!BadWordsSetup channels badwordlog`**   Mention a channel [<#logs>](#) or provide the channel's ID to set the channel the Bad Word System will use to send logs of it catching a bad word.

**`!BadWordsSetup channels actionlog`**   Mention a channel [<#logs>](#) or provide the channel's ID to set the channel the Bad Word System will use to send logs of it performing a disciplinary action (mute/kick/ban).
</p></details>

## Defaults option guide   
<details>
  <summary>Click to view/hide</summary>
  <p>
<!--  -->

    !BadWordsSetup defaults addword                             You can choose from a few options to control how the addword command operates.
    !BadWordsSetup defaults addword responsetime                Control how long the addword command waits for input before timing out.
    !BadWordsSetup defaults usermode                            You can choose from a few options to control how it shows users.
    !BadWordsSetup defaults usermode status                     Shows the current usermode (The below user will change based on the user).
    !BadWordsSetup defaults usermode mention                    Sets the usermode to an @mention. This will show up as [@CoolGuy](https://github.com/DanTheComputerMan/javascript/edit/master/Discord%20Bot%20Maker%20(DBM)/RAW%20Data/Bad%20Words%20System/readme.md)
    !BadWordsSetup defaults usermode mention                    Sets the usermode to a tag. This will show up as CoolGuy#9889
    !BadWordsSetup defaults usermode id                         Sets the usermode to an @mention. This will show up as 290391058133811201
    !BadWordsSetup defaults matchstyle                          You can choose from a few options to control how it matches bad words.
    !BadWordsSetup defaults matchstyle status                   Shows the current matchstyle (how it matches words).
    !BadWordsSetup defaults matchstyle matchword                Sets the matchstyle to matchword. This is the default method.
    !BadWordsSetup defaults matchstyle matchwordcasingmatters   Sets the matchstyle to matchwordcasingmatters.
    !BadWordsSetup defaults matchstyle matchany                 Sets the matchstyle to matchany.
    !BadWordsSetup defaults matchstyle matchanycasingmatters    Sets the matchstyle to matchanycasingmatters.
    !BadWordsSetup defaults matchstyle matchregex               Sets the matchstyle to matchregex. This mode is useful if you have regex expressions as words.
    !BadWordsSetup defaults action                              You can choose from a few options to control how it disciplines users. This is only used if the specified word does not have a specific disciplinary action listed for that word.
    !BadWordsSetup defaults action delete                       Sets the default action to delete.
    !BadWordsSetup defaults action mute                         Sets the default action to delete.
    !BadWordsSetup defaults action kick                         Sets the default action to delete.
    !BadWordsSetup defaults action ban                          Sets the default action to delete.
    !BadWordsSetup defaults muterole                            Sets the mute role to apply when user types a word marked as mute. You can [@mention](#) or provide the role's ID. You can also provide "remove" to remove the muterole.
    !BadWordsSetup defaults color                               Sets the default success/neutral embed color. You can also provide "remove" to remove the embed color.
    !BadWordsSetup defaults image                               Sets the default success/neutral embed image. You can also provide "remove" to remove the embed image.
    !BadWordsSetup defaults thumbnail                           Sets the default success/neutral embed thumbnail. You can also provide "remove" to remove the embed thumbnail.
    !BadWordsSetup defaults footer                              Sets the default success/neutral embed footer. You can also provide "remove" to remove the embed footer.
    !BadWordsSetup defaults timestamp                           Enables/disables the default success/neutral embed timestamp. This shows as the current date/time.

  <details>
  <summary>Click to view/hide matchstyle info</summary>
  <p>
  <!--  -->
    
    Breakdown:     (Sample string user typed: `Oh Hello Bob, I am going to the store today.`)   and the bad word `hell`.***
    matchword:               Does not match. 'hell' word is not found b/c it's part of a larger word 'hello' (regardless of casing) *(recommended & default method)*.
    matchwordcasingmatters:  Does not match. 'hell' word is not found b/c it's part of a larger word 'hello'.
    matchany:                Does match. Exact 'hell' found in string (doesn't count casing). Doesn't matter that o is after hell *(Not recommended)*.
    matchanycasingmatters:   Does not match. Exact 'hell' not found in string (casing matters) *(Also not recommended)*.

    Another Example:     (Sample string user typed: `Oh Hell Bob, that sucks for you, considering you're inhell`)   and the bad word `hell`.***
    matchword:               Does match. 'hell' is found (regardless of casing) *(recommended & default method)*.
    matchwordcasingmatters:  Does not match. 'hell' word is not found (casing matters).
    matchany:                Does match. Exact 'hell' found in string (doesn't count casing).
    matchanycasingmatters:   Does match. Exact 'hell' found in string.
    
    There is also another option of matchregex, but that matches regex expressions. Example: the regex is a Discord invite link regex and is: discord\.gg\/.+ and the example string is: "Come to my server! discord.gg/abc123 It's super fun!"
  </p></details>
</p></details>


## Filters option guide   
<details>
  <summary>Click to view/hide</summary>
  <p>
<!--  -->

    !BadWordsSetup filters           You can choose from a few options to control the filter exceptions.
    !BadWordsSetup filters status    Shows the enabled filters.
    !BadWordsSetup filters channel   Sets or removes a channel to be excluded/included from/in the Bad Word System. This can be a [#mod-chat](#) channel mention or the channel's ID.
    !BadWordsSetup filters role      Sets or removes a role to be excluded/included from/in the Bad Word System. This can be a [@Admins](#) role mention or the role's ID.
    
</p></details>

## Rules option guide   
<details>
  <summary>Click to view/hide</summary>
  <p>
<!--  -->

    !BadWordsSetup rules                         You can choose from a few options to control the rule options.
    !BadWordsSetup rules status                  Shows the enabled rules.
    !BadWordsSetup rules BreakOnMatch            Enables/disables the BreakOnMatch rule. When enabled, this rule will stop looking through the list when it finds its first bad word match.
    !BadWordsSetup rules PostDeleteMessage       Enables/disables the PostDeleteMessage rule. When enabled, this rule will post a message that a user's message was deleted in the same channel the message was deleted. This can be used as an early warning sign to the user to stop.
    !BadWordsSetup rules PostDeleteMessageText   Enables/disables the PostDeleteMessageText rule. When enabled, this rule will post a message containing the bad words in the same channel that it found the bad words. This only does something if the PostDeleteMessage rule is enabled.
    !BadWordsSetup rules PostMuteMessage         Enables/disables the PostMuteMessage rule. When enabled, this rule will post a message that a user was muted. This can be used as an early warning sign to the user to stop.
    !BadWordsSetup rules PostMuteMessageText     Enables/disables the PostMuteMessageText rule. When enabled, this rule will post a message containing the bad words in the same channel that it found the bad words. This only does something if the PostMuteMessage rule is enabled.
    !BadWordsSetup rules PostKickMessage         Enables/disables the PostKickMessage rule. When enabled, this rule will post a message that a user was kicked. This can be used as an early warning sign to dissuade other users of doing the same thing.
    !BadWordsSetup rules PostKickMessageText     Enables/disables the PostKickMessageText rule. When enabled, this rule will post a message containing the bad words in the same channel that it found the bad words. This only does something if the PostKickMessage rule is enabled.
    !BadWordsSetup rules PostBanMessage          Enables/disables the PostBanMessage rule. When enabled, this rule will post a message that a user was banned. This can be used as an early warning sign to dissuade other users of doing the same thing.
    !BadWordsSetup rules PostBanMessageText      Enables/disables the PostBanMessageText rule. When enabled, this rule will post a message containing the bad words in the same channel that it found the bad words. This only does something if the PostBanMessage rule is enabled.
    
</p></details>

The **`!BadWordsSetup transferfrom`** command attaches or links a file that contains all settings and badwords in the system. This is useful if you want to copy the settings from one server to another.

The **`!BadWordsSetup transferto`** command allows you to attach or link a file contains=ing all settings and badwords into the system. This command requires the Administrator permission as it can be used to corrupt the system.

The **`!convert`** command allows you to attach or link to a file containing each word on a seperate line. This will convert that file to a format the Bad Word System supports, and then attach or link to the converted file.

Potential future features (and ones completed):
- [x] Added log channel (Update: added individual log channels)
- [x] Added config option (Update: Completely revamped this).
- [x] Added regex option
- [x] Added per-server downloadable & uploadable lists
- [x] Added per-server downloadable & uploadable settings files
- [x] Added filters
- [x] Added default options
- [x] Added convert command
- [x] Added mute role option
- [x] Added single word option to add words
- [ ] Wildcard support (* can be any character)
- [ ] Character subsitution (@ = a)
- [ ] Character set match types (A-z, À-ÖØ-öø-ÿ)
