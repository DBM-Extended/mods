module.exports = {
    name: 'Firebase',
    section: 'Database',
    fields: ['dataControl', 'dataGetType', 'dataSetType', 'dataPath', 'defaultValue', 'config', 'sortType',
             'resultLimit', 'storage', 'varName'],

    subtitle(data) {
        const controlType = ['Get', 'Set', 'Delete'];
        const codeType = [`${controlType[parseInt(data.dataControl)]} "${data.dataPath}"`,
                          `${controlType[parseInt(data.dataControl)]} "${data.dataPath}": "${data.defaultValue}"`,
                          `${controlType[parseInt(data.dataControl)]} "${data.dataPath}"`]
        return `${codeType[parseInt(data.dataControl)]}`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage) !== varType) return;
        return ([data.varName, 'String'])
    },

    html(isEvent, data) {
        return `
        <div style='width: 99%; height: 85vh; overflow: scroll;'>
            <div>
                <details>
                    <summary style='cursor: pointer'>Firebase Mod Description</summary>
                    [Version 1.0] [<a href='#' onclick='DBM.openLink("https://github.com/MinEjo-DBM")'>GitHub</a>]<br>
                    A mod for interacting with the real-time database from <a href='#' onclick='DBM.openLink("https://firebase.google.com/")'>FireBase.</a>
                </details>
            </div>
            <div style='padding-top: 8px; width: 45%; float: left;'>
            Data Control:<br>
              <select style='float: left; display: inline-block; width: 45%;' onchange='glob.divControlChange(this.value)' id='dataControl' class='round'>
                <option value='0'>Get</option>
                <option value='1'>Set</option>
                <option value='2'>Delete</option>
              </select>
              <select onchange='glob.divForListChange(this.value)' style='margin-left: 5%; width: 25%; display: none; float: left' id='dataGetType' class='round'>
                <option value='0'>Only</option>
                <option value='1'>List</option>
              </select>
              <select style='margin-left: 5%; width: 25%; display: none; float: left' id='dataSetType' class='round'>
                <option value='0'>Add</option>
                <option value='1'>Set</option>
              </select>
            </div>
            <div style='padding-top: 8px; width: 55%; float: right;'>
            Data Path:<br>
              <input id='dataPath' placeholder='data/path' class='round' type='text'>
            </div>
            
            <div id='divControl'></div>
            
            <div id='divControlVisual' style='display: none;'>
                <div style='padding-top: 8px; float: left; width: 35%;'>Store In:<br>
                    <select id='storage' class='round'>
                      ${data.variables[1]}
                    </select>
                </div>
                <div id='varNameContainer' style='padding-top: 8px; float: right; width: 60%;'>
                    Variable Name:<br>
                    <input id='varName' class='round' type='text'>
                </div>
            </div>
            <div style='padding-top: 8px; float: left; width: 100%;'>
                <details>
                    <summary style='cursor: pointer'>Config [Important!]</summary>
                    <span><a href='#' onclick='DBM.openLink("https://console.firebase.google.com/project/meobot-7197d/settings/general/")'>Get the config (at the end of the page)</a></span><br>
                    Replace the name with the value: [Observe the gaps]<br>
                    <input class='round' type='text' style='width: 100%;' value='apiKey authDomain databaseURL projectId storageBucket messagingSenderId appId' placeholder='apiKey authDomain databaseURL projectId storageBucket messagingSenderId appId' id='config'/>
                </details>
            </div>
        </div>`
    },

    init() {
        const {glob, document} = this;

        divControl(document.getElementById('dataControl').value);
        divForList(document.getElementById('dataGetType').value);
        glob.divControlChange = function (value) { divControl(value); }
        glob.divForListChange = function (value) { divForList(value); }

        function divForList(value) {
            if (value === '0') {
                document.getElementById('divControl').innerHTML =
                    "<div style='padding-top: 8px; width: 100%; float: left;'>" +
                    "Default Value (if data doesn't exist):<br>" +
                    "<textarea style='width: 100%; resize: vertical' id='defaultValue'></textarea></div>"
            }
            if (value === '1') {
                document.getElementById('divControl').innerHTML =
                    "<div style='padding-top: 8px; width: 45%; float: left;'>" +
                    "Result Limit:<br>" +
                    "<input id='resultLimit' placeholder='Leave Blank for Show All' class='round' type='text'></div>" +
                    "<div style='padding-top: 8px; width: 50%; float: right;'>Sort By:<br>" +
                    "<select id='sortType' class='round'>" +
                    "<option value='0' selected>Descending</option>" +
                    "<option value='1'>Ascending</option>" +
                    "<option value='2'>Don't Sort</option></select></div>" +
                    "<div style='padding-top: 8px; width: 100%; float: left;'>" +
                    "Result Format (JavaScript String):<br>" +
                    "<textarea style='width: 100%; resize: vertical' id='defaultValue'>" +
                    "</textarea></div>"
            }
        }

        function divControl(value) {
            if (value === '0') {
                document.getElementById('divControl').innerHTML =
                    "<div style='padding-top: 8px; width: 100%; float: left;'>" +
                    "Default Value (if data doesn't exist):<br>" +
                    "<textarea style='width: 100%; resize: vertical' id='defaultValue'></textarea></div>"
                document.getElementById('divControlVisual').style.display = 'inherit';
                document.getElementById('dataSetType').style.display = 'none';
                document.getElementById('dataGetType').style.display = 'inherit';
                document.getElementById('dataControl').style.width = '25%';
                divForList(document.getElementById('dataGetType').value);
            }
            if (value === '1') {
                document.getElementById('divControl').innerHTML =
                    "<div style='padding-top: 8px; width: 100%; float: left;'>" +
                    "Value:<br>" +
                    "<textarea style='width: 100%; resize: vertical' id='defaultValue'></textarea></div>"
                document.getElementById('divControlVisual').style.display = 'none';
                document.getElementById('dataGetType').style.display = 'none';
                document.getElementById('dataSetType').style.display = 'inline-block';
                document.getElementById('dataControl').style.width = '25%';
            }
            if (value === '2') {
                document.getElementById('divControl').innerHTML = "<div id='divControl'></div>"
                document.getElementById('divControlVisual').style.display = 'none';
                document.getElementById('dataGetType').style.display = 'none';
                document.getElementById('dataSetType').style.display = 'none';
                document.getElementById('dataControl').style.width = '40%';
            }
        }
    },

    async action(cache) {
        const data = cache.actions[cache.index]
        const dataControl = parseInt(data.dataControl, cache)
        const dataSetType = parseInt(data.dataSetType, cache)
        const dataGetType = parseInt(data.dataGetType, cache)
        const sortType = parseInt(data.sortType, cache);
        const resultLimit = this.evalMessage(data.resultLimit, cache)
        const dataPath = this.evalMessage(data.dataPath, cache)
        const defaultValue = this.eval(this.evalMessage(data.defaultValue, cache), cache);
        const configString = this.evalMessage(data.config);
        const config = this.evalMessage(data.config, cache).split(' ')
        if (configString.length < 110) return console.log('Firebase MOD: Configure the config!');
        const firebaseConfig = {
            "apiKey": config[0],
            "authDomain": config[1],
            "databaseURL": config[2],
            "projectId": config[3],
            "storageBucket": config[4],
            "messagingSenderId": config[5],
            "appId": config[6]
        }

        const firebase = this.getMods().require('firebase');
        if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

        function isJson(item) {
            item = typeof item !== "string" ? JSON.stringify(item) : item;

            try {
                item = JSON.parse(item);
            } catch (e) {
                return false;
            }

            if (typeof item === "object" && item !== null) return true;
            return false;
        }

        switch (dataControl) {
            case 0:
                if (dataPath && dataGetType === 0) {
                    const frData = await firebase.database().ref(dataPath).once('value');
                    let result = frData.exists() ? frData.val() : defaultValue;

                    if (result !== undefined) {
                        const type = parseInt(data.storage)
                        const varName = this.evalMessage(data.varName, cache)
                        this.storeValue(result, type, varName, cache)
                    }
                }
                if (dataPath && dataGetType === 1) {
                    let frData = await firebase.database().ref(dataPath).once('value');
                    if (isJson(frData)) {
                        frData = JSON.stringify(frData);
                        frData = JSON.parse(frData);
                    } else {
                        frData = JSON.parse(frData);
                    }
                    let list = [];

                    for (let obj in frData) {
                        let item = frData[obj];
                        list.push(obj, item);
                    }

                    switch (sortType) {
                        case 0:
                            list = list.reverse();
                            break
                        case 1:
                            list = list.sort();
                            break
                        case 2:
                            break
                    }

                    if (resultLimit.length > 0) {
                        let tempList = []
                        for (let i = 0; i <= resultLimit; i++) {
                            tempList.push(list[i])
                        }
                        list = tempList;
                    }

                    if (list !== undefined) {
                        const type = parseInt(data.storage)
                        const varName = this.evalMessage(data.varName, cache)
                        this.storeValue(list, type, varName, cache)
                    }
                }
                break
            case 1:
                if (dataPath && defaultValue) {
                    const frData = firebase.database().ref(dataPath);

                    if (dataSetType === 0) {
                        const frData = (await frData.once('value')).val();
                        await frData.set(frData + defaultValue);
                    } else await frData.set(defaultValue);
                }
                break
            case 2:
                if (dataPath) await firebase.database().ref(dataPath).remove();
                break
        }

        this.callNextAction(cache)
    },

    mod() {}
}
