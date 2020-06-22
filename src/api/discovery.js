import { httpCreate } from './http';

const http = httpCreate('/api/discovery');

export const discovery = {
	// 获取相关MV
	getSimiMvUrl(data) {
		return http.post('/simiMV', data);
	},
};
