import fs from "node:fs";
import path from "node:path";

/** 站内管理页的图片/视频素材清单（构建期生成，只读） */
const imageExts = new Set([
	".webp",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".svg",
	".avif",
]);
const videoExts = new Set([".mp4", ".webm", ".ogg", ".m4v"]);

function collect(dir: string, publicDir: string, exts: Set<string>): string[] {
	const absolute = path.join(process.cwd(), "public", dir);
	if (!fs.existsSync(absolute)) return [];
	const found: string[] = [];
	const walk = (current: string) => {
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (exts.has(path.extname(entry.name).toLowerCase())) {
				found.push(
					`/${path.join(publicDir, path.relative(absolute, full)).replace(/\\/g, "/")}`,
				);
			}
		}
	};
	walk(absolute);
	return found.sort();
}

export function GET(): Response {
	const images = collect("assets/images", "assets/images", imageExts);
	const videos = collect("assets/videos", "assets/videos", videoExts);
	return new Response(JSON.stringify({ images, videos }), {
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
