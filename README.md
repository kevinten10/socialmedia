# 🎬 社交媒体自动化与数字资产库 (Social Media & Video as Code)

> 当前维护状态、运行方式、验证命令和公开仓库安全说明见 [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)。

> 多技术视频生成对比样例见 [video-showcase/README.md](video-showcase/README.md)，本地输出目录为 `video-showcase/outputs/`。

本项目不仅包含社交媒体自动化脚本，还包含了一个使用 **React** 和 **Remotion** 框架纯代码生成的 **60秒电影级个人宣传片 (KevinPromo)**，以及一系列展示高阶视觉效果的企业级 Demo。

本文档将重点沉淀我们在构建该 60 秒大片过程中的 **Remotion 深度调研、核心教程、企业级实战经验**，以及**如何使用 AI 提示词 (Prompt) 自动生成高质量视频代码**的独家心得。

---

## 💡 一、 什么是 Remotion？(Video as Code)

**Remotion** 是一个颠覆性的视频生成框架，其核心理念是 **“视频即代码 (Video as Code)”**。
它允许开发者使用熟悉的 Web 技术栈（React、HTML、CSS、SVG、WebGL）来编写视频逻辑。通过 Headless Chrome 逐帧渲染网页，最后使用 FFmpeg 将这些帧合成为高清的 MP4 视频。

---

## 🏗️ 二、 高阶实战场景剖析 (Advanced Demos)

本项目包含了一系列高度实用的企业级视频 Demo，展示了如何通过纯代码实现“降维打击”般的视觉效果：

### 1. 🌍 全球数据流转网 (Global Data Mesh)
**高阶技术：** 以中心节点为轴心，使用 SVG `animateMotion` 与 `stroke-dashoffset` 模拟实时数据包在贝塞尔曲线上穿梭。
> 运行命令: `npm run render:globe`

### 2. 🧊 量子核心矩阵 (Quantum Core 3D)
**高阶技术：** 无需 WebGL，利用 `transform-style: preserve-3d` 构建多层嵌套、异向旋转的 3D 线框立方体，配合粒子背景营造科技深度感。
> 运行命令: `npm run render:3d`

### 3. 🎛️ 神经频谱分析 (Neural Spectrum)
**高阶技术：** 多阶正弦合成模拟音频 FFT 频谱，包含低音底鼓 (Kick Drum) 的物理撞击反馈与瞬时色偏。
> 运行命令: `npm run render:audio`

### 4. 📊 每日数据播报 (Daily Sync)
**布局技巧：** 采用了三列等宽 **CSS Grid**，结合 `AnimatedCounter` 实现数字跃动。
> 运行命令: `npm run render:daily`

---

## 🛠️ 三、 架构师级实战避坑指南 (Best Practices)

1. **致命的 "幽灵包装器"：** 必须强制添加 **`layout="none"`** 属性到 `<Sequence>`，否则 Flex/Grid 布局会崩坏。
2. **拒绝 `position: absolute`：** 把视频的每一帧都当成一个响应式的现代网页，**全局严格使用 Flexbox 和 CSS Grid 排版**。
3. **网络断绝规则：** 严禁使用远程字体或外部图片，必须下载到本地。否则会触发 30000ms 渲染超时。

---

## 🤖 四、 AI 辅助开发的 Prompt (提示词) 秘籍

> **🎯 [Remotion AI 核心系统提示词模板]**
> 
> "你是一个精通 React 和 Remotion 视频框架的高级动画架构师。请帮我编写一个场景组件，在生成代码时必须严格遵守以下军规：
> 1. **结构与排版：** 严禁使用 `absolute` 堆叠，全局必须使用 `flex` 或 `grid` 进行严谨排版。
> 2. **Sequence 安全边界：** 所有的 `<Sequence>` 必须携带 `layout="none"`。
> 3. **网络断绝规则：** 不允许使用任何外部网络资源。
> 4. **阻尼物理引擎：** 大量使用 `spring` 实现富有弹性的动效，结合 `interpolate` 控制透明度。"

---

## 🔮 五、 未来拓展：高阶视觉与技术架构探索

Remotion 的潜力远不止于目前的 2D/3D DOM 渲染。以下是本项目未来计划引入的高阶技术栈：

*   **🎛️ 音频频谱驱动 (Audio Reactive):** 利用 `@remotion/media-utils` 提取 FFT 频率数据，驱动 GLSL 着色器产生实时视觉畸变。
*   **🧊 3D 引擎融合 (Three.js Bridge):** 通过 `@remotion/three` 集成 React Three Fiber，控制高精度的 3D 模型与电影级摄像机轨迹。
*   **🕸️ 路径形态转换 (Path Morphing):** 使用 `@remotion/paths` 实现 SVG 形状的平滑变形（如代码括号变形为智能大脑）。
*   **📜 交互式视频文档 (Interactive Scrollytelling):** 将视频帧率与页面滚动百分比绑定，打造类似 Apple 官网的极致叙事体验。

---

## 🚀 六、 快速开始与本地复现

1. **安装依赖：** `cd video-generator && npm install`
2. **启动预览：** `npm start`
3. **一键渲染：** `npm run render`

---
*Built with ❤️ via AI-Native Workflows. Code the System. Ride the World.*
