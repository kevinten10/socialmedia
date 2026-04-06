import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const ProjectCollaboration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Card = ({ title, tag, color, startX, endX, delayMove, delayPop }: any) => {
    const pop = spring({ frame: frame - delayPop, fps, config: { damping: 12 } });
    
    // Animate card moving across the board
    const moveX = interpolate(frame - delayMove, [0, 40], [startX, endX], { 
      extrapolateLeft: 'clamp', 
      extrapolateRight: 'clamp' 
    });

    return (
      <div style={{
        position: 'absolute',
        top: '20px',
        left: moveX,
        transform: `scale(${pop})`,
        opacity: pop,
        backgroundColor: '#1e1e1e',
        border: '1px solid #333',
        borderLeft: `4px solid ${color}`,
        borderRadius: '10px',
        padding: '20px',
        width: '350px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '15px'
      }}>
        <div style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>{title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ backgroundColor: color + '33', color: color, padding: '5px 10px', borderRadius: '5px', fontSize: '16px', fontFamily: '"Fira Code", monospace' }}>{tag}</div>
           <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#555', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', color: '#fff' }}>K</div>
        </div>
      </div>
    );
  };

  const Column = ({ title, count, x }: any) => (
    <div style={{
      position: 'absolute', left: x, top: '200px', width: '400px', height: '700px',
      backgroundColor: '#0a0a0a', border: '2px dashed #222', borderRadius: '15px', padding: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '24px', color: '#888', fontWeight: 'bold' }}>{title}</span>
        <span style={{ backgroundColor: '#222', color: '#fff', padding: '2px 10px', borderRadius: '10px', fontSize: '16px' }}>{count}</span>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, backgroundColor: '#020202', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Title */}
      <Sequence layout="none" from={0}>
        <div style={{ position: 'absolute', top: '60px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <FadeUpText text="SPRINT 42 EXECUTION" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '5px' }} />
        </div>
      </Sequence>

      {/* Board Columns */}
      <Sequence layout="none" from={15}>
        <Column title="TODO" count={1} x="300px" />
        <Column title="IN PROGRESS" count={1} x="750px" />
        <Column title="DONE" count={1} x="1200px" />
      </Sequence>

      {/* Cards & Movements */}
      <Sequence layout="none" from={30}>
        {/* Card 1: Starts in TODO, moves to IN PROGRESS */}
        <Card title="Migrate Auth to OAuth2" tag="Backend" color="#00f2fe" delayPop={30} startX={325} endX={775} delayMove={60} />
        
        {/* Card 2: Starts in IN PROGRESS, moves to DONE */}
        <div style={{ position: 'absolute', top: '150px' }}>
           <Card title="Fix Payment Gateway Timeout" tag="Bug" color="#ff003c" delayPop={45} startX={775} endX={1225} delayMove={120} />
        </div>
      </Sequence>

      {/* Success Message */}
      <Sequence layout="none" from={210}>
        <div style={{ position: 'absolute', bottom: '60px', width: '100%', display: 'flex', justifyContent: 'center' }}>
           <FadeUpText text="🚀 ALL TASKS SHIPPED ON TIME" style={{ fontFamily: '"Fira Code", monospace', fontSize: '40px', color: '#4ade80', fontWeight: 'bold' }} />
        </div>
      </Sequence>

    </div>
  );
};
