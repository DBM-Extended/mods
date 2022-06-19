module.exports = {
    name: 'Randomize',
    section: 'Other Stuff',

    subtitle(data) {
        return `Randomize [${data.element}]; Repeats [${data.repeats}]; Length [${data.length}];`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Text'];
    },
    fields: ['element', 'repeats', 'length', 'storage', 'varName'],

    html(isEvent, data) {
        return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Randomize Mod Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Randomizes different characters, strings, etc.
        <div style="padding: 0 15px 0 15px; background: rgba(0,0,0,0.13); border-radius: 3px">
            <br><p>
                Symbols for randomization:<br>
                Lowercase alpha characters - <span style="color: #3374d7">abcdefghijklmnopqrstuvwxyz</span><br>
                Uppercase alpha characters - <span style="color: #3374d7">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
                Numeric characters - <span style="color: #3374d7">0123456789</span><br>
                Special characters - <span style="color: #3374d7">~!@#$%^&()_+-={}[];\\',.</span><br>
            <br></p>
        </div>
    </details>
</div>
  <div style="float: left; width: 60%; padding-top: 8px;">
    Randomize:<br>
    <input id="element" class="round" type="text" placeholder="This...">
  </div>
  <div style="float: left; margin-left: 5%; width: 14%; padding-top: 8px;">
    Repeats:<br>
    <input id="repeats" class="round" placeholder="0" type="text">
  </div>
    <div style="float: left; margin-left: 5%; width: 14%; padding-top: 8px;">
    Length:<br>
    <input id="length" class="round" placeholder="0" type="text">
  </div><br><br><br>
  <div style="float: left; width: 35%; padding-top: 8px;">
    Store Result In:<br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div><br><br><br><br>
</div>`;
    },

    init() {
        const {glob, document} = this;
        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },

    action(cache) {
        const data = cache.actions[cache.index];
        const element = this.evalMessage(data.element, cache);
        let repeats = this.evalMessage(data.repeats, cache);
        const length = this.evalMessage(data.length, cache);
        if (!repeats) return console.log('Please specify amount of randomized repeats.');
        if (length.length > repeats.length) repeats += length - repeats;

        function randomize(item, count, length) {
            let result = '';
            for (let i = 0; i < count; ++i) {
                let position = Math.floor(Math.random() * item.length - 1);
                result = result + item.substring(position, position + 1);
            }
            let reverseChance = Math.floor(Math.random() * 2);
            if (reverseChance === 1) result = result.split("").reverse().join("");
            if (length > 0) result = result.slice(0, length);
            return result;
        }

        const random = randomize(element, repeats, length);
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(random, storage, varName, cache);
        this.callNextAction(cache);
    },

    mod() {
    },
};
