

const scriptsInEvents = {

	async Start_sht_Event6_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "monster-run",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start')
	},

	async Buy_sht_Event2_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "monster-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.loG('home')
		
		console.log("home", score)
	},

	async Game_sht_Event4_Act10(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
		runtime.globalVars.HighScore = Number(params.get("bestScore") || 0);
	},

	async Game_sht_Event18_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.score ?? 0;
		const bestScore = Math.max(runtime.globalVars.HighScore ?? 0, score);
		
		window.parent.postMessage({
		  type: "GAME_END",
		  userId: runtime.globalVars.UserId,
		    gameId: "monster-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		  duration: 30 - runtime.globalVars.TimeGame,
		  timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_sht_Event115_Act10(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_PAUSE",
		    userId: runtime.globalVars.UserId,
		    gameId: "monster-run",
		    score: runtime.globalVars.score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('pause')
	},

	async Game_sht_Event116_Act13(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_RESUME",
		    userId: runtime.globalVars.UserId,
		    sessionId: runtime.globalVars.SessionId,
		    gameId: "monster-run",
		    score: runtime.globalVars.score,
		    timestamp: Date.now()
		}, "*");
		
		console.log('resume')
	},

	async Gui_Event4_Act3(runtime, localVars)
	{
		const score = runtime.globalVars.score ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "monster-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
