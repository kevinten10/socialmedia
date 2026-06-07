$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "lottie-pipeline.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Push-Location $PSScriptRoot
try {
  npm ci
  npm run render
}
finally {
  Pop-Location
}

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "Lottie output is empty: $output"
}

Write-Host "Lottie video: $($file.FullName) ($($file.Length) bytes)"
