

const scriptsInEvents = {

	async Game_events_Event3_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.HighScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event11_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_events_Event12_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Main_events_Event2_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Main_events_Event3_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    timestamp: Date.now()
		}, "*");
		
		console.log("exit", runtime.globalVars.UserId)
	},

	async Global_events_Event14_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Loading_events_Event2_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "touch-ball",
		    timestamp: Date.now()
		}, "*");
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
