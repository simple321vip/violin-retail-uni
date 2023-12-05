<template>
   <view class="bg-gradual-light-blue order-add">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ contentText }}</block>
			<block slot="right">
				<view class="action" @click="openPrint">
					打印
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect(index)"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
		</scroll-view>
		<view class="cu-list bg-blue menu shadow margin-left-sm margin-right-sm" style="margin-top: 50px;">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 时间' }}</text>
				<text class="text-black">2023-11-03</text>
			</view>
			<view class="cu-item padding-sm" @click="openCustomerSelecter">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 客户' }}</text>
				<text class="text-black">{{ this.order.customer != null ? this.order.customer.Name : '未选择' }}</text>
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
					<text class="text-black padding-bottom-sm">{{ item.Name }}</text>
					<text class="text-black">{{ item.Name }}</text>
				</view>
				<view class="margin-xs padding-left-sm padding-right-sm flex-treble" style="display: flex; flex-direction: column;border-left:1px solid lightgray;border-right:1px solid lightgray;">
					<!-- <text class="text-black">{{ '颜色：' + item.Color.Name }}</text> -->
					<text class="text-black">{{ '数量：' + item.Quantity }}</text>
					<text class="text-black">{{ '单价：' + item.RetailPrice }}</text>
				</view>
				<view class="margin-xs radius flex-sub align-end" style="display: flex; flex-direction: column;">
					<text class="text-black margin-bottom-sm">{{ item.Quantity * item.RetailPrice }}</text>
					<text class="text-black">{{ item.RetailPrice }}</text>
				</view>
			</view>
			<view class="cu-bar">
				<view class="action">
					<text class="text-black">扫码添加</text> 
				</view>
				<view class="action" @click="openGoodsSelecter">
					<text class="text-black margin-right-sm">{{ '添加商品' }}</text>
				</view>
			</view>
		</view>
		<view class="cu-list bg-blue menu shadow">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cart text-black padding-left-sm">{{ ' 折前金额' }}</text>
				<text class="text-black">{{ '30,000' }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 打折率' }}</text>
				<text class="text-black">{{ '9 折' }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cartfill text-black padding-left-sm">{{ ' 折后金额' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybag text-black padding-left-sm">{{ ' 应收金额' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybagfill text-black padding-left-sm">{{ ' 实收金额' }}</text>
				<text class="text-black">{{ '0' }}</text>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block line-orange lg" @click="saveOrder">
				<text class="cuIcon-upload"></text> 保存</button>
			<button class="cu-btn block bg-blue margin-tb-sm lg">
				<text class="cuIcon-loading2 cuIconfont-spin"></text> 生成支付码</button>
			<button class="cu-btn block bg-black margin-tb-sm lg" loading> 支付完毕</button>
		</view>
    </view>
</template>

<script>
	import { Request } from "../../api/request.js"
	import { g } from "../../utils/constant.js"
	export default {
		name: "buy",
		data() {
			return {
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				modalName: null,
				CustomBar: this.CustomBar,
				TabCur: 0,
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg'],
				mode: g.SALE,
				contentText: '开单',
				tabNav: ['销售', '退货'],
				order: {
					ID: null,
					customer: null,
					OrderType: 0,
					OrderProducts: [],
					AccountsReceivable: null,
					ActualAccountsReceivable: null,
					ActualRefund: null,
					Refund: null,
					Freight: null,
					Comment: null
				}
			}
		},
		onLoad(option) {
			if (option && option.mode === '1') {
				this.mode = option.mode
				this.contentText = '修改销售单'
			}
			if (option && option.mode === '1') {
				this.mode = option.mode
				this.contentText = '修改销售单'
			}
		},
		created() {

		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			openPrint() {
				uni.navigateBack({
					url: '/pages/order/index'
				})
			},
			tabSelect(index) {
				this.order.OrderType = index
			},
			openCustomerSelecter() {
				uni.navigateTo({
					url: '/pages/customer/index?mode=1'
				})
			},
			openGoodsSelecter() {
				uni.navigateTo({
					url: '/pages/goods/index?mode=1'
				})
			},
			setCustomer(customer) {
				this.order.customer = customer
			},
			setProduct(product) {
				this.order.OrderProducts.push(product)
			},
			saveOrder() {
				if (this.order.customer == null) {
					uni.showToast({
						title: '请选择客户',
						duration: 2000
					});
					// uni.hideLoading()
					return
				}
				if (this.order.OrderProducts == null || this.order.OrderProducts.length == 0) {
					uni.showToast({
						title: '请添加商品',
						duration: 2000
					});
					return
				}
				
				this.order.Comment = 'xxxxx'
				let res = Request({
					url: '/api/v1/order',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: this.order
				})
				res.then(r => {
					this.order.ID = r.data.Data
					uni.navigateTo({
						// object parameter
						url: '/pages/order/detail?mode=0&order=' + encodeURIComponent(JSON.stringify(this.order))
					})
				})
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
	
	.order-add > .cu-list {
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		border-radius: 5px;
	}
	
</style>
