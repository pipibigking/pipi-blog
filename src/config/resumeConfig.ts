/**
 * 我的简历 / 项目展示配置
 * --------------------------------------------------------------------------
 * · resumePdf：把 PDF 放进 public/assets/files/ 后填写站点内路径，
 *   例如 "/assets/files/resume.pdf"。留空时页面显示占位提示，不会输出死链。
 * · projects：左侧放项目实体（视频或链接封面），右侧写介绍。
 *   video  / link 二选一或都填；video 为 public 下的路径，link 为外链。
 *   poster 可选，填写视频封面图（public 下的路径）。
 */

export type ResumeProject = {
	title: string;
	year: string;
	category: string;
	description: string;
	highlights?: string[];
	tags: string[];
	video?: string;
	poster?: string;
	link?: string;
	linkLabel?: string;
	featured?: boolean;
};

export const resumeConfig: {
	resumePdf: string;
	projects: ResumeProject[];
} = {
	// TODO: 上传自己的 PDF 后取消注释并改成真实路径
	// resumePdf: "/assets/files/resume.pdf",
	resumePdf: "",

	projects: [
		{
			title: "个人博客：从零搭建与持续改版",
			year: "2026",
			category: "前端 / 全栈",
			description:
				"基于 Astro 与 Svelte 搭建的二次元风格个人站点，包含文章、相册、留言、站点统计与双主题阅读模式。这里可以写项目背景、你负责的部分，以及最终成果。",
			highlights: [
				"负责整体信息架构与视觉设计，完成响应式布局与主题切换。",
				"实现樱花特效、封面自适应与本地音乐播放器等交互细节。",
			],
			tags: ["Astro", "Svelte", "TypeScript"],
			// video: "/assets/videos/project-demo.mp4",
			// poster: "/assets/images/projects/blog-cover.webp",
			link: "/posts/build-rainzt-blog/",
			linkLabel: "查看建站记录",
			featured: true,
		},
		{
			title: "项目示例：在这里换成你的作品",
			year: "2026",
			category: "项目 / 作品",
			description:
				"复制这一项即可新增项目。左侧展示项目视频或入口，右侧放项目描述、亮点与技术标签；没有视频时会显示带链接的项目封面。",
			highlights: [
				"在 src/config/resumeConfig.ts 中替换标题与描述。",
				"填写 video / poster / link 即可自动切换左侧实体。",
			],
			tags: ["示例", "待替换"],
			link: "/about/",
			linkLabel: "项目链接",
		},
	],
};
