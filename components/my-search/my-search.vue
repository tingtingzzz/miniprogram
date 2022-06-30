<template>
	<view class="search-bar">
		<view class="search-input" @click="clickHandel">
			<uni-icons type="search"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			clickHandel() {
				this.$emit('click')
			}
		},
	}
</script>

<style lang="scss">
	.search-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		background-color: #ea4350;

		.search-input {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 95%;
			height: 35px;
			border-radius: 30px;
			font-size: 12px;
			background-color: #fff;
		}
	}
</style>
