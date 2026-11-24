---
name: blog-deploy
description: 把 pipibigking/pipi-blog 仓库最新 main 分支部署到 Trae 站点 pipihome.traesite.cn。用户说 部署、更新站点、重新部署、发版 时调用。不要用于本地开发调试。
---

# Blog Deploy

一键把仓库最新 `origin/main` 部署到 Trae 站点 `pipihome.traesite.cn`。

## 常量（写死在脚本里，不要改）

| 项 | 值 |
|---|---|
| 本地仓库 | `d:\GitHub开源\个人展示\二次元化个人博客开发` |
| 站点 ID | `37lizvnkarogphg61vo` |
| 域名 | `pipihome.traesite.cn` |
| ffmpeg | `D:\aamyWeb\myblog\tools\node_modules\ffmpeg-static\ffmpeg.exe` |
| pnpm | 9.14.4，`--node-linker=hoisted` |
| 视频压缩 | 1080p / x264 CRF26 / AAC 96k |
| BGM 压缩 | MP3 128kbps |

## 流程

1. `git fetch origin main --depth 1`
2. `git archive --format=tar origin/main` 导出纯净快照到临时目录（避开 GitHub 直连 TLS 握手问题 + 排除本地未提交改动）
3. pnpm install + 补复制 `.astro/fonts` 和 `node_modules/.astro` 字体缓存
4. `pnpm run build`
5. 只在临时副本压缩 `dist/assets/videos` 和 `dist/assets/music`，原仓库素材**不碰**
6. `prepare-static-function.mjs` 适配 → `trae-deploy create` → `trae-deploy wait`
7. 打印 `DEPLOY_OK id=... commit=... url=...`

## 执行方式

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ".trae/skills/blog-deploy/scripts/deploy.ps1"
```

启动后不要关终端，等到 `DEPLOY_OK` 行出现就是成功。如果报 `DEPLOY_FAILED` 或 PowerShell 异常，把错误原样贴给我排查。

## 不要做的事

- **不要**直接 `git clone` GitHub（TLS 握手偶发失败，走本地 fetch + archive 才稳）
- **不要**在仓库里直接跑 build（字体 cache 在 `.astro/` 会被 archive 排除，必须先归档再 build 再补 cache）
- **不要**改 `public/assets/videos` / `public/assets/music` 原始文件
- **不要**跳过 pnpm 的 `--node-linker=hoisted`（symlink junction 在沙箱里取不到 package.json）
