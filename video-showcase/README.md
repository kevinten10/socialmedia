# Video Generation Showcase

This directory compares code-driven video generation routes around the shared theme:

> AI-Native Social Media Video Pipeline

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

| Route | Video | Duration | Size |
| --- | --- | ---: | ---: |
| Remotion | `outputs/remotion-daily-sync.mp4` | 15.06s | 991,369 bytes |
| HyperFrames | `outputs/hyperframes-pipeline.mp4` | 9.00s | 444,946 bytes |
| FFmpeg | `outputs/ffmpeg-pipeline-card.mp4` | 8.00s | 56,320 bytes |

## Comparison

| Route | Source style | Best at | Tradeoff | Output |
| --- | --- | --- | --- | --- |
| Remotion | React + TypeScript components | Data-driven templates, reusable scenes, existing project fit | Heavier React/render pipeline | `outputs/remotion-daily-sync.mp4` |
| HyperFrames | HTML + CSS + GSAP timeline | Agent-authored clips, captions, web-native motion | Newer ecosystem and stricter composition rules | `outputs/hyperframes-pipeline.mp4` |
| FFmpeg | Filter graph and command-line processing | Batch editing, captions, compositing, transcoding | Lower-level authoring experience | `outputs/ffmpeg-pipeline-card.mp4` |

## Evaluated But Not Used As Required Outputs

| Route | Local status | Decision |
| --- | --- | --- |
| Motion Canvas | Direct `@motion-canvas/cli` lookup was not available from npm in this environment | Good future candidate, but not used for the first runnable showcase |
| Blender Python | `blender` command not available locally | Skipped and documented; use when Blender is installed |
| Manim | Python is available, but Manim requires additional native rendering dependencies | Deferred in favor of FFmpeg for a reliable third output |

## Recommendation

Keep Remotion as the main project route. Add HyperFrames for fast AI-authored HTML/GSAP experiments. Use FFmpeg as the final automation layer for stitching, captions, compression, and delivery variants.
