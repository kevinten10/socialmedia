$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "ffmpeg-pipeline-card.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$filter = @"
color=c=0x101820:s=1280x720:d=8:r=30,
format=yuv420p,
drawbox=x=70:y=70:w=1140:h=580:color=0x20c997@0.25:t=4,
drawtext=text='AI-Native Social Media Video Pipeline':x=(w-text_w)/2:y=115:fontsize=44:fontcolor=white,
drawtext=text='Plan -> Generate -> Render -> Publish':x=(w-text_w)/2:y=235:fontsize=34:fontcolor=0x20c997,
drawtext=text='FFmpeg route - deterministic clips and captions':x=(w-text_w)/2:y=345:fontsize=28:fontcolor=0xf8f9fa,
drawtext=text='Fast batch automation baseline':x=(w-text_w)/2:y=465:fontsize=30:fontcolor=0xffd166,
fade=t=in:st=0:d=0.5,
fade=t=out:st=7.3:d=0.7
"@

ffmpeg -hide_banner -loglevel quiet -y -f lavfi -i $filter -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart $output

$file = Get-Item -LiteralPath $output
if ($file.Length -le 0) {
  throw "FFmpeg output is empty: $output"
}

Write-Host "FFmpeg video: $($file.FullName) ($($file.Length) bytes)"
