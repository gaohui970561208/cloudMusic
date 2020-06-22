import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'discovery',
		redirect: '/discovery',
	},
	{
		path: '/discovery',
		name: 'discovery',
		component: () => import(/* webpackChunkName: "discovery" */ '@/views/discovery.vue'),
	},
	{
		path: '/songSheetList',
		name: 'songSheetList',
		component: () => import(/* webpackChunkName: "playlists" */ '@/views/songSheetList.vue'),
	},
	{
		path: '/songSheet',
		name: 'songSheet',
		component: () => import(/* webpackChunkName: "playlists" */ '@/views/songSheet.vue'),
	},
	{
		path: '/songs',
		name: 'songs',
		component: () => import(/* webpackChunkName: "songs" */ '@/views/songs.vue'),
	},
	{
		path: '/mvList',
		name: 'mvList',
		component: () => import(/* webpackChunkName: "mvs" */ '@/views/mvList.vue'),
	},
	{
		path: '/mv',
		name: 'mv',
		component: () => import(/* webpackChunkName: "mv" */ '@/views/mv.vue'),
	},
	{
		path: '/search',
		name: 'search',
		component: () => import(/* webpackChunkName: "result" */ '@/views/search.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
