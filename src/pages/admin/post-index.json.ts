import { getCollection } from "astro:content";
import { adminConfig } from "@/config/adminConfig";
import { getPostUrlBySlug } from "@/utils/url-utils";

/** 站内管理页用的文章目录（构建期生成，只读） */
export async function GET(): Promise<Response> {
	const posts = await getCollection("posts");
	const items = posts
		.map((post) => {
			const filePath = (post.filePath || `${adminConfig.repo.postsPath}/${post.id}.md`).replace(
				/\\/g,
				"/",
			);
			const relativePath = filePath.startsWith(`${adminConfig.repo.postsPath}/`)
				? filePath.slice(adminConfig.repo.postsPath.length + 1)
				: filePath;
			return {
				id: post.id,
				title: post.data.title,
				description: post.data.description,
				category: post.data.category || "",
				tags: post.data.tags || [],
				image: post.data.image || "",
				published:
					post.data.published instanceof Date
						? post.data.published.toISOString().slice(0, 10)
						: String(post.data.published),
				draft: post.data.draft,
				pinned: post.data.pinned,
				file: relativePath,
				url: getPostUrlBySlug(post.id),
			};
		})
		.sort((a, b) => b.published.localeCompare(a.published));

	return new Response(JSON.stringify(items), {
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
