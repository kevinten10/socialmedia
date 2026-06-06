# Video Generation Showcase

This directory compares code-driven video generation routes around the shared theme:

> AI-Native Social Media Video Pipeline

The current showcase is optimized as a 9:16 Shorts-first comparison so the outputs can be reviewed in a social feed-like format instead of a desktop slide format.

Generated videos are written to `video-showcase/outputs/`. The output directory is intentionally ignored by Git except for `.gitkeep`, because rendered MP4 files can be large and are review artifacts rather than source.

## Render Commands

```powershell
.\video-showcase\render-all.ps1
.\video-showcase\remotion\render.ps1
.\video-showcase\hyperframes\render.ps1
.\video-showcase\ffmpeg\render.ps1
.\video-showcase\verify.ps1
```

## Latest Local Outputs

Generated on 2026-06-06:

| Route | Video | Format | Duration | Size |
| --- | --- | --- | ---: | ---: |
| Remotion | `outputs/remotion-daily-sync.mp4` | 1080x1920 | 11.05s | 1,067,539 bytes |
| HyperFrames | `outputs/hyperframes-pipeline.mp4` | 1080x1920 | 10.50s | 1,844,214 bytes |
| FFmpeg | `outputs/ffmpeg-pipeline-card.mp4` | 1080x1920 | 8.50s | 141,813 bytes |

## Optimization Notes

- Remotion now renders a purpose-built vertical `VideoTechShowcase` composition instead of reusing the daily report demo.
- HyperFrames uses a 9:16 Data Drift + Swiss Pulse visual direction with fixed hero-frame layout, GSAP-driven entrances, moving packets, and a stronger HTML-to-video narrative.
- FFmpeg now uses a richer vertical filter graph, explicit font file, moving scan/packet layers, and native exit-code checking so failed renders do not leave stale MP4s behind.
- Key text is kept away from top and bottom social UI zones, with burned-in explanatory captions for mute-friendly review.

## Comparison

| Route | Source style | Best at | Tradeoff | Output |
| --- | --- | --- | --- | --- |
| Remotion | React + TypeScript components | Reusable data templates, controlled animation, existing project fit | Heavier React/render pipeline | `outputs/remotion-daily-sync.mp4` |
| HyperFrames | HTML + CSS + GSAP timeline | Agent-authored clips, captions, web-native motion design | Newer ecosystem and stricter composition rules | `outputs/hyperframes-pipeline.mp4` |
| FFmpeg | Filter graph and command-line processing | Batch editing, captions, compositing, transcoding, packaging | Lower-level authoring experience | `outputs/ffmpeg-pipeline-card.mp4` |

## Evaluated But Not Used As Required Outputs

| Route | Local status | Decision |
| --- | --- | --- |
| Motion Canvas | Direct `@motion-canvas/cli` lookup was not available from npm in this environment | Good future candidate, but not used for the first runnable showcase |
| Blender Python | `blender` command not available locally | Skipped and documented; use when Blender is installed |
| Manim | Python is available, but Manim requires additional native rendering dependencies | Deferred in favor of FFmpeg for a reliable third output |

## Recommendation

Keep Remotion as the main project route. Add HyperFrames for fast AI-authored HTML/GSAP experiments. Use FFmpeg as the final automation layer for stitching, captions, compression, and delivery variants.
