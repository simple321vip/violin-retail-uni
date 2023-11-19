<template>
	<view class="bg-gradual-light-blue order-index">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">商品</block>
			<block slot="right">
				<text class="text-xsl text-white cuIcon-plus"></text>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="total cu-bar padding-top-sm">
				<view class="margin-tb-sm text-center" v-for="(item,index) in CheckoutStatusList" :key="index" v-if="item.name!='white'">
					<button class="cu-btn round" :class="[bordersize?'lines-' + item.name:'line-' + item.name, shadow?'shadow':'']">{{item.title}}</button>
				</view>
			</view>
			<view class="total cu-bar flex flex-wrap">
				<view class="margin-tb-sm text-center" v-for="(item,index) in LabelList" :key="index" v-if="item.name!='white'">
					<button class="cu-btn round" >{{item.name}}</button>
				</view>
			</view>
			<view class="total cu-bar flex flex-wrap">
				<view class="margin-tb-sm text-center" v-for="(item,index) in CategoryList" :key="index" v-if="item.name!='white'">
					<button class="cu-btn round" >{{item.name}}</button>
				</view>
			</view>
		</scroll-view>
		<scroll-view :class="modalName!=null?'show':''" :style="[{'margin-top': '250px', 'padding-left': '10px', 'padding-right': '10px'}]">
			<block v-if="TabCur==0" >
				<view class="cu-list menu-avatar">
					<view class="cu-item" v-for="(item, index) in GoodsList" :key="index">
						<view class="cu-avatar lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view class="content">
							<view class="text-grey">{{ item. name}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									<text class="text-black margin-right-xs"></text>
									{{ item.label }}
								</view> 
								<view class="text-cut">
									<text class="text-black margin-right-xs"></text>
									{{ '零售价:' + item.kucun }}
								</view> 
							</view>
								
						</view>
						<view class="action">
							<view class="text-grey text-xs">库存</view>
							<view class="cu-tag round bg-grey sm">10</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				shadow: false,
				GoodsList: [
					{
						name: '钻石板',
						label: '兔宝宝',
						kucun: 10,
					},
					{
						name: '合成门',
						label: '全有',
						kucun: 10,
					}
				],
				CategoryList: [
					{
						name: '木门',
						id: '001',
					},
					{
						name: '地板',
						id: '002',
					},
					{
						name: '生态板',
						id: '003',
					},
					{
						name: '地脚线',
						id: '004',
					},
					{
						name: '扣板',
						id: '004',
					},
					{
						name: '石膏',
						id: '004',
					},
					{
						name: '门锁',
						id: '004',
					}
				],
				LabelList: [
					{
						name: '兔宝宝',
						id: '001',
					},
					{
						name: '全有',
						id: '002',
					},
					{
						name: '喜家德',
						id: '003',
					},
					{
						name: '埃森哲',
						id: '004',
					},
					{
						name: '埃森哲',
						id: '004',
					},
					{
						name: '埃森哲',
						id: '004',
					},
					{
						name: '埃森哲',
						id: '004',
					}
				],
				CheckoutStatusList: [
					{
						title: '全部类别',
						name: 'black',
						color: '#333333'
					},
					{
						title: '商家',
						name: 'black',
						color: '#333333'
					},
					{
						title: '品种',
						name: 'black',
						color: '#333333'
					},
				],
				bordersize: '',
				OrderIndexHeight: '3000px',
				modalName: null,
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				tabNav: ['出货', '退货'],
				DateOrderList: [
					{
						date: '2023-11-01',
						OrderList: [
							{
								name: '管祥玮',
								money: '1,000'
							},
							{
								name: '许家印',
								money: '1,500'
							}
						]
					},
					{
						date: '2023-11-02',
						OrderList: [
							{
								name: '管祥玮',
								money: '2,000'
							},
							{
								name: '张晓东',
								money: '3,500'
							}
						]
					},
					{
						date: '2023-11-03',
						OrderList: [
							{
								name: '小梦',
								money: '3,000'
							},
							{
								name: '西西里',
								money: '5,000'
							}
						]
					},
				]
			};
		},
		created() {
			uni.request({
				url: 'http://localhost:8080/finance/api/v1/order',
				method: 'GET',
				header: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log(res)
			}).finally(e => {
				console.log(e)
			})
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getOrderDetail() {
				uni.navigateTo({
					url: '/pages/goods/detail'
				})
			},
			searchIcon(e) {
				let key = e.detail.value.toLowerCase();
				console.log(e)
			}
		}
	}
</script>

<style>
	page {
		padding-top: 45px;
	}
	.order-index {
		height: 3000px;
	}
	.order-index > .nav {
		padding-left: 10px;
		padding-right: 10px;
		background-color: #d5e3f2;
	}
</style>
