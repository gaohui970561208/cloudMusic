<template>
	<div class="songs-container">
		<div class="tab-bar">
			<span class="item" :class="{ active: tag === 0 }" @click="tag = 0">全部</span>
			<span class="item" :class="{ active: tag === 7 }" @click="tag = 7">华语</span>
			<span class="item" :class="{ active: tag === 96 }" @click="tag = 96">欧美</span>
			<span class="item" :class="{ active: tag === 8 }" @click="tag = 8">日本</span>
			<span class="item" :class="{ active: tag === 16 }" @click="tag = 16">韩国</span>
		</div>
		<!-- 底部的table -->
		<table class="el-table playlit-table">
			<thead>
				<th></th>
				<th></th>
				<th>音乐标题</th>
				<th>歌手</th>
				<th>专辑</th>
				<th>时长</th>
			</thead>
			<tbody>
				<tr class="el-table__row" v-for="(item, index) in songs" :key="index" @click="playMusic(item.id)">
					<td>{{ index + 1 }}</td>
					<td>
						<div class="img-wrap">
							<img :src="item.album.picUrl + '?param=130y130'" alt="" />
							<span class="iconfont icon-play"></span>
						</div>
					</td>
					<td>
						<div class="song-wrap">
							<div class="name-wrap">
								<span>{{ item.name }}</span>
								<span class="iconfont icon-mv"></span>
							</div>
						</div>
					</td>
					<td>{{ item.album.artists[0].name }}</td>
					<td>{{ item.album.name }}</td>
					<td>{{ item.duration | playTimeFormat }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { v1, song, errors } from '@/api';

export default {
	name: 'songs',
	data() {
		return {
			songs: [],
			tag: 0,
		};
	},

	created() {
		this.getNewSongs();
	},

	watch: {
		tag() {
			this.getNewSongs();
		},
	},
	methods: {
		// 获取最新音乐
		async getNewSongs() {
			try {
				const { data, ok } = await v1.getNewSongs({ areaId: this.tag });
				if (!ok) return;
				this.songs = data.data.slice(0, 50);
			} catch (error) {
				errors(error);
			}
		},

		async playMusic(id) {
			try {
				// 获取歌曲播放地址
				const { data, ok } = await song.getMusicUrl(id);
				if (!data.data[0].url) {
					return this.$message.error('该资源为VIP专享，暂不支持播放 ！');
				}
				// 设置给父组件的播放地址
				this.$parent.musicUrl = data.data[0].url;
			} catch (error) {
				errors(error);
			}
		},
	},
};
</script>
