

const scriptsInEvents = {

	async Events_game_Event18_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "christmas-match",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	},

	async Events_game_Event79_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.game_points || 0;
		const bestScore = Math.max(
		  runtime.globalVars.game_points || 0,
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
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
