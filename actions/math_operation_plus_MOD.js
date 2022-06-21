module.exports = {

name: "Math Operation Plus",
section: "Other Stuff",
meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: 'DBM Extended',
    authorUrl: 'https://github.com/DBM-Extended/mods',
    downloadURL: 'https://github.com/DBM-Extended/mods',
  },

subtitle: function(data) {
	const info = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Round', 'Round to A.S.', 'Absolute', 'Round up', 'Round down', 'Factor', 'Raised by ( Exponents)', 'Rooted by (Roots)', 'Sine', 'Cosine', 'Tangent', 'Arc Sine', 'Arc Cosine', 'Arc Tangent', '% of Number', 'Increase by %' , 'Reduce by %', 'Value of Pi', 'Value of number of Eulers', 'Square root', 'Random number between'];
	return `${info[data.info]}`;
},
	
variableStorage: function (data, varType) {
	const type = parseInt(data.storage);
	if (type !== varType) return;
	let dataType = 'Number';
	return ([data.varName, dataType]);
},

fields: ["FirstNumber", "info", "SecondNumber", "storage", "varName"],

html: function(isEvent, data) {
	return `

<table style="width:100%"><tr><td style="width:45%" id="Principado">

<div id="FirstNum">
<span class="dbminputlabel">Valor 1</span><br>
<input id="FirstNumber" class="round" type="text">
</div>

</td><td style="width:10%;text-align:center"><br>
<div id="Middle" name="Middle"></div>
</td><td style="width:45%">

<div id="SecondNum">
<span class="dbminputlabel">Valor 2</span><br>
<input id="SecondNumber" class="round" type="text">
</div>
</td></tr></table>
<br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Mathematical Operation</span>
<select id="info" class="round" onchange="glob.onChange1(this)">
<option value="0" selected>[ + ] Addition</option>
<option value="1">[ - ] Subtraction</option>
<option value="2">[ x ] Multiplication</option>
<option value="3">[ ÷ ] Division</option>
<option value="4">Round</option>
<option value="5">[ AAS ] Round in A.S.</option>
<option value="6">Absolute</option>
<option value="7">Round up</option>
<option value="8">Round down</option>
<option value="9">Fatorial</option>
<option value="10">[ x,y ] Augmented by (Exponents)</option>
<option value="11">[ x,y ] Rooted by (Roots)</option>
<option value="12">Sine</option>
<option value="13">Cosine</option>
<option value="14">Tangent</option>
<option value="15">Arc Sine</option>
<option value="16">Arc Cosine</option>
<option value="17">Arc Tangent</option>
<option value="18">[ % ] Percent</option>
<option value="19">[ % ] Increase number by percentage</option>
<option value="20">[ % ] Decrease number in percentage</option>
<option value="21">Pi Value</option>
<option value="22">Value of number of Eulers</option>
<option value="23">[ √ ] Square root</option>
<option value="24">[ and ] Random number between each other</option>
</select>
<br>
</div>
<span class="dbminputlabel">Formula information</span>
<div id="Informative" name="Informative" style="border:1px solid #ccc;background:#444;padding:5px"></div>
<br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
	<span class="dbminputlabel">Store in</span><br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
	<span class="dbminputlabel">Variable name</span><br>
		<input id="varName" class="round" type="text">
	</div>
</div>
	`
},

init: function() {
    const {glob, document} = this;

    glob.onChange1 = function(event) {
        const value = parseInt(event.value);
        const dom = document.getElementById('SecondNum');
		const dom2 = document.getElementById('FirstNum');
		const dom2p = document.getElementById('Principado');
		          
        if (value == 0) {
            dom.style.display = null,
			dom2.style.display = null;
			dom2p.style.width = "45%";
            document.querySelector("[name='Middle']").innerText = (`+`);
			document.querySelector("[name='Informative']").innerText = (`Sum two valuesExample: 5 + 5 = 10`);
        } else if (value == 1) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`-`);
			document.querySelector("[name='Informative']").innerText = (`Subtracts two values\nExample: 5 - 2 = 3`);
        } else if (value == 2) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`x`);
			document.querySelector("[name='Informative']").innerText = (`Multiplies two valuesnExample: 5 x 5 = 25`);
        } else if (value == 3) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`÷`);
			document.querySelector("[name='Informative']").innerText = (`Divides two valuesnExample: 10 ÷ 2 = 5`);
		} else if (value == 4) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Rounds to integer by specifying the number of significant figures. Examples: 105.5055465 AAS 3 = 106`);
		} else if (value == 5) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`AAS`);
			document.querySelector("[name='Informative']").innerText = (`Round to whole number specifying the number of significant figures.\nExamples:\n105.5055465 AAS 3 = 106\n105.5055465 AAS 4 = 105.5\n105.5055465 AAS 6 = 105.506`);
		} else if (value == 6) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Absolute number Example:\n105 = 105\n-105 = 105`);
		} else if (value == 7) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Round up\nExamples:\n105.43 = 106\n105.01 = 106`);
		} else if (value == 8) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Round down Example: 105n105.99 = 105n105.01 = 105`);
		} else if (value == 9) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Calculates the factorial of (Value 1)\nExamples:\n[ 3 ] 3×2×1= 6\n[ 4 ] 4×3×2×1 = 24\n[ 5 ] 5×4×3×2×1 = 120`);
		} else if (value == 10) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`X , Y`);
			document.querySelector("[name='Informative']").innerText = (`Returns the value of x raised to y\nExamples:\nx = 2, y = 3 | Result: 8`);
		} else if (value == 11) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`X , Y`);
			document.querySelector("[name='Informative']").innerText = (``);
		} else if (value == 12) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the sine of (Value 1) in radians`);
		} else if (value == 13) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the cosine of (Value 1) in radians`);
		} else if (value == 14) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the tangent of the angle (Value 1)`);
		} else if (value == 15) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the arc sine of (Value 1)`);
		} else if (value == 16) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the arc cosine of (Value 1)`);
		} else if (value == 17) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Returns the arc tangent of (Value 1) as a numerical value between PI/2 and PI/2 radian`);
		} else if (value == 18) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`% of`);
			document.querySelector("[name='Informative']").innerText = (`Calculates in percentages Example:\n25 % of 500 = 125`);
		} else if (value == 19) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Calculates in percent`);
		} else if (value == 20) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`Calculates in percent`);
		} else if (value == 21) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`3.141592653589793`);
		} else if (value == 22) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Middle']").innerText = (``);
			document.querySelector("[name='Informative']").innerText = (`2.718281828459045`);
		} else if (value == 23) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "96%";
			document.querySelector("[name='Middle']").innerText = (`√`);
			document.querySelector("[name='Informative']").innerText = (`Square root of (Value 1)`);
		} else if (value == 24) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Middle']").innerText = (`e`);
			document.querySelector("[name='Informative']").innerText = (`Random number between (Value 1) and (Value 2)`);
		} else {
            dom.style.display = 'none';
		}

		
    };
	glob.onChange1(document.getElementById('info'));

},

action: function(cache) {
	const data = cache.actions[cache.index];
	const FN = parseFloat(this.evalMessage(data.FirstNumber, cache).replace(/,/g, ''));
	const SN = parseFloat(this.evalMessage(data.SecondNumber, cache).replace(/,/g, ''));
	const info = parseInt(data.info);

	let result;
	switch(info) {
		case 0:
			result = FN + SN;
			break;
		case 1:
			result = FN - SN;
			break;
		case 2:
			result = FN * SN;
			break;
		case 3:
			result = FN / SN;
			break;
		case 4:
			result = Math.round(FN);
			break;
		case 5:
		    result = FN.toPrecision(SN);
			break;
		case 6:
			result = Math.abs(FN);
			break;
		case 7:
		    result = Math.ceil(FN);
			break;
		case 8:
		    result = Math.floor(FN);
			break;
		case 9:
		    function fact(x) {
                  if(x == 0) {
                    return 1;
                  }
                  if(x < 0 ) {
                    return undefined;
                  }
                  for(var i = x; --i; ) {
                    x *= i;
                  }
                  return x;
            }
			result = fact(FN);
			break;
		case 10:
		    result = Math.pow(FN, SN);
			break;
		case 11:
		    PO = 1 / SN
		    result = Math.pow(FN, PO);
			break;
		case 12:
		    result = Math.sin(FN);
			break;
		case 13:
			result = Math.cos(FN);
			break;
		case 14:
			result = Math.tan(FN);
			break;
		case 15:
			result = Math.asin(FN);
			break;
		case 16:
			result = Math.acos(FN);
			break;
		case 17:
			result = Math.atan(FN);
			break;
		case 18:
			PN = FN * SN;
			result = PN / 100;
			break;
		case 19:
		    PN = FN * SN;
			result = PN / 100 + FN;
			break;
		case 20:
		    DN = 100 - SN;
			PN = FN * DN;
			result = PN / 100;
			break;
		case 21:
		    result = Math.PI
			break;
		case 22:
		    result = Math.E
			break;
		case 23:
			result = Math.sqrt(FN);
			break;
		case 24:
			result = Math.floor(Math.random() * (SN - FN)) + FN;
			break;
		default:
			break;
	}
	
	if (result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
	this.callNextAction(cache);
},


mod: function(DBM) {
}

};
