import { httpCreate } from './http';

const http = httpCreate('/api/v1');

export const v1 = {
	// 获取最新音乐
	getNewSongs(data) {
		return http.post('/discovery/new/songs', data);
	},
	// 获取歌单评论
	getPlaylistComments(id, data) {
		return http.post(`/resource/comments/A_PL_0_${id}`, data);
	},
	// 获取歌手头像
	getArtistIcon(id, data) {
		return http.post(`/artist/${id}`, data);
	},
	// 获取MV评论
	getMvComment(id, data) {
		return http.post(`/resource/comments/R_MV_5_${id}`, data);
	},
};
