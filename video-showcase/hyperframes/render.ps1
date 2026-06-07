$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$showcase = Join-Path $root "video-showcase\hyperframes"
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "hyperframes-pipeline.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Push-Location $showcase
try {
  npm ci
  npx hyperframes lint
  npx hyperframes render --output $output --quality draft
}
finally {
  Pop-Location
}

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "HyperFrames output is empty: $output"
}

Write-Host "HyperFrames video: $($file.FullName) ($($file.Length) bytes)"
