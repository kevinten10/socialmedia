import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const GlobeDataFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Create a bezier curve string
  const startX = 300;
  const startY = 800;
  const endX = 1600;
  const endY = 300;
  
  // Control point for the curve
  const cx = 950;
  const cy = 200;

  const pathD = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
  const pathLength = 1500; // Approximated path length

  // Animate the line drawing using strokeDashoffset
  const drawProgress = spring({ frame: frame - 30, fps, config: { damping: 200, mass: 2, stiffness: 50 } });
  const offset = interpolate(drawProgress, [0, 1], [pathLength, 0]);

  // Animate glowing node at the target
  const nodePop = spring({ frame: frame - 100, fps, config: { damping: 10 } });

  return (
    <div style={{ flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ position: 'absolute', top: '100px', fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '10px' }}>
        GLOBAL <span style={{ color: '#00f2fe' }}>TELEMETRY</span>
      </div>

      <svg width="1920" height="1080" style={{ position: 'absolute', top: 0, left: 0 }}>
        
        {/* Faint base line */}
        <path d={pathD} fill="transparent" stroke="#111" strokeWidth="4" />

        {/* Animated glowing line */}
        <path 
          d={pathD} 
          fill="transparent" 
          stroke="#00f2fe" 
          strokeWidth="6" 
          strokeDasharray={pathLength}
          strokeDashoffset={offset}
          style={{ filter: 'drop-shadow(0 0 10px #00f2fe)' }}
        />

        {/* Source Node */}
        <circle cx={startX} cy={startY} r="15" fill="#ff0080" style={{ filter: 'drop-shadow(0 0 20px #ff0080)' }} />
        <text x={startX - 50} y={startY + 50} fill="#fff" fontSize="30" fontFamily='"Fira Code", monospace'>[ TOKYO ]</text>

        {/* Target Node */}
        <circle 
           cx={endX} cy={endY} 
           r={15 * nodePop} 
           fill="#4ade80" 
           style={{ filter: 'drop-shadow(0 0 30px #4ade80)' }} 
        />
        <text x={endX + 30} y={endY} fill="#fff" fontSize="30" fontFamily='"Fira Code", monospace' style={{ opacity: nodePop }}>[ NEW YORK ]</text>

      </svg>
      
      <div style={{ position: 'absolute', bottom: '100px', fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#666' }}>
        [ SVG Path Interpolation & DashOffset Animation ]
      </div>

    </div>
  );
};
