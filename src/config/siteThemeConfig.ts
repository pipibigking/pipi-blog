import type { SiteThemeConfig } from "../types/siteThemeConfig";

// 站点布局主题配置，与浅色/深色模式（localStorage: theme）分别保存。
// 访客选择存入 localStorage: rainzt.site-theme.v1，两者互不覆盖。
// 支持通过 ?siteTheme=pure / ?siteTheme=aemeath 指定；无 JS 时降级到 defaultTheme（Aemeath）。
export const siteThemeConfig: SiteThemeConfig = {
	enabled: true,
	defaultTheme: "aemeath",
};
