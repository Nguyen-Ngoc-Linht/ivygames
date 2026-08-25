

const scriptsInEvents = {

	async Events_game_Event4_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "flapcat-copters",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
