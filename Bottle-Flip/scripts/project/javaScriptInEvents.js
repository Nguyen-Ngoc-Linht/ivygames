

const scriptsInEvents = {

	async Start_Event2_Act5(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_STARTED",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    timestamp: Date.now()
		}, "*");
	},

	async Bottles_Event4_Act2(runtime, localVars)
	{
		window.parent.postMessage({
		    type: "GAME_START",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    timestamp: Date.now()
		}, "*");
		
		console.log("start", runtime.globalVars.UserId)
	},

	async Game_Event4_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event9_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event10_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event12_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event13_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event14_Act1(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		const bestScore = score;
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, "COMPLETED")
	},

	async Game_Event15_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event16_Act5(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_RESTART",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("restart", score)
	},

	async Game_Event19_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.SCORE ?? 0;
		window.parent.postMessage({
		    type: "GAME_HOME",
		    userId: runtime.globalVars.UserId,
		    gameId: "bottle-flip",
		    score: score,
		    timestamp: Date.now()
		}, "*");
		
		console.log("home", score)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
