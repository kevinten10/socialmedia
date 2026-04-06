import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';

export const Scene5_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hobbies flash cuts (each takes 30 frames, total 90 frames)
  const hobbies = [
    { text: "MOTORCYCLING", color: "#ff003c" },
    { text: "3D PRINTING", color: "#4ade80" },
    { text: "DJing", color: "#00f2fe" }
  ];

  // Slogan fades out at 150
  const sloganOpacity = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: 'clamp' });

  // Outro card pops in at frame 150
  const popIn = spring({ frame: frame - 150, fps, config: { damping: 12, stiffness: 90 } });

  // Progress bar logic (150 to 280)
  const progress = interpolate(frame, [180, 280], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ 
      flex: 1, backgroundColor: '#050505', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
    }}>
      
      {/* 1. Hobbies Flash Cuts (0 - 90) */}
      <Sequence layout="none" from={0} durationInFrames={90}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute' }}>
          {hobbies.map((hobby, index) => {
            const start = index * 30;
            return (
              <Sequence layout="none" key={hobby.text} from={start} durationInFrames={30}>
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

      {/* 2. Slogan (90 - 150) */}
      <Sequence layout="none" from={90} durationInFrames={60}>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute',
          fontFamily: '"Orbitron", sans-serif', fontSize: '90px', fontWeight: 'bold', color: '#fff',
          fontStyle: 'italic', opacity: sloganOpacity, textAlign: 'center'
        }}>
          Code the System.<br/>
          <span style={{ color: '#00f2fe' }}>Ride the World.</span>
        </div>
      </Sequence>

      {/* 3. Outro Contact & Boot Progress (150 - 300) */}
      <Sequence layout="none" from={150}>
        <div style={{
          transform: `scale(${popIn})`, opacity: popIn,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%', position: 'absolute'
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start',
            backgroundColor: '#111', padding: '60px 80px', borderRadius: '20px',
            border: '2px solid #333', boxShadow: '0 0 80px rgba(0, 242, 254, 0.2)',
            fontFamily: '"Fira Code", monospace'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>[WEB]</span>
              <span style={{ color: '#fff' }}>kevinten.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>[GIT]</span>
              <span style={{ color: '#fff' }}>@kevinten10</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '50px' }}>
              <span style={{ color: '#ff003c', fontWeight: 'bold' }}>[ X ]</span>
              <span style={{ color: '#fff' }}>@kevinten1024</span>
            </div>
          </div>

          <div style={{
            marginTop: '100px', width: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
          }}>
            <div style={{ width: '100%', height: '15px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#00f2fe', boxShadow: '0 0 15px #00f2fe' }} />
            </div>
            <div style={{ color: '#00f2fe', fontSize: '30px', fontFamily: '"Fira Code", monospace' }}>
              SYSTEM.BOOT: {Math.floor(progress)}%
            </div>
          </div>
        </div>
      </Sequence>
    </div>
  );
};
