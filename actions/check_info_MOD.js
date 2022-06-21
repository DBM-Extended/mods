module.exports = {

  name: "Check Info",
  section: "Conditions",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "comparison", "value", "value2", "branch"],


  html(isEvent, data) {
    return `
    <span class="dbminputlabel">Information</span><br>
<textarea id="storage" rows="5" placeholder="Enter information here..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>

<br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Tipo de comparação</span><br>
	<select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
	<option value="0">Exists</option>
	<option value="1" selected>Equals</option>
	<option value="2">Exactly the same</option>
	<option value="3">Less than</option>
      <option value="13">Less than or equal to</option>
	<option value="4">Greater than</option>
      <option value="12">Greater than or equal to</option>
	<option value="5">Includes</option>
	<option value="6">Matches Regex</option>
      <option value="14">Matches Full Regex</option>
      <option value="7">Length is greater than</option>
	<option value="8">Length is less than</option>
	<option value="9">Length is equal to</option>
	<option value="10">Starts with</option>
	<option value="11">Ends with</option>
      <option value="15">Between</option>
      <option value="16">Does it have accents?</option>
      <option value="17">Includes the words ["a" , "b" , "c"]</option>
      <option value="18">Equals the words ["a" , "b" , "c"]</option>
</select>
</div>
<table style="float: right;width: 65%;"><tr><td style="padding:0px 8px";><div style="width: 100%" id="directValue">
<span class="dbminputlabel">Value to compare</span>
		<input id="value" class="round" type="text" name="is-eval">
	</div></td><td style="padding:0px 3px";> <div style="width: 100%;" id="containerxin">
  <span class="dbminputlabel">and</span><br>
  <input id="value2" class="round" type="text" name="is-eval"></td></tr></table>
</div>
</div>

<br><br><br>

<hr class="subtlebar">


<conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },


  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },



  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
      } else {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = "none";
      }
      if (event.value === "15") {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = null;
      }
      if (event.value === "16") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("comparison"));



  },

  


  action(cache) {
    const data = cache.actions[cache.index];
    const val1 = this.evalMessage(data.storage, cache);
    let result = false;
    const compare = parseInt(data.comparison, 10);
    let val2 = data.value;
    let val3 = data.value2;
    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
    switch (compare) {
      case 0:
        result = val1 !== undefined;
        break;
      case 1:
        result = val1 == val2;
        break;
      case 2:
        result = val1 === val2;
        break;
      case 3:
        result = val1 < val2;
        break;
      case 4:
        result = val1 > val2;
        break;
      case 5:
        if (typeof val1?.toString().includes === "function") {
          result = val1.toString().includes(val2);
        }
        break;
        case 6:
          result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
          break;
        case 7:
          result = Boolean(val1.toString().length > val2);
          break;
        case 8:
          result = Boolean(val1.toString().length < val2);
          break;
        case 9:
          result = Boolean(val1.toString().length == val2);
          break;
        case 10:
          result = val1.toString().startsWith(val2);
          break;
        case 11:
          result = val1.toString().endsWith(val2);
          break;
          case 12:
          result = Boolean(val1 >= val2);
          break;
          case 13:
          result = Boolean(val1 <= val2);
          break;
          case 14:
          result = Boolean(val1.toString().match(new RegExp(val2)))
          break;
          case 15:
          var number = parseInt(this.evalMessage(val1.toString(), cache));
          if(number >= val2 && number <= val3) {
          result = number;}
          break;
          case 16:
          const conditions = ["á","à","â","ã","ä","å","æ","é","è","ê","ë","í","ì","î","ï","ó","ò","ô","õ","ö","ð","œ","ø","ú","ù","û","ü","µ","ç","¢","þ","Þ","ß","Ð","ñ","ƒ","§","ý","ÿ","ŕ","Á","À","Â","Ã","Ä","Å","Æ","É","È","Ê","Ë","Í","Ì","Î","Ï","Ó","Ò","Ô","Õ","Ö","Œ","Ø","Ú","Ù","Û","Ü","Ç","Ñ","Ƒ","Ý","Ÿ","Ŕ"]
          result = conditions.some(el => val1.includes(el));
          break;
          case 17:
            const conditionsX = val2
            result = conditionsX.some(els => val1.includes(els));
          break;
          case 18:
            const conditionsZ = val2
            result = conditionsZ.some(elz => val1 == (elz));
          break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
