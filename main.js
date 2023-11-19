import Vue from 'vue'
import App from './App'

import home from './pages/home/index.vue'
Vue.component('home', home)

import goods from './pages/goods/index.vue'
Vue.component('goods', goods)

import basics from './pages/basics/home.vue'
Vue.component('basics', basics)

import components from './pages/component/home.vue'
Vue.component('components', components)

import order from './pages/order/index.vue'
Vue.component('order', order)

import buy from './pages/order/buy.vue'
Vue.component('buy', buy)

import customer from './pages/customer/index.vue'
Vue.component('customer',customer)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



