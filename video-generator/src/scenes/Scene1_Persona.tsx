import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const Scene1_Persona: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // A very subtle cinematic zoom on the background
  const zoom = interpolate(frame, [0, 360], [1, 1.1]);
  // The whole scene fades out at the end
  const sceneFadeOut = interpolate(frame, [330, 360], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      flex: 1, backgroundColor: '#050505',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      opacity: sceneFadeOut,
      transform: `scale(${zoom})`,
    }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        
        {/* Name */}
        <Sequence layout="none" from={30}>
          <FadeUpText 
            text="KEVIN TEN" 
            style={{ 
              fontFamily: '"Orbitron", sans-serif', fontSize: '130px', fontWeight: '900', 
              letterSpacing: '15px', color: '#ffffff', textShadow: '0 0 40px rgba(255,255,255,0.2)' 
            }} 
          />
        </Sequence>

        {/* Roles Line */}
        <Sequence layout="none" from={60}>
          <FadeUpText 
            text="Software Architect // AI-Native Builder" 
            style={{ 
              fontFamily: '"Fira Code", monospace', fontSize: '40px', color: '#00f2fe',
              textTransform: 'uppercase', letterSpacing: '4px' 
            }} 
          />
        </Sequence>

        {/* The Core Belief - Clean and centered */}
        <Sequence layout="none" from={120}>
          <div style={{
            marginTop: '80px', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '20px',
            alignItems: 'center', textAlign: 'center', borderTop: '1px solid #333', borderBottom: '1px solid #333',
            padding: '40px 0'
          }}>
            <FadeUpText 
              delay={10}
              text="Software should be written once and run anywhere." 
              style={{ fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#888' }} 
            />
            <FadeUpText 
              delay={30}
              text="Middleware should be invisible." 
              style={{ fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#aaa' }} 
            />
            <FadeUpText 
              delay={50}
              text="Runtimes must collaborate." 
              style={{ fontFamily: '"Fira Code", monospace', fontSize: '32px', color: '#ccc' }} 
            />
            <FadeUpText 
              delay={70}
              text="And Agents must think for themselves." 
              style={{ fontFamily: '"Fira Code", monospace', fontSize: '36px', color: '#fff', fontWeight: 'bold' }} 
            />
          </div>
        </Sequence>
        
      </div>
    </div>
  );
};
