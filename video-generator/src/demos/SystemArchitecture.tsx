import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const SystemArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Draw node function
  const Node = ({ title, desc, color, delay, x, y }: any) => {
    const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
    return (
      <div style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        opacity: scale,
        border: `3px solid ${color}`,
        backgroundColor: '#111',
        padding: '30px',
        borderRadius: '15px',
        width: '300px',
        boxShadow: `0 0 40px ${color}44`,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '30px', color: color, fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '18px', color: '#aaa', marginTop: '10px', textAlign: 'center' }}>{desc}</div>
      </div>
    );
  };

  // Draw line function
  const Line = ({ startX, startY, endX, endY, delay }: any) => {
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    const progress = spring({ frame: frame - delay, fps, config: { damping: 20 } });
    
    return (
      <div style={{
        position: 'absolute', left: startX, top: startY,
        width: `${length * progress}px`, height: '4px',
        backgroundColor: '#00f2fe', transformOrigin: '0 0',
        transform: `rotate(${angle}deg)`, boxShadow: '0 0 10px #00f2fe'
      }} />
    );
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#020202', color: '#fff', position: 'relative' }}>
      
      {/* Title */}
      <Sequence layout="none" from={0} durationInFrames={600}>
        <div style={{ position: 'absolute', top: '80px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <FadeUpText text="SYSTEM ARCHITECTURE BLUEPRINT" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '5px' }} />
        </div>
      </Sequence>

      {/* Nodes & Lines */}
      <Sequence layout="none" from={60}>
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
           
           {/* Center */}
           <Node title="API GATEWAY" desc="Kong / Nginx" color="#00f2fe" delay={0} x="800px" y="450px" />
           
           {/* Left */}
           <Node title="CLIENT APP" desc="React / React Native" color="#ff003c" delay={30} x="200px" y="450px" />
           <Line startX={500} startY={500} endX={800} endY={500} delay={60} />

           {/* Top Right */}
           <Node title="AUTH SERVICE" desc="Golang + Redis" color="#4ade80" delay={90} x="1400px" y="250px" />
           <Line startX={1100} startY={480} endX={1400} endY={300} delay={120} />

           {/* Bottom Right */}
           <Node title="ORDER SERVICE" desc="Java + Kafka" color="#ffbd2e" delay={150} x="1400px" y="650px" />
           <Line startX={1100} startY={520} endX={1400} endY={700} delay={180} />

        </div>
      </Sequence>

      {/* Conclusion */}
      <Sequence layout="none" from={250}>
        <div style={{ position: 'absolute', bottom: '80px', width: '100%', display: 'flex', justifyContent: 'center' }}>
           <FadeUpText text="[ Highly Available • Auto-Scaling • Event-Driven ]" style={{ fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#888' }} />
        </div>
      </Sequence>

    </div>
  );
};
