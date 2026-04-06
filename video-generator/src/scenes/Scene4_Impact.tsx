import React from 'react';
import { useCurrentFrame, Sequence } from 'remotion';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const Scene4_Impact: React.FC = () => {
  return (
    <div style={{ 
      flex: 1, backgroundColor: '#020202', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      padding: '50px' 
    }}>
      <h2 style={{
        fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff',
        marginBottom: '100px', textTransform: 'uppercase', letterSpacing: '5px',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>
        Open Source & Ecosystem Impact
      </h2>
      
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px',
        width: '100%', maxWidth: '1600px'
      }}>
        <Sequence layout="none" from={0}>
          <AnimatedCounter endValue={1400} suffix="+" label="GitHub Stars" delay={10} />
        </Sequence>

        <Sequence layout="none" from={30}>
          <AnimatedCounter endValue={200} suffix="M+" label="High-Concurrency Traffic" delay={0} />
        </Sequence>

        <Sequence layout="none" from={60}>
          <AnimatedCounter endValue={20} suffix="+" label="AI Agents Built" delay={0} />
        </Sequence>
      </div>
    </div>
  );
};
