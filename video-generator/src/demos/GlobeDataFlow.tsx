import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const GlobeDataFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central Hub (Singapore)
  const hubX = 960;
  const hubY = 540;

  const nodes = [
    { name: "TOKYO", x: 1500, y: 300, color: "#ff0080", delay: 30 },
    { name: "NEW YORK", x: 300, y: 400, color: "#00f2fe", delay: 60 },
    { name: "LONDON", x: 800, y: 200, color: "#4ade80", delay: 90 },
    { name: "SYDNEY", x: 1400, y: 850, color: "#ffbd2e", delay: 120 }
  ];

  const DataFlow = ({ targetX, targetY, color, delay }: any) => {
    // Control point for a nice curve
    const cx = (hubX + targetX) / 2 + (targetY - hubY) * 0.2;
    const cy = (hubY + targetY) / 2 - (targetX - hubX) * 0.2;
    
    const pathD = `M ${hubX} ${hubY} Q ${cx} ${cy} ${targetX} ${targetY}`;
    const pathLength = 1000;

    const drawProgress = spring({ frame: frame - delay, fps, config: { damping: 30, stiffness: 60 } });
    const offset = interpolate(drawProgress, [0, 1], [pathLength, 0]);
    
    // Animate a packet moving along the line repeatedly
    const packetProgress = (frame * 2) % pathLength;

    return (
      <g>
        <path d={pathD} fill="transparent" stroke={color} strokeWidth="2" opacity="0.1" />
        <path 
          d={pathD} 
          fill="transparent" 
          stroke={color} 
          strokeWidth="4" 
          strokeDasharray={pathLength}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        {/* The moving packet */}
        {drawProgress > 0.5 && (
          <circle r="6" fill="#fff">
            <animateMotion 
              path={pathD} 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${delay/fps}s`}
            />
          </circle>
        )}
      </g>
    );
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#020202', position: 'relative', overflow: 'hidden' }}>
      
      {/* Scanning Radar Effect */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: '1200px', height: '1200px',
        transform: 'translate(-50%, -50%)', borderRadius: '50%', border: '1px solid #111',
        background: 'radial-gradient(circle, rgba(0,242,254,0.05) 0%, transparent 70%)'
      }} />

      <div style={{ position: 'absolute', top: '80px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '12px' }}>
          GLOBAL <span style={{ color: '#00f2fe' }}>DATA</span> MESH
        </div>
      </div>

      <svg width="1920" height="1080" style={{ position: 'absolute', top: 0, left: 0 }}>
        
        {/* Hub to Nodes Flows */}
        {nodes.map(node => (
          <DataFlow key={node.name} targetX={node.x} targetY={node.y} color={node.color} delay={node.delay} />
        ))}

        {/* Central Hub */}
        <circle cx={hubX} cy={hubY} r="25" fill="#fff" style={{ filter: 'drop-shadow(0 0 30px #fff)' }} />
        <circle cx={hubX} cy={hubY} r={30 + Math.sin(frame/10)*10} fill="transparent" stroke="#fff" strokeWidth="2" opacity="0.3" />
        <text x={hubX - 80} y={hubY + 60} fill="#fff" fontSize="24" fontFamily='"Fira Code", monospace' fontWeight="bold">[ SINGAPORE HUB ]</text>

        {/* Nodes */}
        {nodes.map(node => {
          const pop = spring({ frame: frame - node.delay - 40, fps, config: { damping: 10 } });
          return (
            <g key={node.name} style={{ opacity: pop }}>
              <circle cx={node.x} cy={node.y} r={12 * pop} fill={node.color} style={{ filter: `drop-shadow(0 0 15px ${node.color})` }} />
              <text x={node.x + 20} y={node.y + 10} fill={node.color} fontSize="22" fontFamily='"Fira Code", monospace' fontWeight="bold">
                {node.name}
              </text>
            </g>
          );
        })}

      </svg>
      
      <div style={{ position: 'absolute', bottom: '80px', width: '100%', textAlign: 'center', fontFamily: '"Fira Code", monospace', fontSize: '28px', color: '#444' }}>
        [ Hub-and-Spoke Telemetry // Real-time Packet Simulation ]
      </div>

    </div>
  );
};
