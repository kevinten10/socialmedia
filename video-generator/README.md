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
  - `npm run render:globe`
- **🧊 Quantum Core:** Multi-layered, nested CSS 3D wireframe cubes with opposing rotations.
  - `npm run render:3d`
- **🎛️ Neural Spectrum:** Synthetic multi-octave frequency visualizer with percussive feedback.
  - `npm run render:audio`
- **📊 Daily Sync:** Automated CI/CD report with strict Grid constraints.
  - `npm run render:daily`
- **🕸️ System Architecture:** Dynamic blueprint with calculated line rendering.
  - `npm run render:arch`
- **🎯 Project Collaboration:** Sprint execution board with simulated card drag-and-drop.
  - `npm run render:collab`
- **📜 Scroll Driven UI:** Simulation of scroll-linked animations (Apple-style).
  - `npm run render:scroll`

## 🚀 How to Run & Render

### 1. Install Dependencies
```bash
npm install
```

### 2. Preview in Studio (Hot Reloading)
```bash
npm start
```
> The studio will open at `http://localhost:3000`.

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

### 为什么选择 Remotion？
1. **版本控制：** 视频动效全部代码化，完美接入 Git。
2. **数据驱动：** 极度适合批量生成视频（如：年度总结、自动化报告）。
3. **Web 生态复用：** 直接使用 CSS 动画、SVG 图标乃至 WebGL。

## 二、 🚨 实战血泪经验与避坑指南 (Best Practices)

1. **致命的 "幽灵包装器"：** 必须显式添加 `layout="none"` 到 `<Sequence>`，否则布局崩坏。
2. **拒绝 `position: absolute`：** 全局使用 `display: flex` 或 `display: grid` 进行绝对对齐。
3. **远程资源超时：** 渲染时会等待网络资源。必须将字体和图片下载到本地，严禁依赖外链。
4. **打字机效果冲突：** 不要对处于动态截断状态的文本进行 HTML 注入，避免解析失败。
