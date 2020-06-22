import { httpCreate } from './http';

const http = httpCreate('/api/song');

export const song = {
	// 获取歌曲播放地址
	getMusicUrl(id) {
		return http.post(`/enhance/player/url?ids=[${id}]&br=999000`);
	},
	// 获取MV播放地址
	getMvUrl(data) {
		return http.post('/enhance/play/mv/url', data);
	},
};
