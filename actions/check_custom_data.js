  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░█████░█░░░█░█████░█████░█████░██░██░░░
  // ░█░░░░░█░░░█░█░░░░░░░█░░░█░░░█░█░█░█░░░
  // ░█░░░░░█░░░█░█████░░░█░░░█░░░█░█░░░█░░░
  // ░█████░█████░▄▄▄▄█░░░█░░░█████░█░░░█░░░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░████░░░███░░█████░░███░░░░░░░░░░░░░░░░
  // ░█░░░█░█░░░█░░░█░░░█░░░█░░▄▄░░░███░░░░░
  // ░█░░░█░█▀▀▀█░░░█░░░█▀▀▀█░░▄█░░░█░█░░░░░
  // ░████░░█░░░█░░░█░░░█░░░█░░█▄░▄░███░░░░░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░█░░░░█░░█░░░░░█░████░█░▄▀░████░
  // ░████░████░░░░░█░█░░░░█▄▀░░█░░█░
  // ░█░░█░░░░█░░░░░█░████░█░█░░████░
  // ░████░████░░████░█▄▄▄░█░░█░█░░█░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

module.exports = {
  name: 'Check Custom Data 2.0',
  section: 'Custom Data',
  fields: [
    'filePath',
    'value',
    'branch',
    'jsonPath',
    'comparison',
    'varName',
    'storage',
  ],

  meta: {
    version: '2.0.1',
    preciseCheck: false,
    author: 'JMODS',
    authorUrl: 'https://github.com/ContentJeka/JMODS',
    downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/check_custom_data.js',
  },

  subtitle(data, presets) {
    console.log(JSON.stringify(presets, undefined, 4))
    return `${presets.getConditionsText(data)}`;
  },

  html() {
    return `
    <div id="catSS" style="display: none;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    z-index: 100;
    top: 0;">
      <div style="position:absolute; z-index: 101; margin: calc(50vh - 242px) calc(50vw - 100px) calc(50vh - 100px) calc(50vw - 242px)">
        <img src="https://images-ext-1.discordapp.net/external/S93CpkCNSuBUMr5kKJBUeh3RFcrfD-I3Yxw30A6LLjg/https/i.imgur.com/69Kg9mB.png"/>
        <span style="position: absolute;
        margin-left: 200px;
        font-size: 20px;
        width: 100vw;
        top: 25px;">Мяу, тебе нужна помощь по Custom Data?</span>
        <a href="https://github.com/ContentJeka/JMODS/wiki" style="width: 190%;
        height: 40px;
        border-radius: 15px;
        color: #000;
        font-weight: 600;
        border: none;
        background: #fff;
        position: absolute;
        top: 54px;
        margin-left: 200px;
        box-shadow: 0px 0px 49px 6px rgb(255 255 255 / 20%);
        text-align: center;
        padding: 10px;">Да!</a>
        <button onclick="glob.onnoclicked()" style="width: 190%;
        height: 40px;
        border-radius: 15px;
        color: #fff;
        font-weight: 600;
        border: solid #fff 1px;
        background: rgba(256, 256, 256, 0.1);
        position: absolute;
        top: 112px;
        margin-left: 200px;
        box-shadow: 0px 0px 49px 6px rgb(255 255 255 / 20%);">Нет</button>
      </div>
    </div>
    <div id="blcbg" style="display: none;position: absolute; background-color: rgba(0, 0, 0, 0.7); left: 0; top: 0; z-index: 100; width: 100vw; height: 100vh"></div>
    <div id="selectpath" style="
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        width: calc(100vw - 50px);
        height: calc(100vh - 110px);
        /* padding: 25px; */
        margin: 25px;
        z-index: 1002;
        border-radius: 15px
    ">
        <img id="closepath" onclick="document.getElementById('blcbg').style.display = 'none'; document.getElementById('selectpath').style.display = 'none';document.getElementById('closepath').style.display = 'none'" style="display:none;position:absolute; right: 0; padding: 15px; filter: opacity(0.3)" src="https://images-ext-1.discordapp.net/external/AohVSagpV1CiV7kOUU_omxMk079tnPjn3L4Cz1r5by8/https/i.imgur.com/XHQFG7Q.png?width=10&height=10"/>
        <div id="files" style="padding:25px"></div>
    </div>
    <div style="padding-bottom: 12px">
    <div style="width: 40%; float: left;">
    <span class="dbminputlabel">Путь к файлу</span><br>
    <input id="filePath" class="round" type="text" onchange="glob.fileext()" value="./data/" placeholder="./data/top.json">
    <img onclick="document.getElementById('blcbg').style.display = null; document.getElementById('selectpath').style.display = null;document.getElementById('closepath').style.display = null" style="cursor: pointer; margin-top: -25px;margin-left: 34%;position: absolute;filter: invert(1) opacity(0.5)" src="https://images-ext-1.discordapp.net/external/kI1YG6DhcpzESJ5OQo4WaqQIxhuva2VKC8Q84mz3S88/https/i.imgur.com/wSvljNY.png?width=20&height=20"/><br>
    </div>
    <!-- ----------------------------- -->
    <div style="width: 60%; float: left; padding-left: 5%;">
      <span class="dbminputlabel">JSON Путь</span> <br>
      <input id="jsonPath" class="round" type="text">
    </div>
    </div> <br><br><br>
    <!-- ----------------------------- -->
    <div style="padding-bottom: 12px">
      <div style="float: left; width: 40%;">
      <span class="dbminputlabel">Сравнить</span><br>
      <select id="comparison" class="round">
        <option value="0">Существует ли?</option>
        <option value="1" selected>Равен ли?</option>
        <option value="2">Меньше чем</option>
        <option value="3">Больше чем</option>
        <option value="6">Меньше или равно</option>
        <option value="7">Больше или равно</option>
        <option value="4">Массив?</option>
        <option value="5">Объект?</option>
        <option value="8">Включает в себя</option>
        <option value="9">Включает в массив</option>
        <option value="10">Начинается с</option>
        <option value="11">Заканчивается на</option>
      </select>
      </div>
    <!-- ----------------------------- -->
      <div style="float: left; width: 60%; padding-left: 5%;">
        <span class="dbminputlabel">Сравнить с</span><br>
        <input id="value" class="round" type="text" name="is-eval">
      </div>
    </div> <br><br><br>
    <!-- ----------------------------- -->
    <hr class="subtlebar">
    <conditional-input id="branch" style="padding-top: 16px;"></conditional-input>
    <div id="cat1" style="position:absolute;bottom: -120px;cursor:pointer">
       <img id="catimg" onclick="glob.catclick(this)" style="transition: 3s" src="https://images-ext-1.discordapp.net/external/LhQujrHiACY_jl0ijETfnSiUk1TzkOW-hoa--e4dTyk/https/i.imgur.com/upzrNFx.png"/> 
      </div>
`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  async init() {
    const { glob, document } = this;

    let clicked = 0;
    const fs = require("fs-extra")
      let project2 = await JSON.parse(fs.readFileSync("./settings.json"))["current-project"]
      let files = fs.readdirSync(`${project2}/data`)
      document.getElementById("files").innerHTML = `<style>
      #maindiv {
        cursor: pointer;
        margin: 0 0 0 0;
        padding: 0;
        color: #000;
        display:inline-flex;
        width:100%;
        height: 20px;
        border: solid #fff 1px;
        align-items: center;
      }
      
      #maindiv:hover {
        margin: 0 0 0 0;
        display:inline-flex;
        padding: 0;
        width:100%;
        height: 20px;
        background-color: #E5F3FF;
        align-items: center;
      }
      </style>`
      for(let i = 0; i < files.length; i++) {
          html = document.getElementById("files").innerHTML;
          html += `
            <div id="maindiv" onclick="document.getElementById('filePath').value = './data/${files[i]}'; document.getElementById('blcbg').style.display = 'none'; document.getElementById('selectpath').style.display = 'none';document.getElementById('closepath').style.display = 'none'">
                <img style="width:20px;"src="https://images-ext-2.discordapp.net/external/hcsToQtHWkfgzBF1P1Ru4Nvwv1xkFgVrmEOqnKrB8GI/https/i.imgur.com/VYTZlqS.png"/>
                <p style="font-size: 12px; font-weight: 500; margin-left: 2px">${files[i]}</p>
            </div>
          `
          document.getElementById("files").innerHTML = html
      }

      glob.catclick = async function () {
        document.getElementById("catSS").style.display = null
      }

      glob.onnoclicked = async function (event) {
        document.getElementById("catSS").style.display = "none";
        clicked += 1;
        if(clicked > 2) {
            document.getElementById("catimg").style.transform = "translate(0px, 50%)"
        }
      }

      glob.onyesclicked = async function () {
        document.getElementById("catSL").style.display = "none";
      }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require("fs-extra")

    const filePath = this.evalMessage(data.filePath, cache)
    let json = JSON.parse(fs.readFileSync(filePath))
    const jsonPath = `json?.["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]?.["`)}"]`
    const comparison = data.comparison
    const value = this.evalMessage(data.value, cache)
    let result;

    switch(comparison) {
      case "0":
        result = !eval(`json?.["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]?.["`)}"]`) ? false : true
        break;
      case "1":
        result = eval(jsonPath) == value ? true : false
        break;
      case "2":
        result = eval(jsonPath) < value ? true : false
        break;
      case "3":
        result = eval(jsonPath) > value ? true : false
        break;
      case "6":
        result = eval(jsonPath) <= value ? true : false
        break;
      case "7":
        result = eval(jsonPath) >= value ? true : false
        break;
      case "4":
        result = Array.isArray(eval(jsonPath))
        break;
      case "5":
        if(!Array.isArray(eval(jsonPath))) {
          result = Object.keys(eval(jsonPath)).toString() !== 0 ? true : false
        } else result = false
        break;
      case "8":
        result = eval(jsonPath).includes(value)
        break;
      case "9":
        result = eval(jsonPath).includes(value)
        break;
      case "10":
        result = eval(`/^(${value})/.test(eval(jsonPath))`)
        break;
      case "11":
        result = eval(`/(${value})$/.test(eval(jsonPath))`)
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