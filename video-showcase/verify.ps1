$ErrorActionPreference = "Stop"

$showcase = Resolve-Path $PSScriptRoot
$outputs = @(
  "remotion-daily-sync.mp4",
  "hyperframes-pipeline.mp4",
  "ffmpeg-pipeline-card.mp4"
)

foreach ($name in $outputs) {
  $path = Join-Path $showcase "outputs\$name"
  $file = Get-Item -LiteralPath $path -ErrorAction Stop
  if ($file.Length -le 0) {
    throw "Output is empty: $path"
  }
  Write-Host "$name $($file.Length) bytes"
}
