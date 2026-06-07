# Motion Canvas Showcase Route

This route contains a Motion Canvas project skeleton for the same 9:16 showcase theme.

## Local Status

Motion Canvas packages are available through npm, but the current official workflow is Vite/editor/exporter based rather than a standalone `@motion-canvas/cli` package. The script therefore installs and validates the project dependencies, writes a skip marker, and does not block `render-all.ps1`.

## Render

```powershell
.\video-showcase\motion-canvas\render.ps1
```

Output when automated rendering is unavailable:

```text
video-showcase/outputs/motion-canvas.skipped.txt
```

## Future Work

Automate the browser exporter flow or add a stable supported headless renderer once Motion Canvas exposes one for this use case.
