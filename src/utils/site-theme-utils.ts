import type { SiteTheme } from "@/types/siteThemeConfig";

// 站点主题独立存储，与浅色/深色的 "theme" key 完全隔离。
export const SITE_THEME_STORAGE_KEY = "rainzt.site-theme.v1";
export const SITE_THEME_QUERY = "siteTheme";
export const SITE_THEME_ATTR = "data-site-theme";

const isSiteTheme = (value: unknown): value is SiteTheme =>
	value === "aemeath" || value === "pure";

/**
 * 读取 URL 中的 ?siteTheme= 参数（仅接受 aemeath / pure）。
 */
export function getSiteThemeFromUrl(search: string): SiteTheme | null {
	try {
		const value = new URLSearchParams(search).get(SITE_THEME_QUERY);
		return isSiteTheme(value) ? value : null;
	} catch {
		return null;
	}
}

/**
 * 读取已保存的站点主题；无存储 / 无效值时返回 null。
 */
export function getStoredSiteTheme(): SiteTheme | null {
	try {
		const stored = localStorage.getItem(SITE_THEME_STORAGE_KEY);
		return isSiteTheme(stored) ? stored : null;
	} catch {
		return null;
	}
}

/**
 * 保存站点主题到 localStorage（存储受限时静默失败，不影响切换）。
 */
export function setStoredSiteTheme(theme: SiteTheme): void {
	try {
		localStorage.setItem(SITE_THEME_STORAGE_KEY, theme);
	} catch {
		// Safari 无痕等场景可能禁用存储，忽略即可。
	}
}

/**
 * 把站点主题应用到 <html> 的 data-site-theme 属性。
 * 样式层据此切换 Aemeath / Pure；缺失或不认识的值一律视为 Aemeath。
 */
export function applySiteTheme(theme: SiteTheme): void {
	const root = document.documentElement;
	root.setAttribute(SITE_THEME_ATTR, theme);
	// 壁纸层的隐藏由 site-theme-pure.css 用 opacity/visibility 处理，
	// 不在此处改写内联 display，避免与壁纸模块自身的模式切换逻辑冲突。
	document.dispatchEvent(
		new CustomEvent<SiteTheme>("site-theme-change", { detail: theme }),
	);
}

/**
 * 站点主题初始化：URL 参数优先于本地存储，最后回退到默认值。
 * URL 参数会被持久化，便于分享 ?siteTheme=pure 链接。
 */
export function resolveAndApplySiteTheme(defaultTheme: SiteTheme): SiteTheme {
	const fromUrl = getSiteThemeFromUrl(window.location.search);
	const resolved = fromUrl ?? getStoredSiteTheme() ?? defaultTheme;
	if (fromUrl) setStoredSiteTheme(fromUrl);
	applySiteTheme(resolved);
	return resolved;
}

/**
 * 在站内跳转链接上保留 ?siteTheme= 参数，
 * 避免从 ?siteTheme=pure 进入后点站内链接丢失 Pure 主题。
 */
export function appendSiteThemeQuery(href: string, theme: SiteTheme): string {
	try {
		const url = new URL(href, window.location.href);
		if (url.origin !== window.location.origin) return href;
		if (!url.searchParams.has(SITE_THEME_QUERY)) {
			url.searchParams.set(SITE_THEME_QUERY, theme);
		}
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return href;
	}
}
