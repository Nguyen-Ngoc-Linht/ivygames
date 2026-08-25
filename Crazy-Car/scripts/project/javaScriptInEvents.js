

const scriptsInEvents = {

	async Game_events_Event3_Act15(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = Math.max(runtime.globalVars.BESTSCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event6_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId, score)
	},

	async Main_events_Event6_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    timestamp: Date.now()
		}, "*");
		
		console.log('exit', runtime.globalVars.UserId)
	},

	async Main_events_Event7_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    timestamp: Date.now()
		}, "*");
	},

	async Main_events_Event8_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Main_events_Event9_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "crazy-car",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
