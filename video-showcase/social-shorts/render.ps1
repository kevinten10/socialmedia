$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$rawDir = Join-Path $outputDir "social-raw"
$hyperframesDir = Join-Path $PSScriptRoot "hyperframes"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
New-Item -ItemType Directory -Force -Path $rawDir | Out-Null

function Finalize-Video {
  param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath
  )

  ffmpeg -y -i $InputPath `
    -vf "scale=1080:1920:flags=lanczos,format=yuv420p" `
    -c:v libx264 -preset medium -crf 21 -movflags +faststart -an $OutputPath

  $file = Get-Item -LiteralPath $OutputPath
  if ($file.Length -le 0) {
    throw "Final output is empty: $OutputPath"
  }
  Write-Host "Social short: $($file.FullName) ($($file.Length) bytes)"
}

Push-Location (Join-Path $root "video-generator")
try {
  npm run typecheck
  npx remotion render src/index.tsx SocialShortNeon (Join-Path $rawDir "social-neon-burst.raw.mp4") --codec=h264 --crf=24
  npx remotion render src/index.tsx SocialShortCinema (Join-Path $rawDir "social-cinema-launch.raw.mp4") --codec=h264 --crf=24
}
finally {
  Pop-Location
}

Push-Location $hyperframesDir
try {
  npm ci
  npx hyperframes lint
  npx hyperframes render --output (Join-Path $rawDir "social-hypercut-lab.raw.mp4") --quality draft
}
finally {
  Pop-Location
}

Finalize-Video -InputPath (Join-Path $rawDir "social-neon-burst.raw.mp4") -OutputPath (Join-Path $outputDir "social-neon-burst.mp4")
Finalize-Video -InputPath (Join-Path $rawDir "social-cinema-launch.raw.mp4") -OutputPath (Join-Path $outputDir "social-cinema-launch.mp4")
Finalize-Video -InputPath (Join-Path $rawDir "social-hypercut-lab.raw.mp4") -OutputPath (Join-Path $outputDir "social-hypercut-lab.mp4")
