import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { GridBackground } from '../components/GridBackground';

const techStack = [
  "Microservices", "Apache Dubbo", "LLM Training", "RAG", 
  "Agentic Workflows", "Distributed Systems", "Kubernetes", 
  "Golang", "WebFlux", "Model Context Protocol", "IKUN-LLM", "Dapr"
];

export const Scene2_Journey: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Era transitions (0-150 IoT, 150-300 Cloud, 300+ AI)
  const era1 = interpolate(frame, [0, 30, 90, 120], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const era2 = interpolate(frame, [120, 150, 210, 240], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const era3 = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ 
      flex: 1, backgroundColor: '#020202', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      paddingTop: '150px'
    }}>
      <GridBackground />
      
      {/* 1. Evolution Timeline Banner (Perfectly Centered) */}
      <div style={{
        height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Orbitron", sans-serif', fontSize: '90px', fontWeight: 'bold', textTransform: 'uppercase'
      }}>
        {frame < 120 && (
          <div style={{ opacity: era1, color: '#aaa', textShadow: '0 0 30px rgba(170,170,170,0.5)' }}>[ IoT Era ]</div>
        )}
        {frame >= 120 && frame < 240 && (
          <div style={{ opacity: era2, color: '#4ade80', textShadow: '0 0 30px rgba(74,222,128,0.5)' }}>[ Cloud Native ]</div>
        )}
        {frame >= 240 && (
          <div style={{ opacity: era3, color: '#00f2fe', textShadow: '0 0 30px rgba(0,242,254,0.5)' }}>[ AI Native ]</div>
        )}
      </div>

      {/* 2. Structured Tech Matrix (Flex Layout, No Overlaps) */}
      <Sequence layout="none" from={270}>
        <div style={{ 
          marginTop: '100px', display: 'flex', flexWrap: 'wrap', gap: '30px', 
          justifyContent: 'center', maxWidth: '1600px', zIndex: 10 
        }}>
          {techStack.map((tech, index) => {
            const isAI = tech.includes("LLM") || tech.includes("RAG") || tech.includes("Agent") || tech.includes("Protocol");
            const color = isAI ? '#00f2fe' : '#4ade80'; 
            
            const scale = spring({
              frame: frame - 270 - (index * 3), // Staggered pop-in
              fps,
              config: { damping: 12, stiffness: 120, mass: 0.6 },
            });

            return (
              <div
                key={tech}
                style={{
                  transform: `scale(${scale})`, opacity: scale,
                  color: color, fontFamily: '"Fira Code", monospace',
                  fontSize: isAI ? '45px' : '35px', fontWeight: 'bold',
                  border: `3px solid ${color}`, borderRadius: '15px',
                  padding: '20px 40px', backgroundColor: 'rgba(0,0,0,0.85)',
                  boxShadow: isAI ? `0 0 30px rgba(0,242,254,0.3)` : `0 0 15px rgba(74,222,128,0.1)`,
                  whiteSpace: 'nowrap'
                }}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </Sequence>

    </div>
  );
};
