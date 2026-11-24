/**
 * 站内内容管理入口配置。
 *
 * 静态站点没有服务端，管理页通过浏览器直连 GitHub Contents API 提交内容，
 * 因此所有写操作都要求：1) 输入本站管理密码；2) 在设置里填写 GitHub Token。
 * Token 只会发往 api.github.com，不会写进仓库。
 *
 * 管理密码以 SHA-256 哈希存放在这里（明文不入库）。
 * 默认密码：pipi2026 —— 上线后请务必修改！
 * 生成新哈希：node scripts/admin-password.js 你的新密码
 */
export const adminConfig = {
	passwordHash: "c79213203d7f3d9079b3899ba4d8342d22f019346d69d96b2aeea89c608bb03d",
	repo: {
		owner: "pipibigking",
		repo: "pipi-blog",
		branch: "main",
		postsPath: "src/content/posts",
		mediaPath: "public/assets/images",
	},
} as const;
