# Lottie Showcase Route

This route renders a Lottie JSON vector animation into a 9:16 MP4.

## What It Demonstrates

- Lightweight vector motion as reusable UI/video assets.
- Browser runtime playback through `lottie-web`.
- Deterministic frame capture with Playwright and final MP4 assembly through FFmpeg.

## Render

```powershell
.\video-showcase\lottie\render.ps1
```

Output:

```text
video-showcase/outputs/lottie-pipeline.mp4
```

## Notes

- Chrome is required and is detected from common Windows install paths.
- `node_modules` and captured frames are ignored by Git.
