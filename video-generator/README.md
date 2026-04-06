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

## 🎬 Cinematic Scenes & Advanced Demos

### Main Composition (`KevinPromo`)
The primary 60s video divided into 5 distinct "Scenes":
1. **Scene 1 - The Persona:** Minimalist typography. 
2. **Scene 2 - The Infrastructure:** Dual-column Grid matrix.
3. **Scene 3 - The Intelligence:** Side-by-side comparison of **OpenOctopus** and **IKUN-LLM**.
4. **Scene 4 - The Impact:** Massive `AnimatedCounter` powered by `spring`.
5. **Scene 5 - The Legacy:** High-frequency flash cuts and Glassmorphism contact card.

### High-End Visual Demos (`src/demos`)
Standalone compositions demonstrating advanced Remotion techniques:

- **🌍 Global Data Mesh:** Hub-and-Spoke telemetry simulation with SVG `animateMotion`.
- **🧊 Quantum Core:** Multi-layered, nested CSS 3D wireframe cubes with opposing rotations.
- **🎛️ Neural Spectrum:** Synthetic multi-octave frequency visualizer with percussive feedback.
- **📊 Daily Sync:** Automated CI/CD report with strict Grid constraints.
- **🕸️ System Architecture:** Dynamic blueprint with calculated line rendering.
- **🎯 Project Collaboration:** Sprint execution board with simulated card drag-and-drop.
- **📜 Scroll Driven UI:** Simulation of scroll-linked animations (Apple-style).

## 🚀 How to Run & Render

### 1. Install Dependencies
```bash
npm install
```

### 2. Preview in Studio (Hot Reloading)
```bash
npm start
```

### 3. Render Final MP4
```bash
# Main 60s Promo
npm run render

# Specific Demos
npm run render:globe
npm run render:3d
npm run render:audio
```

---

# 📚 Remotion 核心调研与实战教程 (Video as Code)

本文档沉淀了在构建 60 秒个人宣传片过程中，关于 **Remotion** 框架的深度调研、核心概念解析以及企业级实战避坑指南。

## 一、 什么是 Remotion？
**Remotion** 是一个基于 React 的视频生成框架。它的核心理念是 **“视频即代码 (Video as Code)”**。

## 二、 🚨 实战血泪经验与避坑指南 (Best Practices)

1. **致命的 "幽灵包装器"：** 必须显式添加 `layout="none"` 到 `<Sequence>`，否则布局崩坏。
2. **拒绝 `position: absolute`：** 全局使用 `display: flex` 或 `display: grid` 进行绝对对齐。
3. **远程资源超时：** 必须将字体和图片下载到本地，严禁依赖外链。

## 🔮 三、 未来探索：高阶视觉与技术架构 (Roadmap)

除了目前已实现的 CSS 3D 和 SVG 动画，以下是本项目未来计划引入的高阶视觉探索：

### 1. 🎛️ 实时音频指纹采样 (Audio Reactive Shaders)
- **技术栈:** `@remotion/media-utils` + `GLSL Shaders`
- **目标:** 利用 FFT (快速傅里叶变换) 提取音频实时频率，将其作为 Uniforms 注入到着色器中，实现随音乐节拍实时扭曲、变色的背景粒子流。

### 2. 🧊 深度 3D 场景融合 (Three.js Bridge)
- **技术栈:** `@remotion/three` + `React Three Fiber`
- **目标:** 在视频中嵌入高精度的 3D 模型（如：正在运转的服务器机柜、动态展开的拓扑节点），并利用 Remotion 的时间轴精确控制摄像机轨迹（Fly-through Camera）。

### 3. 🕸️ SVG 路径形态转换 (Path Morphing)
- **技术栈:** `@remotion/paths`
- **目标:** 实现复杂的 SVG 形状平滑过渡。例如：一个简单的“代码括号”图标平滑变形为“大脑”图标，用于象征代码向智能的进化。

### 4. 🧠 动态数据流可视化大屏 (GIS Data Flow)
- **技术栈:** `Canvas API` + `Mapbox Static API`
- **目标:** 结合真实的地理信息坐标，通过 Canvas 绘制具备拖尾特效的全球流量迁徙图，展示分布式系统的物理拓扑。

### 5. 📜 交互式视频文档 (Interactive Scrollytelling)
- **技术栈:** `@remotion/player` + `Next.js`
- **目标:** 将渲染出的视频片段重新组件化，嵌入到技术博客中，通过用户滚动页面的进度来精确驱动视频帧的播放，实现类似 Apple 官网的极致产品叙事体验。
