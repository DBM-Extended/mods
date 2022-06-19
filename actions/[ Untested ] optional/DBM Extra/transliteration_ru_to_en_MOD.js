module.exports = {
    name: "Transliteration Ru to En",
    section: "Other Stuff",

    subtitle(data) {
        return `${data.letters} to En`;
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage);
        if (type !== varType) return;
        return [data.varName, "Text"];
    },

    fields: ["storage", "varName", "letters"],

    html(isEvent, data) {
        return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Transliteration Ru to En MOD Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Converts Russian letters to Latin, does not translate words.
    </details>
</div>
  <div style="float: left; width: 100%; padding-top: 8px;">
  Letters:<br>
    <input style="width: 100%;" id="letters" class="round" type="text">
  </div><br><br><br>
  <div style="float: left; width: 35%; margin-top: 15px;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%; margin-top: 15px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`;
    },

    init() {
    },

    action(cache) {
        let word = "";

        function translit(letters) {
            let lettersConverted = "";
            let converter = {
                а: "a",
                б: "b",
                в: "v",
                г: "g",
                д: "d",

                е: "e",
                ё: "e",
                ж: "zh",
                з: "z",
                и: "i",

                й: "y",
                к: "k",
                л: "l",
                м: "m",
                н: "n",

                о: "o",
                п: "p",
                р: "r",
                с: "s",
                т: "t",

                у: "u",
                ф: "f",
                х: "h",
                ц: "c",
                ч: "ch",

                ш: "sh",
                щ: "sch",
                ь: "",
                ы: "y",
                ъ: "",

                э: "e",
                ю: "yu",
                я: "ya",

                А: "A",
                Б: "B",
                В: "V",
                Г: "G",
                Д: "D",

                Е: "E",
                Ё: "E",
                Ж: "Zh",
                З: "Z",
                И: "I",

                Й: "Y",
                К: "K",
                Л: "L",
                М: "M",
                Н: "N",

                О: "O",
                П: "P",
                Р: "R",
                С: "S",
                Т: "T",

                У: "U",
                Ф: "F",
                Х: "H",
                Ц: "C",
                Ч: "Ch",

                Ш: "Sh",
                Щ: "Sch",
                Ь: "",
                Ы: "Y",
                Ъ: "",

                Э: "E",
                Ю: "Yu",
                Я: "Ya",
            };
            for (let i = 0; i < letters.length; ++i) {
                if (converter[letters[i]] === undefined) {
                    lettersConverted += letters[i];
                } else {
                    lettersConverted += converter[letters[i]];
                }
            }

            word = lettersConverted;
        }

        const data = cache.actions[cache.index];
        const type = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        const letters = this.evalMessage(data.letters, cache);
        translit(letters);
        this.storeValue(word, type, varName, cache);
        this.callNextAction(cache);
    },

    mod() {
    },
};
