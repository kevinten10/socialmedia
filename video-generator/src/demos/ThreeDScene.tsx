import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const ThreeDScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotY = frame * 1.5;
  const rotX = frame * 0.8;
  const rotZ = frame * 0.4;

  const CUBE_SIZE = 350;
  const HALF_SIZE = CUBE_SIZE / 2;

  // A CSS 3D Wireframe Cube
  const Cube = ({ size, color, speed, opacity, delay = 0 }: any) => {
    const rX = frame * 0.8 * speed + delay;
    const rY = frame * 1.5 * speed + delay;
    const rZ = frame * 0.4 * speed + delay;
    const half = size / 2;

    const Face = ({ transform }: any) => (
      <div style={{
        position: 'absolute', width: `${size}px`, height: `${size}px`,
        border: `2px solid ${color}`, backgroundColor: 'transparent',
        boxShadow: `0 0 20px ${color}44`,
        transform, opacity, transformStyle: 'preserve-3d'
      }} />
    );

    return (
      <div style={{
        width: `${size}px`, height: `${size}px`,
        transformStyle: 'preserve-3d', position: 'absolute',
        transform: `rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`
      }}>
         <Face transform={`translateZ(${half}px)`} />
         <Face transform={`rotateY(180deg) translateZ(${half}px)`} />
         <Face transform={`rotateY(90deg) translateZ(${half}px)`} />
         <Face transform={`rotateY(-90deg) translateZ(${half}px)`} />
         <Face transform={`rotateX(90deg) translateZ(${half}px)`} />
         <Face transform={`rotateX(-90deg) translateZ(${half}px)`} />
      </div>
    );
  };

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      
      {/* Background Particles Simulation */}
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {new Array(30).fill(0).map((_, i) => {
           const x = (i * 137.5) % 100;
           const y = (i * 222.2) % 100;
           const z = interpolate(frame + i * 10, [0, 300], [0, 1000]) % 1000;
           return (
             <div key={i} style={{
               position: 'absolute', left: `${x}%`, top: `${y}%`,
               width: '4px', height: '4px', backgroundColor: '#fff',
               opacity: 0.2, transform: `translateZ(${-z}px)`
             }} />
           );
        })}
      </div>

      {/* Perspective Container */}
      <div style={{ perspective: '1500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Core Layer 1 (Outer) */}
        <Cube size={500} color="#00f2fe" speed={0.5} opacity={0.3} />
        
        {/* Core Layer 2 (Middle) */}
        <Cube size={350} color="#ff0080" speed={-1} opacity={0.6} delay={45} />
        
        {/* Core Layer 3 (Inner) */}
        <Cube size={150} color="#4ade80" speed={2} opacity={0.9} delay={90} />

        {/* Center Glow */}
        <div style={{
          width: '100px', height: '100px', backgroundColor: '#fff',
          borderRadius: '50%', filter: 'blur(40px)', opacity: 0.5 + Math.sin(frame/5)*0.2,
          boxShadow: '0 0 100px #fff'
        }} />

      </div>

      <div style={{ 
        marginTop: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
        zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px 40px', borderRadius: '20px',
        backdropFilter: 'blur(10px)', border: '1px solid #222'
      }}>
        <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '10px' }}>
          QUANTUM <span style={{ color: '#00f2fe' }}>CORE</span>
        </div>
        <div style={{ marginTop: '10px', fontFamily: '"Fira Code", monospace', fontSize: '24px', color: '#666' }}>
          [ Multi-Layered CSS 3D Matrix @ 60 FPS ]
        </div>
      </div>

    </div>
  );
};
