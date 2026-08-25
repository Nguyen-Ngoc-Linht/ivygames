

const scriptsInEvents = {

	async Game_event_Event2_Act8(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.BestScore = Number(params.get("bestScore") || 0);
	},

	async Game_event_Event55_Act7(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "cartoon-candy-match3",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('pause')
	},

	async Game_event_Event57_Act7(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "cartoon-candy-match3",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('resume')
	},

	async Game_event_Event60_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		
		window.parent.postMessage({
		  type: "GAME_END",
		  userId: runtime.globalVars.UserId,
		    gameId: "cartoon-candy-match3",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		  duration: 30 - runtime.globalVars.TimeGame,
		  timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_event_Event61_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		window.parent.postMessage({
		    type: "NEW_BEST_SCORE",
		    userId: runtime.globalVars.UserId,
		    gameId: "cartoon-candy-match3",
		    score: score,
		    bestScore: bestScore,
		    timestamp: Date.now()
		}, "*");
		
		console.log("best_score", bestScore, score)
	},

	async Main_event_Event5_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "cartoon-candy-match3",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
