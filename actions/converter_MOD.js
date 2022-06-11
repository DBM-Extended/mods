module.exports = {

    name: "Converter",  
    section: "Other Stuff",   
    short_description: "Converte uma informação em texto,número ou formato",
    meta: {
        version: '2.1.4',
        preciseCheck: true,
        author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
        authorUrl: 'https://github.com/DBM-Brazil/mods',
        downloadURL: 'https://github.com/DBM-Brazil/mods',
      },
    
    subtitle: function(data) {
        const info = ['Número inteiro (Arredondado)', 'Número inteiro (Para cima)', 'Número inteiro (Para baixo)', 'Texto', 'Texto maiúsculo', 'Texto minúsculo', 'Texto sem espaços', 'Texto (Sem espaços de ambos os lados)', 'Número com pontuações' , 'Número resumido', 'Formato de dinheiro R$', 'Formato de dinheiro U$', 'Formato de dinheiro €', 'Texto sem acentos'];
        const prse = parseInt(data.into);
        return `Converter "${data.vAria}" em ${info[prse]}`;
    },
    
    
    
    variableStorage: function(data, varType) {
        const type = parseInt(data.storage);
        const prse2 = parseInt(data.into);
        const info2 = ['Numero', 'Numero', 'Numero', 'Texto', 'Texto', 'Texto', 'Texto', 'Texto', 'Numero', 'Numero', 'Dinheiro', 'Dinheiro', 'Dinheiro', 'Texto'];
        if(type !== varType) return;
        return ([data.varName2, info2[prse2]]);
    },
    
    
    fields: ["into", "vAria", "storage", "varName2"],
    
    html: function(isEvent, data) {
        return `
    <div style="width: 550px; height: 350px;">
        <div style="width: 60%;">
            <div style="width: 150%;">
            <span class="dbminputlabel">Informação</span><br>
                   <textarea id="vAria" rows="3" style="width:100%;"></textarea>
               </div>
            <br>
            <span class="dbminputlabel">Converter em</span><br>
            <select id="into" class="round">
                    <option value="0" selected>Número inteiro (Arredondado)</option>
                    <option value="1">Número inteiro (Para cima)</option>
                    <option value="2">Número inteiro (Para baixo)</option>
                    <option value="8">Número com pontuações (Ex: 1.000)</option>
                    <option value="9">Número resumido (Ex: 1k)</option>
                    <option value="10">Formato de dinheiro R$</option>
                    <option value="11">Formato de dinheiro U$</option>
                    <option value="12">Formato de dinheiro €</option>
                    <option value="3">Texto</option>
                    <option value="4">Texto maiúsculo</option>
                    <option value="5">Texto minúsculo</option>
                    <option value="6">Texto sem espaços</option>
                    <option value="7">Texto (Sem espaços de ambos os lados)</option>
                    <option value="13">Texto sem acentos</option>
            </select>
        </div><br>
        <div>
            <div style="float: left; width: 35%;">
            <span class="dbminputlabel">Armazenar em</span><br>
                <select id="storage" class="round">
                    ${data.variables[1]}
                </select>
            </div>
            <div id="varNameContainer2" style="float: right; width: 60%;">
                <div class="col-3 input-effect" style="width: 83%;">
                    <input id="varName2" class="efeitoala" type="text" style="width: 100%;">
                    <label><span class="dbminputlabel">Nome da variavel</span></label>
                    <span class="focus-border"></span>
                </div><br>
            </div>
        </div>
    </div>
    <style>
        .codeblock {
            margin: 4px; background-color: rgba(0,0,0,0.20); border-radius: 3.5px; border: 1px solid rgba(255,255,255,0.15); padding: 4px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; transition: border 175ms ease;
        }
        .codeblock:hover{border:1px solid rgba(255,255,255,.45)}.text{color:#0ff}
        select.round{width:100%;border:0 solid #eee !important;border-radius:4px !important;box-sizing:border-box !important;display:block !important;height:28px !important;padding-left:8px !important;box-shadow:-2px 0 0 #fff;transition:box-shadow 150ms ease}
        select.round:focus{outline-width:0;box-shadow:0 1px 0 #0059ff;}
        .col-3 {border: 0px solid #eee;float: left; margin-top: 20px; margin-bottom: 6px; position: relative; background: rgba(0, 0, 0, 0.27); border-radius: 5px;}
        input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
        input[type="text"]{font: 15px/24px "Lato", Arial, sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
        
        .efeitoala{border: 0; padding: 4px; border-bottom: 1px solid #ccc; background-color: transparent;}
        .efeitoala ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
        .efeitoala:focus ~ .focus-border,
        .has-content.efeitoala ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
        .efeitoala ~ label{position: absolute; left: 0%; width: 100%; top: -21px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
        .efeitoala:focus ~ label, .has-content.efeitoala ~ label{font-size: 12px; color: #4caf50; transition: 0.3s;}
        
    </style>`
    },
    
    init: function() {},
    
    action: function(cache) {
        const data = cache.actions[cache.index],
            theVar = this.evalMessage(data.vAria, cache),
            INTO = parseInt(data.into);
        let result;
    
        switch (INTO) {
                case 0:
                    result = Math.round(theVar.toString().replace(',','.'));
                    break;
                case 1:
                    result = Math.ceil(theVar.toString().replace(',','.'));
                    break;
                case 2:
                    result = parseInt(theVar);
                    break;
                case 3:
                    result = theVar.toString();
                    break;
                case 4:
                    result = theVar.toString().toUpperCase();
                    break;
                case 5:
                    result = theVar.toString().toLowerCase();
                    break;
                case 6:
                    result = theVar.toString().split(' ').join('');
                    break;
                case 7:
                    result = theVar.toString().trim();
                    break;
                    case 8:
                    if(isNaN(parseFloat(theVar))) {
                        result = theVar;
                    } else {
                        result = parseFloat(theVar).toLocaleString("pt-BR");
                    }
                    break;
                    case 9:
                    var number = parseInt(this.evalMessage(theVar, cache));
    
                    if(number >= 1000 && number <= 999999) {
                        number = number.toString().slice(0, -3) + "k";
                    }
                    
                    if(number >= 1e+6 && number <= 1e+8) {
                        number = number.toString().slice(0, -6) + "m";
                    }
                    
                    if(number >= 1e+9 && number <= 1e+11) {
                        number = number.toString().slice(0, -9) + "b";
                    }
                    
                    if(number >= 1e+12 && number <= 1e+14) {
                        number = number.toString().slice(0, -12) + "t";
                    }
                    if(number >= 1e+15 && number <= 1e+17) {
                        number = number.toString().slice(0, -15) + "q";
                    }
                    if(number >= 1e+18 && number <= 1e+20) {
                        number = number.toString().slice(0, -18) + "sx";
                    }
                    if(number >= 1e+21 && number <= 1e+23) {
                        number = number.toString().slice(0, -4) + "sp";
                    }
                    if(number >= 1e+24 && number <= 1e+26) {
                        number = number.toString().slice(0, -4) + "o";
                    }
                    if(number >= 1e+27 && number <= 1e+29) {
                        number = number.toString().slice(0, -4) + "n";
                    }
                    if(number >= 1e+30 && number <= 1e+32) {
                        number = number.toString().slice(0, -4) + "d";
                    }
                    if(number >= 1e+33 && number <= 1e+35) {
                        number = number.toString().slice(0, -4) + "u";
                    }
                    if(number >= 1e+36 && number <= 1e+38) {
                        number = number.toString().slice(0, -4) + "du";
                    }
                    if(number >= 1e+39) {
                        number = number.toString().slice(0, -4) + "tr";
                    }
                    result = number;
                    break;
                    case 10:
                        let money = Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        });
                        result = money.format(theVar.toString().replace(',','.'))
                    break;
                    case 11:
                        let money2 = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            });
                            result = money2.format(theVar.toString().replace(',','.'))
                            break;
                    case 12:
                        let money3 = Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                            });
                            result = money3.format(theVar.toString().replace(',','.'))
                            break;
                    case 13:
                         const acentos = [
                            "á", "à", "â", "ã", "ä", "å", "æ",
                            "é", "è", "ê", "ë",
                            "í", "ì", "î", "ï",
                            "ó", "ò", "ô", "õ", "ö", "ð", "œ", "ø",
                            "ú", "ù", "û", "ü", "µ",
                            "ç", "¢",
                            "þ", "Þ", "ß",
                            "Ð",
                            "ñ",
                            "ƒ",
                            "§",
                            "ý", "ÿ",
                            "ŕ",
                            "Á", "À", "Â", "Ã", "Ä", "Å", "Æ",
                            "É", "È", "Ê", "Ë",
                            "Í", "Ì", "Î", "Ï",
                            "Ó", "Ò", "Ô", "Õ", "Ö", "Œ", "Ø",
                            "Ú", "Ù", "Û", "Ü",
                            "Ç",
                            "Ñ",
                            "Ƒ",
                            "Ý", "Ÿ",
                            "Ŕ",
                         ]
    
                         const acentosSubstituir = [
                            "a", "a", "a", "a", "a", "a", "a",
                            "e", "e", "e", "e",
                            "i", "i", "i", "i",
                            "o", "o", "o", "o", "o", "o", "o", "ø",
                            "u", "u", "u", "u", "u",
                            "c", "c",
                            "b", "b", "b",
                            "D",
                            "n",
                            "f",
                            "s",
                            "y", "y",
                            "r",
                            "A", "A", "A", "A", "A", "A", "A",
                            "E", "E", "E", "E",
                            "I", "I", "I", "I",
                            "O", "O", "O", "O", "O", "O", "O",
                            "U", "U", "U", "U",
                            "C",
                            "N",
                            "F",
                            "Y", "Y",
                            "R",
                         ]
    
                         result = theVar.toString();
    
                         for(var i = 0; i <= acentos.length; i++) {
                             result = result.replaceAll(acentos[i], acentosSubstituir[i]);
                         }
                        break;
        }
        if(result !== undefined) {
            const storage = parseInt(data.storage);
            const varName2 = this.evalMessage(data.varName2, cache);
            this.storeValue(result, storage, varName2, cache);
        }
        this.callNextAction(cache);
    },
    
    mod: function(DBM) {
    }
    
    };
