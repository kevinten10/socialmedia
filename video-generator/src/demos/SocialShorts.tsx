import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Variant = 'neon' | 'cinema';

type Props = {
  variant: Variant;
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const p = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

const pulse = (frame: number, at: number, duration = 26) =>
  interpolate(frame, [at, at + duration * 0.45, at + duration], [0, 1, 0], clamp);

const sparks = Array.from({ length: 42 }, (_, index) => ({
  left: (index * 83) % 1080,
  top: (index * 137) % 1920,
  size: 3 + (index % 5) * 1.8,
  delay: index * 4,
  color: index % 3 === 0 ? '#22d3ee' : index % 3 === 1 ? '#f97316' : '#a78bfa',
}));

const cardCopy = ['HOOK FIRST', 'CUT FAST', 'CAPTION PUNCH', 'EXPORT CLEAN'];

const NeonBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const intro = p(frame, 0, 28);
  const second = p(frame, 55, 86);
  const stack = p(frame, 98, 132);
  const payoff = p(frame, 190, 226);
  const outro = interpolate(frame, [durationInFrames - 26, durationInFrames], [1, 0], { ...clamp, easing: easeInOut });
  const shock = pulse(frame, 4, 34) + pulse(frame, 116, 34) * 0.55;

  return (
    <AbsoluteFill style={{ background: '#03020a', color: '#fff', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(155deg, #03020a 0%, #071025 46%, #160711 100%), radial-gradient(circle at 50% 28%, rgba(34, 211, 238, 0.32), transparent 34%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: -220,
          opacity: 0.42,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: `translateY(${-frame * 2.1}px) rotate(${Math.sin(frame / 42) * 1.8}deg)`,
        }}
      />
      {sparks.map((spark) => {
        const travel = ((frame + spark.delay) % 120) / 120;
        return (
          <div
            key={`${spark.left}-${spark.top}`}
            style={{
              position: 'absolute',
              left: spark.left,
              top: spark.top + travel * 460 - 160,
              width: spark.size,
              height: spark.size * 7,
              opacity: 0.2 + (1 - travel) * 0.7,
              background: spark.color,
              boxShadow: `0 0 28px ${spark.color}`,
              transform: `rotate(${25 + (spark.left % 40)}deg)`,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 540 - 680 * intro,
          top: 390 - 420 * intro,
          width: 1360 * intro,
          height: 1360 * intro,
          border: '5px solid rgba(34, 211, 238, 0.78)',
          borderRadius: 999,
          opacity: (1 - intro) * 0.65,
          boxShadow: '0 0 120px rgba(34, 211, 238, 0.75)',
        }}
      />
      <div style={{ position: 'absolute', top: 86, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', color: '#67e8f9', font: '800 23px Consolas, monospace', opacity: outro }}>
        <span>AI SOCIAL ENGINE</span>
        <span>00:{String(Math.floor(frame / 30)).padStart(2, '0')}</span>
      </div>

      <section
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 236,
          opacity: intro * outro,
          transform: `translateY(${(1 - intro) * 80}px) scale(${1 + shock * 0.035})`,
          filter: `drop-shadow(${shock * 12}px 0 0 rgba(34,211,238,.35))`,
        }}
      >
        <p style={{ margin: '0 0 28px', color: '#fb923c', font: '900 30px Consolas, monospace' }}>STOP THE SCROLL</p>
        <h1 style={{ margin: 0, fontSize: 123, lineHeight: 0.86, letterSpacing: 0, fontWeight: 950 }}>
          Your AI clips
          <br />
          look asleep.
        </h1>
      </section>

      <section
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 650,
          opacity: second * outro,
          transform: `translateX(${(1 - second) * -84}px)`,
        }}
      >
        <div style={{ fontSize: 54, lineHeight: 1.02, color: '#dbeafe', fontWeight: 850 }}>
          Build the hook,
          <br />
          not another dashboard.
        </div>
      </section>

      <div style={{ position: 'absolute', left: 64, right: 64, top: 845, height: 650, opacity: stack * outro }}>
        {cardCopy.map((copy, index) => {
          const show = p(frame, 110 + index * 12, 138 + index * 12);
          const spots = [
            { x: 12, y: 18, w: 475, rotate: -7 },
            { x: 410, y: 120, w: 500, rotate: 5 },
            { x: 86, y: 286, w: 575, rotate: -2 },
            { x: 360, y: 430, w: 520, rotate: 8 },
          ];
          const spot = spots[index];
          const accent = index % 2 === 0 ? '#22d3ee' : '#fb923c';
          return (
            <div
              key={copy}
              style={{
                position: 'absolute',
                left: spot.x,
                top: spot.y,
                width: spot.w,
                minHeight: 112,
                padding: '0 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(5, 11, 28, 0.72)',
                border: `2px solid ${accent}`,
                boxShadow: `0 24px 70px rgba(0,0,0,.35), 0 0 38px ${accent}55`,
                opacity: show,
                transform: `translate3d(${(1 - show) * (index % 2 === 0 ? 140 : -140)}px, ${(1 - show) * 40}px, 0) rotate(${spot.rotate + Math.sin(frame / 24 + index) * 1.1}deg) scale(${0.9 + show * 0.1})`,
              }}
            >
              <span style={{ color: accent, font: '900 25px Consolas, monospace' }}>{index === 0 ? 'FIRST' : `0${index + 1}`}</span>
              <strong style={{ fontSize: 38, lineHeight: 1 }}>{copy}</strong>
            </div>
          );
        })}
      </div>

      <section style={{ position: 'absolute', left: 64, right: 64, bottom: 145, opacity: payoff * outro, transform: `translateY(${(1 - payoff) * 70}px)` }}>
        <div style={{ color: '#67e8f9', font: '900 28px Consolas, monospace', marginBottom: 22 }}>MAKE IT FEEL NATIVE</div>
        <strong style={{ display: 'block', fontSize: 76, lineHeight: 0.92 }}>
          3 styles.
          <br />
          1 pipeline.
          <br />
          Zero flat slides.
        </strong>
      </section>
    </AbsoluteFill>
  );
};

const CinemaLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const reveal = p(frame, 8, 54);
  const lens = p(frame, 70, 118);
  const montage = p(frame, 124, 172);
  const close = p(frame, 214, 248);
  const finalFade = interpolate(frame, [durationInFrames - 28, durationInFrames], [1, 0], { ...clamp, easing: easeInOut });
  const sweep = interpolate(frame, [0, durationInFrames], [-460, 2180], clamp);

  return (
    <AbsoluteFill style={{ background: '#050505', color: '#fff', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #050505 0%, #0c0f14 44%, #070504 100%), radial-gradient(circle at 34% 34%, rgba(255, 183, 77, 0.22), transparent 28%)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.22, background: 'repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,255,255,.08) 9px, transparent 10px)' }} />
      <div
        style={{
          position: 'absolute',
          left: -160,
          right: -160,
          top: sweep,
          height: 360,
          background: 'linear-gradient(180deg, transparent, rgba(255, 183, 77, 0.23), transparent)',
          transform: 'skewY(-14deg)',
        }}
      />
      <div style={{ position: 'absolute', top: 72, left: 64, right: 64, color: '#f8d48a', font: '800 22px Consolas, monospace', display: 'flex', justifyContent: 'space-between', opacity: finalFade }}>
        <span>LAUNCH CUT</span>
        <span>9:16 MASTER</span>
      </div>

      <section style={{ position: 'absolute', left: 64, right: 64, top: 232, opacity: reveal * finalFade, transform: `translateY(${(1 - reveal) * 90}px)` }}>
        <div style={{ width: 180, height: 4, background: '#f59e0b', marginBottom: 38, boxShadow: '0 0 40px #f59e0b' }} />
        <h1 style={{ margin: 0, fontSize: 108, lineHeight: 0.88, fontWeight: 950 }}>
          Launch the clip
          <br />
          like a trailer.
        </h1>
        <p style={{ margin: '34px 0 0', color: '#fde68a', fontSize: 34, lineHeight: 1.24 }}>
          Big hook. Fast proof. A final frame that sells the system.
        </p>
      </section>

      <div style={{ position: 'absolute', left: 84, right: 84, top: 738, height: 520, opacity: lens * finalFade }}>
        {[0, 1, 2].map((index) => {
          const local = p(frame, 78 + index * 17, 116 + index * 17);
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                inset: `${index * 58}px ${index * 36}px ${120 - index * 34}px ${index * 36}px`,
                border: '3px solid rgba(251, 191, 36, 0.78)',
                background: `linear-gradient(135deg, rgba(251,191,36,${0.07 + index * 0.04}), rgba(14,165,233,${0.09 + index * 0.03}))`,
                boxShadow: '0 36px 100px rgba(0,0,0,.45), 0 0 60px rgba(251,191,36,.32)',
                opacity: local,
                transform: `translateY(${(1 - local) * 80}px) scale(${0.88 + local * 0.12}) rotate(${(index - 1) * 2.4}deg)`,
              }}
            />
          );
        })}
        <div style={{ position: 'absolute', left: 62, right: 62, top: 168, textAlign: 'center', fontSize: 62, lineHeight: 1.02, fontWeight: 900, color: '#fff' }}>
          Scene engine
          <br />
          for daily drops
        </div>
      </div>

      <section style={{ position: 'absolute', left: 64, right: 64, top: 1248, opacity: montage * finalFade }}>
        <div style={{ color: '#fbbf24', font: '900 25px Consolas, monospace', marginBottom: 18 }}>TRAILER STRUCTURE</div>
        <strong style={{ display: 'block', fontSize: 54, lineHeight: 0.98, marginBottom: 28 }}>
          Impact frame.
          <br />
          Proof montage.
          <br />
          Clean final ask.
        </strong>
        {['ACT I', 'ACT II', 'FINAL'].map((word, index) => {
          const local = p(frame, 132 + index * 10, 152 + index * 10);
          return (
            <div
              key={word}
              style={{
                display: 'inline-flex',
                margin: '0 14px 22px 0',
                padding: '18px 24px',
                border: '2px solid rgba(251,191,36,.45)',
                color: index === 2 ? '#020617' : '#fef3c7',
                background: index === 2 ? '#fbbf24' : 'rgba(251,191,36,.08)',
                fontSize: 27,
                fontWeight: 900,
                opacity: local,
                transform: `translateY(${(1 - local) * 38}px) skewX(-8deg)`,
              }}
            >
              {word}
            </div>
          );
        })}
      </section>

      <section style={{ position: 'absolute', left: 64, right: 64, bottom: 132, opacity: close * finalFade, transform: `scale(${0.94 + close * 0.06})` }}>
        <div style={{ color: '#f59e0b', font: '900 27px Consolas, monospace', marginBottom: 20 }}>FINAL FRAME</div>
        <strong style={{ fontSize: 86, lineHeight: 0.9, display: 'block' }}>
          A system people
          <br />
          actually watch.
        </strong>
      </section>
    </AbsoluteFill>
  );
};

export const SocialShort: React.FC<Props> = ({ variant }) => {
  return variant === 'cinema' ? <CinemaLaunch /> : <NeonBurst />;
};
