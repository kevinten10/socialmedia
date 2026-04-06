import React from 'react';
import { Sequence } from 'remotion';

// Import New Cinematic 60s Scenes
import { Scene1_Persona } from './scenes/Scene1_Persona';
import { Scene2_Infrastructure } from './scenes/Scene2_Infrastructure';
import { Scene3_Intelligence } from './scenes/Scene3_Intelligence';
import { Scene4_Metrics } from './scenes/Scene4_Metrics';
import { Scene5_Legacy } from './scenes/Scene5_Legacy';

export const KevinPromoVideo: React.FC = () => {

  // Total Duration: 1800 frames (60 seconds at 30 fps)
  // Scene 1 (Persona): 0 - 360 (12s)
  // Scene 2 (Infrastructure): 360 - 780 (14s)
  // Scene 3 (Intelligence): 780 - 1260 (16s)
  // Scene 4 (Metrics): 1260 - 1560 (10s)
  // Scene 5 (Legacy): 1560 - 1800 (8s)

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; background-color: #000; overflow: hidden; }
        `}
      </style>

      <div style={{ flex: 1, backgroundColor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        
        {/* 1. Identity & Philosophy */}
        <Sequence layout="none" from={0} durationInFrames={360}>
          <Scene1_Persona />
        </Sequence>

        {/* 2. Architecture & Cloud Native Matrix */}
        <Sequence layout="none" from={360} durationInFrames={420}>
          <Scene2_Infrastructure />
        </Sequence>

        {/* 3. OpenOctopus & IKUN-LLM */}
        <Sequence layout="none" from={780} durationInFrames={480}>
          <Scene3_Intelligence />
        </Sequence>

        {/* 4. Open Source Impact */}
        <Sequence layout="none" from={1260} durationInFrames={300}>
          <Scene4_Metrics />
        </Sequence>

        {/* 5. Human Side & Outro */}
        <Sequence layout="none" from={1560} durationInFrames={240}>
          <Scene5_Legacy />
        </Sequence>
        
      </div>
    </>
  );
};
