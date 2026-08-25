

const scriptsInEvents = {

	async Global_event_Event28_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "splishy-fish",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Menu_event_Event4_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "splishy-fish",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start', runtime.globalVars.UserId)
	},

	async Menu_event_Event6_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "splishy-fish",
		    timestamp: Date.now()
		}, "*");
		
		console.log('exit', runtime.globalVars.UserId)
	},

	async Game_over_event_Event5_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "splishy-fish",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
