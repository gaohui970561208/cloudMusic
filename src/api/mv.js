import { httpCreate } from './http';

const http = httpCreate('/api/mv');

export const mv = {
	// 获取Mv列表
	getMvs(data) {
		return http.post('/all', data);
	},
	// 获取MV详情
	getMvDetail(data) {
		return http.post('/detail', data);
	},
};
