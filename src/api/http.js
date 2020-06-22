// 按照此规范

import axios from 'axios';
import env from './config';
import qs from 'qs';
import { Message } from 'element-ui';

const config = {
	...env,
	errors(err) {
		const msg = err.code === 'ECONNABORTED' ? '网络超时，请刷新重试' : err.msg || err.message || err.toString();
		console.error(err);
		Message.error(msg);
	},
	filter(res) {
		const { status, data } = res;
		if (status >= 200 && status < 300) {
			res.ok = true;
			return res;
		}
		this.errors(data.msg);
		res.ok = false;
		return res;
	},
	headers(req) {
		req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		if (req.method === 'post') {
			req.data = qs.stringify({
				...req.data,
			});
		}
		return req;
	},
};

const httpCreate = (baseURL, timeout = 600e3) => {
	const instance = axios.create({
		baseURL: config.apiPath + baseURL,
		timeout,
		headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
	});
	instance.interceptors.response.use(config.filter.bind(config));
	instance.interceptors.request.use(config.headers.bind(config));
	return instance;
};

const { errors, filter, baseURL } = config;

export { httpCreate, errors, filter, baseURL };
