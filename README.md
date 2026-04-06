# 🎬 社交媒体自动化与数字资产库 (Social Media & Video as Code)

本项目不仅包含社交媒体自动化脚本，还包含了一个使用 **React** 和 **Remotion** 框架纯代码生成的 **60秒电影级个人宣传片 (KevinPromo)**。

本文档将重点沉淀我们在构建该 60 秒大片过程中的 **Remotion 深度调研、核心教程、企业级实战经验**，以及**如何使用 AI 提示词 (Prompt) 自动生成高质量视频代码**的独家心得。

---

## 💡 一、 什么是 Remotion？(Video as Code)

**Remotion** 是一个颠覆性的视频生成框架，其核心理念是 **“视频即代码 (Video as Code)”**。
它允许开发者使用熟悉的 Web 技术栈（React、HTML、CSS、SVG、WebGL）来编写视频逻辑。通过 Headless Chrome 逐帧渲染网页，最后使用 FFmpeg 将这些帧合成为高清的 MP4 视频。

**为什么架构师和独立开发者应该关注 Remotion？**
1. **版本控制：** 视频动效、排版、文案、时间轴全部代码化，完美接入 Git 协作，实现“像改 Bug 一样修视频”。
2. **数据驱动与自动化渲染：** 极其适合批量生成个性化视频（如 GitHub 年度代码总结、自动化的每日 AI 新闻播报）。你可以通过 API 获取实时数据，直接注入到 React 组件中动态生成千人千面的视频素材。
3. **Web 生态复用：** 完美复用庞大的 Web 前端生态。TailwindCSS、CSS 关键帧动画、Echarts 图表乃至 Three.js 都可以零成本植入视频中。

---

## 🛠️ 二、 核心概念与 Hooks 解析

在 Remotion 中，一切皆为 React 组件，一切动效皆由“当前帧 (Frame)”的数值驱动。

### 1. Composition (合成/主配置)
视频的根入口，定义了视频的物理属性。
```tsx
import { Composition } from 'remotion';

export const RemotionRoot = () => (
  <Composition
    id="KevinPromo"
    component={PromoVideo}
    durationInFrames={1800} // 视频总长：60秒 * 30fps
    fps={30}               // 渲染帧率
    width={1920}           // 分辨率宽
    height={1080}          // 分辨率高
  />
);
```

### 2. Sequence (时间轴切片)
控制组件在特定时间段出场和消失。它就像剪辑软件里的时间轨。
```tsx
// 组件将从第 60 帧开始出现，持续渲染 120 帧后消失
<Sequence layout="none" from={60} durationInFrames={120}>
  <Scene2_Infrastructure />
</Sequence>
```
> **⚠️ 核心避坑：** 永远记得加上 `layout="none"`，否则会导致排版灾难（详见后文避坑指南）。

### 3. 时间与物理引擎 (interpolate & spring)
Remotion 提供了强大的数学 Hooks 来将时间映射为视觉属性：
*   **`interpolate` (线性插值)：** 将“当前帧”映射为透明度、位移等常规动效。
    ```tsx
    // 0到30帧之间，opacity从0变到1。超过30帧后保持为1 (clamp)。
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    ```
*   **`spring` (弹簧物理)：** 替代生硬的 CSS 线性过渡，制造带有物理阻尼和惯性的丝滑特效（极其适合做 UI 元素的弹性弹出）。
    ```tsx
    const scale = spring({ 
      frame: frame - 60, // 延迟到60帧触发
      fps, 
      config: { damping: 12, stiffness: 100 } // 调整阻尼和刚度
    });
    ```

---

## 🚨 三、 架构师级实战避坑指南 (Best Practices)

在实际开发中，如果不深入理解 Remotion 的底层渲染机制，很容易写出极难维护且 Bug 频出的代码。以下是我们总结的血泪经验：

### 1. 致命的 "幽灵包装器" (`<Sequence>` 布局崩坏)
**症状：** 在使用 Flexbox 或 CSS Grid 进行精准排版时，只要套上 `<Sequence>` 控制时间，组件就会突然互相重叠、网格列数失效。
**根本原因：** 默认情况下，Remotion 会为每一个 `<Sequence>` 生成一个带有 `position: 'absolute', width: '100%', height: '100%'` 的 `<div>` 容器。这个“幽灵包装器”直接打破了标准文档流。
**终极解法：** 必须强制添加 **`layout="none"`** 属性。这会让 Sequence 仅仅作为逻辑上的时间控制容器，不再干预和破坏你的任何 CSS 布局结构。

### 2. 拒绝 `position: absolute`，拥抱现代 Web 排版
**症状：** 许多新手在使用 Remotion 时，仍带有视频剪辑软件的“画板拖拽”思维，喜欢用绝对定位结合 JS 随机数生成坐标。这会导致在多屏幕自适应或复杂场景下发生元素溢出和严重重叠。
**终极解法：** 把视频的每一帧都当成一个响应式的现代网页来对待。**全局严格使用 Flexbox 和 CSS Grid 排版**。例如：使用 `grid-template-columns` 实现精准的双栏分镜，使用 `flex-wrap: wrap` + `gap` 实现技术标签矩阵。这样能确保在海量元素并发时，渲染结果依然严丝合缝。

### 3. 字体加载与渲染超时熔断 (30000ms Timeout)
**症状：** 运行 `npm run render` 时，终端卡死，几十秒后抛出 Timeout 错误，提示无头浏览器 Headless Chrome 无法就绪。
**根本原因：** 组件中引用了外部网络字体资源（如 `@import url('https://fonts.googleapis.com/css2?family=...');`）。渲染器在截取第一帧前会严格等待这些远端资源下载完毕，一旦网络波动，直接触发超时保护机制熔断渲染。
**终极解法：**
*   优先使用操作系统原生的字体族兜底（如 `font-family: '"Fira Code", monospace, sans-serif'`）。
*   如需特定商业/美术字体，必须将 `.ttf` 或 `.woff` 字体文件下载到项目本地，并作为静态资源加载。绝对不要依赖线上网络请求。

### 4. 危险的 `dangerouslySetInnerHTML` 与打字机效果冲突
**症状：** 在模拟黑客打字机效果时，如果试图用正则表达式对文本进行 HTML 注入以实现语法高亮，屏幕上可能会直接暴露并打印出原始的 CSS 源码（如 `<span style="color...">`）。
**根本原因：** 打字机效果基于 `string.slice(0, currentFrame)` 逐帧截断字符串。截断过程随时可能将 HTML 标签从中间拦腰切断（如把 `<span` 切成了 `<sp`），导致浏览器 DOM 树解析完全崩溃，随后将标签错误识别为普通文本并打印在了画面上。
**终极解法：** 
*   优先使用单色设计保持极简的高级感（Authentic Terminal Style）。
*   若必须实现多色语法高亮，请使用 AST 解析器将代码转换为 React 组件节点数组，并按索引逐个挂载组件。**严禁在处于动态截断状态的字符串上执行正则替换和 HTML 注入。**

---

## 🤖 四、 AI 辅助开发的 Prompt (提示词) 秘籍

Remotion 纯代码的特性，使其极度契合 AI Agent 辅助开发。如果你想让 LLM (如 ChatGPT, Claude, Gemini) 帮你一次性写出结构清晰、动效顺滑的高质量视频代码，请在 Prompt 中强制挂载以下**架构约束指令**：

> **🎯 [Remotion AI 核心系统提示词模板]**
> 
> "你是一个精通 React 和 Remotion 视频框架的高级动画架构师。请帮我编写一个场景组件，在生成代码时必须严格遵守以下军规：
> 1. **结构与排版：** 严禁使用 `position: absolute` 进行堆叠排版。全局必须使用 `display: flex` 或 `display: grid` 进行严谨的居中与间距对齐，保证元素绝对不可重叠。
> 2. **Sequence 安全边界：** 当你需要控制元素出场时间时，所有的 `<Sequence>` 组件必须携带 `layout="none"` 属性！
> 3. **网络断绝规则：** 不允许使用任何依赖外部网络的 `<link>`、`@import` 字体或远程外部图片。全部使用 CSS 绘制或系统原生安全字体（如 `monospace`, `sans-serif`）。
> 4. **阻尼物理引擎：** 避免生硬的 CSS transition。请大量使用 Remotion 提供的 `spring` Hook 来实现富有弹性和物理阻尼的位移/缩放入场效果，结合 `interpolate` 实现随帧变化的透明度控制。
> 5. **极简暗黑美学：** 采用深邃的电影级质感背景（Dark Mode, `#000` 到 `#111`），配合极客荧光色（如 `#00f2fe` Cyan 或 `#ff003c` Neon Red），并善用 `box-shadow` 制造科技发光光晕。
> 6. **安全防御：** 绝对禁止使用 `dangerouslySetInnerHTML` 处理任何包含动态截断或逐帧渐变逻辑的文本。"

---

## 🚀 五、 快速开始与本地复现

本项目中包含完整的 60 秒纯代码生成器环境 (`video-generator`)。

### 1. 安装依赖
```bash
cd video-generator
npm install
```

### 2. 启动实时预览 (Studio)
```bash
npm start
```
> 运行后打开浏览器访问 `http://localhost:3000`。你可以像使用 Premiere 一样拖动时间轴，实时预览所有的组件热更新。

### 3. 一键渲染高清 MP4
```bash
npm run render
```
> 渲染程序会自动启动多线程 Headless Browser 并调动 FFmpeg。最终的高清 60 秒视频将极速输出至 `video-generator/out.mp4`。

---

## 🏗️ 六、 高阶实战场景剖析 (Advanced Demos)

除了 60 秒的宣传主片，本项目还包含了 3 个高度实用的企业级视频 Demo (位于 `src/demos` 目录)。这些场景极大地拓宽了 Remotion 在研发团队日常协作中的应用边界：

### 1. 📊 每日数据播报 (Daily Sync)
**应用场景：** 自动化 CI/CD 生成每日 GitHub/Jira 战报。
**布局技巧：** 
- 采用了严格的**三列等宽 CSS Grid** (`grid-template-columns: repeat(3, 1fr)`) 来约束动态的 `AnimatedCounter`。
- 结合系统内置的 `new Date().toISOString()`，实现了无需后期的全自动日期水印。
> 运行命令: `npm run render:daily`

### 2. 🕸️ 架构拓扑演说 (System Architecture)
**应用场景：** 技术评审会（Review）动态展示微服务流量拓扑与节点关系。
**布局技巧：** 
- **计算渲染 (Math Rendering)：** 组件之间的连线不是静态的 SVG，而是基于 React 组件传递的 `X`, `Y` 坐标。在内部使用勾股定理计算连线长度，通过 `Math.atan2` 自动计算连线偏转角度 (`rotate`)，并结合 `spring` 实现“连线正在接通”的动态效果。
- 这是完全抛弃静态画图，走向“算法绘图”的绝佳范例。
> 运行命令: `npm run render:arch`

### 3. 🎯 敏捷看板协作 (Project Collaboration)
**应用场景：** Sprint 冲刺实况展示。
**布局技巧：** 
- **混合运动流：** 卡片组件 (Card) 采用了 `interpolate` 进行 X 轴的绝对平移（模拟拖拽），同时叠加了基于 `spring` 的入场缩放 (`scale`)。
- 背景采用了虚线边框 (`border: dashed`) 和绝对居中，构建了极具极客风格的 Kanban 列 (TODO, IN PROGRESS, DONE)。
> 运行命令: `npm run render:collab`

---
*Built with ❤️ via AI-Native Workflows. Code the System. Ride the World.*
