import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, random } from 'remotion';

const techStack = [
  "Cloud-Native",
  "Microservices",
  "Apache Dubbo",
  "LLM Training (IKUN)",
  "RAG",
  "Agentic Workflows",
  "Distributed Systems",
  "Kubernetes",
  "Golang",
  "WebFlux",
  "Model Context Protocol"
];

export const Scene2Tech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <div style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>
      {techStack.map((tech, index) => {
        // Randomly scatter the words around the screen
        const left = random(`left-${index}`) * (width - 400);
        const top = random(`top-${index}`) * (height - 100);
        
        // Stagger their appearances
        const startFrame = index * 5; 
        
        // Pop-in animation
        const scale = spring({
          frame: frame - startFrame,
          fps,
          config: { damping: 10, stiffness: 100, mass: 0.5 },
        });

        // Determine if it's an AI skill (highlighted in cyan)
        const isAI = tech.includes("LLM") || tech.includes("RAG") || tech.includes("Agent") || tech.includes("Protocol");
        const color = isAI ? '#00f2fe' : '#4ade80'; // Matrix green or Neon cyan

        return (
          <div
            key={tech}
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              transform: `scale(${scale})`,
              opacity: scale,
              color: color,
              fontFamily: '"Fira Code", monospace',
              fontSize: isAI ? '60px' : '40px',
              fontWeight: 'bold',
              textShadow: `0 0 15px ${color}`, // Neon glow
              border: `2px solid ${color}`,
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,0.7)'
            }}
          >
            {tech}
          </div>
        );
      })}
    </div>
  );
};
