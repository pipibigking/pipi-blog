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

<p align="center">
  <a href="https://github.com/pipibigking/pipi-blog">GitHub 仓库</a> ·
  <a href="https://space.bilibili.com/401427222">Bilibili</a> ·
  <a href="https://github.com/pipibigking">pipibigking</a>
</p>

## ✨ 特性

- **双站点主题**：一键在 **Aemeath**（花哨壁纸风）与 **Pure**（简洁留白阅读风）之间切换；选择独立存储于 `localStorage`（键 `rainzt.site-theme.v1`），不影响深浅色；支持 `?siteTheme=pure` / `?siteTheme=aemeath` 直达；无 JS 时自动降级为 Aemeath。
- **深浅色主题**：亮色 / 暗色 / 跟随系统三种模式，可手动切换，与站点主题完全独立。
- **静态生成**：Astro 静态输出，秒开、SEO 友好，可部署到任意静态托管平台。
- **二次元风格**：壁纸轮播、动态背景视频、角色立绘、水波纹与渐变过渡，支持主题色自定义。
- **丰富页面**：首页、文章、归档、分类、标签、相册、友链、朋友圈、留言板、B 站收藏、Bangumi 追番、工具、打赏、关于、站点统计等。
- **阅读体验**：文章头图 Hero（Aemeath 元信息卡 + 全宽封面；Pure 封面 + 模糊副图 + 元信息 + 简介）、悬浮阅读进度环、文章内嵌视频卡片、LQIP 模糊占位图、图片懒加载、KaTeX 数学公式、Mermaid / PlantUML 图表、代码高亮。
- **站点统计**：`/analytics/` 页面接入 Umami 公开分享 API，展示真实访客/浏览量、7/30/90 天趋势与热门页面，带本地缓存与刷新按钮。
- **音乐播放器**：全局背景音乐，支持歌词同步、播放列表与循环模式。
- **本地搜索**：基于 Pagefind 的纯前端全文搜索，无需后端。
- **多语言 UI**：内置中/英/日/俄等多语言文案。

## 🛠️ 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Astro 7 + Svelte 5 |
| 样式 | Tailwind CSS 4 + Stylus |
| 构建 | pnpm 9 + TypeScript + Biome |
| 内容 | Markdown / MDX |
| 搜索 | Pagefind（纯前端） |
| 统计 | Umami（公开分享 API，可选自建） |
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

> 构建链路会先运行 `scripts/generate-icons.js` 与 `scripts/generate-lqips.ts`，生成 `src/constants/icons.ts` 和 `src/constants/lqips.json`；这两个文件属于构建产物的一部分，**不要手动删改**。

## 📁 目录结构

```text
src/              前端源码（Astro 约定必须固定在根目录）
├── pages/        页面路由，一个文件对应一个页面（含 analytics.astro 站点统计）
├── layouts/      页面布局骨架
├── components/   可复用组件（Astro / Svelte）
│   ├── controls/ 主题切换、深浅色、进度环、搜索等控件
│   └── features/ 壁纸播放器、音乐播放器、立绘等
├── content/      文章内容与页面文案（Markdown / MDX）
├── config/       站点配置中心：导航、壁纸、音乐、友链、站点主题、统计等
├── styles/       全局样式（含 site-theme-pure.css 简洁阅读主题）
├── scripts/      前端交互脚本
├── plugins/      Markdown / HTML 构建插件
└── i18n/ data/ types/ utils/ constants/ assets/   多语言、数据、类型、工具与静态资源

public/           静态素材，构建时原样拷到网站根目录（图片、视频、音乐、favicon）
scripts/          构建与文章管理脚本（构建链路依赖，说明见下）
waline/           评论系统的邮件通知模板（Waline 后端需单独部署）
ops/              评论 AI 审核服务（Python，独立部署，可选，不影响前端构建）
docs/             本地开发文档归档（不纳入版本库）
.github/          GitHub CI 工作流与 Issue / PR 模板
dist/             构建产物，部署时上传此目录
node_modules/     依赖包，可删除后执行 pnpm install 重建
.astro/           Astro 生成的类型与缓存，可自动重建
.tmp/ .workbuddy/ 本地临时数据，不纳入版本库
```

## ✍️ 从哪开始改

| 想改什么 | 改哪里 |
| --- | --- |
| 站名、域名、副标题、主题色、favicon | `src/config/siteConfig.ts` |
| 头像、名字、GitHub / B 站 / 微信 / 邮箱 | `src/config/profileConfig.ts` |
| 双主题开关与默认主题 | `src/config/siteThemeConfig.ts` |
| Umami 统计（Website ID / 分享 ID / 历史累计） | `src/config/analyticsConfig.ts` |
| 导航栏菜单 | `src/config/navBarConfig.ts` |
| 壁纸 / 视频 / 音乐 / 歌词 / 友链 | `src/config/` 下对应配置文件 |
| 文章头图模糊副图与顶部渐变 | 文章 frontmatter 的 `imageColor` 字段 |
| 写文章 | `corepack pnpm new-post`，或直接编辑 `src/content/posts/` |

大部分个性化设置集中在 `src/config/`，改配置即可，无需改动组件代码。

## 🎨 双主题说明

- **Aemeath**（默认）：完整壁纸风，动态视频、立绘、渐变高光全部开启；文章页为「元信息卡 → 标题 → 全宽封面」。
- **Pure**：简洁留白阅读风，隐藏壁纸/视频/樱花等装饰，卡片实底 + 细边框；文章页为「封面 + 模糊副图 → 元信息 → 标题 → 简介」。
- 切换方式：导航栏右侧的站点主题按钮（面板里选「壁纸主题」或「简洁阅读」）；或用 `?siteTheme=pure` / `?siteTheme=aemeath` 打开页面（URL 参数会被写入本地存储并清除，下次访问自动沿用）。
- 深浅色（亮/暗/跟随系统）由独立的 `theme` 键控制，切换站点主题不会影响它。

## 🌐 部署

项目输出为纯静态站点，构建命令：

```bash
corepack pnpm build
```

产物在 `dist/`，将其整个目录上传到任意静态托管平台即可（腾讯云 CloudBase、Vercel、Netlify、Cloudflare Pages 等）。

> **部署前请检查**：
>
> 1. `src/config/siteConfig.ts` 的 `site_url` 仍为占位地址 `https://example.com`，需替换为真实域名（会影响 RSS、站点地图、评论路径与分享链接）。
> 2. `src/config/commentConfig.ts` 的 `Waline.serverURL` 仍为 `https://example.com/waline`，需替换为你的 Waline 后端地址；Waline 后端需单独部署。
> 3. `src/config/analyticsConfig.ts` 已填入 Umami 的 Website ID 与公开分享 ID；若使用自建 Umami，请把 `shareApiBase` / `scriptUrl` 改成你的实例地址。**不要填写管理员 Token**，统计页只读取公开分享数据。
> 4. 首次部署后建议用无痕窗口打开 `/analytics/` 确认真实数据能正常加载。

## 📄 许可

本项目基于 [MIT License](LICENSE) 开源。主题原作者版权信息见 `LICENSE` 与项目内相关声明。

---

Made with ❤️ by 屁屁大王
