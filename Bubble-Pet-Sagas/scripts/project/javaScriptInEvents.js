

const scriptsInEvents = {

	async Menucode_Event13_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	},

	async Loadingcode_Event2_Act4(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.HighScore = Number(params.get("bestScore") || 0);
	},

	async Gamecode_Event383_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('restart')
	},

	async Gamecode_Event384_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score || 0;
		const bestScore = Math.max(
		  runtime.globalVars.HighScore || 0,
		  score
		);
		
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
		
		console.log('game-end')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
