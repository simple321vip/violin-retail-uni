<template>
	<view class="bg-gradual-light-blue order-index">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">订单</block>
			<block slot="right">
				<text class="text-xsl text-white cuIcon-filter"></text>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
			<view class="cu-bar solid-bottom">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="手机号/客户名/日期" confirm-type="search" @input="searchIcon"></input>
				</view>
			</view>
			
			<view class="total cu-bar padding" style="display: flex; flex-direction: column; align-items: flex-start;">
				
				<view class="cu-list solid-bottom flex" >
					<view class="text-cut cuIcon-title padding-sm radius text-black">合计</view>
					<view class="padding-sm radius text-black">30,000,000</view>
				</view>
				
				<view class="action">
					<view class="grid col-3">
						<view class="margin-tb-sm text-center" v-for="(item,index) in CheckoutStatusList" :key="index" v-if="item.name!='white'">
							<button class="cu-btn round" :class="[bordersize?'lines-' + item.name:'line-' + item.name, shadow?'shadow':'']">{{item.title}}</button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view :class="modalName!=null?'show':''" :style="[{'margin-top': '230px', 'padding-left': '10px', 'padding-right': '10px'}]">
			<block v-if="TabCur==0" >
				<view class="cu-list menu-avatar" style="border-radius: 10px;" v-for="(item,index) in DateOrderList" :key="index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-gray"></text>
							<view class="text-cut text-black">
								{{ item.date }}
							</view>
						</view>
					</view>
					<view class="cu-item bg-white" @click="getOrderDetail" v-for="(item1,index1) in item.OrderList" :key="index1">
						<view class="cu-avatar">管</view>
						<view class="content">
							<view class="text-black">{{ item1.name }}</view>
							<view class="text-black text-sm flex">
								<view class="text-cut">
									我已天理为凭。
								</view> </view>
						</view>
						<view class="action">
							<view class="text-black">{{ item1.money }}</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "order",
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				shadow: false,
				CheckoutStatusList: [
					{
						title: '全部',
						name: 'black',
						color: '#333333'
					},
					{
						title: '结清',
						name: 'black',
						color: '#333333'
					},
					{
						title: '未结清',
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
					url: '/pages/order/detail'
				})
			},
			searchIcon(e) {
				let key = e.detail.value.toLowerCase();
				console.log(e)
				// let list = this.cuIcon;
				// for (let i = 0; i < list.length; i++) {
				// 	let a = key;
				// 	let b = list[i].name.toLowerCase();
				// 	if (b.search(a) != -1) {
				// 		list[i].isShow = true
				// 	} else {
				// 		list[i].isShow = false
				// 	}
				// }
				// this.cuIcon = list
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
