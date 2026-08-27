

const scriptsInEvents = {

	async Loading_events_Event3_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "traffic",
		    timestamp: Date.now()
		}, "*");
	},

	async Game_events_Event24_Act25(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "traffic",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event28_Act15(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "traffic",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Global_events_Event16_Act5(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "traffic",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Global_events_Event19_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "traffic",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Global_events_Event56_Act1(runtime, localVars)
	{
		const pause = runtime.globalVars.Pause
		
		if (pause === 0) {
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "tank-defender",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("pause", score)
		} else {
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    gameId: "tank-defender",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("resume", score)
		}
	},

	async Global_events_Event17_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "tank-defender",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
