

const scriptsInEvents = {

	async Game_sht_Event1_Act9(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.HighScore = Number(params.get("bestScore") || 0);
	},

	async Game_sht_Event46_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE || 0;
		const oldHighScore = Number(runtime.globalVars.HighScore) || 0;
		const bestScore = Math.max(oldHighScore, score);
		
		console.log("GAME END", {
		  score,
		  oldHighScore,
		  bestScore
		});
		
		
		window.parent.postMessage({
		  type: "GAME_END",
		  userId: runtime.globalVars.UserId,
		  gameId: "christmas-match",
		  score: score,
		  bestScore: bestScore,
		  status: "COMPLETED",
		  duration: 30 - runtime.globalVars.TimeGame,
		  timestamp: Date.now()
		}, "*");
		
		console.log('end', score, bestScore)
	},

	async Gui_Event3_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
