<template>
   <view class="bg-gradual-light-blue order-add">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">开单</block>
			<block slot="right">
				<view class="action" @click="onClicksaveCustomer">
					打印
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
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
				<text class="text-black">{{ customer != null ? customer.Name : '未选择' }}</text>
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
			<view class="flex padding align-start margin-left-sm" v-for="(item,index) in GoodList" :key="index" style="border-color: black;border-top:1px solid lightgray;">
				<view class="padding-top-sm flex-sub" style="display: flex;flex-direction: column;border-right:1px solid lightgray;">
					<text class="text-black">{{ index + 1 }}</text>
				</view>
				<view class="margin-xs radius flex-sub" style="display: flex;flex-direction: column;">
					<text class="text-black padding-bottom-sm">{{ item.label }}</text>
					<text class="text-black">{{ item.name }}</text>
				</view>
				<view class="margin-xs padding-left-sm padding-right-sm flex-treble" style="display: flex; flex-direction: column;border-left:1px solid lightgray;border-right:1px solid lightgray;">
					<text class="text-black">{{ '颜色：' + item.color }}</text>
					<text class="text-black">{{ '数量：' + item.mount }}</text>
					<text class="text-black">{{ '单价：' + item.price }}</text>
				</view>
				<view class="margin-xs radius flex-sub align-end" style="display: flex; flex-direction: column;">
					<text class="text-black margin-bottom-sm">{{ '总计' }}</text>
					<text class="text-black">{{ item.price }}</text>
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
			<button class="cu-btn block line-orange lg">
				<text class="cuIcon-upload"></text> 保存</button>
			<button class="cu-btn block bg-blue margin-tb-sm lg">
				<text class="cuIcon-loading2 cuIconfont-spin"></text> 生成支付码</button>
			<button class="cu-btn block bg-black margin-tb-sm lg" loading> 支付完毕</button>
		</view>
    </view>
</template>

<script>
	import { Request } from "../../api/request.js"
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
				tabNav: ['出货', '退货'],
				GoodList: [
					{
						name: '实木版',
						category: '地板',
						label: '兔宝宝',
						color: '橡木色',
						mount: 5,
						price: 200,
						total: 1000,
					},
					{
						name: '实木版',
						category: '地板',
						label: '兔宝宝',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					},
				],
				customer: null
			}
		},
		created() {
			// Request({
			// 	url: '/api/v1/customers',
			// 	method: 'GET',
			// 	header: {
			// 		'Content-Type': 'application/json'
			// 	}
			// }).then(res => {
			// 	if (res) {
			// 		customers = res.data.Data
			// 	}
			// }).finally(e => {
			// 	console.log(e)
			// })
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
				this.customer = customer
			},
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
