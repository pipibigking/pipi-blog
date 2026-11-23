<script lang="ts">
import ClientPagination from "@components/common/ClientPagination.svelte";
import { untrack } from "svelte";
import type { FavoriteVideo } from "@/types/favorites";

interface FolderOption {
	id: number;
	title: string;
	count: number;
}

interface Props {
	items: FavoriteVideo[];
	folders: FolderOption[];
	itemsPerPage?: number;
}

let { items, folders, itemsPerPage = 24 }: Props = $props();

let searchQuery = $state("");
let activeFolder = $state(untrack(() => String(folders[0]?.id ?? "all")));
let sortBy = $state<"fav-desc" | "fav-asc" | "views-desc">("fav-desc");
let currentPage = $state(1);

function formatDuration(seconds: number): string {
	if (!seconds || isNaN(seconds)) return "";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	const pad = (n: number) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function formatViews(n: number): string {
	if (!n || isNaN(n)) return "0";
	if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
	return String(n);
}

function formatFavTime(ts: number): string {
	if (!ts) return "";
	const d = new Date(ts * 1000);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function videoUrl(item: FavoriteVideo): string {
	return item.bvid
		? `https://www.bilibili.com/video/${item.bvid}/`
		: `https://www.bilibili.com/video/av${item.id}/`;
}

function setFolder(value: string) {
	activeFolder = value;
	currentPage = 1;
}

function setSort(value: "fav-desc" | "fav-asc" | "views-desc") {
	sortBy = value;
	currentPage = 1;
}

let filteredItems = $derived.by(() => {
	let result = [...items];

	if (activeFolder !== "all") {
		const fid = Number(activeFolder);
		result = result.filter((item) => item.folderId === fid);
	}

	const query = searchQuery.trim().toLowerCase();
	if (query) {
		result = result.filter(
			(item) =>
				item.title.toLowerCase().includes(query) ||
				item.up.toLowerCase().includes(query) ||
				item.intro.toLowerCase().includes(query),
		);
	}

	if (sortBy === "fav-desc") result.sort((a, b) => b.favAt - a.favAt);
	else if (sortBy === "fav-asc") result.sort((a, b) => a.favAt - b.favAt);
	else result.sort((a, b) => b.views - a.views);

	return result;
});

let totalPages = $derived(Math.max(1, Math.ceil(filteredItems.length / itemsPerPage)));
let pageItems = $derived(
	filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
);

$effect(() => {
	if (currentPage > totalPages) currentPage = totalPages;
});
</script>

<!-- 搜索、收藏夹与排序 -->
<div class="flex flex-col gap-4 mb-6">
  <div class="flex flex-col sm:flex-row gap-3">
    <div class="relative flex-1">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input
        type="text"
        bind:value={searchQuery}
        oninput={() => (currentPage = 1)}
        placeholder="搜索收藏的视频、UP 主..."
        class="w-full h-10 pl-9 pr-3 rounded-lg bg-(--card-bg) border border-(--line-divider) text-sm text-neutral-800 dark:text-neutral-200 outline-none focus:border-(--primary) transition-colors"
      />
    </div>
    <select
      value={sortBy}
      onchange={(e) => setSort(e.currentTarget.value as "fav-desc" | "fav-asc" | "views-desc")}
      class="h-10 px-3 rounded-lg bg-(--card-bg) border border-(--line-divider) text-sm text-neutral-800 dark:text-neutral-200 outline-none focus:border-(--primary)"
    >
      <option value="fav-desc">最新收藏</option>
      <option value="fav-asc">最早收藏</option>
      <option value="views-desc">播放最多</option>
    </select>
  </div>

  {#if folders.length > 0}
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        onclick={() => setFolder("all")}
        class="px-3 py-1.5 rounded-full text-xs border transition-colors {activeFolder === 'all' ? 'bg-(--primary) text-white border-(--primary)' : 'bg-(--card-bg) border-(--line-divider) text-neutral-600 dark:text-neutral-300 hover:border-(--primary)'}"
      >
        全部 ({items.length})
      </button>
      {#each folders as folder (folder.id)}
        <button
          type="button"
          onclick={() => setFolder(String(folder.id))}
          class="px-3 py-1.5 rounded-full text-xs border transition-colors {activeFolder === String(folder.id) ? 'bg-(--primary) text-white border-(--primary)' : 'bg-(--card-bg) border-(--line-divider) text-neutral-600 dark:text-neutral-300 hover:border-(--primary)'}"
        >
          {folder.title} ({folder.count})
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if filteredItems.length === 0}
  <div class="text-center py-16 text-neutral-500 dark:text-neutral-400">
    <div class="text-4xl mb-3">⌕</div>
    <div class="text-sm">没有找到匹配的收藏视频</div>
  </div>
{:else}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {#each pageItems as item (item.id)}
      <a
        href={videoUrl(item)}
        target="_blank"
        rel="noopener noreferrer"
        class="card-base group overflow-hidden rounded-xl flex flex-col hover:shadow-lg transition-all duration-300 border border-(--line-divider)"
      >
        <div class="relative aspect-video overflow-hidden bg-black/5">
          <img
            src={item.cover}
            alt={item.title}
            loading="lazy"
            referrerpolicy="no-referrer"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-x-0 top-0 flex justify-between items-start p-2">
            <span class="px-1.5 py-0.5 rounded bg-black/60 text-white text-[0.65rem] flex items-center gap-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              {formatViews(item.views)}
            </span>
            {#if item.duration}
              <span class="px-1.5 py-0.5 rounded bg-black/60 text-white text-[0.65rem]">
                {formatDuration(item.duration)}
              </span>
            {/if}
          </div>
        </div>
        <div class="p-3 flex flex-col gap-1.5 flex-1">
          <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-(--primary) transition-colors" title={item.title}>
            {item.title}
          </div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            UP：{item.up || "未知"}
          </div>
          <div class="mt-auto flex items-center justify-between text-[0.68rem] text-neutral-400 dark:text-neutral-500">
            <span class="truncate max-w-[60%]" title={item.folder}>{item.folder}</span>
            <span>{formatFavTime(item.favAt)}</span>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <ClientPagination
    totalItems={filteredItems.length}
    {itemsPerPage}
    {currentPage}
    onPageChange={(page) => {
      currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />
{/if}
