<template>
	<view v-if="Object.keys(goods).length !== 0">
		<!-- 轮播图 -->
		<swiper circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goods.pics" :key="index">
				<view class="swiper-item">
					<image :src="item.pics_big" @click="preview(index)"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 内容-->
		<view class="info">
			<!-- 价格 -->
			<view class="price">￥{{goods.goods_price}}</view>
			<!-- 名称 -->
			<view class="mid">
				<view class="title">{{goods.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="20"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递:免运费</view>
		</view>
		<!-- 商品详情 -->
		<div v-html="goods.goods_introduce" style='padding-bottom: 50px;'></div>
		<!-- 商品导航 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				goods: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 1
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			// 将 m_cart 模块中的 total 映射为当前页面的计算属性
			...mapGetters('m_cart', ['total']),
		},
		onShow() {
			// 在页面刚展示的时候，设置数字徽标
			this.setBadge()
		},
		onLoad(item) {
			this.getGoods(item.goods_id)
			console.log(item);
		},
		watch: {
			// 定义 total 侦听器，指向一个配置对象
			total: {
				// handler 属性用来定义侦听器的 function 处理函数
				handler(newVal) {
				this.options[1].info = newVal
				},
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate: true
			}
		},
		methods: {
			setBadge() {
				// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
				uni.setTabBarBadge({
					index: 2, // 索引
					text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
				})
			},
			// 右侧点击事件
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods.goods_id,
						goods_name: this.goods.goods_name,
						goods_price: this.goods.goods_price,
						goods_small_logo: this.goods.goods_small_logo,
						goods_count: 1,
						goods_state: true,
					}
					this.$store.commit('m_cart/addToCart',goods)
				}
			},
			// 左侧图片点击事件
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 预览轮播图
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods.pics.map(item => {
						return item.pics_big
					})
				})
			},
			async getGoods(goods_id) {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (meta.status !== 200) return uni.$showMsg()
				message.goods_introduce = message.goods_introduce.replace(/<img/g, '<img style="display:block"')
				this.goods = message
			}
		},
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.info {
		padding: 6px;

		.price {
			color: #ea4350;
		}

		.mid {
			display: flex;
			margin: 6px 0;
			font-size: 12px;

			.favi {
				border-left: 1px solid #eee;
				width: 120px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
			}
		}

		.yf {
			font-size: 10px;
			color: gray;
		}
	}

	.goods-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
