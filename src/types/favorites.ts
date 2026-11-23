// B 站收藏视频（构建时从 Bilibili 收藏夹接口拉取并标准化）
export interface FavoriteVideo {
	id: number; // aid
	bvid: string; // BV 号，用于拼接播放链接
	title: string;
	cover: string;
	intro: string;
	up: string; // UP 主昵称
	upMid: number;
	duration: number; // 秒
	views: number;
	favAt: number; // 收藏时间（秒级时间戳）
	folder: string; // 所属收藏夹名
	folderId: number;
	tname: string; // 分区名
}
