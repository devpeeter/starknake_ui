'use client';

import dynamic from 'next/dynamic';

const GameComponent = dynamic(() => import('@/components/Game'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="check-fonts">
        <p className="check-font-1">palamecia_titlingregular</p>
      </div>
      <GameComponent />
      <div data-orientation="landscape" className="orientation-msg-container">
        <p className="orientation-msg-text">Please rotate your device</p>
      </div>
      <div id="block_game" style={{ position: 'fixed', backgroundColor: 'transparent', top: 0, left: 0, width: '100%', height: '100%', display: 'none' }}></div>
    </>
  );
}
