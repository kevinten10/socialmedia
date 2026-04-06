# Remotion 核心调研与实战教程 (Video as Code)

本文档沉淀了在构建 60 秒个人宣传片过程中，关于 **Remotion** 框架的深度调研、核心概念解析以及企业级实战避坑指南。

## 一、 什么是 Remotion？
**Remotion** 是一个基于 React 的视频生成框架。它的核心理念是 **“视频即代码 (Video as Code)”**。
它允许开发者使用熟悉的 Web 技术栈（HTML、CSS、React Hooks）来编写视频逻辑，并通过 Headless 浏览器（如 Chrome）逐帧渲染，最后由 FFmpeg 合成为 MP4 或 WebM 格式的高清视频。

### 为什么选择 Remotion？
1. **版本控制：** 视频的动效、排版、文案全部代码化，可以完美接入 Git 进行版本管理和团队协作。
2. **数据驱动与自动化：** 极度适合批量生成视频（如：年度总结报告、电商商品视频、自动化新闻播报），可通过 API 获取动态数据直接注入 React 组件渲染出千人千面的视频。
3. **Web 生态复用：** 可以直接使用已有的 CSS 动画、TailwindCSS、SVG 图标库乃至 WebGL (Three.js)。

---

## 二、 环境初始化与安装 (2026 最新版)

### 1. 官方脚手架 (推荐)
在最新版本的 Remotion 中，推荐使用 `create-video` 命令初始化：
```bash
npx create-video@latest my-video-project
```
*注意：在已存在的 Git 仓库中执行此命令时，如果在非交互模式（`--yes`）下可能会被拦截保护。此时可以选择手动安装。*

### 2. 手动集成到现有项目
```bash
npm init -y
npm install remotion @remotion/cli @remotion/renderer react react-dom
npm install --save-dev typescript @types/react @types/react-dom
```
配置 `package.json` 脚本：
```json
"scripts": {
  "start": "remotion studio src/index.tsx",
  "render": "remotion render src/index.tsx MyComposition out.mp4"
}
```

---

## 三、 核心概念与 Hooks

### 1. Composition (组合/合成)
视频的主入口。定义了视频的分辨率、帧率和总时长。
```tsx
import { Composition } from 'remotion';

export const RemotionRoot = () => (
  <Composition
    id="MyVideo"
    component={MyComponent}
    durationInFrames={1800} // 60秒 * 30fps
    fps={30}
    width={1920}
    height={1080}
  />
);
```

### 2. Sequence (时间轴序列)
用于控制组件在视频中的**出场时间**和**持续时间**。类似于剪辑软件里的时间轨。
```tsx
import { Sequence } from 'remotion';

// 从第 60 帧开始出现，持续 120 帧
<Sequence from={60} durationInFrames={120}>
  <MyScene />
</Sequence>
```

### 3. useCurrentFrame & useVideoConfig (时间引擎)
这是驱动所有动画的心脏。视频播放的本质是 `frame` 的递增。
```tsx
import { useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame(); // 0, 1, 2, 3...
const { fps, width, height } = useVideoConfig();
```

### 4. interpolate (插值器 - 线性动画)
将“当前帧”映射为“CSS 属性值”。
```tsx
import { interpolate } from 'remotion';

// 在第 0 到 30 帧之间，透明度从 0 渐变到 1
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: 'clamp', // 超出 30 帧后，保持为 1
});
```

### 5. spring (弹簧物理 - 自然动效)
用来替代生硬的线性动画，制造极其顺滑、带有物理惯性的缩放或位移动画。
```tsx
import { spring } from 'remotion';

// 在第 60 帧时触发弹出动画
const scale = spring({
  frame: frame - 60,
  fps,
  config: { damping: 12, stiffness: 100 }, // 阻尼和刚度
});
```

---

## 四、 🚨 实战血泪经验与避坑指南 (Best Practices)

我们在开发 60 秒高燃宣传片时，遇到了以下深坑并总结了最佳实践：

### 1. 致命的 "幽灵包装器" 导致布局崩坏
**问题：** 在 Remotion 中使用 `<Sequence>` 时，如果内部使用了 `Flexbox` 或 `CSS Grid` 进行复杂对齐，你会发现全部错乱、组件重叠。
**原因：** 默认情况下，`<Sequence>` 会在 DOM 中生成一个带有 `position: 'absolute', width: '100%', height: '100%'` 的 `<div>` 包装器。这破坏了正常的文档流。
**解决方案：** 必须显式添加 `layout="none"`，让其只作为时间控制容器，不产生布局副作用。
```tsx
// 错误
<Sequence from={0}>...</Sequence>

// 正确
<Sequence layout="none" from={0}>...</Sequence>
```

### 2. 拒绝 `position: absolute`，拥抱现代 Web 布局
**问题：** 许多新手喜欢用绝对定位结合 `random()` 来随机散落元素，这在处理多分辨率或复杂时间轴时极易导致重叠、对齐灾难，且代码极难维护。
**解决方案：** 把每一帧的画面当成一个严谨的网页。全局使用 `display: flex` 或 `display: grid` 进行绝对居中和自适应分栏排版。

### 3. 远程字体导致渲染超时 (Timeout Error)
**问题：** 执行 `remotion render` 时，终端卡住并抛出 30000ms Timeout 错误，提示无头浏览器初始化失败。
**原因：** 视频组件中如果使用了外部 CDN 资源（如 `@import url('https://fonts.googleapis.com/css2?family=...');`），无头浏览器在截帧前会等待这些资源下载完毕。一旦网络波动，直接导致整个渲染进程崩溃。
**解决方案：** 
- 将字体文件下载到本地并作为静态资源引用。
- 或者直接使用系统原生自带字体簇（如 `sans-serif`, `monospace`）。

### 4. React `dangerouslySetInnerHTML` 与打字机效果的冲突
**问题：** 如果你写了一个打字机效果（基于 `string.slice(0, currentFrame)`截断字符串），并且试图对截断后的字符串执行 Regex 正则替换来注入 HTML 标签（实现语法高亮），渲染时会在屏幕上直接打印出原始的 CSS 代码（如 `<span style="color...">`）。
**原因：** 字符串截断可能会正好切在 HTML 标签的中间（比如把 `<span` 切成了 `<sp`），导致浏览器 DOM 解析失败，直接将后续字符识别为纯文本。
**解决方案：** 
- 不要对处于动态截断状态的文本进行 HTML 注入。
- 要实现高亮的打字机效果，应该预先生成好抽象语法树（AST），基于组件数组而不是纯字符串来进行动画映射，或者像本实战一样，回归纯净的单色极客终端表现。
