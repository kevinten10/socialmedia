import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Sequence, interpolate } from 'remotion';
import { FadeUpText } from '../components/FadeUpText';

export const Scene2_Infrastructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle opacity in and out
  const opacityIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneFadeOut = interpolate(frame, [390, 420], [1, 0], { extrapolateRight: 'clamp' });

  // Grid item animation
  const infraItems = [
    { title: "Distributed Systems", desc: "Building scalable and fault-tolerant architecture." },
    { title: "Cloud-Native", desc: "Kubernetes, Service Mesh (Envoy)." },
    { title: "Multi-runtime", desc: "Dapr, Layotto, WebAssembly." },
    { title: "High-Concurrency", desc: "Handling 200M+ traffic, Message Hubs, API Gateways." },
    { title: "Languages", desc: "Java (Spring WebFlux), Go, Python." },
    { title: "Data & Storage", desc: "Kafka, MySQL, Redis, ClickHouse, Elasticsearch." }
  ];

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', opacity: sceneFadeOut * opacityIn,
      padding: '100px', color: '#fff', position: 'relative'
    }}>

      {/* Decorative vertical lines representing 'server racks' or 'connections' */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '1px', height: '100%', backgroundColor: '#111' }} />
      <div style={{ position: 'absolute', top: 0, right: '20%', width: '1px', height: '100%', backgroundColor: '#111' }} />
      
      {/* Title */}
      <Sequence layout="none" from={0} durationInFrames={420}>
        <div style={{ textAlign: 'center', marginBottom: '80px', zIndex: 10 }}>
          <FadeUpText 
            text="I. THE INFRASTRUCTURE" 
            style={{ 
              fontFamily: '"Orbitron", sans-serif', fontSize: '60px', fontWeight: '900',
              letterSpacing: '10px', color: '#888', textTransform: 'uppercase'
            }} 
          />
          <div style={{ width: '100px', height: '4px', backgroundColor: '#00f2fe', margin: '30px auto 0' }} />
        </div>
      </Sequence>

      {/* Matrix of Skills */}
      <Sequence layout="none" from={60}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', width: '100%', maxWidth: '1400px', zIndex: 10
        }}>
          {infraItems.map((item, index) => {
            const delay = index * 10;
            const popIn = spring({ frame: frame - 60 - delay, fps, config: { damping: 14 } });
            return (
              <div 
                key={index} 
                style={{
                  display: 'flex', flexDirection: 'column', gap: '15px', padding: '40px',
                  backgroundColor: '#0a0a0a', border: '1px solid #222', borderRadius: '10px',
                  transform: `translateY(${(1 - popIn) * 30}px)`, opacity: popIn,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '36px', fontWeight: 'bold', color: '#00f2fe' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#888', lineHeight: '1.5' }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </Sequence>

    </div>
  );
};
