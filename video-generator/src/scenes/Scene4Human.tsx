import React from 'react';
import { useCurrentFrame, Sequence } from 'remotion';

export const Scene4Human: React.FC = () => {
  const frame = useCurrentFrame();

  // Fast flash cuts (each hobby gets 10 frames = 0.33s)
  const hobbies = [
    { text: "MOTORCYCLING", color: "#ff003c" },
    { text: "3D PRINTING", color: "#4ade80" },
    { text: "DJing", color: "#00f2fe" }
  ];

  return (
    <div style={{ 
      flex: 1, 
      backgroundColor: '#111', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      {/* Flash cuts */}
      <Sequence from={0} durationInFrames={30}>
        {hobbies.map((hobby, index) => {
          const start = index * 10;
          return (
            <Sequence key={hobby.text} from={start} durationInFrames={10}>
              <div style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '120px',
                fontWeight: '900',
                color: hobby.color,
                fontStyle: 'italic',
                textTransform: 'uppercase',
                textShadow: `0 0 50px ${hobby.color}`
              }}>
                {hobby.text}
              </div>
            </Sequence>
          );
        })}
      </Sequence>

      {/* Slogan */}
      <Sequence from={30}>
        <div style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '70px',
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          Code the System.<br/>
          <span style={{ color: '#00f2fe' }}>Ride the World.</span>
        </div>
      </Sequence>

    </div>
  );
};
