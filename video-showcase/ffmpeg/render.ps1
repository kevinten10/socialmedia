$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "ffmpeg-pipeline-card.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$font = "fontfile='C\:/Windows/Fonts/arial.ttf':"
$filter = @"
color=c=0x05070d:s=1280x720:d=8:r=30,
format=yuv420p,
drawbox=x=54:y=42:w=1172:h=636:color=0xe2e8f0@0.16:t=2,
drawbox=x=54:y=42:w=1172:h=58:color=0x07111f@0.95:t=fill,
drawtext=${font}text='FFMPEG FILTER GRAPH':x=82:y=61:fontsize=18:fontcolor=0x94a3b8,
drawtext=${font}text='DETERMINISTIC DELIVERY LAYER':x=w-text_w-82:y=61:fontsize=18:fontcolor=0x94a3b8,
drawbox=x='-260+t*230':y=106:w=180:h=520:color=0x38bdf8@0.18:t=fill,
drawtext=${font}text='Batch assembly without a timeline editor':x=82:y=138:fontsize=43:fontcolor=0xf8fafc,
drawtext=${font}text='Captions, stitches, transcodes, social variants':x=82:y=194:fontsize=26:fontcolor=0xc7d2fe,
drawbox=x=82:y=282:w=224:h=128:color=0x07111f@0.9:t=fill,
drawbox=x=82:y=282:w=224:h=128:color=0x2dd4bf@0.62:t=3,
drawtext=${font}text='01 INPUTS':x=106:y=310:fontsize=22:fontcolor=0x2dd4bf,
drawtext=${font}text='clips + captions':x=106:y=351:fontsize=20:fontcolor=0xf8fafc,
drawbox=x=382:y=282:w=224:h=128:color=0x07111f@0.9:t=fill,
drawbox=x=382:y=282:w=224:h=128:color=0x38bdf8@0.62:t=3,
drawtext=${font}text='02 FILTERS':x=406:y=310:fontsize=22:fontcolor=0x38bdf8,
drawtext=${font}text='drawtext + xfade':x=406:y=351:fontsize=20:fontcolor=0xf8fafc,
drawbox=x=682:y=282:w=224:h=128:color=0x07111f@0.9:t=fill,
drawbox=x=682:y=282:w=224:h=128:color=0xf59e0b@0.62:t=3,
drawtext=${font}text='03 ENCODE':x=706:y=310:fontsize=22:fontcolor=0xf59e0b,
drawtext=${font}text='H.264 + faststart':x=706:y=351:fontsize=20:fontcolor=0xf8fafc,
drawbox=x=982:y=282:w=224:h=128:color=0x07111f@0.9:t=fill,
drawbox=x=982:y=282:w=224:h=128:color=0xe2e8f0@0.52:t=3,
drawtext=${font}text='04 PUBLISH':x=1006:y=310:fontsize=22:fontcolor=0xf8fafc,
drawtext=${font}text='ready MP4':x=1006:y=351:fontsize=20:fontcolor=0xf8fafc,
drawbox=x=306:y=344:w=76:h=4:color=0x2dd4bf@0.9:t=fill,
drawbox=x=606:y=344:w=76:h=4:color=0x38bdf8@0.9:t=fill,
drawbox=x=906:y=344:w=76:h=4:color=0xf59e0b@0.9:t=fill,
drawbox=x='82+t*126':y=456:w=62:h=10:color=0x2dd4bf@0.95:t=fill,
drawbox=x='1180-t*114':y=482:w=62:h=10:color=0x38bdf8@0.95:t=fill,
drawbox=x=82:y=548:w=1124:h=1:color=0xe2e8f0@0.22:t=fill,
drawtext=${font}text='strength\: boring reliability for final packaging':x=82:y=577:fontsize=24:fontcolor=0xf59e0b,
fade=t=in:st=0:d=0.35,
fade=t=out:st=7.35:d=0.65
"@

Remove-Item -LiteralPath $output -ErrorAction SilentlyContinue

ffmpeg -hide_banner -loglevel error -y -f lavfi -i $filter -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart $output
if ($LASTEXITCODE -ne 0) {
  throw "FFmpeg render failed with exit code $LASTEXITCODE"
}

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "FFmpeg output is empty: $output"
}

Write-Host "FFmpeg video: $($file.FullName) ($($file.Length) bytes)"
