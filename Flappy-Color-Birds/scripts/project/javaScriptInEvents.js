

const scriptsInEvents = {

	async Start_sht_Event6_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "flappy-color-birds",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Game_sht_Event1_Act9(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.HighScore = Number(params.get("bestScore") || 0);
	},

	async Game_sht_Event46_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const oldHighScore = Number(runtime.globalVars.HighScore) || 0;
		const bestScore = Math.max(runtime.globalVars.HighScore ?? 0, score);
		
		window.parent.postMessage({
		  type: "GAME_END",
		  userId: runtime.globalVars.UserId,
		  gameId: "flappy-color-birds",
		  score: score,
		  bestScore: bestScore,
		  status: "COMPLETED",
		  duration: 30 - runtime.globalVars.TimeGame,
		  timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Gui_Event3_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "flappy-color-birds",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
