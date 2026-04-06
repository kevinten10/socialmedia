import React from 'react';
import { useCurrentFrame, Sequence, interpolate } from 'remotion';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { FadeUpText } from '../components/FadeUpText';

export const Scene4_Metrics: React.FC = () => {
  const frame = useCurrentFrame();

  const opacityIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneFadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ 
      flex: 1, backgroundColor: '#020202', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      opacity: opacityIn * sceneFadeOut, padding: '50px' 
    }}>
      
      {/* Title */}
      <Sequence layout="none" from={0}>
        <div style={{ textAlign: 'center', marginBottom: '120px' }}>
          <FadeUpText 
            text="III. THE IMPACT" 
            style={{ 
              fontFamily: '"Orbitron", sans-serif', fontSize: '60px', fontWeight: '900',
              letterSpacing: '10px', color: '#888', textTransform: 'uppercase'
            }} 
          />
          <div style={{ width: '100px', height: '4px', backgroundColor: '#fff', margin: '30px auto 0' }} />
        </div>
      </Sequence>
      
      {/* Metrics Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '80px',
        width: '100%', maxWidth: '1600px'
      }}>
        <Sequence layout="none" from={40}>
          <AnimatedCounter endValue={1400} suffix="+" label="GitHub Stars" />
        </Sequence>

        <Sequence layout="none" from={60}>
          <AnimatedCounter endValue={200} suffix="M+" label="API Traffic" />
        </Sequence>

        <Sequence layout="none" from={80}>
          <AnimatedCounter endValue={20} suffix="+" label="AI Agents Built" />
        </Sequence>
      </div>

    </div>
  );
};
