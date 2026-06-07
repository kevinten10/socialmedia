# Video Generation Showcase

This directory compares code-driven and optional AI-assisted video generation routes around the shared theme:

> AI-Native Social Media Video Pipeline

The showcase is optimized for 9:16 Shorts-first review. Runnable routes target 1080x1920 MP4 output with a clear first-frame hook, feed-safe text placement, and one visual emphasis per technology.

Generated videos are written to `video-showcase/outputs/`. The output directory is intentionally ignored by Git except for `.gitkeep`, because rendered MP4 files, frame captures, and skipped markers are review artifacts rather than source.

## Render Commands

```powershell
.\video-showcase\render-all.ps1
.\video-showcase\verify.ps1

.\video-showcase\remotion\render.ps1
.\video-showcase\hyperframes\render.ps1
.\video-showcase\ffmpeg\render.ps1
.\video-showcase\lottie\render.ps1
.\video-showcase\manim\render.ps1
.\video-showcase\motion-canvas\render.ps1
.\video-showcase\blender\render.ps1
.\video-showcase\ai-video\render.ps1
```

`render-all.ps1` runs every route. Optional integrations write a clear `*.skipped.txt` marker when the required local binary, CLI, or API key is unavailable, and they do not block the free local render pipeline.

## Latest Local Outputs

Latest local verification: 2026-06-07.

| Technology route | Local status | Output file | Resolution | Duration | Size | Strength | Limitation | Recommended use |
| --- | --- | --- | --- | ---: | ---: | --- | --- | --- |
| Remotion | Rendered | `outputs/remotion-daily-sync.mp4` | 1080x1920 | 11.05s | 1,067,539 bytes | React templates, typed props, reusable data-driven scenes | Heavier React/render setup | Main product templates and repeatable social formats |
| HyperFrames | Rendered | `outputs/hyperframes-pipeline.mp4` | 1080x1920 | 10.50s | 1,844,214 bytes | HTML/CSS/GSAP authoring with fast motion iteration | Newer ecosystem and stricter video-composition validation | Rapid AI-authored motion prototypes and web-native clips |
| FFmpeg | Rendered | `outputs/ffmpeg-pipeline-card.mp4` | 1080x1920 | 8.50s | 141,813 bytes | Batch processing, captions, compositing, packaging | Lower-level authoring; filter graphs get dense | Delivery automation, stitching, captions, compression variants |
| Lottie/dotLottie | Rendered | `outputs/lottie-pipeline.mp4` | 1080x1920 | 8.50s | 354,769 bytes | Lightweight vector UI motion, small source assets, browser playback | Best for graphic/UI motion rather than full scenes | Reusable app animations, UI explainers, overlay assets |
| Manim | Rendered | `outputs/manim-pipeline.mp4` | 1080x1920 | 8.97s | 725,900 bytes | Python-authored algorithm, process, and math explainers | Slower install/render path and more opinionated typography | Technical education, step-by-step diagrams, explainers |
| Motion Canvas | Skipped locally | `outputs/motion-canvas.skipped.txt` | n/a | n/a | n/a | TypeScript programmatic graphics and timeline scenes | No supported `@motion-canvas/cli` package was available in npm during local integration; source and Vite check are included | Future route when a stable headless/export workflow is available |
| Blender Python | Skipped locally | `outputs/blender.skipped.txt` | n/a | n/a | n/a | 3D scenes, cameras, lighting, product-style shots | Requires local `blender` binary and longer render times | 3D product shots and cinematic inserts |
| AI Video APIs | Skipped locally | `outputs/ai-video.skipped.txt` | n/a | n/a | n/a | Realistic background footage and generative b-roll | Requires paid/limited API keys and provider-specific safety/latency constraints | Optional background or source-footage generation |

## Social Shorts Outputs

These samples are the newer self-media direction: Remotion and HyperFrames are used for primary visuals, while FFmpeg finalizes delivery MP4s. They are intentionally less like capability tables and more like polished 9:16 short-form creative directions.

| Output | Primary renderer | Style | Resolution | Duration | Size |
| --- | --- | --- | --- | ---: | ---: |
| `outputs/social-neon-burst.mp4` | Remotion + FFmpeg | Neon glitch hook, kinetic caption stickers, motion-poster energy | 1080x1920 | 10.00s | 3,637,037 bytes |
| `outputs/social-cinema-launch.mp4` | Remotion + FFmpeg | Cinematic trailer framing, launch-poster typography, premium glow | 1080x1920 | 10.00s | 1,596,036 bytes |
| `outputs/social-hypercut-lab.mp4` | HyperFrames + FFmpeg | HTML/GSAP fast-cut creator workflow with phone-card motion | 1080x1920 | 9.60s | 2,206,980 bytes |

## Route Notes

- Remotion renders a purpose-built vertical `VideoTechShowcase` composition, emphasizing React components, typed data, and reusable social templates.
- HyperFrames uses HTML, CSS, and GSAP animation to show the same pipeline as an energetic web-native motion clip.
- FFmpeg uses a vertical filter graph with explicit font selection, moving scan/packet layers, and native exit-code checking so failed renders do not leave stale MP4s behind.
- Lottie builds a local Lottie JSON animation and captures it through Playwright/Chrome before encoding frames with FFmpeg.
- Manim creates a Python-authored process explainer with scene graph primitives, timeline animation, and a 9:16-safe layout.
- Motion Canvas includes a Vite-backed TypeScript scene scaffold and a render script that validates the local package setup, then skips automated MP4 output until a supported headless exporter is available.
- Blender and AI video routes are optional by design. They document environment variables or binaries and produce skipped markers when unavailable.

## Research References

Official/current references checked while integrating the routes:

- Remotion documentation: https://www.remotion.dev/docs/
- HyperFrames CLI and composition workflow: https://docs.hyperframes.ai/
- FFmpeg documentation: https://ffmpeg.org/documentation.html
- Motion Canvas rendering/export docs: https://motioncanvas.io/docs/rendering/
- Manim Community install and render docs: https://docs.manim.community/en/stable/installation.html
- Lottie format and dotLottie web renderer docs: https://docs.lottiefiles.com/en/format/lottie-json and https://github.com/LottieFiles/dotlottie-web
- Blender command-line rendering: https://docs.blender.org/manual/en/latest/advanced/command_line/render.html
- OpenAI video generation guide: https://platform.openai.com/docs/guides/video-generation
- Runway API docs: https://docs.dev.runwayml.com/api/
- Luma video generation docs: https://docs.lumalabs.ai/docs/video-generation

## Recommendation

Keep Remotion as the main project route for reusable production templates. Use HyperFrames for quick HTML/GSAP experiments, FFmpeg as the delivery automation layer, Lottie for lightweight reusable UI motion, and Manim for explainers. Treat Motion Canvas, Blender, and AI video APIs as optional expansion routes until their local exporter, binary, or API-key requirements are available.
