<template>
	<div class="discovery-container">
		<!-- 轮播图 -->
		<el-carousel class="" :interval="4000" type="card">
			<el-carousel-item v-for="(item, index) in banners" :key="index">
				<img :src="item.imageUrl" alt="" />
			</el-carousel-item>
		</el-carousel>

		<!-- 推荐歌单 -->
		<div class="recommend">
			<h3 class="title">
				推荐歌单
			</h3>
			<div class="items">
				<div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
					<div class="img-wrap">
						<div class="desc-wrap">
							<span class="desc">{{ item.copywriter }}</span>
						</div>
						<img :src="item.picUrl + '?param=200y200'" alt="" />
						<span class="iconfont icon-play"></span>
					</div>
					<p class="name">{{ item.name }}</p>
				</div>
			</div>
		</div>

		<!-- 最新音乐 -->
		<div class="news">
			<h3 class="title">
				最新音乐
			</h3>
			<div class="items">
				<div class="item" v-for="(item, index) in newSongs" :key="index" @click="playMusic(item.id)">
					<div class="img-wrap">
						<img :src="item.picUrl + '?param=130y130'" alt="" />
						<span class="iconfont icon-play"></span>
					</div>
					<div class="song-wrap">
						<div class="song-name">{{ item.name }}</div>
						<div class="singer">{{ item.song.artists[0].name }}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 推荐MV -->
		<div class="mvs">
			<h3 class="title">推荐MV</h3>
			<div class="items">
				<div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
					<div class="img-wrap">
						<img :src="item.picUrl + '?param=250y150'" alt="" />
						<span class="iconfont icon-play"></span>
						<div class="num-wrap">
							<div class="iconfont icon-play"></div>
							<div class="num">{{ item.playCount }}</div>
						</div>
					</div>
					<div class="info-wrap">
						<div class="name">{{ item.name }}</div>
						<div class="singer">{{ item.artistName }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { v2, personalized, song, errors } from '@/api';

export default {
	name: 'discovery',
	data() {
		return {
			// 轮播图
			banners: [],
			// 推荐歌单
			playList: [],
			// 最新歌曲
			newSongs: {},
			mvs: [],
		};
	},

	created() {
		this.getBanner();
		this.getPersonalizedPlaylist();
		this.getPersonalizedNewsong();
		this.getPersonalizedMv();
	},

	methods: {
		// 获取歌曲播放地址
		async playMusic(id) {
			try {
				const { data, ok } = await song.getMusicUrl(id);
				if (!ok) return;
				if (!data.data[0].url) {
					return this.$message.error('该资源为VIP专享，暂不支持播放 ！');
				}
				// 设置给父组件的播放地址
				this.$parent.musicUrl = data.data[0].url;
			} catch (error) {
				errors(error);
			}
		},
		toPlaylist(id) {
			this.$router.push({
				name: 'songSheet',
				query: {
					id: id
				}
			});
		},
		toMv(id) {
			this.$router.push({
				name: 'mv',
				query: {
					id: id
				}
			});
		},
		// 获取轮播图数据
		async getBanner() {
			try {
				const { data, ok } = await v2.getBanner({ clientType: 'pc' });
				if (!ok) return;
				this.banners = data.banners;
			} catch (error) {
				errors(error);
			}
		},
		// 获取推荐歌单
		async getPersonalizedPlaylist() {
			try {
				const { data, ok } = await personalized.getPersonalizedPlaylist({ limit: '10' });
				if (!ok) return;
				this.playList = data.result;
			} catch (error) {
				errors(error);
			}
		},
		// 获取最新歌曲
		async getPersonalizedNewsong() {
			try {
				const { data, ok } = await personalized.getPersonalizedNewsong({ type: 'recommend' });
				if (!ok) return;
				this.newSongs = data.result;
			} catch (error) {
				errors(error);
			}
		},
		// 获取推荐MV
		async getPersonalizedMv() {
			try {
				const { data, ok } = await personalized.getPersonalizedMv();
				if (!ok) return;
				this.mvs = data.result;
			} catch (error) {
				errors(error);
			}
		},
	},
};
</script>

<style></style>
