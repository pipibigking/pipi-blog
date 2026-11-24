import type { GalleryConfig } from "@/types/galleryConfig";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表
	albums: [
		// 支持jpg/png/webp/avif/gif格式
		// id: 相册唯一标识符（用于目录命名和URL路径），对应 public/gallery/<id>/ 目录
		// cover: 手动指定封面图（可选，不填会用 cover.* 或第一张图片）
		// 每添加一个相册，记得在 public/gallery/ 下创建同名子目录并放入图片
		{
			id: "luoke-kingdom",
			name: "洛克王国",
			description: "把童年里那些熟悉的场景和精灵，一张张收进这个小相册。",
			location: "洛克王国",
			date: "2026-11-22",
			tags: ["洛克王国", "游戏摄影", "回忆"],
			cover: "/gallery/luoke-kingdom/cover.webp",
		},
	],

	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数，默认 240
	// 值越小列数越多，值越大列数越少
	columnWidth: 240,
};
