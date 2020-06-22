module.exports = {
	publicPath: process.env.BASE_URL,
	productionSourceMap: process.env.SOURCE_MAP == 1,
	css: {
		// 配置css模块
		loaderOptions: {
			// 向预处理器 Loader 传递配置选项
			less: {
				// 配置less（其他样式解析用法一致）
				javascriptEnabled: true, // 设置为true
			},
		},
	},
	devServer: {
		open: true, //是否自动弹出浏览器页面
		port: '80',
		https: false, //是否使用https协议
		hotOnly: true, //是否开启热更新
		proxy: {
			'/api': {
				target: 'https://music.163.com/api/', //API服务器的地址
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
				// 突破host和origin的限制
				headers: {
					referer: 'http://music.163.com',
					origin: 'http://music.163.com',
					host: 'music.163.com',
				},
			},
		},
	},
};
