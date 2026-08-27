

const scriptsInEvents = {

	async Game_events_Event23_Act8(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.HighScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event33_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Game_events_Event35_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_events_Event36_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Game_events_Event41_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Loading_events_Event2_Act8(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    timestamp: Date.now()
		}, "*");
	},

	async Game_events_Event34_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "smiles",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("pause", runtime.globalVars.UserId)
	},

	async Game_events_Event37_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "smiles",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("resume", runtime.globalVars.UserId)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
