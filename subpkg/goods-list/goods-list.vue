<template>
	<view>
			<block v-for="(item,index) in goodsList" :key="index">
			<my-goods @click='goDetail' :goods='item'></my-goods>
			</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[],
				//  参数对象
				params: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				total:0,
				isLoading : false
			};
		},
		onLoad(options) {
			this.params.query = options.query || ''
			this.params.cid = options.cat_id || ''
			this.getGoodsList()
		},
		methods: {
			// 上拉加载
			onReachBottom(){
				if(this.params.pagenum * this.params.pagesize >= this.total){
					return uni.$showMsg('到底了 别拉了')
				}
				//  节流 在加载的 时候不翻页
				if(this.isLoading) return
				this.params.pagenum++
				this.getGoodsList()
			},
			// 下拉刷新
			onPullDownRefresh(){
				this.goodsList = []
				this.params.pagenum = 1
				this.getGoodsList(uni.stopPullDownRefresh)
			},
			// 跳转
			goDetail(item){
			uni.navigateTo({
				url:'/subpkg/goods-detail/goods-detail?goods_id=' +item.goods_id
			})
			},
			// 请求数据
		async	getGoodsList(fnn) {
			this.isLoading = true
			const {data:{message,meta}}	= await uni.$http.get('/api/public/v1/goods/search',this.params)
			this.isLoading = false
			//  判断是不是在下拉刷新中调用
			fnn && fnn()
			if(meta.status !== 200) return uni.$showMsg()
			this.total = message.total
			this.goodsList = [...this.goodsList,...message.goods]
			}
		},
	}
</script>

<style lang="scss">

</style>
