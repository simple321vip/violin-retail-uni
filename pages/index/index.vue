<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<goods v-if="PageCur=='goods'"></goods>
		<basics v-if="PageCur=='basics'"></basics>
		<buy v-if="PageCur=='buy'"></buy>
		<components v-if="PageCur=='component'"></components>
		<order v-if="PageCur=='order'"></order>
		
		<customer v-if="PageCur=='customer'"></customer>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action text-green" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill"></view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="goods">
				<view class="cuIcon-similar"></view>
				<view :class="PageCur=='goods'?'text-green':'text-gray'">商品</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="component">
				<view class="cuIcon-similar"></view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">basics</view>
			</view>
			<view class="action text-gray add-action" @click="NavChange" data-cur="buy">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				下单
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="order">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				<view :class="PageCur=='order'?'text-green':'text-gray'">订单</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">入库</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="basics">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">货品</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
					PageCur: 'home'
				}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
