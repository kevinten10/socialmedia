# Manim Showcase Route

This route renders a 9:16 Manim explainer video.

## What It Demonstrates

- Algorithmic and educational motion.
- Declarative scene construction with Python.
- Strong fit for process explanations, diagrams, math, and technical social clips.

## Render

```powershell
.\video-showcase\manim\render.ps1
```

Output:

```text
video-showcase/outputs/manim-pipeline.mp4
```

## Notes

- The render script creates a local `.venv` and installs `manim==0.20.1`.
- The local venv and Manim media cache are ignored by Git.
