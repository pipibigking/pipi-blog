/**
 * 首页开屏动画的访客偏好设置。
 *
 * 这些值只保存在访客自己的浏览器里，不会改变站点构建配置；这样每个人
 * 都可以选择是否播放开屏动画，以及自己喜欢的角色和横幅。
 */

/**
 * 名片栏素材库。
 * 上半幅和下半幅共用同一个素材库——两处选择器列出的都是下面这 12 张，
 * 因此任意一幅都可以同时用作上半幅或下半幅横幅。
 * 新增素材：把图片放进 public/assets/images/intro-banner/，在数组里加一项即可。
 */
const introBannerLibrary = [
	{ id: "card-01", label: "2人棋盘", src: "/assets/images/intro-banner/card-01.webp" },
	{ id: "card-02", label: "天空之城", src: "/assets/images/intro-banner/card-02.webp" },
	{ id: "card-03", label: "女洛克", src: "/assets/images/intro-banner/card-03.webp" },
	{ id: "card-04", label: "小黑猫彼得大道", src: "/assets/images/intro-banner/card-04.webp" },
	{ id: "card-05", label: "恶魔钉s5", src: "/assets/images/intro-banner/card-05.webp" },
	{ id: "card-06", label: "洛克阿布", src: "/assets/images/intro-banner/card-06.webp" },
	{ id: "card-07", label: "萌王", src: "/assets/images/intro-banner/card-07.webp" },
	{ id: "card-08", label: "许愿树眺望", src: "/assets/images/intro-banner/card-08.webp" },
	{ id: "card-09", label: "迪莫麻球", src: "/assets/images/intro-banner/card-09.webp" },
	{ id: "card-10", label: "阿布巨石", src: "/assets/images/intro-banner/card-10.webp" },
	{ id: "card-11", label: "鸡牛部队", src: "/assets/images/intro-banner/card-11.webp" },
	{ id: "card-12", label: "鸭吉吉气球", src: "/assets/images/intro-banner/card-12.webp" },
] as const;

export const homePortfolioIntroSettings = {
	enabledStorageKey: "rainzt.home-portfolio-intro-enabled.v1",
	characterStorageKey: "rainzt.home-portfolio-intro-character.v1",
	topBannerStorageKey: "rainzt.home-portfolio-intro-top-banner.v1",
	bottomBannerStorageKey: "rainzt.home-portfolio-intro-bottom-banner.v1",
	defaultEnabled: true,
	// 开屏角色默认使用张楚岚立绘占位
	defaultCharacterId: "character-03",
	defaultTopBannerId: "card-01",
	defaultBottomBannerId: "card-02",
	defaultMobileTopBannerId: "card-01",
	defaultMobileBottomBannerId: "card-02",
	banners: {
		// 上下两处、桌面与手机都引用同一份素材库，任选互不限制
		desktop: {
			top: [...introBannerLibrary],
			bottom: [...introBannerLibrary],
		},
		mobile: {
			top: [...introBannerLibrary],
			bottom: [...introBannerLibrary],
		},
	},
	// 开屏角色先用用户的立绘素材占位
	characters: [
		{
			id: "character-01",
			label: "小洛克",
			src: "/images/home-stickers/xiaoluoke.webp",
			thumbnail: "/images/home-stickers/xiaoluoke.webp",
		},
		{
			id: "character-02",
			label: "冯宝宝",
			src: "/images/home-stickers/fengbaobao.webp",
			thumbnail: "/images/home-stickers/fengbaobao.webp",
		},
		{
			id: "character-03",
			label: "张楚岚（默认）",
			src: "/images/home-stickers/zhangchulan.webp",
			thumbnail: "/images/home-stickers/zhangchulan.webp",
		},
		{
			id: "character-04",
			label: "王也",
			src: "/images/home-stickers/wangye.webp",
			thumbnail: "/images/home-stickers/wangye.webp",
		},
		{
			id: "character-05",
			label: "白月魁",
			src: "/images/home-stickers/baiyuekui.webp",
			thumbnail: "/images/home-stickers/baiyuekui.webp",
		},
		{
			id: "character-06",
			label: "蕾塞",
			src: "/images/home-stickers/leisei.webp",
			thumbnail: "/images/home-stickers/leisei.webp",
		},
		{
			id: "character-07",
			label: "电次",
			src: "/images/home-stickers/dianci.webp",
			thumbnail: "/images/home-stickers/dianci.webp",
		},
		{
			id: "character-08",
			label: "三笠",
			src: "/images/home-stickers/sanli.webp",
			thumbnail: "/images/home-stickers/sanli.webp",
		},
		{
			id: "character-09",
			label: "艾伦",
			src: "/images/home-stickers/ailun.webp",
			thumbnail: "/images/home-stickers/ailun.webp",
		},
		{
			id: "character-10",
			label: "火花",
			src: "/images/home-stickers/huohua.webp",
			thumbnail: "/images/home-stickers/huohua.webp",
		},
		{
			id: "character-11",
			label: "水蓝蓝",
			src: "/images/home-stickers/shuilannan.webp",
			thumbnail: "/images/home-stickers/shuilannan.webp",
		},
		{
			id: "character-12",
			label: "喵喵",
			src: "/images/home-stickers/miaomiao.webp",
			thumbnail: "/images/home-stickers/miaomiao.webp",
		},
	],
} as const;

export type HomePortfolioIntroCharacter =
	(typeof homePortfolioIntroSettings.characters)[number];

export const homePortfolioIntroCharacterIds: readonly string[] =
	homePortfolioIntroSettings.characters.map((character) => character.id);
