$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "remotion-daily-sync.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Push-Location (Join-Path $root "video-generator")
try {
  npm run typecheck
  npx remotion render src/index.tsx DailyReport $output --codec=h264 --crf=28
}
finally {
  Pop-Location
}

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "Remotion output is empty: $output"
}

Write-Host "Remotion video: $($file.FullName) ($($file.Length) bytes)"
