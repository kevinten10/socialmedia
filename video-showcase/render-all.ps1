$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "remotion\render.ps1")
& (Join-Path $PSScriptRoot "hyperframes\render.ps1")
& (Join-Path $PSScriptRoot "ffmpeg\render.ps1")
& (Join-Path $PSScriptRoot "verify.ps1")
