import { httpCreate } from './http';

const http = httpCreate('/api/v3');

export const v3 = {
	// 获取歌单详情
	getPlaylistDetail(data) {
		return http.post('/playlist/detail', data);
	},
};
