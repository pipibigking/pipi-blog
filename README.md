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
src/              前端源码（Astro 约定必须固定在根目录）
├── pages/        页面路由，一个文件对应一个页面
├── layouts/      页面布局骨架
├── components/   可复用组件（Astro / Svelte）
├── content/      文章内容与页面文案（Markdown / MDX）
├── config/       站点配置中心：导航、壁纸、音乐、友链等
├── styles/       全局样式
├── scripts/      前端交互脚本
├── plugins/      Markdown / HTML 构建插件
└── i18n/ data/ types/ utils/ constants/ assets/   多语言、数据、类型与工具代码

public/           静态素材，构建时原样拷到网站根目录（图片、视频、音乐、favicon）
scripts/          构建与文章管理脚本（构建链路依赖，说明见下）
waline/           评论系统的邮件通知模板（Waline 后端需单独部署）
ops/              评论 AI 审核服务（Python，独立部署，可选，不影响前端构建）
docs/             开发文档归档（部署指南、TODO 等，不纳入版本库）
.github/          GitHub CI 工作流与 Issue / PR 模板
dist/             构建产物，部署时上传此目录
node_modules/     依赖包，可删除后执行 pnpm install 重建
.astro/           Astro 生成的类型与缓存，可自动重建
.tmp/ .workbuddy/ 本地临时数据，不纳入版本库
```

> **关于 `scripts/`**：其中 `generate-icons.js`、`generate-lqips.ts`、`subset-fonts.ts` 是 `pnpm build` 链路的一环（自动生成图标、模糊占位图、字体子集），**不要删除**；`new-post.js`、`post-studio.js` 用于新建和管理文章。

## ✍️ 从哪开始改

1. **改站名、域名、头像**：`src/config/siteConfig.ts`
2. **写文章**：`corepack pnpm new-post`，或直接编辑 `src/content/posts/`
3. **换壁纸 / 音乐 / 友链**：`src/config/` 下对应的配置文件
4. **改页面结构**：`src/pages/` 与 `src/layouts/`

大部分个性化设置集中在 `src/config/`，改配置即可，无需改动组件代码。

## 🌐 部署

项目输出为纯静态站点，构建命令：

```bash
corepack pnpm build
```

产物在 `dist/`，将其整个目录上传到任意静态托管平台即可（腾讯云 CloudBase、Vercel、Netlify、Cloudflare Pages 等）。

> **部署前请检查**：`src/config/siteConfig.ts` 中的 `site_url`、评论配置 `src/config/commentConfig.ts` 中的 `serverURL` 目前是占位地址（`https://example.com`），需替换为你的真实域名。评论功能使用 Waline，需要单独部署后端服务。详见 `docs/DEPLOY.md` 与 `docs/TODO.md`。

## 📄 许可

本项目基于 [MIT License](LICENSE) 开源。主题原作者版权信息见 `LICENSE` 与项目内相关声明。

---

Made with ❤️ by 屁屁大王
