/**
 * 博客的分类体系。
 *
 * 分类名直接写在文章的 frontmatter `category` 字段里，这里给出固定的四个分类
 * 与对应的 URL slug，供分类页路由和后台编辑器共用。
 */
export const CATEGORIES = [
	{ name: "项目", slug: "project", description: "做过的项目与作品" },
	{ name: "博客", slug: "blog", description: "博客搭建、改造与维护" },
	{ name: "ai", slug: "ai", description: "AI 工具、工作流与实践" },
	{ name: "记录", slug: "notes", description: "日常记录、随笔与示例" },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];

export const CATEGORY_NAMES: string[] = CATEGORIES.map((item) => item.name);

/** 把分类名转换成 URL slug，未登记的分类走安全的通用编码 */
export function getCategorySlug(category: string | null | undefined): string {
	const name = (category || "").trim();
	if (!name) return "uncategorized";
	const known = CATEGORIES.find((item) => item.name === name);
	if (known) return known.slug;
	return (
		name
			.toLowerCase()
			.replace(/[^\p{L}\p{N}]+/gu, "-")
			.replace(/^-+|-+$/g, "") || "uncategorized"
	);
}

/** 判断某个 slug 是否属于固定分类（用于分类页导航高亮等） */
export function isPresetCategorySlug(slug: string): boolean {
	return CATEGORIES.some((item) => item.slug === slug);
}
