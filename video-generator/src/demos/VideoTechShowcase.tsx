import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Route = {
  id: string;
  title: string;
  label: string;
  accent: string;
  x: number;
  y: number;
  width: number;
};

const routes: Route[] = [
  { id: 'R1', title: 'Remotion', label: 'React templates + reusable scenes', accent: '#2dd4bf', x: 142, y: 480, width: 480 },
  { id: 'R2', title: 'HyperFrames', label: 'HTML, CSS, GSAP timeline', accent: '#38bdf8', x: 720, y: 390, width: 520 },
  { id: 'R3', title: 'FFmpeg', label: 'Batch captions, stitches, delivery', accent: '#f59e0b', x: 1328, y: 500, width: 430 },
];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

const fadeWindow = (frame: number, fps: number, start: number, end: number) =>
  interpolate(frame, [start * fps, (start + 0.45) * fps, (end - 0.45) * fps, end * fps], [0, 1, 1, 0], clamp);

const enter = (frame: number, fps: number, start: number, duration = 0.65) =>
  interpolate(frame, [start * fps, (start + duration) * fps], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

const cardStyle: React.CSSProperties = {
  position: 'absolute',
  minHeight: 224,
  padding: '34px 36px',
  border: '1px solid rgba(231, 245, 255, 0.22)',
  background: 'rgba(7, 15, 28, 0.84)',
  boxShadow: '0 28px 90px rgba(0, 0, 0, 0.38)',
  backdropFilter: 'blur(8px)',
};

export const VideoTechShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const seconds = frame / fps;
  const outro = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], clamp);
  const introOpacity = fadeWindow(frame, fps, 0, 3.65);
  const routesOpacity = fadeWindow(frame, fps, 2.75, 8.25);
  const finalOpacity = interpolate(frame, [7.5 * fps, 8.15 * fps], [0, 1], { ...clamp, easing: easeOut }) * outro;
  const scanX = interpolate(frame, [0, durationInFrames], [-360, 2100], clamp);
  const drift = interpolate(frame, [0, durationInFrames], [0, 1], { ...clamp, easing: easeInOut });

  return (
    <AbsoluteFill
      style={{
        background: '#05070d',
        color: '#f8fafc',
        fontFamily: 'Inter, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 18%, rgba(45, 212, 191, 0.22), transparent 26%), radial-gradient(circle at 72% 35%, rgba(56, 189, 248, 0.18), transparent 28%), linear-gradient(135deg, #05070d 0%, #0a1220 58%, #10100a 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage:
            'linear-gradient(rgba(226, 232, 240, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: `translate3d(${drift * -36}px, ${drift * 28}px, 0)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: scanX,
          width: 220,
          background: 'linear-gradient(90deg, transparent, rgba(125, 249, 255, 0.16), transparent)',
          transform: 'skewX(-12deg)',
        }}
      />

      <div style={{ position: 'absolute', left: 90, right: 90, top: 64, height: 42, display: 'flex', justifyContent: 'space-between', color: '#94a3b8', font: '700 24px Consolas, Menlo, monospace' }}>
        <span>SOCIALMEDIA / VIDEO STACK</span>
        <span>2026-06-06</span>
      </div>

      <section
        style={{
          position: 'absolute',
          left: 110,
          top: 178,
          width: 1320,
          opacity: introOpacity,
          transform: `translateY(${(1 - enter(frame, fps, 0.16, 0.8)) * 58}px)`,
        }}
      >
        <div style={{ color: '#2dd4bf', font: '800 30px Consolas, Menlo, monospace', marginBottom: 34 }}>FROM PROMPT TO MP4</div>
        <h1 style={{ margin: 0, fontSize: 124, lineHeight: 0.92, letterSpacing: 0, maxWidth: 1280 }}>
          Three code paths.
          <br />
          One video pipeline.
        </h1>
        <p style={{ margin: '46px 0 0', maxWidth: 940, color: '#cbd5e1', fontSize: 36, lineHeight: 1.28 }}>
          Remotion for reusable templates, HyperFrames for agent-authored HTML motion, FFmpeg for deterministic delivery.
        </p>
      </section>

      <section style={{ position: 'absolute', inset: 0, opacity: routesOpacity }}>
        <div style={{ position: 'absolute', left: 130, top: 164, color: '#f8fafc', fontSize: 56, fontWeight: 800 }}>
          Pick the renderer by job, not by hype.
        </div>
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
          <path d="M382 704 C 560 610, 640 552, 875 525 S 1260 554, 1538 710" fill="none" stroke="rgba(226, 232, 240, 0.18)" strokeWidth="3" />
          <path
            d="M382 704 C 560 610, 640 552, 875 525 S 1260 554, 1538 710"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeDasharray="42 28"
            strokeDashoffset={-frame * 7}
            strokeLinecap="round"
          />
        </svg>

        {routes.map((route, index) => {
          const reveal = enter(frame, fps, 3.05 + index * 0.35, 0.7);
          const pulse = interpolate(frame, [(4 + index * 0.3) * fps, (5.6 + index * 0.3) * fps, (7 + index * 0.3) * fps], [0, 1, 0], clamp);
          return (
            <article
              key={route.id}
              style={{
                ...cardStyle,
                left: route.x,
                top: route.y,
                width: route.width,
                borderColor: `rgba(${route.accent === '#f59e0b' ? '245, 158, 11' : route.accent === '#38bdf8' ? '56, 189, 248' : '45, 212, 191'}, ${0.28 + pulse * 0.5})`,
                transform: `translateY(${(1 - reveal) * 54}px) scale(${0.96 + reveal * 0.04})`,
                opacity: reveal,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span style={{ color: route.accent, font: '800 28px Consolas, Menlo, monospace' }}>{route.id}</span>
                <span style={{ width: 72, height: 6, background: route.accent }} />
              </div>
              <strong style={{ display: 'block', fontSize: 52, lineHeight: 1, marginBottom: 18 }}>{route.title}</strong>
              <p style={{ margin: 0, color: '#dbeafe', fontSize: 25, lineHeight: 1.28 }}>{route.label}</p>
              <div style={{ marginTop: 28, height: 10, background: 'rgba(226, 232, 240, 0.1)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.round((0.52 + pulse * 0.44) * 100)}%`, background: route.accent }} />
              </div>
            </article>
          );
        })}
      </section>

      <section
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 110,
          minHeight: 210,
          padding: '36px 44px',
          borderTop: '1px solid rgba(248, 250, 252, 0.22)',
          opacity: finalOpacity,
          transform: `translateY(${(1 - finalOpacity) * 34}px)`,
        }}
      >
        <div style={{ color: '#f59e0b', font: '800 26px Consolas, Menlo, monospace', marginBottom: 20 }}>RECOMMENDED STACK</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr', gap: 36, alignItems: 'end' }}>
          <strong style={{ fontSize: 68, lineHeight: 1 }}>Remotion core. HyperFrames lab. FFmpeg delivery.</strong>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: 27, lineHeight: 1.28 }}>Keep the durable template engine, add fast HTML experiments, and ship through a boring reliable encoder.</p>
          <div style={{ display: 'grid', gap: 16, font: '800 24px Consolas, Menlo, monospace', color: '#2dd4bf' }}>
            <span>TYPECHECK PASS</span>
            <span>LOCAL RENDER PASS</span>
            <span>OUTPUT VERIFIED</span>
          </div>
        </div>
      </section>
    </AbsoluteFill>
  );
};
