

const scriptsInEvents = {

	async Game_events_Event1_Act12(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		
		runtime.globalVars.UserId = Number(params.get("userId")) || 0;
	},

	async Game_events_Event72_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = score;
		
		window.parent.postMessage({
		  type: "GAME_END",
		  userId: runtime.globalVars.UserId,
		    gameId: "hot-jewels",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		  duration: 30 - runtime.globalVars.TimeGame,
		  timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Global_events_Event4_Act3(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "hot-jewels",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Main_events_Event2_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "hot-jewels",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Main_events_Event3_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "hot-jewels",
		    score: runtime.globalVars.Score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("exit", runtime.globalVars.UserId)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
