# KevinTen Promo Video - Remotion Project

This project contains a 60-second, high-quality, cinematic personal promotional video generated entirely using **React** and the **Remotion** framework. 

The core philosophy of this project is **"Video as Code"**—leveraging React components, CSS Grid/Flexbox layouts, and spring physics animations to programmatically render a personalized visual narrative without using traditional video editing software (like Premiere Pro or After Effects).

## 🌟 Project Highlights & Experience

- **Framework:** Remotion v4+ (React 18)
- **Duration:** 60 seconds (1800 frames @ 30 FPS)
- **Resolution:** 1080P Full HD (1920x1080)
- **Architecture Philosophy:** Absolute structural precision. Moving away from absolute positioning and random coordinate scattering, the project relies entirely on robust Web Layouts (`Flexbox` & `CSS Grid`) to prevent component overlapping and ensure deterministic rendering across frames.
- **Physics Engine:** Heavy utilization of Remotion's `spring()` hook for buttery-smooth dampening animations (easing in/out) and `interpolate()` for precise timeline transitions (opacity, scale, matrix transformations).
- **Zero-Dependency Styling:** Pure Inline CSS and dynamic React state. Removed bulky external animation libraries in favor of high-performance rendering.

## 🎬 Cinematic Scenes (The Protocol)

The video is divided into 5 distinct "Scenes", each acting as an isolated React Component orchestrated by the main `Composition.tsx`:

1. **Scene 1 - The Persona (0s - 12s):** Minimalist typography. Fade-up physical text introducing the core architectural philosophy: *"Software should be written once and run anywhere..."*
2. **Scene 2 - The Infrastructure (12s - 26s):** A dual-column Grid matrix showcasing the Cloud-Native tech stack (Microservices, Service Mesh, High-Concurrency handling).
3. **Scene 3 - The Intelligence (26s - 42s):** A side-by-side comparison of **OpenOctopus** (Realm-Native Life Intelligence) and **IKUN-LLM** (Full-Cycle Model Engineering). Features mathematical floating animations and terminal-style bullet points.
4. **Scene 4 - The Impact (42s - 52s):** A massive `AnimatedCounter` component powered by `spring` and `interpolate` to visualize open-source impact (1400+ GitHub Stars, 200M+ Traffic).
5. **Scene 5 - The Legacy (52s - 60s):** High-frequency flash cuts (Flash Cuts) of personal dimensions (Motorcycling, 3D Printing, DJing), resolving into a pristine Glassmorphism contact card.

## 🚀 How to Run & Render

### Prerequisites
- Node.js (v16+)
- FFMPEG (Remotion will automatically try to handle this during render, but having it installed is recommended)

### 1. Install Dependencies
```bash
npm install
```

### 2. Preview in Studio (Hot Reloading)
To watch the video in real-time, adjust timelines, or debug React components, use the Remotion Studio:
```bash
npm start
```
> The studio will open at `http://localhost:3000`. You can scrub through the timeline frame by frame.

### 3. Render Final MP4
To compile the React code into a high-definition MP4 file via Headless Chrome:
```bash
npm run render
```
> Output will be saved to `out.mp4`.

## 🛠️ Key Learnings & Pitfalls
- **The "Ghost Wrapper" Issue:** When using `<Sequence>` in Remotion, it injects an absolute wrapper by default, breaking CSS Grid/Flexbox layouts. **Fix:** Always pass `layout="none"` to inner `<Sequence>` elements to preserve structural integrity.
- **Network Blockers:** Importing external resources (like `@import url('https://fonts.googleapis.com/...');`) can cause Headless Chrome to timeout during rendering (30000ms error). **Fix:** Use local fonts or rely on system fallbacks (`sans-serif`, `monospace`) for guaranteed deterministic rendering.
- **Regex Highlight Dangers:** Building custom code highlighters using string replacement (`dangerouslySetInnerHTML`) can leak HTML tags if the string is sliced mid-tag (e.g., during a Typewriter effect). **Fix:** Render pure strings and use global container styling for hacker themes.
