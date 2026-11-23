// 站点布局主题：Aemeath（花哨壁纸风）与 Pure（简洁留白阅读风）。
// 与浅色/深色模式完全独立，分别使用不同的 localStorage key。
export type SiteTheme = "aemeath" | "pure";

export interface SiteThemeConfig {
	// 是否允许访客在两套站点主题间切换
	enabled: boolean;
	// 默认站点主题，无 JS / 无存储时降级到 aemeath
	defaultTheme: SiteTheme;
}
