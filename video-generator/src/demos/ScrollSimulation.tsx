import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const ScrollSimulation: React.FC = () => {
  const frame = useCurrentFrame();

  // Simulate a user scrolling down a webpage
  // The scroll value goes from 0 to 1000 over 300 frames
  const scrollY = interpolate(frame, [30, 270], [0, 1000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // As the user scrolls, a center block scales up and changes color
  // Just like Apple's scroll-linked animations
  const blockScale = interpolate(scrollY, [200, 800], [1, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blockOpacity = interpolate(scrollY, [800, 950], [1, 0], { extrapolateRight: 'clamp' });
  
  // Parallax elements
  const parallaxUp = interpolate(scrollY, [0, 1000], [0, -300]);
  const parallaxDown = interpolate(scrollY, [0, 1000], [0, 500]);

  return (
    <div style={{
      flex: 1, backgroundColor: '#050505', position: 'relative', overflow: 'hidden'
    }}>
      
      {/* Scroll Progress Indicator */}
      <div style={{ position: 'absolute', right: '40px', top: '200px', width: '10px', height: '600px', backgroundColor: '#333', borderRadius: '5px' }}>
         <div style={{ width: '10px', height: '100px', backgroundColor: '#00f2fe', borderRadius: '5px', transform: `translateY(${interpolate(scrollY, [0, 1000], [0, 500])}px)` }} />
      </div>

      <div style={{ position: 'absolute', top: '100px', left: '100px', fontFamily: '"Orbitron", sans-serif', fontSize: '50px', color: '#fff' }}>
        SCROLL <span style={{ color: '#00f2fe' }}>DRIVEN</span> UI
      </div>

      {/* Elements moving with simulated scroll */}
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `translateY(${-scrollY}px)` }}>
        
        {/* The target element that reacts to the scroll position */}
        <div style={{ position: 'absolute', top: '800px', transform: `scale(${blockScale})`, opacity: blockOpacity }}>
           <div style={{
             width: '400px', height: '250px', border: '2px solid #00f2fe', backgroundColor: '#111',
             display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px',
             boxShadow: '0 20px 80px rgba(0,242,254,0.2)'
           }}>
             <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#00f2fe' }}>
                ScrollY: {Math.floor(scrollY)}
             </span>
           </div>
        </div>

        {/* Floating Parallax Decorators */}
        <div style={{ position: 'absolute', left: '200px', top: '500px', width: '150px', height: '150px', backgroundColor: '#ff0080', opacity: 0.5, borderRadius: '50%', transform: `translateY(${parallaxUp}px)` }} />
        <div style={{ position: 'absolute', right: '300px', top: '1200px', width: '200px', height: '200px', backgroundColor: '#4ade80', opacity: 0.5, transform: `translateY(${parallaxDown}px) rotate(${scrollY/2}deg)` }} />
        
      </div>
      
      <div style={{ position: 'absolute', bottom: '100px', width: '100%', textAlign: 'center', fontFamily: '"Fira Code", monospace', fontSize: '30px', color: '#666' }}>
        [ Mapping Scroll Position to Component State ]
      </div>

    </div>
  );
};
