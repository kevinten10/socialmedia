import React from 'react';
import { useCurrentFrame, Sequence } from 'remotion';

export const AudioVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const BAR_COUNT = 64;

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '50px'
    }}>
      
      <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', marginBottom: '100px', letterSpacing: '10px' }}>
        AUDIO <span style={{ color: '#ff0080' }}>SPECTRUM</span> ENGINE
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '400px' }}>
        {new Array(BAR_COUNT).fill(0).map((_, i) => {
          // Mathematical simulation of an Audio FFT using combined Sine waves
          // This creates a smooth but energetic "beat" effect without a real MP3!
          const wave1 = Math.sin((frame / 4) + (i * 0.2)) * 100;
          const wave2 = Math.sin((frame / 2) + (i * 0.8)) * 50;
          const wave3 = Math.sin((frame / 10) - (i * 0.5)) * 150;
          
          // Add a "kick drum" beat every 30 frames
          const beat = (frame % 30 < 5) ? 100 * Math.sin(i) : 0;
          
          const rawHeight = 50 + wave1 + wave2 + wave3 + beat;
          const height = Math.max(10, Math.min(rawHeight, 400)); // Clamp between 10 and 400

          const isCenter = i > 20 && i < 44;
          const color = isCenter ? '#ff0080' : '#00f2fe';

          return (
            <div key={i} style={{
              width: '18px',
              height: `${height}px`,
              backgroundColor: color,
              borderRadius: '10px',
              boxShadow: `0 0 ${height / 5}px ${color}`,
              opacity: 0.8 + (height / 800)
            }} />
          );
        })}
      </div>
      
      <div style={{ marginTop: '60px', fontFamily: '"Fira Code", monospace', fontSize: '24px', color: '#666' }}>
        [ Mathematical FFT Simulation via Pure Sine Waves ]
      </div>

    </div>
  );
};
