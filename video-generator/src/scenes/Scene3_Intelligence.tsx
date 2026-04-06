import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const Scene3_Intelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opacity transitions
  const opacityIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneFadeOut = interpolate(frame, [450, 480], [1, 0], { extrapolateRight: 'clamp' });

  // Floating animation for the core element
  const floatY = Math.sin(frame / 15) * 10;

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', opacity: sceneFadeOut * opacityIn,
      padding: '100px', color: '#fff', position: 'relative'
    }}>
      
      {/* Title */}
      <Sequence layout="none" from={0} durationInFrames={480}>
        <div style={{ position: 'absolute', top: '100px', textAlign: 'center', zIndex: 10 }}>
          <FadeUpText 
            text="II. THE INTELLIGENCE" 
            style={{ 
              fontFamily: '"Orbitron", sans-serif', fontSize: '60px', fontWeight: '900',
              letterSpacing: '10px', color: '#888', textTransform: 'uppercase'
            }} 
          />
          <div style={{ width: '100px', height: '4px', backgroundColor: '#ff0080', margin: '30px auto 0' }} />
        </div>
      </Sequence>

      <div style={{ 
        display: 'flex', width: '100%', maxWidth: '1600px', justifyContent: 'space-between', 
        alignItems: 'center', marginTop: '100px' 
      }}>
        
        {/* Left Side: OpenOctopus */}
        <Sequence layout="none" from={60}>
          <div style={{ flex: 1, padding: '50px', transform: `translateY(${floatY}px)` }}>
             <FadeUpText delay={0} text="OpenOctopus" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '80px', color: '#ff0080', fontWeight: '900', textShadow: '0 0 40px rgba(255,0,128,0.4)' }} />
             <FadeUpText delay={20} text="Realm-Native Life Intelligence" style={{ fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#fff', marginTop: '20px' }} />
             <FadeUpText delay={40} text="A decentralized architecture where every domain possesses an independent AI nerve center. 20+ specialized Agentic workflows integrated." style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#aaa', lineHeight: '1.6', marginTop: '40px', maxWidth: '600px' }} />
          </div>
        </Sequence>

        {/* Right Side: IKUN-LLM */}
        <Sequence layout="none" from={120}>
          <div style={{ flex: 1, padding: '50px', borderLeft: '1px solid #333' }}>
             <FadeUpText delay={0} text="IKUN-LLM" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '80px', color: '#00f2fe', fontWeight: '900', textShadow: '0 0 40px rgba(0,242,254,0.4)' }} />
             <FadeUpText delay={20} text="Full-Cycle Model Engineering" style={{ fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#fff', marginTop: '20px' }} />
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}>
                {["Tokenization", "Pre-training", "RLHF (DPO / GRPO)", "MCP Integration"].map((step, idx) => {
                  const itemPop = spring({ frame: frame - 120 - 40 - (idx * 10), fps, config: { damping: 14 } });
                  return (
                    <div key={idx} style={{ 
                      fontFamily: '"Fira Code", monospace', fontSize: '24px', color: '#ddd',
                      padding: '15px 25px', backgroundColor: '#111', borderRadius: '8px',
                      borderLeft: '4px solid #00f2fe',
                      opacity: itemPop, transform: `translateX(${(1 - itemPop) * 30}px)`
                    }}>
                      {'> '}{step}
                    </div>
                  );
                })}
             </div>
          </div>
        </Sequence>

      </div>
    </div>
  );
};
