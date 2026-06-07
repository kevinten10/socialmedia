$ErrorActionPreference = "Stop"

$showcase = Resolve-Path $PSScriptRoot
$outputs = @(
  "remotion-daily-sync.mp4",
  "hyperframes-pipeline.mp4",
  "ffmpeg-pipeline-card.mp4",
  "lottie-pipeline.mp4",
  "manim-pipeline.mp4",
  "social-neon-burst.mp4",
  "social-cinema-launch.mp4",
  "social-hypercut-lab.mp4"
)

foreach ($name in $outputs) {
  $path = Join-Path $showcase "outputs\$name"
  $file = Get-Item -LiteralPath $path -ErrorAction Stop
  if ($file.Length -le 0) {
    throw "Output is empty: $path"
  }
  Write-Host "$name $($file.Length) bytes"
}

$optionalMarkers = @(
  "motion-canvas.skipped.txt",
  "blender.skipped.txt",
  "ai-video.skipped.txt"
)

foreach ($name in $optionalMarkers) {
  $path = Join-Path $showcase "outputs\$name"
  if (Test-Path -LiteralPath $path) {
    $message = Get-Content -LiteralPath $path -Raw
    Write-Host "$name $($message.Trim())"
  }
}
