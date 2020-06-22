const { NODE_ENV, VUE_APP_APIPATH, VUE_APP_ENVKEY, VUE_APP_SSOURL, VUE_APP_HOST } = process.env;

// NODE_ENV 只用两个值 , 'development','production'

const env = {
	apiPath: VUE_APP_APIPATH,
	host: VUE_APP_HOST,
	ssr: VUE_APP_SSOURL,
	local: NODE_ENV == 'development',
	key: VUE_APP_ENVKEY,
};

export default env;
