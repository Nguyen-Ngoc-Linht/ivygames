

const scriptsInEvents = {

	async Game_events_Event3_Act3(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.HighScore ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "zombie-uprising",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Loading_events_Event3_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "zombie-uprising",
		    timestamp: Date.now()
		}, "*");
	},

	async Main_events_Event1_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "zombie-uprising",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
