import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {chromium} from 'playwright';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');
const outputDir = path.join(root, 'video-showcase', 'outputs');
const framesDir = path.join(outputDir, 'lottie-frames');
const output = path.join(outputDir, 'lottie-pipeline.mp4');
const animationPath = path.join(__dirname, 'animation.json');
const lottiePath = path.join(__dirname, 'node_modules', 'lottie-web', 'build', 'player', 'lottie.min.js');

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

let executablePath = null;
for (const candidate of chromeCandidates) {
  try {
    await fs.access(candidate);
    executablePath = candidate;
    break;
  } catch {
    // try the next browser path
  }
}

if (!executablePath) {
  throw new Error('Chrome or Edge was not found. Set CHROME_PATH to render the Lottie route.');
}

await fs.rm(framesDir, {recursive: true, force: true});
await fs.mkdir(framesDir, {recursive: true});
await fs.mkdir(outputDir, {recursive: true});
await fs.rm(output, {force: true});

const animationData = JSON.parse(await fs.readFile(animationPath, 'utf8'));
const lottieScript = await fs.readFile(lottiePath, 'utf8');
const fps = 30;
const frames = 255;
const duration = frames / fps;

const browser = await chromium.launch({headless: true, executablePath});
try {
  const page = await browser.newPage({viewport: {width: 1080, height: 1920}, deviceScaleFactor: 1});
  await page.setContent(`<!doctype html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            width: 1080px;
            height: 1920px;
            overflow: hidden;
            background: #05070d;
            color: #f8fafc;
            font-family: Inter, Arial, sans-serif;
          }
          .frame {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 76px 64px 112px;
            background:
              radial-gradient(circle at 16% 15%, rgba(45, 212, 191, 0.25), transparent 28%),
              radial-gradient(circle at 78% 42%, rgba(56, 189, 248, 0.18), transparent 30%),
              linear-gradient(160deg, #05070d 0%, #08111d 62%, #100f07 100%);
          }
          .topbar {
            display: flex;
            justify-content: space-between;
            color: #94a3b8;
            font: 800 22px Consolas, Menlo, monospace;
          }
          .eyebrow {
            margin-top: 132px;
            color: #2dd4bf;
            font: 900 28px Consolas, Menlo, monospace;
          }
          h1 {
            margin: 28px 0 0;
            font-size: 92px;
            line-height: 0.95;
            letter-spacing: 0;
          }
          .copy {
            margin-top: 28px;
            max-width: 850px;
            color: #c7d2fe;
            font-size: 37px;
            line-height: 1.24;
          }
          #lottie {
            position: absolute;
            left: 160px;
            top: 760px;
            width: 760px;
            height: 760px;
            filter: drop-shadow(0 0 34px rgba(56, 189, 248, 0.3));
          }
          .labels {
            position: absolute;
            left: 120px;
            right: 120px;
            top: 782px;
            height: 720px;
            display: grid;
            grid-template-rows: repeat(4, 1fr);
            pointer-events: none;
          }
          .labels span {
            align-self: center;
            justify-self: end;
            min-width: 290px;
            padding: 16px 20px;
            border: 1px solid rgba(248, 250, 252, 0.22);
            background: rgba(7, 17, 31, 0.84);
            color: #f8fafc;
            font-size: 30px;
          }
          .caption {
            position: absolute;
            left: 64px;
            right: 64px;
            bottom: 108px;
            padding-top: 26px;
            border-top: 2px solid rgba(248, 250, 252, 0.2);
            color: #c7d2fe;
            font-size: 31px;
          }
          .caption strong { color: #f59e0b; }
        </style>
      </head>
      <body>
        <div class="frame">
          <div class="topbar"><span>LOTTIE</span><span>VECTOR MOTION</span></div>
          <div class="eyebrow">LIGHTWEIGHT ANIMATION ASSET</div>
          <h1>Ship reusable motion, not heavy footage.</h1>
          <div class="copy">Lottie keeps UI-style motion editable, tiny, and easy to compose into the final video stack.</div>
          <div id="lottie"></div>
          <div class="labels">
            <span>Prompt</span>
            <span>Vector asset</span>
            <span>Runtime playback</span>
            <span>MP4 package</span>
          </div>
          <div class="caption"><strong>Best fit:</strong> reusable UI motion and branded vector assets.</div>
        </div>
        <script>${lottieScript}</script>
        <script>
          const animationData = ${JSON.stringify(animationData)};
          window.animation = lottie.loadAnimation({
            container: document.getElementById('lottie'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData
          });
          window.ready = new Promise(resolve => window.animation.addEventListener('DOMLoaded', resolve));
          window.renderFrame = async frame => {
            await window.ready;
            window.animation.goToAndStop(frame, true);
          };
        </script>
      </body>
    </html>`);

  await page.evaluate(() => window.ready);
  for (let frame = 0; frame < frames; frame += 1) {
    await page.evaluate(nextFrame => window.renderFrame(nextFrame), frame);
    const frameName = `${String(frame + 1).padStart(6, '0')}.png`;
    await page.screenshot({path: path.join(framesDir, frameName)});
  }
} finally {
  await browser.close();
}

await execFileAsync('ffmpeg', [
  '-hide_banner',
  '-loglevel',
  'error',
  '-y',
  '-framerate',
  String(fps),
  '-i',
  path.join(framesDir, '%06d.png'),
  '-t',
  String(duration),
  '-an',
  '-c:v',
  'libx264',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  output,
]);

const stat = await fs.stat(output);
if (stat.size <= 0) {
  throw new Error(`Lottie output is empty: ${output}`);
}

console.log(`Lottie video: ${output} (${stat.size} bytes)`);
