'use client';

import { useEffect, useRef } from 'react';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptsLoadedRef.current) return;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const scripts = [
      '/js/jquery-3.1.1.min.js',
      '/js/createjs.min.js',
      '/js/screenfull.js',
      '/js/howler.min.js',
      '/js/platform.js',
      '/js/ios_fullscreen.js',
      '/js/ctl_utils.js',
      '/js/sprite_lib.js',
      '/js/settings.js',
      '/js/CLang.js',
      '/js/CPreloader.js',
      '/js/CMain.js',
      '/js/CTextButton.js',
      '/js/CToggle.js',
      '/js/CGfxButton.js',
      '/js/CCreditsPanel.js',
      '/js/CMenu.js',
      '/js/CGame.js',
      '/js/CInterface.js',
      '/js/CHelpPanel.js',
      '/js/CEndPanel.js',
      '/js/CSnake.js',
      '/js/CSingleQueue.js',
      '/js/CVector2.js',
      '/js/CEdges.js',
      '/js/CEdge.js',
      '/js/CManageFoods.js',
      '/js/CFood.js',
      '/js/CControlAiSnakes.js',
      '/js/CSubAISnake.js',
      '/js/CManageSections.js',
      '/js/CSection.js',
      '/js/CPause.js',
      '/js/CAreYouSurePanel.js',
      '/js/CBackground.js',
      '/js/CAnimMenu.js',
      '/js/CLogo.js',
      '/js/CAnimHelp.js',
    ];

    const loadAllScripts = async () => {
      try {
        scriptsLoadedRef.current = true;

        for (const script of scripts) {
          await loadScript(script);
        }

        const jquery = (window as any).$;
        if (jquery) {
          const initGame = () => {
            const CMain = (window as any).CMain;
            if (CMain) {
              const oMain = new CMain({
                hero_rotation_speed: 10,
                hero_speed_up: 15,
                hero_speed: 10,
                snakes_AI_speed: [10, 10, 10, 10],
                food_score: [1],
                fullscreen: true,
                check_orientation: true
              });

              jquery(oMain).on("start_session", function (evt: any) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeStartSession?.();
                }
              });

              jquery(oMain).on("end_session", function (evt: any) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeEndSession?.();
                }
              });

              jquery(oMain).on("start_level", function (evt: any, iLevel: number) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeStartLevel?.({level: iLevel});
                }
              });

              jquery(oMain).on("restart_level", function (evt: any, iLevel: number) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeRestartLevel?.({level: iLevel});
                }
              });

              jquery(oMain).on("end_level", function (evt: any, iLevel: number) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeEndLevel?.({level: iLevel});
                }
              });

              jquery(oMain).on("save_score", function (evt: any, iScore: number, szMode: string) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeSaveScore?.({score: iScore, mode: szMode});
                }
              });

              jquery(oMain).on("show_interlevel_ad", function (evt: any) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  (window.parent as any).__ctlArcadeShowInterlevelAD?.();
                }
              });

              jquery(oMain).on("share_event", function (evt: any, iScore: number) {
                if ((window as any).getParamValue && (window as any).getParamValue('ctl-arcade') === "true") {
                  const TEXT_SHARE_IMAGE = (window as any).TEXT_SHARE_IMAGE;
                  const TEXT_SHARE_TITLE = (window as any).TEXT_SHARE_TITLE;
                  const TEXT_SHARE_MSG1 = (window as any).TEXT_SHARE_MSG1;
                  const TEXT_SHARE_MSG2 = (window as any).TEXT_SHARE_MSG2;
                  const TEXT_SHARE_SHARE1 = (window as any).TEXT_SHARE_SHARE1;

                  (window.parent as any).__ctlArcadeShareEvent?.({
                    img: TEXT_SHARE_IMAGE,
                    title: TEXT_SHARE_TITLE,
                    msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                    msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1
                  });
                }
              });

              const isIOS = (window as any).isIOS;
              const sizeHandler = (window as any).sizeHandler;

              if (isIOS && isIOS()) {
                setTimeout(function () {
                  if (sizeHandler) sizeHandler();
                }, 200);
              } else {
                if (sizeHandler) sizeHandler();
              }
            }
          };

          if (document.readyState === 'complete') {
            initGame();
          } else {
            jquery(document).ready(initGame);
          }
        }
      } catch (error) {
        console.error('Error loading game scripts:', error);
      }
    };

    loadAllScripts();

    return () => {
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="ani_hack"
      width="1360"
      height="768"
    />
  );
}
