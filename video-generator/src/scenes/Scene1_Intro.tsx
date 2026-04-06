import React from 'react';
import { useCurrentFrame, Sequence, interpolate, spring, useVideoConfig } from 'remotion';
import { Typewriter } from '../components/Typewriter';

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opacities for smooth transitions
  const terminalOp = interpolate(frame, [0, 30, 150, 180], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  
  const titleDrop = spring({ frame: frame - 180, fps, config: { damping: 14, stiffness: 100 } });
  const titleOp = interpolate(frame, [180, 210, 330, 360], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ 
      flex: 1, backgroundColor: '#030303', 
      display: 'flex', flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center', 
      padding: '50px' 
    }}>
      
      {/* 1. The Terminal Boot (0 - 180) */}
      <Sequence layout="none" from={0} durationInFrames={180}>
        <div style={{ opacity: terminalOp, display: 'flex', flexDirection: 'column', gap: '20px', width: '800px' }}>
          <Typewriter text="> boot sequence initiated..." speed={1.5} style={{ fontSize: '30px', color: '#666' }} />
          <Sequence layout="none" from={30}>
            <Typewriter text="> whoami" speed={2} style={{ fontSize: '50px', color: '#fff' }} />
          </Sequence>
          <Sequence layout="none" from={60}>
            <Typewriter text="> KevinTen" speed={1.5} cursorColor="#00f2fe" style={{ fontSize: '90px', color: '#00f2fe', fontWeight: 'bold' }} />
          </Sequence>
        </div>
      </Sequence>

      {/* 2. The Identity & Philosophy (180 - 360) */}
      <Sequence layout="none" from={180}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: titleOp, transform: `translateY(${50 - titleDrop * 50}px)`
        }}>
          <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', margin: 0, textAlign: 'center' }}>
            AI-Native Builder <span style={{ color: '#00f2fe' }}>·</span> Software Architect
          </h1>
          
          <Sequence layout="none" from={60}>
             <div style={{
               fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#aaa',
               textAlign: 'left', maxWidth: '1200px', marginTop: '60px', lineHeight: '1.6',
               borderLeft: '4px solid #00f2fe', paddingLeft: '40px'
             }}>
               <Typewriter 
                 text='"Software should be written once and run anywhere—middleware should be invisible, runtimes should collaborate, and agents should think for themselves."' 
                 speed={1.2} cursorColor="#ff003c" 
               />
             </div>
          </Sequence>
        </div>
      </Sequence>

    </div>
  );
};
