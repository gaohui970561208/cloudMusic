import { httpCreate } from './http';

const http = httpCreate('/api/playlist');

export const playlist = {
	// 获取精品歌单
	getTopPlaylist(data) {
		return http.post('/highquality/list', data);
	},
	// 获取歌单列表
	getPlaylist(data) {
		return http.post('/list', data);
	},
};
