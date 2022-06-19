module.exports = {
  name: "Send Embed Message With Button",
  section: "Embed Message",

  subtitle(data) {
    return `Server: ${data.serverID}; Channel: ${data.channelID};`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storageButton)
    if (type !== varType) return
    return ([data.varNameButton, 'Button Press'])
  },

  fields: [
    "storage3",
    "varName3",
    "storage",
    "varName",
    "channelID",
    "serverID",
    "varMember",
    "varNameMember",
    "varNameButton",
    "storageButton",
    "replyflags",
    "button",
    "button_sec",
    "button_thi",
    "button_fou",
    "button_fif",
    "buttonlabel",
    "buttonlabel_sec",
    "buttonlabel_thi",
    "buttonlabel_fou",
    "buttonlabel_fif",
    "buttondisabled",
    "buttondisabled_sec",
    "buttondisabled_thi",
    "buttondisabled_fou",
    "buttondisabled_fif",
    "buttonstyle",
    "buttonstyle_sec",
    "buttonstyle_thi",
    "buttonstyle_fou",
    "buttonstyle_fif",
    "buttonid",
    "buttonid_sec",
    "buttonid_thi",
    "buttonid_fou",
    "buttonid_fif",
    "buttonurl",
    "buttonurl_sec",
    "buttonurl_thi",
    "buttonurl_fou",
    "buttonurl_fif",
    "buttonemoji",
    "buttonemoji_sec",
    "buttonemoji_thi",
    "buttonemoji_fou",
    "buttonemoji_fif",
    "buttoncontent",
    "buttoncontent_sec",
    "buttoncontent_thi",
    "buttoncontent_fou",
    "buttoncontent_fif",
    "buttonemojiid",
    "buttonemojianimated",
    "buttonemojiid_sec",
    "buttonemojianimated_sec",
    "buttonemojiid_thi",
    "buttonemojianimated_thi",
    "buttonemojiid_fou",
    "buttonemojianimated_fou",
    "buttonemojiid_fif",
    "buttonemojianimated_fif",
    "call",
    "call_sec",
    "call_thi",
    "call_fou",
    "call_fif",
    "jumpidanchor",
    "jumpidanchor_sec",
    "jumpidanchor_thi",
    "jumpidanchor_fou",
    "jumpidanchor_fif"
  ],

  html(isEvent, data) {
    return `
<div id ="modinfo" style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: scroll;">
    <p>
    <a href="#" onclick="DBM.openLink('https://discord.com/developers/docs/interactions/message-components#button-object-button-styles')">Documentation | </a>
    <a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">MinEjo-DBM </a>
    </p>
  <div style="float: left; width: 35%;">
    Source Embed Object:<br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  Variable Name:<br>
  <input id="varName" class="round" type="text" list="variableList">
  </div><br><br><br>

  <div style="float: left; padding: 7px"><span onclick="glob.changeDisplay('divfirstbutton')" style="user-select: none; cursor: pointer; margin-right: 5px; background: #5865f2; padding: 5px; border-radius: 3px; color: #ffffff;">First Btn</span><br><br>
    <div id="divfirstbutton" style="display: none;">
      <select id="button" class="round" onchange="glob.buttonElemtsChange(this)">
        <option value="0">Button</option>
        <option value="1">Link Button</option>
        <option value="2">Emoji Button</option>
        <option value="3">Custom Emoji Button</option>
      </select>
      <div style="float: left; width: 20%; margin-top: 5px;">
        Label*:<br>
        <input id="buttonlabel" class="round" type="text" placeholder="String">
      </div>
      <div style="float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
        Disabled*:<br>
        <input id="buttondisabled" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttonstyle" style="float: left; width: 9%; margin-left: 5%; margin-top: 5px;">
        Style*:<br>
        <input id="buttonstyle" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonid" style="float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      ID*:<br>
        <input id="buttonid" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonurl" style="display: none; float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      Url*:<br>
      <input id="buttonurl" class="round" type="text" placeholder="String">
    </div>
      <div id="divbuttonemoji" style="display: none; float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
      Emoji*:<br>
        <input id="buttonemoji" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonemojiid" style="display: none; float: left; width: 25%;  margin-top: 5px;">
      Emoji ID*:<br>
        <input id="buttonemojiid" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonemojianimated" style="display: none; float: left; width: 25%; margin-left: 5%; margin-top: 5px;">
      Emoji Animated*:<br>
        <input id="buttonemojianimated" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttoncontent" style="float: left; width: 99%; margin-top: 5px;">
      Reply:<br>
      <textarea style="width: 100%; resize: vertical;" id="buttoncontent" class="round" type="text" placeholder="String"></textarea>
    </div>
    <div style="float: left; width: 54%; margin-top: 5px;">
      Go to action when the button is pressed:<br>
      <input id="call" class="round" placeholder="Action number" type="number">
    </div>
    <div style="float: left; width: 40%; margin-top: 5px; margin-left: 5%;">
      Jump to Anchor ID:<br>
      <input type="text" class="round" id="jumpidanchor"><br>
    </div>
  </div>
 </div>

 <div style="float: left; padding: 7px"><span onclick="glob.changeDisplay('divsecondbutton')" style="user-select: none; cursor: pointer; margin-right: 5px; background: #5865f2; padding: 5px; border-radius: 3px; color: #ffffff;">Second Btn</span><br><br>
    <div id="divsecondbutton" style="display: none;">
      <select id="button_sec" class="round" onchange="glob.buttonElemtsChange(this)">
        <option value="0">Button</option>
        <option value="1">Link Button</option>
        <option value="2">Emoji Button</option>
        <option value="3">Custom Emoji Button</option>
      </select>
      <div style="float: left; width: 20%; margin-top: 5px;">
        Label*:<br>
        <input id="buttonlabel_sec" class="round" type="text" placeholder="String">
      </div>
      <div style="float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
        Disabled*:<br>
        <input id="buttondisabled_sec" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttonstyle_sec" style="float: left; width: 9%; margin-left: 5%; margin-top: 5px;">
        Style*:<br>
        <input id="buttonstyle_sec" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonid_sec" style="float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      ID*:<br>
        <input id="buttonid_sec" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonurl_sec" style="display: none; float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      Url*:<br>
      <input id="buttonurl_sec" class="round" type="text" placeholder="String">
    </div>
      <div id="divbuttonemoji_sec" style="display: none; float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
      Emoji*:<br>
        <input id="buttonemoji_sec" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonemojiid_sec" style="display: none; float: left; width: 25%;  margin-top: 5px;">
      Emoji ID*:<br>
        <input id="buttonemojiid_sec" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonemojianimated_sec" style="display: none; float: left; width: 25%; margin-left: 5%; margin-top: 5px;">
      Emoji Animated*:<br>
        <input id="buttonemojianimated_sec" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttoncontent_sec" style="float: left; width: 99%; margin-top: 5px;">
      Reply:<br>
      <textarea style="width: 100%; resize: vertical;" id="buttoncontent_sec" class="round" type="text" placeholder="String"></textarea>
    </div>
    <div style="float: left; width: 54%; margin-top: 5px;">
      Go to action when the button is pressed:<br>
      <input id="call_sec" class="round" placeholder="Action number" type="number">
    </div>
    <div style="float: left; width: 40%; margin-top: 5px; margin-left: 5%;">
      Jump to Anchor ID:<br>
      <input type="text" class="round" id="jumpidanchor_sec"><br>
    </div>
  </div>
 </div>

 <div style="float: left; padding: 7px"><span onclick="glob.changeDisplay('divthirdbutton')" style="user-select: none; cursor: pointer; margin-right: 5px; background: #5865f2; padding: 5px; border-radius: 3px; color: #ffffff;">Third Btn</span><br><br>
    <div id="divthirdbutton" style="display: none;">
      <select id="button_thi" class="round" onchange="glob.buttonElemtsChange(this)">
        <option value="0">Button</option>
        <option value="1">Link Button</option>
        <option value="2">Emoji Button</option>
        <option value="3">Custom Emoji Button</option>
      </select>
      <div style="float: left; width: 20%; margin-top: 5px;">
        Label*:<br>
        <input id="buttonlabel_thi" class="round" type="text" placeholder="String">
      </div>
      <div style="float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
        Disabled*:<br>
        <input id="buttondisabled_thi" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttonstyle_thi" style="float: left; width: 9%; margin-left: 5%; margin-top: 5px;">
        Style*:<br>
        <input id="buttonstyle_thi" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonid_thi" style="float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      ID*:<br>
        <input id="buttonid_thi" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonurl_thi" style="display: none; float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
      Url*:<br>
      <input id="buttonurl_thi" class="round" type="text" placeholder="String">
    </div>
      <div id="divbuttonemoji_thi" style="display: none; float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
      Emoji*:<br>
        <input id="buttonemoji_thi" class="round" type="text" placeholder="String">
      </div>
      <div id="divbuttonemojiid_thi" style="display: none; float: left; width: 25%;  margin-top: 5px;">
      Emoji ID*:<br>
        <input id="buttonemojiid_thi" class="round" type="text" placeholder="Integer">
      </div>
      <div id="divbuttonemojianimated_thi" style="display: none; float: left; width: 25%; margin-left: 5%; margin-top: 5px;">
      Emoji Animated*:<br>
        <input id="buttonemojianimated_thi" class="round" type="text" placeholder="Boolean">
      </div>
      <div id="divbuttoncontent_thi" style="float: left; width: 99%; margin-top: 5px;">
      Reply:<br>
      <textarea style="width: 100%; resize: vertical;" id="buttoncontent_thi" class="round" type="text" placeholder="String"></textarea>
    </div>
    <div style="float: left; width: 54%; margin-top: 5px;">
      Go to action when the button is pressed:<br>
      <input id="call_thi" class="round" placeholder="Action number" type="number">
    </div>
    <div style="float: left; width: 40%; margin-top: 5px; margin-left: 5%;">
      Jump to Anchor ID:<br>
      <input type="text" class="round" id="jumpidanchor_thi"><br>
    </div>
  </div>
 </div>

 <div style="float: left; padding: 7px"><span onclick="glob.changeDisplay('divfourthbutton')" style="user-select: none; cursor: pointer; margin-right: 5px; background: #5865f2; padding: 5px; border-radius: 3px; color: #ffffff;">Fourth Btn</span><br><br>
 <div id="divfourthbutton" style="display: none;">
   <select id="button_fou" class="round" onchange="glob.buttonElemtsChange(this)">
     <option value="0">Button</option>
     <option value="1">Link Button</option>
     <option value="2">Emoji Button</option>
     <option value="3">Custom Emoji Button</option>
   </select>
   <div style="float: left; width: 20%; margin-top: 5px;">
     Label*:<br>
     <input id="buttonlabel_fou" class="round" type="text" placeholder="String">
   </div>
   <div style="float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
     Disabled*:<br>
     <input id="buttondisabled_fou" class="round" type="text" placeholder="Boolean">
   </div>
   <div id="divbuttonstyle_fou" style="float: left; width: 9%; margin-left: 5%; margin-top: 5px;">
     Style*:<br>
     <input id="buttonstyle_fou" class="round" type="text" placeholder="Integer">
   </div>
   <div id="divbuttonid_fou" style="float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
   ID*:<br>
     <input id="buttonid_fou" class="round" type="text" placeholder="String">
   </div>
   <div id="divbuttonurl_fou" style="display: none; float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
   Url*:<br>
   <input id="buttonurl_fou" class="round" type="text" placeholder="String">
 </div>
   <div id="divbuttonemoji_fou" style="display: none; float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
   Emoji*:<br>
     <input id="buttonemoji_fou" class="round" type="text" placeholder="String">
   </div>
   <div id="divbuttonemojiid_fou" style="display: none; float: left; width: 25%;  margin-top: 5px;">
   Emoji ID*:<br>
     <input id="buttonemojiid_fou" class="round" type="text" placeholder="Integer">
   </div>
   <div id="divbuttonemojianimated_fou" style="display: none; float: left; width: 25%; margin-left: 5%; margin-top: 5px;">
   Emoji Animated*:<br>
     <input id="buttonemojianimated_fou" class="round" type="text" placeholder="Boolean">
   </div>
   <div id="divbuttoncontent_fou" style="float: left; width: 99%; margin-top: 5px;">
   Reply:<br>
   <textarea style="width: 100%; resize: vertical;" id="buttoncontent_fou" class="round" type="text" placeholder="String"></textarea>
 </div>
  <div style="float: left; width: 54%; margin-top: 5px;">
    Go to action when the button is pressed:<br>
    <input id="call_fou" class="round" placeholder="Action number" type="number">
  </div>
    <div style="float: left; width: 40%; margin-top: 5px; margin-left: 5%;">
    Jump to Anchor ID:<br>
    <input type="text" class="round" id="jumpidanchor_fou"><br>
  </div>
</div>
</div>

<div style="float: left; padding: 7px"><span onclick="glob.changeDisplay('divfifthbutton')" style="user-select: none; cursor: pointer; margin-right: 5px; background: #5865f2; padding: 5px; border-radius: 3px; color: #ffffff;">Fifth Btn</span><br><br>
<div id="divfifthbutton" style="display: none;">
  <select id="button_fif" class="round" onchange="glob.buttonElemtsChange(this)">
    <option value="0">Button</option>
    <option value="1">Link Button</option>
    <option value="2">Emoji Button</option>
    <option value="3">Custom Emoji Button</option>
  </select>
  <div style="float: left; width: 20%; margin-top: 5px;">
    Label*:<br>
    <input id="buttonlabel_fif" class="round" type="text" placeholder="String">
  </div>
  <div style="float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
    Disabled*:<br>
    <input id="buttondisabled_fif" class="round" type="text" placeholder="Boolean">
  </div>
  <div id="divbuttonstyle_fif" style="float: left; width: 9%; margin-left: 5%; margin-top: 5px;">
    Style*:<br>
    <input id="buttonstyle_fif" class="round" type="text" placeholder="Integer">
  </div>
  <div id="divbuttonid_fif" style="float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
  ID*:<br>
    <input id="buttonid_fif" class="round" type="text" placeholder="String">
  </div>
  <div id="divbuttonurl_fif" style="display: none; float: left; width: 40%; margin-left: 5%; margin-top: 5px;">
  Url*:<br>
  <input id="buttonurl_fif" class="round" type="text" placeholder="String">
</div>
  <div id="divbuttonemoji_fif" style="display: none; float: left; width: 15%; margin-left: 5%; margin-top: 5px;">
  Emoji*:<br>
    <input id="buttonemoji_fif" class="round" type="text" placeholder="String">
  </div>
  <div id="divbuttonemojiid_fif" style="display: none; float: left; width: 25%;  margin-top: 5px;">
  Emoji ID*:<br>
    <input id="buttonemojiid_fif" class="round" type="text" placeholder="Integer">
  </div>
  <div id="divbuttonemojianimated_fif" style="display: none; float: left; width: 25%; margin-left: 5%; margin-top: 5px;">
  Emoji Animated*:<br>
    <input id="buttonemojianimated_fif" class="round" type="text" placeholder="Boolean">
  </div>
  <div id="divbuttoncontent_fif" style="float: left; width: 99%; margin-top: 5px;">
  Reply:<br>
  <textarea style="width: 100%; resize: vertical;" id="buttoncontent_fif" class="round" type="text" placeholder="String"></textarea>
</div>
  <div style="float: left; width: 54%; margin-top: 5px;">
      Go to action when the button is pressed:<br>
      <input id="call_fif" class="round" placeholder="Action number" type="number">
    </div>
    <div style="float: left; width: 40%; margin-top: 5px; margin-left: 5%;">
      Jump to Anchor ID:<br>
      <input type="text" class="round" id="jumpidanchor_fif"><br>
    </div>
</div>
</div>

<div style="float: left; width: 100%">
  <div style="float: left; width: 35%;">
    Reply Flags:<br>
    <input id="replyflags" class="round" placeholder="Integer" type="text">
  </div><br><br><br>
<div style="float: left; width: 35%;">
    Store Pressing Button In:<br>
    <select id="storageButton" class="round" onchange="glob.variableChange(this, 'varNameContainerButton')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainerButton" style="display: ; float: right; width: 60%;">
    Storage Variable Name:<br>
    <input id="varNameButton" class="round" type="text">
  </div><br><br><br>
<div style="float: left; width: 35%;">
    Send to*:<br>
    <input id="channelID" class="round" type="text" placeholder="Channel ID...">
  </div>
  <div style="float: right; width: 60%;">
    <br>
    <input id="serverID" class="round" type="text" placeholder="Server ID...">
  </div><br><br><br>
  <div style="float: left; width: 35%;">
    Store Message Object In:<br>
    <select id="storage3" class="round" onchange="glob.variableChange(this, 'varNameContainer3')">
      ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer3" style="display: ; float: right; width: 60%;">
    Storage Variable Name:<br>
    <input id="varName3" class="round" type="text">
  </div><br><br><br>
  <div style="float: left; width: 35%;">
    Activating for a member:<br>
		<select id="varMember" class="round" onchange="glob.memberChange(this, 'varNameContainerMember')">
			${data.members[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainerMember" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varNameMember" class="round" type="text" list="variableList"><br>
	</div>
</div>
</div>`;
  },

  init() {
    const {
      glob,
      document
    } = this
    glob.changeDisplay = function (id) {
      const element = document.getElementById(id);
      if (element.style.display == "none") {
        element.style.display = "inherit";
      } else {
        element.style.display = "none";
      }
    }

    glob.buttonElemtsChange = function (element) {
      let divbuttonid, divbuttonstyle, divbuttonurl, divbuttonemoji;
      if (element.id == "button") {
        divbuttonid = document.getElementById('divbuttonid');
        divbuttonstyle = document.getElementById('divbuttonstyle');
        divbuttonurl = document.getElementById('divbuttonurl');
        divbuttonemoji = document.getElementById('divbuttonemoji');
        divbuttoncontent = document.getElementById('divbuttoncontent');
        divbuttonemojiid = document.getElementById('divbuttonemojiid');
        divbuttonemojianimated = document.getElementById('divbuttonemojianimated');
      }
      if (element.id == "button_sec") {
        divbuttonid = document.getElementById('divbuttonid_sec');
        divbuttonstyle = document.getElementById('divbuttonstyle_sec');
        divbuttonurl = document.getElementById('divbuttonurl_sec');
        divbuttonemoji = document.getElementById('divbuttonemoji_sec');
        divbuttoncontent = document.getElementById('divbuttoncontent_sec');
        divbuttonemojiid = document.getElementById('divbuttonemojiid_sec');
        divbuttonemojianimated = document.getElementById('divbuttonemojianimated_sec');
      }
      if (element.id == "button_thi") {
        divbuttonid = document.getElementById('divbuttonid_thi');
        divbuttonstyle = document.getElementById('divbuttonstyle_thi');
        divbuttonurl = document.getElementById('divbuttonurl_thi');
        divbuttonemoji = document.getElementById('divbuttonemoji_thi');
        divbuttoncontent = document.getElementById('divbuttoncontent_thi');
        divbuttonemojiid = document.getElementById('divbuttonemojiid_thi');
        divbuttonemojianimated = document.getElementById('divbuttonemojianimated_thi');
      }
      if (element.id == "button_fou") {
        divbuttonid = document.getElementById('divbuttonid_fou');
        divbuttonstyle = document.getElementById('divbuttonstyle_fou');
        divbuttonurl = document.getElementById('divbuttonurl_fou');
        divbuttonemoji = document.getElementById('divbuttonemoji_fou');
        divbuttoncontent = document.getElementById('divbuttoncontent_fou');
        divbuttonemojiid = document.getElementById('divbuttonemojiid_fou');
        divbuttonemojianimated = document.getElementById('divbuttonemojianimated_fou');
      }
      if (element.id == "button_fif") {
        divbuttonid = document.getElementById('divbuttonid_fif');
        divbuttonstyle = document.getElementById('divbuttonstyle_fif');
        divbuttonurl = document.getElementById('divbuttonurl_fif');
        divbuttonemoji = document.getElementById('divbuttonemoji_fif');
        divbuttoncontent = document.getElementById('divbuttoncontent_fif');
        divbuttonemojiid = document.getElementById('divbuttonemojiid_fif');
        divbuttonemojianimated = document.getElementById('divbuttonemojianimated_fif');
      }

      switch (parseInt(element.value)) {
        case 0:
          divbuttonid.style.display = 'inherit';
          divbuttonstyle.style.display = 'inherit';
          divbuttoncontent.style.display = 'inherit';
          divbuttonid.style.width = '40%';
          divbuttonurl.style.display = 'none';
          divbuttonemoji.style.display = 'none';
          divbuttonemojiid.style.display = 'none';
          divbuttonemojianimated.style.display = 'none';
          break
        case 1:
          divbuttonstyle.style.display = 'none';
          divbuttoncontent.style.display = 'none';
          divbuttonid.style.display = 'none';
          divbuttonurl.style.display = 'inherit';
          divbuttonemoji.style.display = 'none';
          divbuttonemojiid.style.display = 'none';
          divbuttonemojianimated.style.display = 'none';
          break
        case 2:
          divbuttonid.style.display = 'inherit';
          divbuttonstyle.style.display = 'inherit';
          divbuttoncontent.style.display = 'inherit';
          divbuttonid.style.width = '20%';
          divbuttonurl.style.display = 'none';
          divbuttonemoji.style.display = 'inherit';
          divbuttonemojiid.style.display = 'none';
          divbuttonemojianimated.style.display = 'none';
          break
        case 3:
          divbuttonid.style.display = 'inherit';
          divbuttonstyle.style.display = 'inherit';
          divbuttoncontent.style.display = 'inherit';
          divbuttonid.style.width = '20%';
          divbuttonurl.style.display = 'none';
          divbuttonemoji.style.display = 'inherit';
          divbuttonemojiid.style.display = 'inherit';
          divbuttonemojianimated.style.display = 'inherit';
          break
      }
    }
    glob.memberChange(document.getElementById("member"), "varNameContainer");
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM().Bot.bot;

    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const varName3 = this.evalMessage(data.varName3, cache)
    const storage3 = parseInt(data.storage3)
    const embed = this.getVariable(storage, varName, cache)
    const channelid = this.evalMessage(data.channelID, cache);
    const serverid = this.evalMessage(data.serverID, cache);
    const varNameButton = this.evalMessage(data.varNameButton, cache)
    const storageButton = parseInt(data.storageButton)
    const replyflags = this.evalMessage(data.replyflags, cache)

    const varMember = parseInt(data.varMember);
    const varNameMember = this.evalMessage(data.varNameMember, cache);
    const memberCustom = this.getMember(varMember, varNameMember, cache);

    if (channelid.length < 3) {
      console.error("Send Embed Message With Button: There is an error in the channel ID field.");
      return;
    }
    if (serverid.length < 3) {
      console.error("Send Embed Message With Button: There is an error in the server ID field.");
      return;
    }

    let button_count = 0;
    let buttonlabel, button, buttonstyle, buttondisabled, buttonid, buttoncontent, buttonurl, buttonemoji, buttonemojiid, buttonemojianimated, jumpidanchor;
    buttonlabel = this.evalMessage(data.buttonlabel, cache);
    if (buttonlabel.length != 0) {
      button_count++;
      button = parseInt(data.button, cache)
      buttonstyle = this.evalMessage(data.buttonstyle, cache);
      buttondisabled = this.evalMessage(data.buttondisabled, cache);
      buttonid = this.evalMessage(data.buttonid, cache);
      buttoncontent = this.evalMessage(data.buttoncontent, cache);
      buttonurl = this.evalMessage(data.buttonurl, cache);
      buttonemoji = this.evalMessage(data.buttonemoji, cache);
      buttonemojiid = this.evalMessage(data.buttonemojiid, cache);
      buttonemojianimated = this.evalMessage(data.buttonemojianimated, cache);
      jumpidanchor = this.evalMessage(data.jumpidanchor, cache)
    }

    let buttonlabel_sec, button_sec, buttonstyle_sec, buttondisabled_sec, buttonid_sec, buttoncontent_sec, buttonurl_sec, buttonemoji_sec, buttonemojiid_sec, buttonemojianimated_sec, jumpidanchor_sec;
    buttonlabel_sec = this.evalMessage(data.buttonlabel_sec, cache);
    if (buttonlabel_sec.length != 0) {
      button_count++;
      button_sec = parseInt(data.button_sec, cache)
      buttonstyle_sec = this.evalMessage(data.buttonstyle_sec, cache);
      buttondisabled_sec = this.evalMessage(data.buttondisabled_sec, cache);
      buttonid_sec = this.evalMessage(data.buttonid_sec, cache);
      buttoncontent_sec = this.evalMessage(data.buttoncontent_sec, cache);
      buttonurl_sec = this.evalMessage(data.buttonurl_sec, cache);
      buttonemoji_sec = this.evalMessage(data.buttonemoji_sec, cache);
      buttonemojiid_sec = this.evalMessage(data.buttonemojiid_sec, cache);
      buttonemojianimated_sec = this.evalMessage(data.buttonemojianimated_sec, cache);
      jumpidanchor_sec = this.evalMessage(data.jumpidanchor_sec, cache)
    }

    let buttonlabel_thi, button_thi, buttonstyle_thi, buttondisabled_thi, buttonid_thi, buttoncontent_thi, buttonurl_thi, buttonemoji_thi, buttonemojiid_thi, buttonemojianimated_thi, jumpidanchor_thi;
    buttonlabel_thi = this.evalMessage(data.buttonlabel_thi, cache);
    if (buttonlabel_thi.length != 0) {
      button_count++;
      button_thi = parseInt(data.button_thi, cache)
      buttonstyle_thi = this.evalMessage(data.buttonstyle_thi, cache);
      buttondisabled_thi = this.evalMessage(data.buttondisabled_thi, cache);
      buttonid_thi = this.evalMessage(data.buttonid_thi, cache);
      buttoncontent_thi = this.evalMessage(data.buttoncontent_thi, cache);
      buttonurl_thi = this.evalMessage(data.buttonurl_thi, cache);
      buttonemoji_thi = this.evalMessage(data.buttonemoji_thi, cache);
      buttonemojiid_thi = this.evalMessage(data.buttonemojiid_thi, cache);
      buttonemojianimated_thi = this.evalMessage(data.buttonemojianimated_thi, cache);
      jumpidanchor_thi = this.evalMessage(data.jumpidanchor_thi, cache)
    }

    let buttonlabel_fou, button_fou, buttonstyle_fou, buttondisabled_fou, buttonid_fou, buttoncontent_fou, buttonurl_fou, buttonemoji_fou, buttonemojiid_fou, buttonemojianimated_fou, jumpidanchor_fou;
    buttonlabel_fou = this.evalMessage(data.buttonlabel_fou, cache);
    if (buttonlabel_fou.length != 0) {
      button_count++;
      button_fou = parseInt(data.button_fou, cache)
      buttonstyle_fou = this.evalMessage(data.buttonstyle_fou, cache);
      buttondisabled_fou = this.evalMessage(data.buttondisabled_fou, cache);
      buttonid_fou = this.evalMessage(data.buttonid_fou, cache);
      buttoncontent_fou = this.evalMessage(data.buttoncontent_fou, cache);
      buttonurl_fou = this.evalMessage(data.buttonurl_fou, cache);
      buttonemoji_fou = this.evalMessage(data.buttonemoji_fou, cache);
      buttonemojiid_fou = this.evalMessage(data.buttonemojiid_fou, cache);
      buttonemojianimated_fou = this.evalMessage(data.buttonemojianimated_fou, cache);
      jumpidanchor_fou = this.evalMessage(data.jumpidanchor_fou, cache)
    }

    let buttonlabel_fif, button_fif, buttonstyle_fif, buttondisabled_fif, buttonid_fif, buttoncontent_fif, buttonurl_fif, buttonemoji_fif, buttonemojiid_fif, buttonemojianimated_fif, jumpidanchor_fif;
    buttonlabel_fif = this.evalMessage(data.buttonlabel_fif, cache);
    if (buttonlabel_fif.length != 0) {
      button_count++;
      button_fif = parseInt(data.button_fif, cache)
      buttonstyle_fif = this.evalMessage(data.buttonstyle_fif, cache);
      buttondisabled_fif = this.evalMessage(data.buttondisabled_fif, cache);
      buttonid_fif = this.evalMessage(data.buttonid_fif, cache);
      buttoncontent_fif = this.evalMessage(data.buttoncontent_fif, cache);
      buttonurl_fif = this.evalMessage(data.buttonurl_fif, cache);
      buttonemoji_fif = this.evalMessage(data.buttonemoji_fif, cache);
      buttonemojiid_fif = this.evalMessage(data.buttonemojiid_fif, cache);
      buttonemojianimated_fif = this.evalMessage(data.buttonemojianimated_fif, cache);
      jumpidanchor_fif = this.evalMessage(data.jumpidanchor_fif, cache)
    }

    if (button_count == 0) {
      console.error("Send Embed Message With Button: Fields with buttons are not filled in.");
      return;
    }

    client.ws.on("INTERACTION_CREATE", async (interaction) => {
      let id = interaction.data.custom_id

      let GameMap = new Map([
        [buttonid, "1"],
        [buttonid_sec, "2"],
        [buttonid_thi, "3"],
        [buttonid_fou, "4"],
        [buttonid_fif, "5"]
      ])

      let member = await client.guilds.cache
        .get(serverid)
        .members.fetch(interaction.member.user.id);
      if (!member) return;

      let GMbuttonid = GameMap.get(id)
      let returnText;
      let press_button;

      if (GMbuttonid == 1) {
        if (memberCustom.id == member.user.id) {
          if (buttoncontent.length > 0) returnText = buttoncontent;
          if (varNameButton.length > 0) {
            press_button = "1";
            this.storeValue(press_button, storageButton, varNameButton, cache)
          }
          const val = parseInt(this.evalMessage(data.call, cache))
          if (val > 0) {
            const index = Math.max(val - 1, 0)
            if (cache.actions[index]) {
              cache.index = index - 1
              this.callNextAction(cache)
            }
          }
          if (jumpidanchor > 0) {
            this.anchorJump(jumpidanchor, cache)
          }
        }
      }
      if (GMbuttonid == 2) {
        if (memberCustom.id == member.user.id) {
          if (buttoncontent_sec.length > 0) returnText = buttoncontent_sec;
          if (varNameButton.length > 0) {
            press_button = "2";
            this.storeValue(press_button, storageButton, varNameButton, cache)
          }
          const val = parseInt(this.evalMessage(data.call_sec, cache))
          if (val > 0) {
            const index = Math.max(val - 1, 0)
            if (cache.actions[index]) {
              cache.index = index - 1
              this.callNextAction(cache)
            }
          }
          if (jumpidanchor_sec > 0) {
            this.anchorJump(jumpidanchor_sec, cache)
          }
        }
      }
      if (GMbuttonid == 3) {
        if (memberCustom.id == member.user.id) {
          if (buttoncontent_thi.length > 0) returnText = buttoncontent_thi;
          if (varNameButton.length > 0) {
            press_button = "3";
            this.storeValue(press_button, storageButton, varNameButton, cache)
          }
          const val = parseInt(this.evalMessage(data.call_thi, cache))
          if (val > 0) {
            const index = Math.max(val - 1, 0)
            if (cache.actions[index]) {
              cache.index = index - 1
              this.callNextAction(cache)
            }
          }
          if (jumpidanchor_thi > 0) {
            this.anchorJump(jumpidanchor_thi, cache)
          }
        }
      }
      if (GMbuttonid == 4) {
        if (memberCustom.id == member.user.id) {
          if (buttoncontent_fou.length > 0) returnText = buttoncontent_fou;
          if (varNameButton.length > 0) {
            press_button = "4";
            this.storeValue(press_button, storageButton, varNameButton, cache)
          }
          const val = parseInt(this.evalMessage(data.call_fou, cache))
          if (val > 0) {
            const index = Math.max(val - 1, 0)
            if (cache.actions[index]) {
              cache.index = index - 1
              this.callNextAction(cache)
            }
          }
          if (jumpidanchor_fou > 0) {
            this.anchorJump(jumpidanchor_fou, cache)
          }
        }
      }
      if (GMbuttonid == 5) {
        if (memberCustom.id == member.user.id) {
          if (buttoncontent_fif.length > 0) returnText = buttoncontent_fif;
          if (varNameButton.length > 0) {
            press_button = "5";
            this.storeValue(press_button, storageButton, varNameButton, cache)
          }
          const val = parseInt(this.evalMessage(data.call_fif, cache))
          if (val > 0) {
            const index = Math.max(val - 1, 0)
            if (cache.actions[index]) {
              cache.index = index - 1
              this.callNextAction(cache)
            }
          }
          if (jumpidanchor_fif > 0) {
            this.anchorJump(jumpidanchor_fif, cache)
          }
        }
      }

      function call(val) {
        const index = Math.max(val - 1, 0)
        if (cache.actions[index]) {
          cache.index = index - 1
          this.callNextAction(cache)
        }
      }

      if (returnText !== undefined) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: returnText,
              flags: replyflags,
            },
          },
        });
      }

    });

    let buttons;
    let button_one;
    let button_two;
    let button_three;
    let button_four;
    let button_five;

    switch (button) {
      case 0:
        button_one = {
          type: 2,
          style: buttonstyle,
          custom_id: buttonid,
          label: buttonlabel,
          disabled: buttondisabled
        }
        break
      case 1:
        button_one = {
          type: 2,
          style: 5,
          url: buttonurl,
          label: buttonlabel,
          disabled: buttondisabled
        }
        break
      case 2:
        button_one = {
          type: 2,
          style: buttonstyle,
          custom_id: buttonid,
          label: buttonlabel,
          emoji: {
            name: buttonemoji
          },
          disabled: buttondisabled
        }
        break
      case 3:
        button_one = {
          type: 2,
          style: buttonstyle,
          custom_id: buttonid,
          label: buttonlabel,
          emoji: {
            id: buttonemojiid,
            name: buttonemoji,
            animated: buttonemojianimated
          },
          disabled: buttondisabled
        }
        break
    }

    switch (button_sec) {
      case 0:
        button_two = {
          type: 2,
          style: buttonstyle_sec,
          custom_id: buttonid_sec,
          label: buttonlabel_sec,
          disabled: buttondisabled_sec
        }
        break
      case 1:
        button_two = {
          type: 2,
          style: 5,
          url: buttonurl_sec,
          label: buttonlabel_sec,
          disabled: buttondisabled_sec
        }
        break
      case 2:
        button_two = {
          type: 2,
          style: buttonstyle_sec,
          custom_id: buttonid_sec,
          label: buttonlabel_sec,
          emoji: {
            name: buttonemoji_sec
          },
          disabled: buttondisabled_sec
        }
        break
      case 3:
        button_two = {
          type: 2,
          style: buttonstyle_sec,
          custom_id: buttonid_sec,
          label: buttonlabel_sec,
          emoji: {
            id: buttonemojiid_sec,
            name: buttonemoji_sec,
            animated: buttonemojianimated_sec
          },
          disabled: buttondisabled_sec
        }
        break
    }

    switch (button_thi) {
      case 0:
        button_three = {
          type: 2,
          style: buttonstyle_thi,
          custom_id: buttonid_thi,
          label: buttonlabel_thi,
          disabled: buttondisabled_thi
        }
        break
      case 1:
        button_three = {
          type: 2,
          style: 5,
          url: buttonurl_thi,
          label: buttonlabel_thi,
          disabled: buttondisabled_thi
        }
        break
      case 2:
        button_three = {
          type: 2,
          style: buttonstyle_thi,
          custom_id: buttonid_thi,
          label: buttonlabel_thi,
          emoji: {
            name: buttonemoji_thi
          },
          disabled: buttondisabled_thi
        }
        break
      case 3:
        button_three = {
          type: 2,
          style: buttonstyle_thi,
          custom_id: buttonid_thi,
          label: buttonlabel_thi,
          emoji: {
            id: buttonemojiid_thi,
            name: buttonemoji_thi,
            animated: buttonemojianimated_thi
          },
          disabled: buttondisabled_thi
        }
        break
    }

    switch (button_fou) {
      case 0:
        button_four = {
          type: 2,
          style: buttonstyle_fou,
          custom_id: buttonid_fou,
          label: buttonlabel_fou,
          disabled: buttondisabled_fou
        }
        break
      case 1:
        button_four = {
          type: 2,
          style: 5,
          url: buttonurl_fou,
          label: buttonlabel_fou,
          disabled: buttondisabled_fou
        }
        break
      case 2:
        button_four = {
          type: 2,
          style: buttonstyle_fou,
          custom_id: buttonid_fou,
          label: buttonlabel_fou,
          emoji: {
            name: buttonemoji_fou
          },
          disabled: buttondisabled_fou
        }
        break
      case 3:
        button_four = {
          type: 2,
          style: buttonstyle_fou,
          custom_id: buttonid_fou,
          label: buttonlabel_fou,
          emoji: {
            id: buttonemojiid_fou,
            name: buttonemoji_fou,
            animated: buttonemojianimated_fou
          },
          disabled: buttondisabled_fou
        }
        break
    }

    switch (button_fif) {
      case 0:
        button_five = {
          type: 2,
          style: buttonstyle_fif,
          custom_id: buttonid_fif,
          label: buttonlabel_fif,
          disabled: buttondisabled_fif
        }
        break
      case 1:
        button_five = {
          type: 2,
          style: 5,
          url: buttonurl_fif,
          label: buttonlabel_fif,
          disabled: buttondisabled_fif
        }
        break
      case 2:
        button_five = {
          type: 2,
          style: buttonstyle_fif,
          custom_id: buttonid_fif,
          label: buttonlabel_fif,
          emoji: {
            name: buttonemoji_fif
          },
          disabled: buttondisabled_fif
        }
        break
      case 3:
        button_five = {
          type: 2,
          style: buttonstyle_fif,
          custom_id: buttonid_fif,
          label: buttonlabel_fif,
          emoji: {
            id: buttonemojiid_fif,
            name: buttonemoji_fif,
            animated: buttonemojianimated_fif
          },
          disabled: buttondisabled_fif
        }
        break
    }

    switch (button_count) {
      case 1:
        buttons = [button_one];
        break
      case 2:
        buttons = [button_one, button_two];
        break
      case 3:
        buttons = [button_one, button_two, button_three];
        break
      case 4:
        buttons = [button_one, button_two, button_three, button_four];
        break
      case 5:
        buttons = [button_one, button_two, button_three, button_four, button_five];
        break
    }

    client.api.channels(channelid).messages.post({
      data: {
        embeds: [embed],
        components: [{
          type: 1,
          components: buttons,
        }, ],
      },
    }).then((msg) => {
      if (msg && varName3) this.storeValue(msg, storage3, varName3, cache)
      this.callNextAction(cache)
    })
  },

  mod(DBM) {
    DBM.Actions.anchorJump = function (id, cache) {
      const anchorIndex = cache.actions.findIndex((a) => a.name === 'Create Anchor' && a.anchor_id === id)
      if (anchorIndex === -1) throw new Error('There was not an anchor found with that exact anchor ID!')
      cache.index = anchorIndex - 1
      this.callNextAction(cache)
    }

    DBM.Actions.anchorExist = function (id, cache) {
      const anchorIndex = cache.actions.findIndex((a) => a.name === 'Create Anchor' && a.anchor_id === id)
      if (anchorIndex === -1) {
        return false
      }
      return true
    }
  },
};