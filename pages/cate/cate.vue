<template>
	<view>
		<view class="search">
			<my-search @click='goSearch'></my-search>
		</view>
		<view class="content-box">
			<!-- 左 -->
			<scroll-view class="left" scroll-y="true" :style="{height:hw + 'px'}">
				<view :class="[current===index ? 'active':'']" v-for="(item,index) in cateList" :key="index"
					@click="changeCata(item,index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右 -->
			<scroll-view class="right" scroll-y="true" :style="{height:hw + 'px'}">
				<view v-for="(q,w) in cateList1" :key="w">
					<!-- 标题 -->
					<view class="title">{{q.cat_name}}</view>
					<!-- 内容 -->
					<view class="content">
						<view class="content-item" v-for="(a,b) in q.children" :key="b" @click="goList(a)">
							<image :src="a.cat_icon" mode=""></image>
							<text>{{a.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hw: 0,
				current: 0,
				scroll: 0,
				cateList: [],
				cateList1: []
			};
		},
		onLoad() {
			this.getCateList()
			const qq = uni.getSystemInfoSync()
			this.hw = qq.windowHeight - 50
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 跳转
			goList(item) {
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?cat_id=' + item.cat_id
				})
			},
			// 点击分类
			changeCata(item, i) {
				this.cateList1 = item.children
				this.current = i
				this.scroll = this.scroll === 0 ? .1 : 0
			},
			async getCateList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/categories')
				if (meta.status !== 200) return uni.$showMsg()
				this.cateList = message
				this.cateList1 = message[0].children
			}
		},
	}
</script>

<style lang="scss">
	.content-box {
		display: flex;
	}

	.left {
		width: 90px;

		view {
			font-size: 12px;
			line-height: 60px;
			text-align: center;
			background-color: #f7f7f7;
		}

		.active {
			background-color: #fff;
			position: relative;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -15px;
				width: 2px;
				height: 30px;
				background-color: #ea4350;
			}
		}
	}

	.right {
		.title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			margin: 6px 0;
		}

		.content {
			display: flex;
			flex-wrap: wrap;

			.content-item {
				width: calc(100%/3);
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				margin-bottom: 6px;

				image {
					width: 60px;
					height: 60px;
				}
			}
		}
	}
</style>
