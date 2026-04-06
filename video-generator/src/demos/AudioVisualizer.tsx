import React from 'react';
import { useCurrentFrame, Sequence, interpolate, spring, useVideoConfig } from 'remotion';

export const AudioVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const BAR_COUNT = 80;

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)',
        opacity: 0.5 + Math.sin(frame/10)*0.2
      }} />

      <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '70px', color: '#fff', letterSpacing: '15px', fontWeight: 'bold' }}>
          NEURAL <span style={{ color: '#ff0080' }}>SPECTRUM</span>
        </div>
        <div style={{ marginTop: '10px', fontFamily: '"Fira Code", monospace', fontSize: '24px', color: '#00f2fe', letterSpacing: '5px' }}>
          SYNTHETIC FREQUENCY ANALYSIS
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '500px' }}>
        {new Array(BAR_COUNT).fill(0).map((_, i) => {
          // Advanced multi-octave synthesis
          const distanceToCenter = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2);
          
          // Base frequency waves
          const lowFreq = Math.sin((frame / 8) + (i * 0.1)) * 80;
          const midFreq = Math.cos((frame / 4) - (i * 0.3)) * 120;
          const highFreq = Math.sin((frame / 2) + (i * 0.8)) * (50 * (1 - distanceToCenter));
          
          // Percussive "Kick" effect
          const kickTrigger = Math.floor(frame / 20);
          const kickPop = spring({ frame: (frame % 20), fps, config: { damping: 10, stiffness: 200 } });
          const kickEffect = kickPop * 150 * Math.exp(-distanceToCenter * 5);
          
          // Sub-bass rumble
          const rumble = Math.random() * 20 * (1 - distanceToCenter);

          const rawHeight = 60 + lowFreq + midFreq + highFreq + kickEffect + rumble;
          const height = Math.max(10, Math.min(rawHeight, 450));

          // Dynamic coloring based on height and position
          const hue = interpolate(i, [0, BAR_COUNT], [180, 320]);
          const color = `hsl(${hue}, 100%, 60%)`;
          const glowColor = `hsl(${hue}, 100%, 50%)`;

          return (
            <div key={i} style={{
              width: '14px',
              height: `${height}px`,
              backgroundColor: color,
              borderRadius: '20px',
              boxShadow: `0 0 ${height / 4}px ${glowColor}`,
              opacity: 0.6 + (height / 600),
              transform: `scaleY(${1 + (kickPop * 0.2)})`
            }} />
          );
        })}
      </div>
      
      <div style={{ marginTop: '100px', padding: '15px 30px', border: '1px solid #333', borderRadius: '10px', backgroundColor: '#111' }}>
        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '22px', color: '#666' }}>
          STATUS: <span style={{ color: '#4ade80' }}>OPERATIONAL</span> // ANALYZING SYNTH_WAVE_01.EXE
        </div>
      </div>

      {/* Floating data bits */}
      {new Array(10).fill(0).map((_, i) => {
        const top = (i * 10) + '%';
        const left = (Math.sin(frame/20 + i) * 50 + 50) + '%';
        return (
          <div key={i} style={{
            position: 'absolute', top, left, color: '#ff0080', fontSize: '14px', 
            fontFamily: 'monospace', opacity: 0.3
          }}>
            {Math.random().toString(16).slice(2, 8).toUpperCase()}
          </div>
        );
      })}

    </div>
  );
};
