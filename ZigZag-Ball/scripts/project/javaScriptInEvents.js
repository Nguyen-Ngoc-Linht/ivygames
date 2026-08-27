

const scriptsInEvents = {

	async Start_Event4_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "zigzag-ball",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Game_Event22_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.score ?? 0;
		const bestScore = Math.max(runtime.globalVars.HIGH_SCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "zigzag-ball",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Admob_Event11_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "zigzag-ball",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
