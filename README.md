# 屁屁大王 · 个人博客

<p align="center">
  <img src="public/favicon/pipi-avatar-512.png" alt="屁屁大王" width="96" />
</p>

<p align="center">
  <strong>在微小的感受中去触摸宏大，在宏大的世界里去构建微小。</strong>
</p>

<p align="center">
  记录技术、动漫与生活中的所思所想。基于 <a href="https://astro.build">Astro</a> 构建，由 Firefly 主题深度定制而来。
</p>

## ✨ 特性

- **静态生成**：Astro 静态输出，秒开、SEO 友好，可部署到任意静态托管平台
- **二次元风格**：壁纸轮播、动态背景视频、角色立绘、水波纹与渐变过渡，支持亮/暗/跟随系统三种主题
- **丰富的页面**：首页、文章、归档、分类、标签、相册、友链、留言板、B 站收藏、Bangumi 追番、赞助、关于等
- **阅读体验**：文章内嵌视频卡片、LQIP 模糊占位图、图片懒加载、KaTeX 数学公式、Mermaid / PlantUML 图表、代码高亮
- **音乐播放器**：侧边栏 / 导航栏全局背景音乐，支持歌词同步、播放列表、循环模式
- **本地搜索**：基于 Pagefind 的纯前端全文搜索，无需后端
- **多语言 UI**：内置中/英/日/俄等多语言文案

## 🛠️ 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Astro 7 + Svelte 5 |
| 样式 | Tailwind CSS 4 + Stylus |
| 构建 | pnpm + TypeScript + Biome |
| 内容 | Markdown / MDX |
| 搜索 | Pagefind |
| 评论 | Waline（需单独部署后端） |
| 部署 | 静态站点，可选腾讯云 CloudBase / Vercel / Cloudflare Pages |

## 🚀 本地运行

环境要求：**Node.js ≥ 20**、**pnpm 9**（项目通过 `preinstall` 强制使用 pnpm）。

```bash
# 安装依赖
corepack pnpm install

# 启动开发服务器
corepack pnpm dev
```

浏览器打开 <http://localhost:4321> 即可预览。

## 📦 常用命令

| 命令 | 说明 |
| --- | --- |
| `corepack pnpm dev` | 启动本地开发服务器 |
| `corepack pnpm build` | 构建静态站点，产物输出到 `dist/` |
| `corepack pnpm preview` | 本地预览构建产物 |
| `corepack pnpm check` | Astro 诊断检查 |
| `corepack pnpm type-check` | TypeScript 类型检查 |
| `corepack pnpm lint` | Biome 代码检查与修复 |
| `corepack pnpm format` | Biome 格式化 |
| `corepack pnpm new-post` | 新建文章脚手架 |

## 📁 目录结构

```text
src/
├── pages/          # 页面路由
├── layouts/        # 布局
├── components/     # 可复用组件（Svelte / Astro）
├── content/        # 文章内容（Markdown / MDX）
├── config/         # 站点各项配置（导航、壁纸、音乐、友链等）
├── styles/         # 全局样式
├── utils/          # 工具函数
└── plugins/        # Markdown / HTML 插件
public/             # 静态资源（图片、视频、音乐、favicon）
scripts/            # 构建与辅助脚本
```

站点的大部分个性化设置集中在 `src/config/`，修改对应配置即可，无需改动组件代码。

## 🌐 部署

项目输出为纯静态站点，构建命令：

```bash
corepack pnpm build
```

产物在 `dist/`，将其整个目录上传到任意静态托管平台即可（腾讯云 CloudBase、Vercel、Netlify、Cloudflare Pages 等）。

> **部署前请检查**：`src/config/siteConfig.ts` 中的 `site_url`、评论配置 `src/config/commentConfig.ts` 中的 `serverURL` 目前是占位地址（`https://example.com`），需替换为你的真实域名。评论功能使用 Waline，需要单独部署后端服务。详见 `DEPLOY.md` 与 `TODO.md`。

## 📄 许可

本项目基于 [MIT License](LICENSE) 开源。主题原作者版权信息见 `LICENSE` 与项目内相关声明。

---

Made with ❤️ by 屁屁大王
