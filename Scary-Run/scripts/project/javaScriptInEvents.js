

const scriptsInEvents = {

	async Global_events_Event16_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Global_events_Event28_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Global_events_Event29_Act3(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Global_events_Event33_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    timestamp: Date.now()
		}, "*");
		
		console.log('start', runtime.globalVars.UserId)
	},

	async Global_events_Event34_Act4(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	},

	async Global_events_Event35_Act3(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Global_events_Event41_Act1(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_EXIT",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    timestamp: Date.now()
		}, "*");
		
		console.log('exit', runtime.globalVars.UserId)
	},

	async Game_events_Event11_Act18(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = Math.max(runtime.globalVars.BESTSCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event46_Act6(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = Math.max(runtime.globalVars.BESTSCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event49_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = Math.max(runtime.globalVars.BESTSCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_events_Event51_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = Math.max(runtime.globalVars.BESTSCORE ?? 0, score);
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "scary-run",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
