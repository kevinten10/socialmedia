import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { CodeBlock } from '../components/CodeBlock';

const codeSnippet = `import { Agent, Task } from 'openoctopus';

// Define a new independent nerve center
const lifeAgent = new Agent({
  domain: 'LifeIntelligence',
  capabilities: ['Schedule', 'Health', 'Travel']
});

// The agent thinks for itself
await lifeAgent.execute(new Task(
  "Optimize my weekly schedule based on fitness goals."
));

console.log("Octopus tentacle synced successfully.");
`;

export const Scene3_Projects: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Code fades out cleanly at frame 210
  const codeScale = interpolate(frame, [180, 210], [1, 0], { extrapolateRight: 'clamp' });
  const codeOp = interpolate(frame, [180, 210], [1, 0], { extrapolateRight: 'clamp' });

  // Grid slides up from bottom
  const gridY = spring({ frame: frame - 210, fps, config: { damping: 14, stiffness: 90 } });
  
  return (
    <div style={{ 
      flex: 1, backgroundColor: '#050505', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: '50px'
    }}>
      
      {/* 1. Code Writing Simulation (Perfectly Centered) */}
      <Sequence layout="none" from={0}>
        <div style={{ 
          transform: `scale(${codeScale})`, opacity: codeOp, 
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'absolute', width: '100%', height: '100%'
        }}>
           <CodeBlock code={codeSnippet} speed={3} />
        </div>
      </Sequence>

      {/* 2. Flagship Architecture (CSS Grid Dual Column) */}
      <Sequence layout="none" from={210}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
          width: '100%', maxWidth: '1600px', transform: `translateY(${100 - gridY * 100}px)`, opacity: gridY
        }}>
          
          {/* Left: OpenOctopus */}
          <div style={{ 
            backgroundColor: '#111', border: '2px solid #00f2fe', borderRadius: '20px', 
            padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 0 50px rgba(0,242,254,0.1)'
          }}>
             <h2 style={{ 
               fontFamily: '"Orbitron", sans-serif', fontSize: '70px', color: '#00f2fe', margin: 0, textShadow: '0 0 20px #00f2fe'
             }}>OPEN OCTOPUS</h2>
             <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#aaa', textAlign: 'center', marginTop: '30px' }}>
               Realm-Native Life Intelligence System. Every domain has an independent AI nerve center.
             </p>
          </div>

          {/* Right: IKUN-LLM */}
          <div style={{ 
            backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', 
            padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 0 50px rgba(255,0,60,0.1)'
          }}>
             <h2 style={{ 
               fontFamily: '"Orbitron", sans-serif', fontSize: '70px', color: '#ff003c', margin: 0, textShadow: '0 0 20px #ff003c'
             }}>IKUN-LLM</h2>
             <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#aaa', textAlign: 'center', marginTop: '30px' }}>
               From Pre-training to RLHF. Comprehensive Large Language Model deployment architecture.
             </p>
          </div>

        </div>
      </Sequence>

    </div>
  );
};
