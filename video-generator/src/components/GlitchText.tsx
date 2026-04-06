import React from 'react';
import { useCurrentFrame, random } from 'remotion';

interface GlitchTextProps {
  text: string;
  style?: React.CSSProperties;
  color?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  style = {},
  color = '#ffffff'
}) => {
  const frame = useCurrentFrame();

  // Create random offsets based on the frame
  // This simulates the glitch/RGB split effect
  const isGlitching = random(`glitch-${frame}`) > 0.8; // Glitch 20% of the time
  const offset1 = isGlitching ? random(`offset1-${frame}`) * 10 - 5 : 0;
  const offset2 = isGlitching ? random(`offset2-${frame}`) * 10 - 5 : 0;
  const skew = isGlitching ? random(`skew-${frame}`) * 20 - 10 : 0;

  const baseStyle: React.CSSProperties = {
    fontFamily: '"Orbitron", sans-serif',
    fontWeight: 'bold',
    position: 'relative',
    display: 'inline-block',
    color: color,
    transform: `skewX(${skew}deg)`,
    ...style
  };

  return (
    <div style={baseStyle}>
      {/* Cyan layer */}
      <span style={{
        position: 'absolute',
        top: 0,
        left: `${offset1}px`,
        color: '#00f2fe',
        opacity: isGlitching ? 0.8 : 0,
        zIndex: -1,
        mixBlendMode: 'screen',
      }}>
        {text}
      </span>
      
      {/* Red layer */}
      <span style={{
        position: 'absolute',
        top: 0,
        left: `${offset2}px`,
        color: '#ff003c',
        opacity: isGlitching ? 0.8 : 0,
        zIndex: -2,
        mixBlendMode: 'screen',
      }}>
        {text}
      </span>
      
      {/* Base layer */}
      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
    </div>
  );
};
