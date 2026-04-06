import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface Props {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const FadeUpText: React.FC<Props> = ({ text, delay = 0, style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({ 
    frame: frame - delay, 
    fps, 
    config: { damping: 14, mass: 1, stiffness: 80 } 
  });

  return (
    <div style={{ 
      opacity: progress, 
      transform: `translateY(${(1 - progress) * 40}px)`, 
      ...style 
    }}>
      {text}
    </div>
  );
};
