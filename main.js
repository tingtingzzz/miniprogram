import Vue from 'vue'
import App from './App'
import store from './store/store.js'
//  配置请求包
// 1. 引入
import {
	$http
} from '@escook/request-miniprogram'
// 2.设置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 3.设置请求拦截器 - 加载弹窗
$http.beforeRequest = function() {
	uni.showLoading({
		title: '加载中.......'
	})
}
$http.afterRequest = function() {
	uni.hideLoading()
}
// 4.将配置好的$http配置到全局
uni.$http = $http
// 封裝彈窗
uni.$showMsg = function(title = '獲取失敗...') {
	uni.showToast({
		title,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
