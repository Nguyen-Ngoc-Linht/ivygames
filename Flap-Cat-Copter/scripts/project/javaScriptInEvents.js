

const scriptsInEvents = {

	async Events_game_Event4_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "flapcat-copters",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Events_game_Event21_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.game_points ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "flapcat-copters",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
