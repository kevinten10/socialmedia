import React from 'react';
import { useCurrentFrame } from 'remotion';

export const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Create a moving grid effect by translating the background position
  const speed = 2;
  const backgroundPositionY = (frame * speed) % 100;

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#020202',
      backgroundImage: `
        linear-gradient(rgba(0, 242, 254, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px',
      backgroundPosition: `0px ${backgroundPositionY}px`,
      transform: 'perspective(500px) rotateX(60deg) scale(2)',
      transformOrigin: 'top center',
      opacity: 0.6,
      zIndex: 0
    }} />
  );
};
