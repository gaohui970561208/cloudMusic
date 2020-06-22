import { httpCreate } from './http';

const http = httpCreate('/api/search');

export const search = {
	// 查询
	search(data) {
		return http.post('/get', data);
	},
};
