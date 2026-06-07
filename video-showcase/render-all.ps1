$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "remotion\render.ps1")
& (Join-Path $PSScriptRoot "hyperframes\render.ps1")
& (Join-Path $PSScriptRoot "ffmpeg\render.ps1")
& (Join-Path $PSScriptRoot "lottie\render.ps1")
& (Join-Path $PSScriptRoot "manim\render.ps1")
& (Join-Path $PSScriptRoot "motion-canvas\render.ps1")
& (Join-Path $PSScriptRoot "blender\render.ps1")
& (Join-Path $PSScriptRoot "ai-video\render.ps1")
& (Join-Path $PSScriptRoot "verify.ps1")
