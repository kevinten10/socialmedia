# HyperFrames Showcase Design

## Style Prompt

Data Drift meets Swiss Pulse for an AI-native social media automation pipeline in a 9:16 Shorts-first frame. The video should feel like a technical broadcast package adapted for mobile: dark canvas, strict grid, luminous data paths, large readable text, safe-zone-aware captions, and crisp GSAP choreography that proves HTML can behave like a motion system.

## Colors

- Background: `#05070D`
- Panel: `#07111F`
- Primary text: `#F8FAFC`
- Muted text: `#C7D2FE`
- Teal accent: `#2DD4BF`
- Cyan accent: `#38BDF8`
- Amber accent: `#F59E0B`

## Typography

- Headings: `Inter`, `Arial`, sans-serif
- Data labels: `Consolas`, `Menlo`, monospace

## Motion Rules

- First motion starts after 0.18s.
- Stagger by visual priority: hook, route labels, stream pulses, proof metrics.
- Use varied easing: `expo.out`, `power4.out`, `back.out(1.35)`, and `sine.inOut`.
- Animate transforms and opacity only; keep layout fixed at the hero frame.
- Keep key text inside the center safe area for vertical social UI overlays.

## What NOT to Do

- Do not use generic full-screen blue-purple gradients.
- Do not overlap labels with nodes.
- Do not use random timing or random positions.
- Do not hard-code content outside the 1280x720 canvas.
- Do not center all content in one floating card.
- Do not place critical captions in the bottom 220px or top 120px.
