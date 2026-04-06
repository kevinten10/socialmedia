import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';

export const Scene3Masterpiece: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const missionText = "Design. Execute. Collaborate.";
  
  // Mission scale and fade-out
  const missionScale = spring({
    frame: frame,
    fps,
    config: { damping: 12 },
  });
  
  const missionOpacity = interpolate(frame, [0, 10, 40, 60], [0, 1, 1, 0]);

  // OpenOctopus logo scale and drop-in
  const octopusScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <div style={{ 
      flex: 1, 
      backgroundColor: '#000', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      
      <Sequence from={0} durationInFrames={60}>
        <div style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '70px',
          color: '#fff',
          fontWeight: 'bold',
          opacity: missionOpacity,
          transform: `scale(${missionScale})`
        }}>
          {missionText}
        </div>
      </Sequence>

      <Sequence from={60}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${octopusScale})`
        }}>
          {/* Logo text */}
          <div style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '120px',
            color: '#00f2fe',
            fontWeight: '900',
            textShadow: '0 0 40px rgba(0,242,254,0.6), 0 0 80px rgba(0,242,254,0.4)',
            letterSpacing: '5px'
          }}>
            OPEN
            <span style={{ color: '#fff' }}>OCTOPUS</span>
          </div>
          
          <div style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '35px',
            color: '#aaa',
            marginTop: '20px'
          }}>
            Realm-Native Life Intelligence System
          </div>
        </div>
      </Sequence>

    </div>
  );
};
