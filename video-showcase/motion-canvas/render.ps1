$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$skip = Join-Path $outputDir "motion-canvas.skipped.txt"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Push-Location $PSScriptRoot
try {
  npm ci
  npm run check
}
finally {
  Pop-Location
}

@"
Motion Canvas skipped.

Reason: Motion Canvas 3.17.2 uses the Vite/editor exporter workflow. The npm packages install successfully with Vite 5, but no supported @motion-canvas/cli package exists for this environment, so the route is prepared as source and left for manual/editor export or a future headless exporter.
"@ | Set-Content -LiteralPath $skip -Encoding UTF8

Write-Host "Motion Canvas skipped: $skip"
