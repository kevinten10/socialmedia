$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$outputDir = Join-Path $root "video-showcase\outputs"
$output = Join-Path $outputDir "ffmpeg-pipeline-card.mp4"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$font = "fontfile='C\:/Windows/Fonts/arial.ttf':"
$filter = @"
color=c=0x05070d:s=1080x1920:d=8.5:r=30,
format=yuv420p,
drawbox=x=60:y=70:w=960:h=1780:color=0xe2e8f0@0.16:t=2,
drawbox=x=60:y=70:w=960:h=88:color=0x07111f@0.95:t=fill,
drawtext=${font}text='FFMPEG':x=90:y=98:fontsize=28:fontcolor=0x94a3b8,
drawtext=${font}text='9\:16 DELIVERY LAYER':x=w-text_w-90:y=98:fontsize=28:fontcolor=0x94a3b8,
drawbox=x=0:y='-330+t*280':w=1080:h=260:color=0x38bdf8@0.16:t=fill,
drawtext=${font}text='Batch assembly':x=90:y=250:fontsize=76:fontcolor=0xf8fafc,
drawtext=${font}text='without a timeline editor':x=90:y=338:fontsize=56:fontcolor=0xf8fafc,
drawtext=${font}text='Captions, stitches, transcodes, social variants':x=90:y=432:fontsize=34:fontcolor=0xc7d2fe,
drawbox=x=104:y=616:w=872:h=182:color=0x07111f@0.92:t=fill,
drawbox=x=104:y=616:w=872:h=182:color=0x2dd4bf@0.72:t=4,
drawtext=${font}text='01 INPUTS':x=144:y=655:fontsize=36:fontcolor=0x2dd4bf,
drawtext=${font}text='clips + captions + sizes':x=144:y=715:fontsize=34:fontcolor=0xf8fafc,
drawbox=x=104:y=866:w=872:h=182:color=0x07111f@0.92:t=fill,
drawbox=x=104:y=866:w=872:h=182:color=0x38bdf8@0.72:t=4,
drawtext=${font}text='02 FILTERS':x=144:y=905:fontsize=36:fontcolor=0x38bdf8,
drawtext=${font}text='drawtext + boxes + fades':x=144:y=965:fontsize=34:fontcolor=0xf8fafc,
drawbox=x=104:y=1116:w=872:h=182:color=0x07111f@0.92:t=fill,
drawbox=x=104:y=1116:w=872:h=182:color=0xf59e0b@0.72:t=4,
drawtext=${font}text='03 ENCODE':x=144:y=1155:fontsize=36:fontcolor=0xf59e0b,
drawtext=${font}text='H.264 + faststart MP4':x=144:y=1215:fontsize=34:fontcolor=0xf8fafc,
drawbox=x=104:y=1366:w=872:h=182:color=0x07111f@0.92:t=fill,
drawbox=x=104:y=1366:w=872:h=182:color=0xe2e8f0@0.55:t=4,
drawtext=${font}text='04 PUBLISH':x=144:y=1405:fontsize=36:fontcolor=0xf8fafc,
drawtext=${font}text='one command, repeatable output':x=144:y=1465:fontsize=34:fontcolor=0xf8fafc,
drawbox=x=160:y='760+t*82':w=24:h=24:color=0x2dd4bf@0.95:t=fill,
drawbox=x=894:y='1510-t*72':w=24:h=24:color=0x38bdf8@0.95:t=fill,
drawbox=x=90:y=1650:w=900:h=2:color=0xe2e8f0@0.22:t=fill,
drawtext=${font}text='Best fit\: packaging and variants':x=90:y=1695:fontsize=38:fontcolor=0xf59e0b,
drawtext=${font}text='Safe-zone aware 9\:16 output':x=(w-text_w)/2:y=1790:fontsize=30:fontcolor=0xc7d2fe,
fade=t=in:st=0:d=0.3,
fade=t=out:st=7.8:d=0.7
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
