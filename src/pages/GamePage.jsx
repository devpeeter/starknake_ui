// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function GamePage({ playerDetails }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadGameScripts = () => {
//       const scripts = [
//         "/js/jquery-3.1.1.min.js",
//         "/js/createjs.min.js",
//         "/js/screenfull.js",
//         "/js/howler.min.js",
//         "/js/platform.js",
//         "/js/ios_fullscreen.js",
//         "/js/ctl_utils.js",
//         "/js/sprite_lib.js",
//         "/js/settings.js",
//         "/js/CLang.js",
//         "/js/CPreloader.js",
//         "/js/CMain.js",
//         "/js/CTextButton.js",
//         "/js/CToggle.js",
//         "/js/CGfxButton.js",
//         "/js/CCreditsPanel.js",
//         "/js/CMenu.js",
//         "/js/CGame.js",
//         "/js/CInterface.js",
//         "/js/CHelpPanel.js",
//         "/js/CEndPanel.js",
//         "/js/CSnake.js",
//         "/js/CSingleQueue.js",
//         "/js/CVector2.js",
//         "/js/CEdges.js",
//         "/js/CEdge.js",
//         "/js/CManageFoods.js",
//         "/js/CFood.js",
//         "/js/CControlAiSnakes.js",
//         "/js/CSubAISnake.js",
//         "/js/CManageSections.js",
//         "/js/CSection.js",
//         "/js/CPause.js",
//         "/js/CAreYouSurePanel.js",
//         "/js/CBackground.js",
//         "/js/CAnimMenu.js",
//         "/js/CLogo.js",
//         "/js/CAnimHelp.js",
//       ];

//       let loadedScripts = 0;
//       const totalScripts = scripts.length;

//       scripts.forEach((src) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = false;
//         script.onload = () => {
//           loadedScripts++;
//           if (loadedScripts === totalScripts) {
//             initGame();
//           }
//         };
//         document.body.appendChild(script);
//       });
//     };

//     const initGame = () => {
//       if (window.CMain) {
//         const oMain = new window.CMain({
//           hero_rotation_speed: 10,
//           hero_speed_up: 15,
//           hero_speed: 10,
//           snakes_AI_speed: [10, 10, 10, 10],
//           food_score: [1],
//           fullscreen: true,
//           check_orientation: true,
//         });

//         if (window.isIOS && window.isIOS()) {
//           setTimeout(() => {
//             if (window.sizeHandler) window.sizeHandler();
//           }, 200);
//         } else {
//           if (window.sizeHandler) window.sizeHandler();
//         }
//       }
//     };

//     loadGameScripts();

//     return () => {
//       const scripts = document.querySelectorAll('script[src^="/js/"]');
//       scripts.forEach((script) => script.remove());
//     };
//   }, []);

//   return (
//     <div className="game-page">
//       <div className="game-header">
//         <button onClick={() => navigate("/dashboard")} className="back-btn">
//           Back to Dashboard
//         </button>
//         {playerDetails && (
//           <div className="game-player-info">
//             <span className="game-username">{playerDetails.username}</span>
//             <span className="game-score">
//               High Score: {playerDetails.score}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="check-fonts">
//         <p className="check-font-1">palamecia_titlingregular</p>
//       </div>

//       <canvas
//         id="canvas"
//         className="ani_hack"
//         width="1360"
//         height="768"
//       ></canvas>
//       <div data-orientation="landscape" className="orientation-msg-container">
//         <p className="orientation-msg-text">Please rotate your device</p>
//       </div>
//       <div
//         id="block_game"
//         style={{
//           position: "fixed",
//           backgroundColor: "transparent",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           display: "none",
//         }}
//       ></div>
//     </div>
//   );
// }

// export default GamePage;

//===========

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function GamePage({ playerDetails }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadGameScripts = () => {
//       const scripts = [
//         "/js/jquery-3.1.1.min.js",
//         "/js/createjs.min.js",
//         "/js/screenfull.js",
//         "/js/howler.min.js",
//         "/js/platform.js",
//         "/js/ios_fullscreen.js",
//         "/js/ctl_utils.js",
//         "/js/sprite_lib.js",
//         "/js/settings.js",
//         "/js/CLang.js",
//         "/js/CPreloader.js",
//         "/js/CMain.js",
//         "/js/CTextButton.js",
//         "/js/CToggle.js",
//         "/js/CGfxButton.js",
//         "/js/CCreditsPanel.js",
//         "/js/CMenu.js",
//         "/js/CGame.js",
//         "/js/CInterface.js",
//         "/js/CHelpPanel.js",
//         "/js/CEndPanel.js",
//         "/js/CSnake.js",
//         "/js/CSingleQueue.js",
//         "/js/CVector2.js",
//         "/js/CEdges.js",
//         "/js/CEdge.js",
//         "/js/CManageFoods.js",
//         "/js/CFood.js",
//         "/js/CControlAiSnakes.js",
//         "/js/CSubAISnake.js",
//         "/js/CManageSections.js",
//         "/js/CSection.js",
//         "/js/CPause.js",
//         "/js/CAreYouSurePanel.js",
//         "/js/CBackground.js",
//         "/js/CAnimMenu.js",
//         "/js/CLogo.js",
//         "/js/CAnimHelp.js",
//       ];

//       let loadedScripts = 0;
//       const totalScripts = scripts.length;

//       scripts.forEach((src) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = false;
//         script.onload = () => {
//           console.log(`Loaded script: ${src}`);
//           loadedScripts++;
//           if (loadedScripts === totalScripts) {
//             console.log("All scripts loaded, initializing game...");
//             initGame();
//           }
//         };
//         script.onerror = () => {
//           console.error(`Failed to load script: ${src}`);
//           loadedScripts++;
//           if (loadedScripts === totalScripts) {
//             console.log("All scripts processed, initializing game...");
//             initGame();
//           }
//         };
//         document.body.appendChild(script);
//       });
//     };

//     const initGame = () => {
//       console.log("Initializing game...");
//       if (window.CMain) {
//         console.log("CMain found, starting game...");
//         try {
//           const oMain = new window.CMain({
//             hero_rotation_speed: 10,
//             hero_speed_up: 15,
//             hero_speed: 10,
//             snakes_AI_speed: [10, 10, 10, 10],
//             food_score: [1],
//             fullscreen: true,
//             check_orientation: true,
//           });
//           console.log("Game instance created:", oMain);
//           if (window.isIOS && window.isIOS()) {
//             setTimeout(() => {
//               if (window.sizeHandler) {
//                 console.log("Calling iOS sizeHandler");
//                 window.sizeHandler();
//               } else {
//                 console.warn("sizeHandler not found");
//               }
//             }, 200);
//           } else {
//             if (window.sizeHandler) {
//               console.log("Calling sizeHandler");
//               window.sizeHandler();
//             } else {
//               console.warn("sizeHandler not found");
//             }
//           }
//         } catch (error) {
//           console.error("Game initialization error:", error);
//         }
//       } else {
//         console.error("CMain not found. Game scripts may have failed to load.");
//       }
//     };

//     // Test canvas rendering
//     const canvas = document.getElementById("canvas");
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.fillStyle = "red";
//         ctx.fillRect(0, 0, 1360, 768);
//         console.log("Test canvas drawn with red rectangle");
//       } else {
//         console.error("Failed to get 2D context for canvas");
//       }
//     } else {
//       console.error("Canvas element not found");
//     }

//     loadGameScripts();

//     return () => {
//       console.log("Cleaning up scripts...");
//       const scripts = document.querySelectorAll('script[src^="/js/"]');
//       scripts.forEach((script) => script.remove());
//     };
//   }, []);

//   return (
//     <div className="game-page">
//       <div className="game-header">
//         <button onClick={() => navigate("/dashboard")} className="back-btn">
//           Back to Dashboard
//         </button>
//         {playerDetails && (
//           <div className="game-player-info">
//             <span className="game-username">{playerDetails.username}</span>
//             <span className="game-score">
//               High Score: {playerDetails.score}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="check-fonts">
//         <p className="check-font-1">palamecia_titlingregular</p>
//       </div>

//       <canvas
//         id="canvas"
//         className="ani_hack"
//         width="1360"
//         height="768"
//       ></canvas>
//       <div data-orientation="landscape" className="orientation-msg-container">
//         <p className="orientation-msg-text">Please rotate your device</p>
//       </div>
//       <div
//         id="block_game"
//         style={{
//           position: "fixed",
//           backgroundColor: "transparent",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           display: "none",
//         }}
//       ></div>
//     </div>
//   );
// }

// export default GamePage;

//===========

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GamePage({ playerDetails }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameScripts = () => {
      const scripts = [
        "/js/jquery-3.1.1.min.js",
        "/js/createjs.min.js",
        "/js/screenfull.js",
        "/js/howler.min.js",
        "/js/platform.js",
        "/js/ios_fullscreen.js",
        "/js/ctl_utils.js",
        "/js/sprite_lib.js",
        "/js/settings.js",
        "/js/CLang.js",
        "/js/CPreloader.js",
        "/js/CMain.js",
        "/js/CTextButton.js",
        "/js/CToggle.js",
        "/js/CGfxButton.js",
        "/js/CCreditsPanel.js",
        "/js/CMenu.js",
        "/js/CGame.js",
        "/js/CInterface.js",
        "/js/CHelpPanel.js",
        "/js/CEndPanel.js",
        "/js/CSnake.js",
        "/js/CSingleQueue.js",
        "/js/CVector2.js",
        "/js/CEdges.js",
        "/js/CEdge.js",
        "/js/CManageFoods.js",
        "/js/CFood.js",
        "/js/CControlAiSnakes.js",
        "/js/CSubAISnake.js",
        "/js/CManageSections.js",
        "/js/CSection.js",
        "/js/CPause.js",
        "/js/CAreYouSurePanel.js",
        "/js/CBackground.js",
        "/js/CAnimMenu.js",
        "/js/CLogo.js",
        "/js/CAnimHelp.js",
      ];

      let loadedScripts = 0;
      const totalScripts = scripts.length;

      scripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          console.log(`Loaded script: ${src}`);
          loadedScripts++;
          if (loadedScripts === totalScripts) {
            console.log("All scripts loaded, initializing game...");
            setTimeout(() => initGame(), 100);
          }
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          setError(`Failed to load game script: ${src}`);
          loadedScripts++;
          if (loadedScripts === totalScripts) {
            setTimeout(() => initGame(), 100);
          }
        };
        document.body.appendChild(script);
      });
    };

    const initGame = () => {
      console.log("Initializing game...");
      setIsLoading(false);

      if (!window.createjs) {
        console.error("CreateJS not loaded");
        setError("CreateJS library failed to load");
        return;
      }

      if (!window.CMain) {
        console.error("CMain not found");
        setError("Game engine failed to load");
        return;
      }

      try {
        console.log("Starting game initialization...");
        const oMain = new window.CMain({
          hero_rotation_speed: 10,
          hero_speed_up: 15,
          hero_speed: 10,
          snakes_AI_speed: [10, 10, 10, 10],
          food_score: [1],
          fullscreen: true,
          check_orientation: true,
        });
        console.log("Game instance created successfully");

        if (window.isIOS && window.isIOS()) {
          setTimeout(() => {
            if (window.sizeHandler) {
              window.sizeHandler();
            }
          }, 200);
        } else {
          if (window.sizeHandler) {
            window.sizeHandler();
          }
        }
      } catch (error) {
        console.error("Game initialization error:", error);
        setError(`Game initialization failed: ${error.message}`);
      }
    };

    loadGameScripts();

    return () => {
      console.log("Cleaning up game...");
      const scripts = document.querySelectorAll('script[src^="/js/"]');
      scripts.forEach((script) => script.remove());

      if (window.createjs && window.createjs.Ticker) {
        window.createjs.Ticker.removeAllEventListeners();
      }
    };
  }, []);

  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          Back to Dashboard
        </button>
        {playerDetails && (
          <div className="game-player-info">
            <span className="game-username">{playerDetails.username}</span>
            <span className="game-score">
              High Score: {playerDetails.score}
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="game-loading">
          <p>Loading Snake Attack Game...</p>
        </div>
      )}

      {error && (
        <div className="game-error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="check-fonts">
        <p className="check-font-1">palamecia_titlingregular</p>
      </div>

      <canvas
        id="canvas"
        className="ani_hack"
        width="1360"
        height="768"
      ></canvas>
      <div data-orientation="landscape" className="orientation-msg-container">
        <p className="orientation-msg-text">Please rotate your device</p>
      </div>
      <div
        id="block_game"
        style={{
          position: "fixed",
          backgroundColor: "transparent",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "none",
        }}
      ></div>
    </div>
  );
}

export default GamePage;
