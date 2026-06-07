$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$skip = Join-Path $outputDir "ai-video.skipped.txt"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$available = @()
if ($env:OPENAI_API_KEY) { $available += "OPENAI_API_KEY" }
if ($env:RUNWAY_API_KEY) { $available += "RUNWAY_API_KEY" }
if ($env:LUMA_API_KEY) { $available += "LUMA_API_KEY" }

if ($available.Count -eq 0) {
  "AI video APIs skipped. Reason: OPENAI_API_KEY, RUNWAY_API_KEY, and LUMA_API_KEY are not set." | Set-Content -LiteralPath $skip -Encoding UTF8
  Write-Host "AI video APIs skipped: $skip"
  exit 0
}

"AI video API keys detected ($($available -join ', ')), but paid generation is intentionally not executed by the local showcase script." | Set-Content -LiteralPath $skip -Encoding UTF8
Write-Host "AI video APIs skipped: $skip"
