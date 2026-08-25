

const scriptsInEvents = {

	async Game_events_Event2_Act7(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.BestScore = Number(params.get("bestScore") || 0);
	},

	async Game_events_Event53_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('home')
	},

	async Game_events_Event54_Act4(runtime, localVars)
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

	async Game_events_Event65_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('pause')
	},

	async Game_events_Event68_Act7(runtime, localVars)
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

	async Game_events_Event72_Act11(runtime, localVars)
	{
		const score = runtime.globalVars.Score || 0;
		const bestScore = Math.max(
		  runtime.globalVars.BestScore || 0,
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

	async Main_events_Event9_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	},

	async Main_events_Event10_Act4(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('home')
	},

	async Main_events_Event11_Act4(runtime, localVars)
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

	async Main_events_Event17_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('exit')
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
