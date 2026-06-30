

const scriptsInEvents = {

	async Addevent_Event30_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start game')
	},

	async Addevent_Event35_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('restart', runtime.globalVars.Score)
	},

	async Addevent_Event38_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('home', runtime.globalVars.Score)
	},

	async Addevent_Event40_Act1(runtime, localVars)
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

	async Addevent_Event42_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start 2')
	},

	async Addevent_Event45_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
	},

	async Addevent_Event47_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('game-pause')
	},

	async Addevent_Event49_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('resume')
	},

	async Addevent_Event152(runtime, localVars)
	{
		
	},

	async Gameevent_Event1_Act27(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.BestScore = Number(params.get("bestScore") || 0);
	},

	async Gameevent_Event16_Act8(runtime, localVars)
	{
		const score = runtime.globalVars.Score || 0;
		const bestScore = Math.max(
		  runtime.globalVars.BestScore || 0,
		  score
		);
		
		console.log('end', score, bestScore)
		
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
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
