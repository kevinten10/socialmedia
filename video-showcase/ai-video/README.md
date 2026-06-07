# AI Video API Showcase Route

This optional route documents where API-backed video generators fit into the stack.

## Supported Environment Variables

- `OPENAI_API_KEY` for OpenAI Videos/Sora-style generation.
- `RUNWAY_API_KEY` for Runway.
- `LUMA_API_KEY` for Luma Dream Machine.

## Render

```powershell
.\video-showcase\ai-video\render.ps1
```

Without keys, the route writes a skipped marker and does not block local rendering.
