import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 禁用音乐播放器方法：
	// 模板默认侧边栏和导航栏两个都显示
	// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
	// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 打开网页时自动播放音乐（若被浏览器拦截，会在首次交互后补播）
	autoplay: true,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "10046455237",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		// 音频与 C:\Users\280738\AppData\Roaming\music-dl\data\downloads 一一对应：
		// bgm-01 泽野弘之 - Call of Silence.mp3       bgm-08 你的名字三叶的日常.mp3
		// bgm-02 已移除（Call of Silence 最自由的版本）  bgm-09 你的名字前前前世.mp3
		// bgm-03 悪魔の子.mp3                         bgm-10 你的名字梦灯笼.mp3
		// bgm-04 洛克王国 - 魔法时刻.mp3               bgm-11 你的名字没什么大不了.mp3
		// bgm-05 好运来袭洛克 - 洛克王国(兜圈小提琴版).mp3  bgm-12 你的名字黄昏之时.mp3
		// bgm-06 洛克家园(长笛版).mp3                  bgm-13 天气之子-还有爱能做到的事吗.mp3
		// bgm-07 洛克王国 - 神宠传说.mp3
		// 新增歌曲：把 mp3 放进 public/assets/music/，在下面加一项即可（可选填 lrc）
		playlist: [
			{
				name: "神宠传说",
				artist: "洛克王国",
				url: "/assets/music/bgm-07.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/shenchongchuanshuo.lrc",
			},
			{
				name: "Call of Silence",
				artist: "泽野弘之",
				url: "/assets/music/bgm-01.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/call-of-silence.lrc",
			},
			{
				name: "悪魔の子",
				artist: "ヒグチアイ",
				url: "/assets/music/bgm-03.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/akuma-no-ko.lrc",
			},
			{
				name: "魔法时刻",
				artist: "洛克王国",
				url: "/assets/music/bgm-04.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/mofashike.lrc",
			},
			{
				name: "好运来袭洛克（兜圈小提琴版）",
				artist: "洛克王国",
				url: "/assets/music/bgm-05.mp3",
				cover: "/assets/music/cover/ndmz.webp",
			},
			{
				name: "洛克家园（长笛版）",
				artist: "洛克王国",
				url: "/assets/music/bgm-06.mp3",
				cover: "/assets/music/cover/ndmz.webp",
			},
			{
				name: "三叶的日常",
				artist: "RADWIMPS（你的名字）",
				url: "/assets/music/bgm-08.mp3",
				cover: "/assets/music/cover/ndmz.webp",
			},
			{
				name: "前前前世",
				artist: "RADWIMPS（你的名字）",
				url: "/assets/music/bgm-09.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/qianqianqianshi.lrc",
			},
			{
				name: "梦灯笼",
				artist: "RADWIMPS（你的名字）",
				url: "/assets/music/bgm-10.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/mengdenglong.lrc",
			},
			{
				name: "没什么大不了",
				artist: "RADWIMPS（你的名字）",
				url: "/assets/music/bgm-11.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/meishenmedabu.lrc",
			},
			{
				name: "黄昏之时",
				artist: "RADWIMPS（你的名字）",
				url: "/assets/music/bgm-12.mp3",
				cover: "/assets/music/cover/ndmz.webp",
			},
			{
				name: "天气之子",
				artist: "RADWIMPS",
				url: "/assets/music/bgm-13.mp3",
				cover: "/assets/music/cover/ndmz.webp",
				lrc: "/assets/music/lrc/ai-ni-dekiru-koto.lrc",
			},
		],
	},
};
