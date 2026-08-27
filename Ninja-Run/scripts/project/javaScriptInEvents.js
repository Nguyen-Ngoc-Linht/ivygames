

const scriptsInEvents = {

	async Addset_Event22_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Addset_Event23_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Loadingset_Event1_Act10(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    timestamp: Date.now()
		}, "*");
	},

	async Gameset_Event4_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Gameset_Event3_Act23(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Addset_Event25_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("pause", runtime.globalVars.UserId)
	},

	async Addset_Event26_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    gameId: "ninja-run",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("resume", runtime.globalVars.UserId)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
