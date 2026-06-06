import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Route = {
  title: string;
  subtitle: string;
  accent: string;
  start: number;
};

const routes: Route[] = [
  { title: 'Remotion', subtitle: 'React templates for reusable campaigns', accent: '#2dd4bf', start: 2.15 },
  { title: 'HyperFrames', subtitle: 'HTML scenes with GSAP motion', accent: '#38bdf8', start: 3.15 },
  { title: 'FFmpeg', subtitle: 'Packaging, captions, delivery variants', accent: '#f59e0b', start: 4.15 },
];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

const progress = (frame: number, fps: number, start: number, duration: number) =>
  interpolate(frame, [start * fps, (start + duration) * fps], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

const fadeWindow = (frame: number, fps: number, start: number, end: number) =>
  interpolate(frame, [start * fps, (start + 0.35) * fps, (end - 0.35) * fps, end * fps], [0, 1, 1, 0], clamp);

export const VideoTechShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const finalFade = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], { ...clamp, easing: easeIn });
  const scanY = interpolate(frame, [0, durationInFrames], [-360, height + 360], clamp);
  const hook = fadeWindow(frame, fps, 0, 2.75);
  const stack = fadeWindow(frame, fps, 1.8, 8.55);
  const payoff = interpolate(frame, [7.25 * fps, 8.0 * fps], [0, 1], { ...clamp, easing: easeOut }) * finalFade;

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
            'radial-gradient(circle at 18% 12%, rgba(45, 212, 191, 0.28), transparent 28%), radial-gradient(circle at 76% 42%, rgba(56, 189, 248, 0.22), transparent 32%), linear-gradient(160deg, #05070d 0%, #08111d 58%, #110f07 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.28,
          backgroundImage:
            'linear-gradient(rgba(226, 232, 240, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.09) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          transform: `translate3d(0, ${-t * 18}px, 0)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -120,
          right: -120,
          top: scanY,
          height: 260,
          background: 'linear-gradient(180deg, transparent, rgba(125, 249, 255, 0.16), transparent)',
          transform: 'skewY(-8deg)',
        }}
      />

      <div style={{ position: 'absolute', top: 86, left: 66, right: 66, display: 'flex', justifyContent: 'space-between', color: '#94a3b8', font: '800 22px Consolas, Menlo, monospace' }}>
        <span>SOCIALMEDIA</span>
        <span>SHORTS STACK</span>
      </div>

      <section
        style={{
          position: 'absolute',
          top: 236,
          left: 66,
          right: 66,
          opacity: hook,
          transform: `translateY(${(1 - progress(frame, fps, 0.12, 0.7)) * 70}px)`,
        }}
      >
        <div style={{ color: '#2dd4bf', font: '900 28px Consolas, Menlo, monospace', marginBottom: 28 }}>FIRST FRAME HOOK</div>
        <h1 style={{ margin: 0, fontSize: 112, lineHeight: 0.92, letterSpacing: 0 }}>
          Stop exporting flat demos.
        </h1>
        <p style={{ margin: '34px 0 0', color: '#c7d2fe', fontSize: 39, lineHeight: 1.22 }}>
          Generate social video three ways, then compare what each renderer is actually good at.
        </p>
      </section>

      <section style={{ position: 'absolute', top: 246, left: 66, right: 66, bottom: 360, opacity: stack }}>
        <div style={{ fontSize: 64, lineHeight: 0.96, fontWeight: 900, marginBottom: 44 }}>
          The stack that ships.
        </div>
        <div style={{ position: 'absolute', top: 190, bottom: 20, left: 42, width: 6, background: 'rgba(248, 250, 252, 0.16)' }} />
        <div
          style={{
            position: 'absolute',
            top: 190,
            left: 42,
            width: 6,
            height: `${Math.min(100, Math.max(0, (t - 2.1) * 28))}%`,
            background: 'linear-gradient(#2dd4bf, #38bdf8, #f59e0b)',
          }}
        />
        {routes.map((route, index) => {
          const show = progress(frame, fps, route.start, 0.62);
          const y = 176 + index * 270;
          const pulse = interpolate(frame, [(route.start + 1.0) * fps, (route.start + 2.0) * fps, (route.start + 3.1) * fps], [0, 1, 0], clamp);
          return (
            <article
              key={route.title}
              style={{
                position: 'absolute',
                left: 88,
                right: 0,
                top: y,
                minHeight: 210,
                padding: '34px 34px 32px',
                border: `2px solid ${route.accent}`,
                background: 'rgba(7, 17, 31, 0.88)',
                boxShadow: `0 32px 90px rgba(0, 0, 0, 0.34), 0 0 ${24 + pulse * 30}px ${route.accent}55`,
                opacity: show,
                transform: `translateX(${(1 - show) * 68}px) scale(${0.96 + show * 0.04})`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: route.accent, font: '900 26px Consolas, Menlo, monospace', marginBottom: 20 }}>
                <span>0{index + 1}</span>
                <span>{index === 0 ? 'TEMPLATE' : index === 1 ? 'MOTION' : 'DELIVERY'}</span>
              </div>
              <strong style={{ display: 'block', fontSize: 58, lineHeight: 1 }}>{route.title}</strong>
              <p style={{ margin: '18px 0 0', color: '#dbeafe', fontSize: 30, lineHeight: 1.22 }}>{route.subtitle}</p>
            </article>
          );
        })}
      </section>

      <section
        style={{
          position: 'absolute',
          left: 66,
          right: 66,
          bottom: 156,
          paddingTop: 28,
          borderTop: '2px solid rgba(248, 250, 252, 0.2)',
          opacity: payoff,
          transform: `translateY(${(1 - payoff) * 50}px)`,
        }}
      >
        <div style={{ color: '#f59e0b', font: '900 26px Consolas, Menlo, monospace', marginBottom: 24 }}>PAYOFF</div>
        <strong style={{ display: 'block', fontSize: 62, lineHeight: 0.98 }}>
          Remotion core.
          <br />
          HyperFrames lab.
          <br />
          FFmpeg delivery.
        </strong>
      </section>

      <div
        style={{
          position: 'absolute',
          left: 66,
          right: 66,
          bottom: 64,
          minHeight: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#c7d2fe',
          fontSize: 25,
          textAlign: 'center',
        }}
      >
        9:16 layout, burned-in text, safe-zone aware.
      </div>
    </AbsoluteFill>
  );
};
