

const scriptsInEvents = {

	async Gamesettings_Event1_Act17(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.HighScore = Number(params.get("bestScore") || 0);
	},

	async Gamesettings_Event96_Act5(runtime, localVars)
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
		
		console.log('end', score, bestScore)
	},

	async Gamesettings_Event124_Act2(runtime, localVars)
	{
		const pause = runtime.globalVars.Pause
		
		if (pause === 1) {
		    window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('pause')
		} else {
		    window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('resume')
		}
	},

	async Addsettings_Event6_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	},

	async Addsettings_Event7_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('restart')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
