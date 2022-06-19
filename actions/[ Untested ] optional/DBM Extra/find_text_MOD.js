module.exports = {
    name: 'Find Text',
    section: 'Other Stuff',

    subtitle(data) {
        return `Find "${data.toFind}"`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Fined Text'];
    },
    fields: ['text', 'toFind', 'option', 'additionally', 'storage', 'varName', 'title'],

    html(isEvent, data) {
        return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Find Text Mod Description</summary>
        [Version 1.3] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Text search, text positioning, and all together. 
    </details>
</div>
    <div style="float: left; width: 100%; padding-top: 8px;">
      Source Text:
      <input id="text" class="round" placeholder="Insert text here..." type="text"/>
    </div>
    <div style="float: left; width: 45%; padding-top: 8px;">
      Option:<br>
      <select onchange="glob.changeOption(this.value);" id="option" class="round">
        <option value="0" selected>Word</option>
        <option value="1">Range</option>
        <option value="2">Positions</option>
        <option value="3">Regex</option>
    </select>
    </div>
    <div style="float: right; width: 50%; padding-top: 8px;">
      Additional Option:<br>
      <select id="additionally" class="round">
        <option value="0" selected>Nothing</option>
        <option value="1">Position</option>
        <option value="2">Word + position</option>
    </select>
    </div>
    <div style="float: left; width: 99%; padding-top: 8px;">
      <input disabled style="background: transparent; border: none" type="text" id="title" value="Insert text here..."/>
      <textarea id="toFind" rows="3" style="width: 100%; white-space: nowrap; resize: vertical;"></textarea>
    </div>
    <div style="float: left; width: 35%; padding-top: 8px;">
      Store Result In:<br>
      <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
        ${data.variables[0]}
      </select>
    </div>
    <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
      Variable Name:<br>
      <input id="varName" class="round" type="text" >
    </div>
</div>`;
    },

    init() {
        const {glob, document} = this;

        glob.changeOption = function (value) {
            const text = ['Insert text here...', 'Insert the first, second word here... [Example: hello,bye]', 'Insert here the first and second position... [Example: 0,5]', 'Insert a regex expression here... [Example: /[A-Z]/g]'];
            document.getElementById('title').value = text[value];
        }

        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },

    action(cache) {
        const data = cache.actions[cache.index];
        const text = this.evalMessage(data.text, cache);
        const toFind = this.evalMessage(data.toFind, cache);
        this.evalMessage(data.title, cache);
        const option = parseInt(data.option, 10);
        const additionally = parseInt(data.additionally, 10);

        if (!toFind) return console.log('Find Text MOD: Text to find is missing!');
        if (!text) return console.log('Find Text MOD: Source text is missing!');

        let result;
        switch (option) {
            case 0:
                if (additionally === 0) result = text.slice(text.indexOf(toFind), toFind.length + text.indexOf(toFind));
                if (additionally === 1) result = [text.indexOf(toFind), toFind.length + text.indexOf(toFind)];
                if (additionally === 2) result = [text.slice(text.indexOf(toFind), toFind.length + text.indexOf(toFind)), text.indexOf(toFind), toFind.length + text.indexOf(toFind)]
                break;
            case 1:
                let arrayWords = toFind.split(",");
                if (additionally === 0) result = text.slice(text.indexOf(arrayWords[0]), text.indexOf(arrayWords[1]));
                if (additionally === 1) result = [text.indexOf(arrayWords[0]), text.indexOf(arrayWords[1])];
                if (additionally === 2) result = [text.slice(text.indexOf(arrayWords[0]), text.indexOf(arrayWords[1])), text.indexOf(arrayWords[0]), text.indexOf(arrayWords[1])];
                break;
            case 2:
                let arrayNumbers = toFind.split(",");
                if (additionally === 0) result = text.slice(arrayNumbers[0], arrayNumbers[1]);
                if (additionally === 1) result = [arrayNumbers[0], arrayNumbers[1]];
                if (additionally === 2) result = [text.slice(arrayNumbers[0], arrayNumbers[1]), arrayNumbers[0], arrayNumbers[1]];
                break;
            case 3:
                result = text.match(eval(toFind));
                break;
        }
        if (result !== undefined) {
            if ((!text.includes(toFind) && option === 0) || result.length === 0) {
                result = 'undefined';
            }
            if ((option === 1 || option === 2 || option === 3) && (result.length === 0 || result <= 0)) {
                result = 'undefined';
            }
        }

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
        this.callNextAction(cache);
    },

    mod() {
    },
};
