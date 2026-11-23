export type BlogChangelogTone = "blue" | "mint" | "gold" | "violet";

export type BlogChangelogEntry = {
	date: string;
	version: string;
	displayDate: string;
	kind: string;
	title: string;
	summary: string;
	details: string[];
	tags: string[];
	tone: BlogChangelogTone;
};

/**
 * 博客本身的建设记录。
 * 自动上架工具公告留在 /changelog/，这里仅记录屁屁大王站点的页面、内容、社区和部署变化。
 */
export const blogChangelogEntries: BlogChangelogEntry[] = [
	{
		date: "2026-11-22",
		version: "V1.0.0",
		displayDate: "2026 年 11 月 22 日",
		kind: "建站记录",
		title: "屁屁大王的博客正式上线",
		summary: "完成个人博客的搭建与个性化改造，把这里变成我的分享角落。",
		details: [
			"确定站点名称与头像，换成属于我自己的角色形象。",
			"整理首页立绘、壁纸与动态背景，打造喜欢的二次元氛围。",
			"精简文章内容，只保留我想分享的作品与记录。",
			"关闭不需要的功能，保留文章、相册、朋友圈与留言板。",
		],
		tags: ["建站", "上线"],
		tone: "blue",
	},
];
