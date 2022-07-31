module.exports = {
  name: 'Youtube Search MOD',
  section: 'Audio Control',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: 'DBM Extended',
      authorUrl: 'https://github.com/DBM-Extended/mods',
      downloadURL: 'https://github.com/DBM-Extended/mods',
    },

  subtitle (data) {
    return `Search: ${data.Search}`;
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'List'])
  },

  fields: ['Search', 'Searchpor', 'console', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">DBM-Extended</div>
  <div style="padding-top: 8px;">
  <span class="dbminputlabel">Search Youtube</span><br>
    <input class="round" id="Search" placeholder="" style="width: 99%; font-family: monospace; white-space: nowrap"/>
  </div>
</div>

<div style="padding-top: 14px;">
<table style="width:100%"><tr><td>
<span class="dbminputlabel">Search for</span><br>
  <select id="Searchpor" class="round">
  <option value="0" selected>Video</option>
  <option value="1">Channel</option>
  <option value="2">Playlist</option>
  <option value="3">All</option>
</select>
</td><td>
<span class="dbminputlabel">Console LOG</span><br>
  <select id="console" class="round">
  <option value="0" selected>Disabled</option>
  <option value="1">Activated</option>
</select>
</td></tr></table>

<div style="padding-top: 14px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Store in</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text">
  </div>
  <br><br><br><br>
  A list will be returned, to collect, use the following variables from 0 to 9<br>
  \${tempVars("variablename")[0].id}<br>
  \${tempVars("variablename")[0].title}<br>
  \${tempVars("variablename")[0].duration}<br>
  \${tempVars("variablename")[0].thumbnail}<br>
  \${tempVars("variablename")[0].uploadDate}<br>
  \${tempVars("variablename")[0].viewCount}<br>
  <style>td{padding:5px;}</style>
  `
  },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const scrapeYt = require("scrape-yt")
    const Search = this.evalMessage(data.Search, cache)
    const consolelog = this.evalMessage(data.console, cache)
    const Searchpor = this.evalMessage(data.Searchpor, cache)

    let result
    let search

    if(Searchpor == 0){search = "video"}
    if(Searchpor == 1){search = "channel"}
    if(Searchpor == 2){search = "playlist"}
    if(Searchpor == 3){search = "all"}

    scrapeYt.search(Search, {type: search}).then(videos => {
         
   if(consolelog == 1){
      console.log(videos)}

    result = videos

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
    });
    
  },



  mod () {}
}
