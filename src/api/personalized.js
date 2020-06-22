import { httpCreate } from './http';

const http = httpCreate('/api/personalized');

export const personalized = {
	// 获取推荐歌单
	getPersonalizedPlaylist(data) {
		return http.post('/playlist', data);
	},
	// 获取最新歌曲
	getPersonalizedNewsong(data) {
		return http.post('/newsong', data);
	},
	// 获取推荐MV
	getPersonalizedMv() {
		return http.post('/mv');
	},
};
