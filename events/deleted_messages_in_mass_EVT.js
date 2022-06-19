module.exports = {

name: "Bulk deleted messages",

isEvent: true,

fields: ["Temporal Variable name (store the list of messages):", "Temporal Variable name (store the number of messages):"],

mod: function(DBM) {

	
	DBM.XinXyla = DBM.XinXyla || {};

	
	DBM.XinXyla.messageDeleteBulk = function(messagesList) {
		
		const { Bot, Actions } = DBM;

				const events = Bot.$evts["Bulk deleted messages"];

	
		if(!events) return;

		// Call each one.
		const temp = {}
		const server = [...messagesList.values()].guild;
		for(let i = 0; i < events.length; i++) {
			const event = events[i];
			if(event.temp) temp[event.temp] = [...messagesList.values()];
			if(event.temp2) temp[event.temp2] = messagesList.size;
			Actions.invokeEvent(event, server, temp);
		}
	};


	
	const onReady = DBM.Bot.onReady;
	DBM.Bot.onReady = function(...params) {
		DBM.Bot.bot.on("Bulk deleted messages", DBM.XinXyla.messageDeleteBulk);
		onReady.apply(this, ...params);
	}
	
}

};
