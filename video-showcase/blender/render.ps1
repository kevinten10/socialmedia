$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$skip = Join-Path $outputDir "blender.skipped.txt"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$blender = Get-Command blender -ErrorAction SilentlyContinue
if ($null -eq $blender) {
  "Blender skipped. Reason: blender command is not installed on this machine." | Set-Content -LiteralPath $skip -Encoding UTF8
  Write-Host "Blender skipped: $skip"
  exit 0
}

throw "Blender command was found, but the 3D showcase scene has not been implemented yet."
