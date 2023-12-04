<template>
   <view class="bg-gradual-light-blue order-detail">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详细</block>
			<block slot="right">
				<view class="action" @click="onClicksaveCustomer">
					打印
				</view>
			</block>
		</cu-custom>
		<view class="cu-list bg-blue menu shadow">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 时间' }}</text>
				<text class="text-black">{{ order.OrderTime }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 客户' }}</text>
				<text class="text-black">{{ order.customer.Name }}</text>
			</view>
		</view>

		<view class="cu-list menu bg-white flex shadow">
			<view class="cu-bar">
				<view class="action">
					<text class="text-black">货品列表</text> 
				</view>
				<view class="action">
					<text class="text-black margin-right-sm">{{ '合计： 300，000' }}</text>
				</view>
			</view>
			<view class="flex padding align-start margin-left-sm" v-for="(item,index) in order.OrderProducts" :key="index" style="border-color: black;border-top:1px solid lightgray;">
				<view class="padding-top-sm flex-sub" style="display: flex;flex-direction: column;border-right:1px solid lightgray;">
					<text class="text-black">{{ index + 1 }}</text>
				</view>
				<view class="margin-xs radius flex-sub" style="display: flex;flex-direction: column;">
					<text class="text-black padding-bottom-sm">{{ item.ProductID }}</text>
					<!-- <text class="text-black">{{ item.Name }}</text> -->
				</view>
				<view class="margin-xs padding-left-sm padding-right-sm flex-treble" style="display: flex; flex-direction: column;border-left:1px solid lightgray;border-right:1px solid lightgray;">
					<!-- <text class="text-black">{{ '颜色：' + item.Color? item.Color.Name : '' }}</text> -->
					<text class="text-black">{{ '数量：' + item.mount }}</text>
					<text class="text-black">{{ '单价：' + item.RetailPrice }}</text>
				</view>
				<view class="margin-xs radius flex-sub align-end" style="display: flex; flex-direction: column;">
					<text class="text-black margin-bottom-sm">{{ '总计' }}</text>
					<text class="text-black">{{ item.price }}</text>
				</view>
			</view>
		</view>
		<view class="cu-list bg-blue menu shadow">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cart text-black padding-left-sm">{{ ' 折前金额' }}</text>
				<text class="text-black">{{ order.AccountsReceivable }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 打折率' }}</text>
				<text class="text-black">{{ '没有打折' }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cartfill text-black padding-left-sm">{{ ' 折后金额' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybag text-black padding-left-sm">{{ ' 应收金额' }}</text>
				<text class="text-black">{{ order.AccountsReceivable }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybagfill text-black padding-left-sm">{{ ' 实收金额' }}</text>
				<text class="text-black">{{ order.ActualAccountsReceivable }}</text>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="editOrder">
				<text class="cuIcon-edit"></text> 修改</button>
			<button class="cu-btn block line-orange lg" @click="deleteOrder">
				<text class="cuIcon-delete"></text> 删除</button>
		</view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				modalName: null,
				order: null,
				mode: null, // 开单进入则为0，订单一览则为1
			}
		},
		onLoad(option) {
			this.mode = option.mode
			this.order = JSON.parse(decodeURIComponent(option.order))
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			onClicksaveCustomer() {
				uni.navigateBack({
					url: '/pages/order/index'
				})
			},
			editOrder() {
				console.log(typeof(this.mode))
				if (this.mode === 0) {
					let pages = getCurrentPages()
					let nowPage = pages[pages.length -1] // 当前页实例
					let prevPage = pages[pages.length -2] // 上一页面实例
					uni.navigateBack({
						delta:1 ,// 可以不写，默认值为 1
					})
				} 
				if (this.mode === '0') {
					uni.navigateTo({
						url: '/pages/order/buy?mode=1'
					})
				}

			},
			deleteOrder() {
				
			}
		}
	}
</script> 

<style>
	
	
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
	
	.switch-sex::after {
		content: "\e716";
	}
	
	.switch-sex::before {
		content: "\e7a9";
	}
	
	.switch-music::after {
		content: "\e66a";
	}
	
	.switch-music::before {
		content: "\e6db";
	}
	.order-detail {
		height: 2000px;
	}
	.order-detail > .cu-list {
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		border-radius: 5px;
	}
</style>
