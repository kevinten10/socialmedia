import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface AnimatedCounterProps {
  endValue: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  endValue, 
  label, 
  suffix = "",
  delay = 0 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for popping up the container
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 100 },
  });

  // Count up over 30 frames
  const count = interpolate(frame - delay, [0, 30], [0, endValue], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity: scale,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 242, 254, 0.1)',
      border: '2px solid #00f2fe',
      borderRadius: '15px',
      padding: '30px 50px',
      boxShadow: '0 0 30px rgba(0,242,254,0.3)',
      fontFamily: '"Orbitron", sans-serif'
    }}>
      <div style={{ fontSize: '80px', color: '#00f2fe', fontWeight: '900', textShadow: '0 0 20px #00f2fe' }}>
        {Math.floor(count)}{suffix}
      </div>
      <div style={{ fontSize: '30px', color: '#fff', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {label}
      </div>
    </div>
  );
};
