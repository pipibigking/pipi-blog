import type { CommentConfig } from "../types/commentConfig";

export const commentConfig: CommentConfig = {
	// 评论系统类型: none, twikoo, waline, giscus, disqus, artalk，默认为none，即不启用评论系统
	type: "waline",

	// twikoo 未启用，保留空配置占位；当前使用 waline

	//waline评论系统配置
	waline: {
		// waline 后端服务地址
		// ⚠️ 部署到腾讯云后请替换成你自己的 Waline 后端地址。
		// CloudBase 静态托管无法运行 Waline 的 Node 服务，需要单独部署后端（可用 Vercel / CloudBase 云函数 / 独立服务器），
		// 再把地址填到这里；未部署前评论会显示加载失败，但不影响站点其他功能。
		serverURL: "https://example.com/waline",
		// 设置 Waline 评论系统语言
		lang: "zh-CN",
		// 设置 Waline 评论系统表情地址
		emoji: [
			"https://unpkg.com/@waline/emojis@1.4.0/weibo",
			"https://unpkg.com/@waline/emojis@1.4.0/bilibili",
			"https://unpkg.com/@waline/emojis@1.4.0/bmoji",
		],
		// 评论登录模式。可选值如下：
		//   'enable'   —— 默认，允许访客匿名评论和用第三方 OAuth 登录评论，兼容性最佳。
		//   'force'    —— 强制必须登录后才能评论，适合严格社区，关闭匿名评论。
		//   'disable'  —— 禁止所有登录和 OAuth，仅允许匿名评论（填写昵称/邮箱），适用于极简留言。
		login: "enable",
		// 留言必须填写昵称和邮箱，缺少任一项时 Waline 会阻止提交。
		requiredMeta: ["nick", "mail"],
		// 是否启用文章访问量统计功能
		visitorCount: true,
	},

	// artalk / giscus / disqus 均未启用，原作者示例配置已清理；当前使用 waline
};
