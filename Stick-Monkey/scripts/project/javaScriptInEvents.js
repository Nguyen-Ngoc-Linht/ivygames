

const scriptsInEvents = {

	async Gameevent_Event31_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Gameoverevent_Event5_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Menuevent_Event5_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Menuevent_Event9_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    timestamp: Date.now()
		}, "*");
		
		console.log("exit", runtime.globalVars.UserId)
	},

	async Globalevent_Event46_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
