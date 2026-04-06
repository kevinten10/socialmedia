import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence } from 'remotion';
import { Typewriter } from '../components/Typewriter';
import { GlitchText } from '../components/GlitchText';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for the title to drop in
  const dropIn = spring({
    frame: frame - 50, // Starts at frame 50
    fps,
    config: { damping: 12, mass: 1, stiffness: 100 },
  });

  return (
    <div style={{ flex: 1, backgroundColor: '#050505', padding: '60px' }}>
      
      {/* Typewriter sequence */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ position: 'absolute', top: '30%', left: '10%' }}>
          <Typewriter text="> whoami" speed={2} style={{ fontSize: '60px', color: '#fff' }} />
          
          <Sequence from={20}>
            <Typewriter text="> KevinTen" speed={2} cursorColor="#00f2fe" style={{ fontSize: '80px', color: '#00f2fe', marginTop: '20px' }} />
          </Sequence>
        </div>
      </Sequence>

      {/* Glitch title dropping in */}
      <Sequence from={50}>
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          transform: `translateY(${50 - dropIn * 50}px)`,
          opacity: dropIn
        }}>
          <GlitchText 
            text="AI-Native Builder · Software Architect" 
            style={{ fontSize: '50px' }}
          />
        </div>
      </Sequence>

    </div>
  );
};
