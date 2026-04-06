import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({
    frame: frame,
    fps,
    config: { damping: 12 },
  });

  // Progress bar logic (0 to 100 over 40 frames)
  const progress = interpolate(frame, [10, 50], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ 
      flex: 1, 
      backgroundColor: '#050505', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      color: '#fff',
      fontFamily: '"Fira Code", monospace'
    }}>
      
      {/* Contact Info container */}
      <div style={{
        transform: `scale(${popIn})`,
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'flex-start',
        backgroundColor: '#111',
        padding: '50px',
        borderRadius: '20px',
        border: '1px solid #333',
        boxShadow: '0 0 50px rgba(0, 242, 254, 0.1)'
      }}>
        
        {/* Website */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '40px' }}>
          <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>[WEB]</span>
          <span>kevinten.com</span>
        </div>

        {/* GitHub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '40px' }}>
          <span style={{ color: '#fff', fontWeight: 'bold' }}>[GIT]</span>
          <span>@kevinten10</span>
        </div>

        {/* Twitter / X */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '40px' }}>
          <span style={{ color: '#1da1f2', fontWeight: 'bold' }}>[ X ]</span>
          <span>@kevinten1024</span>
        </div>

      </div>

      {/* Futuristic Progress Bar */}
      <div style={{
        marginTop: '80px',
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#222',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#00f2fe',
            boxShadow: '0 0 10px #00f2fe'
          }} />
        </div>
        <div style={{ color: '#00f2fe', fontSize: '24px' }}>
          SYSTEM.BOOT: {Math.floor(progress)}%
        </div>
      </div>

    </div>
  );
};
