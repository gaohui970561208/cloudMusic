import { httpCreate } from './http';

const http = httpCreate('/api/v2');

export const v2 = {
	// 获取轮播图数据
	getBanner(data) {
		return http.post('/banner/get', data);
	},
};
