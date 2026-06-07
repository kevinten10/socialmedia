$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "manim-pipeline.mp4"
$venv = Join-Path $PSScriptRoot ".venv"
$python = Join-Path $venv "Scripts\python.exe"
$mediaDir = Join-Path $PSScriptRoot "media"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

if (!(Test-Path -LiteralPath $python)) {
  python -m venv $venv
}

& $python -m pip install --upgrade pip setuptools wheel
& $python -m pip install -r (Join-Path $PSScriptRoot "requirements.txt")

Remove-Item -LiteralPath $output -ErrorAction SilentlyContinue

Push-Location $PSScriptRoot
try {
  & $python -m manim render .\pipeline.py ManimPipeline -qk --fps 30 --format=mp4 --media_dir $mediaDir -o manim-pipeline
  if ($LASTEXITCODE -ne 0) {
    throw "Manim render failed with exit code $LASTEXITCODE"
  }
}
finally {
  Pop-Location
}

$candidate = Get-ChildItem -Path $mediaDir -Recurse -Filter "manim-pipeline.mp4" | Select-Object -First 1
if ($null -eq $candidate) {
  throw "Manim output was not found under $mediaDir"
}

Copy-Item -LiteralPath $candidate.FullName -Destination $output -Force

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "Manim output is empty: $output"
}

Write-Host "Manim video: $($file.FullName) ($($file.Length) bytes)"
