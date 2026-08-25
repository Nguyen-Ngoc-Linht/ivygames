

const scriptsInEvents = {

	async Events_game_Event3_Act1(runtime, localVars)
	{
		const level = runtime.globalVars.game_level_now ?? runtime.globalVars.GameLevelNow ?? 0;
		const score = runtime.globalVars.game_level_now ?? 0;
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "color-pump",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId, score)
	},

	async Events_game_Event13_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.game_level_now ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "color-pump",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Events_game_Event60_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.game_level_now ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "color-pump",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Events_game_Event64_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.game_level_now ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "color-pump",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Events_home_Event30_Act2(runtime, localVars)
	{
		const level = runtime.globalVars.game_level_now ?? runtime.globalVars.GameLevelNow ?? 0;
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "color-pump",
		    score: level,
		    timestamp: Date.now()
		}, "*");
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
