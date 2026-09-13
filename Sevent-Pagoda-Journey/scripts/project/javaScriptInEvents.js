

const scriptsInEvents = {

	async Gameevent_Event52_Act2(runtime, localVars)
	{
		const score = runtime.globalVars.Score ?? 0;
		const bestScore = Math.max(runtime.globalVars.BestScore ?? 0, score);
		const lotus = runtime.globalVars.LotusCollected ?? 0;
		const candle = runtime.globalVars.CandleCollected ?? 0;
		const incense = runtime.globalVars.IncenseCollected ?? 0;
		const bayben = runtime.globalVars.BayBenCollected ?? 0
		window.parent.postMessage({
		    type: "GAME_END",
		    userId: runtime.globalVars.UserId,
		    gameId: "stick-monkey",
		    score: score,
		    bestScore: bestScore,
		    status: "COMPLETED",
		    timestamp: Date.now()
		}, "*");
		
		console.log("end", score, bestScore, lotus, bayben, candle, incense, "COMPLETED")
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
