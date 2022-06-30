<template>
	<view>
		<view class="search">
			<my-search @click='goSearch'></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<!-- 跳转 -->
				<navigator class="swiper-item" :url="`/subpkg/goods-detail/goods-detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item.name)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题 -->
				<view class="floor-title">
					<image :src="item.floor_title.image_src"></image>
				</view>
				<!-- 内容 -->
				<view class="floor-content">
					<!-- 左 -->
					<view class="left">
						<image :src="item.product_list[0].image_src" @click="goList(item.product_list[0])"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</view>
					<!-- 右 -->
					<view class="right">
						<image v-for="(a,b) in item.product_list" :key="b" v-if="b!==0" :src="a.image_src"
							@click="goList(a)" :style="{width:a.image_width + 'rpx'}" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 跳转商品列表
			goList(obj) {
				const q = obj.navigator_url.split('?')[1]
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?' + q
				})
			},
			//  跳转到分页
			navClickHandler(item) {
				if (item === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层数据
			async getFloorList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (meta.status !== 200) return uni.$showMsg()
				this.floorList = message
			},
			//  获取导航数据
			async getNavList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (meta.status !== 200) return uni.$showMsg()
				this.navList = message
			},
			//  获取轮播图数据
			async getSwiperList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (meta.status !== 200) return uni.$showMsg()
				this.swiperList = message
			}
		},
	}
</script>

<style lang="scss">
	.search {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 10px 0;

		.nav-item {
			width: 128rpx;
			height: 140rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.floor-title {
		image {
			width: 100%;
			height: 59rpx;
		}
	}

	.floor-content {
		display: flex;
		padding: 6px 0;

		.rigth {
			margin-left: 6px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
</style>
