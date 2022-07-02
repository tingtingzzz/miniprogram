<template>
	<view @click="qwe">
		<view class="goods-item">
			<radio :checked="goods.goods_state" color="#ea4359" class="radio"></radio>
			<!-- 左边 -->
			<view class="left">
				<image :src="goods.goods_small_logo || '/static/images/empty.png' "></image>
			</view>
			<!-- 右边-->
			<view class="right">
				<!-- 标题 -->
				<view class="title">{{goods.goods_name}}</view>
				<view class="button">
					<!-- 价格 -->
					<view class="price">￥{{goods.goods_price}}</view>
					<!-- anniu -->
					<block>
						<uni-number-box :value="goods.goods_count"></uni-number-box>
					</block>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			qwe() {
				this.$emit('click', this.goods)
			}
		},
	}
</script>

<style lang="scss">
	.left {
		margin-right: 10px;
	}

	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		align-items: center;


		image {
			width: 100px;
			height: 100px;
			display: block;
		}
	}

	.right {
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.button {

			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.price {
			font-size: 16px;
			color: red;
		}

		.title {
			font-size: 12px;
		}
	}
</style>
