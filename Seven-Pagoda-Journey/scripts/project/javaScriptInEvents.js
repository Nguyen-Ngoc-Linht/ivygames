

const scriptsInEvents = {

	async Gameevent_Event42_Act2(runtime, localVars)
	{
		if (
		  window.__snapGameWapOrigin &&
		  runtime.globalVars.HostStarted === 1 &&
		  runtime.globalVars.HostFinished === 0
		) {
		  const score = Math.max(
		    0,
		    Math.floor(Number(runtime.globalVars.Score) || 0)
		  );
		
		  runtime.globalVars.HostFinished = 1;
		  runtime.globalVars.HostStarted = 0;
		
		  window.parent.postMessage(
		    {
		      type: "SNAPGAME_EVENT_FINISH",
		      rawScore: score,
		      metrics: {
		        reason: "GAME_OVER",
		
		        score: score,
		        bestScore: Math.max(
		          Number(runtime.globalVars.BestScore) || 0,
		          score
		        ),
		
		        currentLevel: Number(runtime.globalVars.CurrentLevel) || 1,
		        bridgesCrossed: Number(runtime.globalVars.BridgesCrossed) || 0,
		        perfectCount: Number(runtime.globalVars.PerfectCount) || 0,
		
		        lotusCollected: Number(runtime.globalVars.LotusCollected) || 0,
		        incenseCollected: Number(runtime.globalVars.IncenseCollected) || 0,
		        candleCollected: Number(runtime.globalVars.CandleCollected) || 0,
		        bayBenCollected: Number(runtime.globalVars.BayBenCollected) || 0,
		
		        selectedCharacter:
		          Number(runtime.globalVars.SelectedCharacter) || 0,
		
		        characterName:
		          String(runtime.globalVars.CharacterName || "")
		      }
		    },
		    window.__snapGameWapOrigin
		  );
		
		  console.log("[GAME] FINISH sent", {
		    rawScore: score,
		    currentLevel: runtime.globalVars.CurrentLevel
		  });
		}
	},

	async Gameevent_Event55_Act1(runtime, localVars)
	{
		if (window.__snapGameWapOrigin) {
		  window.parent.postMessage(
		    {
		      type: "SNAPGAME_EVENT_HEARTBEAT"
		    },
		    window.__snapGameWapOrigin
		  );
		
		  console.log("[GAME] HEARTBEAT sent");
		}
	},

	async Globalevent_Event2_Act11(runtime, localVars)
	{
		const ALLOWED_WAP_ORIGINS = [
		  "http://game.tv360.metfone.com.kh",
		  "http://103.124.92.216:8080",
		  "http://localhost:4001"
		];
		
		const postToWap = (message) => {
		  if (!window.__snapGameWapOrigin) return;
		
		  window.parent.postMessage(message, window.__snapGameWapOrigin);
		};
		
		const sendStartWhenReady = () => {
		  if (
		    !window.__snapGameWapOrigin ||
		    runtime.globalVars.HostInitialized !== 1 ||
		    runtime.globalVars.HostStartRequested !== 1 ||
		    runtime.globalVars.HostStarted === 1 ||
		    runtime.globalVars.HostFinished === 1
		  ) {
		    return;
		  }
		
		  // 2 = đã gửi START, tránh gửi trùng.
		  runtime.globalVars.HostStartRequested = 2;
		  postToWap({ type: "SNAPGAME_EVENT_START" });
		  console.log("[GAME] → WAP START");
		};
		
		if (!window.__snapGameMessageListenerAdded) {
		  window.__snapGameMessageListenerAdded = true;
		  window.__snapGameWapOrigin = null;
		
		  runtime.globalVars.HostInitialized = 0;
		  runtime.globalVars.HostStartRequested = 0;
		  runtime.globalVars.HostStarted = 0;
		  runtime.globalVars.HostFinished = 0;
		  runtime.globalVars.HostFinishConfirmed = 0;
		  runtime.globalVars.HostErrorCode = "";
		
		  window.addEventListener("message", (event) => {
		    if (
		      !ALLOWED_WAP_ORIGINS.includes(event.origin) ||
		      event.source !== window.parent
		    ) {
		      return;
		    }
		
		    const message = event.data || {};
		    console.log("[GAME] ← WAP", message);
		
		    switch (message.type) {
		      case "SNAPGAME_EVENT_INIT": {
		        const startWasRequested =
		          runtime.globalVars.HostStartRequested === 1;
		
		        window.__snapGameWapOrigin = event.origin;
		        runtime.globalVars.HostInitialized = 1;
		        runtime.globalVars.HostStartRequested = startWasRequested ? 1 : 0;
		        runtime.globalVars.HostStarted = 0;
		        runtime.globalVars.HostFinished = 0;
		        runtime.globalVars.HostFinishConfirmed = 0;
		        runtime.globalVars.HostErrorCode = "";
		
		        runtime.globalVars.CurrentLevel = Math.min(
		          7,
		          Math.max(1, Number(message.selectedLevel) || 1)
		        );
		        runtime.globalVars.SelectedCharacter =
		          Number(message.selectedCharacter) || 0;
		        runtime.globalVars.CharacterName =
		          String(message.characterName || "Male01");
		
		        // Nếu người chơi đã bấm Play trước INIT, gửi START ngay lúc này.
		        sendStartWhenReady();
		
		        console.log("[GAME] INIT received");
		        break;
		      }
		
		      case "SNAPGAME_EVENT_STARTED":
		        runtime.globalVars.HostStarted = 1;
		        runtime.globalVars.HostErrorCode = "";
		        console.log("[GAME] STARTED received");
		        break;
		
		      case "SNAPGAME_EVENT_FINISHED":
		        runtime.globalVars.HostFinishConfirmed = 1;
		        runtime.globalVars.HostFinished = 1;
		        runtime.globalVars.HostStarted = 0;
		        console.log("[GAME] FINISHED received");
		        break;
		
		      case "SNAPGAME_EVENT_ERROR":
		        runtime.globalVars.HostFinished = 1;
		        runtime.globalVars.HostStarted = 0;
		        runtime.globalVars.HostErrorCode =
		          String(message.code || "RUN_FAILED");
		        console.error("[GAME] ERROR", runtime.globalVars.HostErrorCode);
		        break;
		    }
		  });
		
		  // WAP nhận READY rồi mới gửi INIT — không còn phụ thuộc timeout.
		  window.parent.postMessage(
		    { type: "SNAPGAME_EVENT_READY" },
		    "*"
		  );
		
		  console.log("[GAME] READY sent");
		}
	},

	async Menuevent_Event5_Act6(runtime, localVars)
	{
		if (window.__snapGameWapOrigin) {
		  window.parent.postMessage(
		    {
		      type: "SNAPGAME_EVENT_START"
		    },
		    window.__snapGameWapOrigin
		  );
		
		  console.log("[GAME] START sent");
		}
	},

	async Characterselectevent_Event9_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		  type: "SNAPGAME_EVENT_CHARACTER_SELECTED",
		  selectedCharacter: 0,
		  characterName: "Male01"
		}, "*");
	},

	async Characterselectevent_Event10_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		  type: "SNAPGAME_EVENT_CHARACTER_SELECTED",
		  selectedCharacter: 1,
		  characterName: "Male02"
		}, "*");
	},

	async Characterselectevent_Event11_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		  type: "SNAPGAME_EVENT_CHARACTER_SELECTED",
		  selectedCharacter: 2,
		  characterName: "Female01"
		}, "*");
	},

	async Characterselectevent_Event12_Act3(runtime, localVars)
	{
		window.parent.postMessage({
		  type: "SNAPGAME_EVENT_CHARACTER_SELECTED",
		  selectedCharacter: 3,
		  characterName: "Female02"
		}, "*");
	},

	async Gameevent_Event20_Act2(runtime, localVars)
	{
		if (window.__snapGameWapOrigin) {
		  window.parent.postMessage(
		    {
		      type: "SNAPGAME_EVENT_START"
		    },
		    window.__snapGameWapOrigin
		  );
		
		  console.log("[GAME] START sent");
		}
	},

	async Gameevent_Event21_Act3(runtime, localVars)
	{
		if (window.__snapGameWapOrigin) {
		  console.log("[GAME] START sent", runtime.globalVars.HostFinished, runtime.globalVars.HostStartRequested, runtime.globalVars.HostInitialized);
		}
		
		console.log("[GAME] START sent", runtime.globalVars.HostFinished, runtime.globalVars.HostStartRequested, runtime.globalVars.HostInitialized, window.__snapGameWapOrigin);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
