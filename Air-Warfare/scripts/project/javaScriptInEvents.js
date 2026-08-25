

const scriptsInEvents = {

	async Global_event_Event4_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('Game_home', runtime.globalVars.Score)
	},

	async Global_event_Event8_Act15(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('pause', runtime.globalVars.Score)
	},

	async Global_event_Event10_Act15(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "christmas-match",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('return', runtime.globalVars.Score)
	},

	async Loading_event_Event9_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
	},

	async Game_event_Event2_Act30(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.Top_Score = Number(params.get("bestScore") || 0);
	},

	async Game_event_Event89_Act17(runtime, localVars)
	{
		const score = runtime.globalVars.Score || 0;
		const bestScore = Math.max(
		  runtime.globalVars.Top_Score || 0,
		  score
		);
		
		console.log('Game_end', score, bestScore)
		
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
	},

	async Menu_event_Event7_Act6(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start', runtime.globalVars.UserId)
	},

	async Menu_event_Event9_Act5(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('exit', runtime.globalVars.UserId)
	},

	async Game_complete_event_Event3_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.Score || 0;
		const bestScore = Math.max(
		  runtime.globalVars.BestScore || 0,
		  score
		);
		
		window.parent.postMessage({
		    type: "NEW_BEST_SCORE",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    score: score,
		    bestScore: bestScore,
		    timestamp: Date.now()
		}, "*");
		
		console.log('best_score', bestScore, score)
	},

	async Game_complete_event_Event7_Act6(runtime, localVars)
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
