<script lang="ts">
import DropdownItem from "@/components/common/DropdownItem.svelte";
import DropdownPanel from "@/components/common/DropdownPanel.svelte";
import Icon from "@/components/common/Icon.svelte";
import { siteThemeConfig } from "@/config/siteThemeConfig";
import {
	getStoredSiteTheme,
	SITE_THEME_ATTR,
	SITE_THEME_QUERY,
	SITE_THEME_STORAGE_KEY,
} from "@/utils/site-theme-utils";
import type { SiteTheme } from "@/types/siteThemeConfig";
import { onMount } from "svelte";

let current: SiteTheme = $state("aemeath");
let open = $state(false);

let rootEl: HTMLDivElement | null = null;

function togglePanel() {
	open = !open;
}

/**
 * 仿照上游 Aemeath 的 ThemeSwitch：写入 localStorage 后整页跳转。
 *
 * 为什么不用 history.replaceState + 就地替换属性：
 * 1. 旧方案会给站内所有链接打上当前 siteTheme，切换主题后已打补丁的链接
 *    仍带着旧值，纯色/壁纸主题会互相"串味"；
 * 2. Swup 无刷新切页时旧 island 的事件监听仍存活，状态与 URL 容易失配；
 * 3. 整页导航会释放上一套主题的 islands/effects，并让所有链接重新生成，
 *    这也是上游在切换主题时主动 reload 的原因。
 *
 * URL 参数：写入存储成功时删除 siteTheme，避免旧参数随链接传播；
 * 存储不可用时（无痕等）才把 siteTheme 写进 URL 作为兜底。
 */
function switchSiteTheme(next: SiteTheme) {
	if (current === next) {
		open = false;
		return;
	}
	current = next;

	const url = new URL(window.location.href);
	let persisted = true;
	try {
		localStorage.setItem(SITE_THEME_STORAGE_KEY, next);
	} catch {
		persisted = false;
		document.documentElement.dataset.siteThemePersistence = "url";
	}
	if (persisted) url.searchParams.delete(SITE_THEME_QUERY);
	else url.searchParams.set(SITE_THEME_QUERY, next);

	// 先把当前文档标记为新主题，避免跳转前的极短窗口闪回旧主题。
	document.documentElement.setAttribute(SITE_THEME_ATTR, next);
	window.location.assign(url.href);
}

onMount(() => {
	const attr = document.documentElement.getAttribute(SITE_THEME_ATTR);
	const resolved: SiteTheme =
		attr === "pure" || attr === "aemeath"
			? attr
			: (getStoredSiteTheme() ?? siteThemeConfig.defaultTheme);
	current = resolved;
	document.documentElement.setAttribute(SITE_THEME_ATTR, resolved);

	// 点击面板外部 / Esc 关闭。本组件自管开关，不再依赖 Navbar 的全局
	// getElementById 绑定——两套导航栏各挂一份本组件，全局按 ID 只能绑到
	// 第一份，Pure 主题下可见的那份会永远点不开。
	const handleDocClick = (event: MouseEvent) => {
		if (!open) return;
		const target = event.target;
		if (target instanceof Node && rootEl && !rootEl.contains(target)) {
			open = false;
		}
	};
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === "Escape") open = false;
	};
	document.addEventListener("click", handleDocClick);
	document.addEventListener("keydown", handleKeydown);

	// bfcache：从其他页面返回时，如果存储/URL 中的主题与当前文档不一致，重载页面。
	// 与上游 ThemeSwitch 的 pageshow 守卫一致，避免两套主题 DOM 错配。
	const handlePageShow = (event: PageTransitionEvent) => {
		if (!event.persisted) return;
		const urlTheme = new URLSearchParams(window.location.search).get(SITE_THEME_QUERY);
		const fromUrl: SiteTheme | null =
			urlTheme === "pure" || urlTheme === "aemeath" ? urlTheme : null;
		const expected = fromUrl ?? getStoredSiteTheme();
		if (!expected) return;
		if (expected !== document.documentElement.getAttribute(SITE_THEME_ATTR)) {
			window.location.reload();
			return;
		}
		current = expected;
	};
	window.addEventListener("pageshow", handlePageShow);
	return () => {
		window.removeEventListener("pageshow", handlePageShow);
		document.removeEventListener("click", handleDocClick);
		document.removeEventListener("keydown", handleKeydown);
	};
});
</script>

{#if siteThemeConfig.enabled}
<div class="relative z-50" bind:this={rootEl}>
	<button
		aria-label="切换站点主题"
		aria-haspopup="menu"
		aria-expanded={open}
		class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
		id="site-theme-switch"
		onclick={togglePanel}
	>
		<Icon
			icon={current === "pure"
				? "material-symbols:auto-awesome-outline-rounded"
				: "material-symbols:wallpaper-rounded"}
			class="text-[1.25rem]"
		/>
	</button>
	<div
		class="absolute transition float-panel top-11 -right-2 pt-5 z-50 {open
			? ''
			: 'float-panel-closed'}"
		role="menu"
		aria-label="站点主题选项"
	>
		<DropdownPanel>
			<DropdownItem
				role="menuitem"
				isActive={current === "aemeath"}
				isLast={false}
				onclick={() => switchSiteTheme("aemeath")}
			>
				<Icon icon="material-symbols:wallpaper-rounded" class="text-[1.25rem] mr-3" />
				壁纸主题
			</DropdownItem>
			<DropdownItem
				role="menuitem"
				isActive={current === "pure"}
				isLast={true}
				onclick={() => switchSiteTheme("pure")}
			>
				<Icon icon="material-symbols:auto-awesome-outline-rounded" class="text-[1.25rem] mr-3" />
				简洁阅读
			</DropdownItem>
		</DropdownPanel>
	</div>
</div>
{/if}
