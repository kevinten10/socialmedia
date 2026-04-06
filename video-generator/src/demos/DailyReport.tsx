import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { GridBackground } from '../components/GridBackground';

export const DailyReport: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFadeOut = interpolate(frame, [150, 180], [1, 0], { extrapolateRight: 'clamp' });
  const metricsFadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ flex: 1, backgroundColor: '#020202', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <GridBackground />
      
      {/* Date & Title */}
      <Sequence layout="none" from={0} durationInFrames={180}>
        <div style={{ 
          position: 'absolute', top: '100px', width: '100%', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', opacity: titleFadeOut 
        }}>
          <FadeUpText text="DAILY SYNC" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '80px', color: '#00f2fe', fontWeight: 'bold', letterSpacing: '8px' }} />
          <FadeUpText delay={15} text={new Date().toISOString().split('T')[0]} style={{ fontFamily: '"Fira Code", monospace', fontSize: '40px', color: '#aaa', marginTop: '20px' }} />
        </div>
      </Sequence>

      {/* Metrics */}
      <Sequence layout="none" from={60} durationInFrames={240}>
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          width: '100%', height: '100%', opacity: metricsFadeOut, position: 'absolute' 
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px', marginTop: '150px' }}>
            <Sequence layout="none" from={0}>
               <AnimatedCounter endValue={12} label="PRs Merged" delay={0} />
            </Sequence>
            <Sequence layout="none" from={15}>
               <AnimatedCounter endValue={3} label="Bugs Fixed" delay={0} />
            </Sequence>
            <Sequence layout="none" from={30}>
               <AnimatedCounter endValue={100} suffix="%" label="Uptime" delay={0} />
            </Sequence>
          </div>
        </div>
      </Sequence>

      {/* Today's Focus */}
      <Sequence layout="none" from={300}>
        <div style={{ 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
          width: '100%', height: '100%', position: 'absolute' 
        }}>
          <FadeUpText text="🎯 TODAY's FOCUS" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#ff003c', fontWeight: 'bold' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '60px', backgroundColor: '#111', padding: '60px', borderRadius: '20px', border: '1px solid #333' }}>
            <FadeUpText delay={20} text="> Refactor Authentication Flow" style={{ fontFamily: '"Fira Code", monospace', fontSize: '36px', color: '#fff' }} />
            <FadeUpText delay={40} text="> Optimize DB Queries (x2 speed)" style={{ fontFamily: '"Fira Code", monospace', fontSize: '36px', color: '#fff' }} />
            <FadeUpText delay={60} text="> Review Q3 Architecture Proposal" style={{ fontFamily: '"Fira Code", monospace', fontSize: '36px', color: '#fff' }} />
          </div>
        </div>
      </Sequence>

    </div>
  );
};
