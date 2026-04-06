import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface CodeBlockProps {
  code: string;
  speed?: number; // Characters per frame
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, speed = 5 }) => {
  const frame = useCurrentFrame();

  const charsVisible = Math.floor(
    interpolate(frame, [0, code.length / speed], [0, code.length], {
      extrapolateRight: 'clamp',
    })
  );

  const currentCode = code.slice(0, charsVisible);

  return (
    <div style={{
      fontFamily: '"Fira Code", monospace',
      fontSize: '24px',
      color: '#00f2fe', // Authentic hacker terminal cyan
      backgroundColor: '#0a0a0a',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 0 50px rgba(0, 242, 254, 0.1)',
      border: '1px solid #333',
      width: '900px',
      height: '550px',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.6'
    }}>
      {/* Window Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
      </div>
      
      <span>{currentCode}</span>
      
      {/* Blinking Cursor */}
      {frame % 15 < 7 && (
        <span style={{ 
          backgroundColor: '#00f2fe', 
          width: '12px', 
          height: '24px', 
          display: 'inline-block', 
          verticalAlign: 'bottom',
          marginLeft: '5px',
          boxShadow: '0 0 10px #00f2fe'
        }} />
      )}
    </div>
  );
};

