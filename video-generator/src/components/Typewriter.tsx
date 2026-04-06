import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface TypewriterProps {
  text: string;
  speed?: number; // Frames per character
  cursorColor?: string;
  style?: React.CSSProperties;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 3, 
  cursorColor = '#00f2fe',
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate how many characters should be visible
  const charsVisible = Math.floor(
    interpolate(frame, [0, text.length * speed], [0, text.length], {
      extrapolateRight: 'clamp',
    })
  );

  const currentText = text.slice(0, charsVisible);

  // Cursor blinking logic (blinks every 0.5 seconds)
  const showCursor = Math.floor(frame / (fps / 2)) % 2 === 0;

  return (
    <span style={{ 
      fontFamily: '"Fira Code", monospace', 
      display: 'inline',
      ...style
    }}>
      <span>{currentText}</span>
      <span
        style={{
          display: 'inline-block',
          width: '0.6em',
          height: '1em',
          backgroundColor: cursorColor,
          marginLeft: '4px',
          verticalAlign: 'text-bottom',
          opacity: showCursor ? 1 : 0,
          boxShadow: `0 0 10px ${cursorColor}` // Neon glow
        }}
      />
    </span>
  );
};
