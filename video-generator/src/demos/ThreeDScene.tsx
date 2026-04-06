import React from 'react';
import { useCurrentFrame, Sequence } from 'remotion';

export const ThreeDScene: React.FC = () => {
  const frame = useCurrentFrame();

  const rotY = frame * 1.5;
  const rotX = frame * 0.8;

  const CUBE_SIZE = 300;
  const HALF_SIZE = CUBE_SIZE / 2;

  // A CSS 3D Cube built entirely out of DOM elements! No WebGL required!
  const Face = ({ transform, color, children }: any) => (
    <div style={{
      position: 'absolute', width: `${CUBE_SIZE}px`, height: `${CUBE_SIZE}px`,
      border: `4px solid ${color}`, backgroundColor: `${color}11`,
      boxShadow: `inset 0 0 50px ${color}88, 0 0 50px ${color}88`,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      transform, opacity: 0.9, backdropFilter: 'blur(5px)'
    }}>
      {children}
    </div>
  );

  return (
    <div style={{
      flex: 1, backgroundColor: '#020202', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      
      {/* Perspective Container */}
      <div style={{ perspective: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* The 3D Object Space */}
        <div style={{
          width: `${CUBE_SIZE}px`, height: `${CUBE_SIZE}px`,
          transformStyle: 'preserve-3d', position: 'relative',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`
        }}>
           
           <Face color="#00f2fe" transform={`translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#00f2fe', fontFamily: '"Orbitron"' }}>FRONT</span>
           </Face>

           <Face color="#ff0080" transform={`rotateY(180deg) translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#ff0080', fontFamily: '"Orbitron"' }}>BACK</span>
           </Face>

           <Face color="#4ade80" transform={`rotateY(90deg) translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#4ade80', fontFamily: '"Orbitron"' }}>RIGHT</span>
           </Face>

           <Face color="#ffbd2e" transform={`rotateY(-90deg) translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#ffbd2e', fontFamily: '"Orbitron"' }}>LEFT</span>
           </Face>

           <Face color="#a855f7" transform={`rotateX(90deg) translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#a855f7', fontFamily: '"Orbitron"' }}>TOP</span>
           </Face>

           <Face color="#f97316" transform={`rotateX(-90deg) translateZ(${HALF_SIZE}px)`}>
             <span style={{ fontSize: '60px', color: '#f97316', fontFamily: '"Orbitron"' }}>BOTTOM</span>
           </Face>

        </div>

      </div>

      <div style={{ marginTop: '250px', fontFamily: '"Orbitron", sans-serif', fontSize: '60px', color: '#fff', letterSpacing: '10px' }}>
        CSS 3D <span style={{ color: '#00f2fe' }}>ENGINE</span>
      </div>

      <div style={{ marginTop: '20px', fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#666' }}>
        [ Rendering Tesseract without WebGL ]
      </div>

    </div>
  );
};
