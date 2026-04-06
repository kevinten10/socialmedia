import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const Scene5_Legacy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opacity transitions
  const opacityIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Hobbies flash cuts (15 frames each)
  const hobbies = [
    { text: "MOTORCYCLING", color: "#ff003c" },
    { text: "3D PRINTING", color: "#4ade80" },
    { text: "DJing", color: "#00f2fe" }
  ];

  // Outro card pop in
  const popIn = spring({ frame: frame - 120, fps, config: { damping: 12, stiffness: 90 } });

  return (
    <div style={{ 
      flex: 1, backgroundColor: '#050505', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      opacity: opacityIn
    }}>
      
      {/* 1. Flash Cuts (0 - 45) */}
      <Sequence layout="none" from={0} durationInFrames={60}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute' }}>
          {hobbies.map((hobby, index) => {
            const start = index * 20;
            return (
              <Sequence layout="none" key={hobby.text} from={start} durationInFrames={20}>
                <div style={{
                  fontFamily: '"Orbitron", sans-serif', fontSize: '150px', fontWeight: '900',
                  color: hobby.color, fontStyle: 'italic', textTransform: 'uppercase',
                  textShadow: `0 0 80px ${hobby.color}`
                }}>
                  {hobby.text}
                </div>
              </Sequence>
            );
          })}
        </div>
      </Sequence>

      {/* 2. Slogan (60 - 120) */}
      <Sequence layout="none" from={60} durationInFrames={60}>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
          width: '100%', height: '100%', position: 'absolute', textAlign: 'center'
        }}>
          <FadeUpText 
            text="Code the System." 
            style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '90px', fontWeight: 'bold', color: '#fff', fontStyle: 'italic' }} 
          />
          <FadeUpText 
            delay={10}
            text="Ride the World." 
            style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '90px', fontWeight: 'bold', color: '#00f2fe', fontStyle: 'italic', marginTop: '20px' }} 
          />
        </div>
      </Sequence>

      {/* 3. The Final Contact Card (120 - 240) */}
      <Sequence layout="none" from={120}>
        <div style={{
          transform: `scale(${popIn})`, opacity: popIn,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%', position: 'absolute'
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start',
            backgroundColor: 'rgba(255,255,255,0.03)', padding: '60px 80px', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.8)', fontFamily: '"Fira Code", monospace'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#888', fontWeight: 'bold' }}>[WEB]</span>
              <span style={{ color: '#fff' }}>kevinten.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#888', fontWeight: 'bold' }}>[GIT]</span>
              <span style={{ color: '#fff' }}>@kevinten10</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#888', fontWeight: 'bold' }}>[ X ]</span>
              <span style={{ color: '#fff' }}>@kevinten1024</span>
            </div>
          </div>
        </div>
      </Sequence>

    </div>
  );
};
