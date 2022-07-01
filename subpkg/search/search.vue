<template>
	<view>
		<!-- 搜索 -->
		<view class="search-box">
			<uni-search-bar @input="search" placeholder="搜索" cancelButton="none" radius="30"></uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-if="kw===''">
			<!-- 标题 -->
			<view class="title">
				<text>搜索历史</text>
				<uni-icons @click="ddd" type="trash" size="20"></uni-icons>
			</view>
			<!-- 内容 -->
			<view class="content">
				<uni-tag @click="goList(item)" v-for="(item,index) in reHistory" :key="index" :text="item" type="warning" inverted></uni-tag>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="search-list" v-else>
			<view @click="goDetail(item.goods_id)" class="search-item" v-for="(item,index) in searchList" :key="index">
				<text>{{item.goods_name}}</text>
				<uni-icons type="right"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchList: [],
				history: JSON.parse(uni.getStorageSync('history') || '[]')
			};
		},
		computed: {
			reHistory() {
				return [...this.history].reverse()
			}
		},
		methods: {
			// 跳转到商品详情
			goDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods-detail/goods-detail?goods_id=' + item
				})
			},
			// 跳转商品列表
			goList(item){
				uni.navigateTo({
					url:'/subpkg/goods-list/goods-list?query=' + item
				})
			},
			// 搜索历史
			saveHistory() {
				const set = new Set(this.history)
				set.delete(this.kw)
				set.add(this.kw)
				this.history = Array.from(set)
				uni.setStorageSync('history', JSON.stringify(this.history))
			},
			search(val) {
				this.kw = val
				// 清理定时器
				clearTimeout(this.timer)
				//  判断输入是否为空
				if (val.trim() === '') {
					this.searchList = []
					return
				}
				this.timer = setTimeout(async () => {
					const {
						data: {
							message,
							meta
						}
					} = await uni.$http.get('/api/public/v1/goods/qsearch', {
						query: val
					})
					if (meta.status !== 200) return uni.$showMsg()
					this.searchList = message
					this.saveHistory()
				}, 500)
			},
			ddd() {
				this.history = []
				uni.removeStorageSync('history')
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999999999999;
	}

	.uni-searchbar {
		background-color: #ea4358;
	}

	.uni-tag {
		margin: 0 0 6px 6px;
		display: block;
	}

	.history {
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 12px;
			border-bottom: 1px solid #eee;
			padding: 0 6px;
		}

		.content {
			display: flex;
			flex-wrap: wrap;
			padding-top: 6px;
		}
	}

	.search-list {
		.search-item {
			height: 40px;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 6px;
			font-size: 12px;

			text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}
		}
	}
</style>
