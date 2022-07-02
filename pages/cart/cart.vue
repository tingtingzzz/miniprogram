<template>
	<view>
		<!-- 购物车列表 -->
		<view class="cart">
			<!-- 标题 -->
			<view class="catr-title">
				<uni-icons type='shop' size="20"></uni-icons>
				<text>购物车</text>
			</view>
			<!-- 列表 -->
			<view class="cart-list">
				<uni-swipe-action>
					<block v-for="(item,index) in cart" :key="index">
						<uni-swipe-action-item>
							<my-goods :goods="item"></my-goods>
						</uni-swipe-action-item>
					</block>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cart: this.$store.state.m_cart.cart
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		.catr-title {
			height: 40px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			font-size: 12px;
			margin-left: 6px;
		}
	}
</style>
