<template>
   <view class="bg-gradual-light-blue order-detail">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">商品详细</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">未命名</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
						</view> </view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
		</view>
		
		<view class="cu-list bg-blue menu shadow">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-goodsfill text-black padding-left-sm">{{ ' 商品名称' }}</text>
				<text class="text-black">2023-11-03</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 商品类别' }}</text>
				<text class="text-black">观想为</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 单位' }}</text>
				<text class="text-black">观想为</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 当前库存' }}</text>
				<text class="text-black">观想为</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 当前库存' }}</text>
				<text class="text-black">观想为</text>
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
		</view>
		<view class="cu-list bg-blue menu shadow">
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cart text-black padding-left-sm">{{ ' 进货价' }}</text>
				<text class="text-black">{{ '30,000' }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-circlefill text-black padding-left-sm">{{ ' 零售价' }}</text>
				<text class="text-black">{{ '9 折' }}</text>
			</view>
			<view class="cu-item padding-sm solid-bottom">
				<text class="cuIcon-cartfill text-black padding-left-sm">{{ ' 批发价' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybag text-black padding-left-sm">{{ ' 应收金额' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
			<view class="cu-item padding-sm">
				<text class="cuIcon-moneybagfill text-black padding-left-sm">{{ ' 实收金额' }}</text>
				<text class="text-black">{{ '27,000' }}</text>
			</view>
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
					{
						name: '合成门',
						category: '木门',
						label: '橡树',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					},
					{
						name: '合成门',
						category: '木门',
						label: '橡树',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					},
					{
						name: '合成门',
						category: '木门',
						label: '橡树',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					},
					{
						name: '合成门',
						category: '木门',
						label: '橡树',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					},
					{
						name: '合成门',
						category: '木门',
						label: '橡树',
						color: '桦木色',
						mount: 3,
						price: 230,
						total: 690,
					}
				]
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			onClicksaveCustomer() {
				uni.navigateBack({
					url: '/pages/order/index'
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
