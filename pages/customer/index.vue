<template name="home">
	
    <view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">{{ contentText }}</block>
				<block slot="right">
					<!-- <uni-icons :type="item.name" :color="activeIndex === index?'#007aff':'#5e6d82'" size="30" /> -->
					<!-- <uni-icons type="arrow-down" color="#5e6d82" size="30" /> -->
					<view class="action" @click="onClickAddCustomer">
						+
					</view>
				</block>
			</cu-custom>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 列表左滑
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item, index) in customers" :key="index" @click="onClick(item)"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
					<view class="content">
						<view class="text-grey">{{ item.Name }}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-grey sm">5</view>
					</view>
					<view class="move">
						<view class="bg-grey">销售单</view>
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
		</scroll-view>
    </view>
</template>
<script>
	import { Request } from "../../api/request.js"
	export default {
        name: "customer",
		data() {
			return {
				mode: null, // 客户管理入口进入则为0，订单选择入口则为1
				contentText: '', // 页面标题
				customers: null, // 客户一览
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}],
				iconClassList: [{
					"name": "arrow-down",
					"unicode": "e6be"
				}, {
					"name": "arrow-left",
					"unicode": "e6bc",
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		onLoad(option) {
			this.mode = option.mode
			if (this.mode == "1") {
				this.contentText = "客户选择"
			}
			if (this.mode == "0") {
				this.contentText = "客户管理"
			}
		},
		async created() {
			let res = await Request({
				url: '/api/v1/customers',
				method: 'GET',
				header: {
					'Content-Type': 'application/json'
				}
			})
			if (res) {
				this.customers = res.data.Data
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			onClickAddCustomer() {
				uni.navigateTo({
					url: '/pages/customer/add'
				})
			},
			onClick(customer) {
				let pages = getCurrentPages()
				let nowPage = pages[pages.length -1] // 当前页实例
				let prevPage = pages[pages.length -2] // 上一页面实例
				// 需要返回 上一页的数据 Object
				
				if (this.mode == "1") {
					// 由于 上一页面是首页，而buy页面是子元素，我们通过添加refs 找到buy元素来回调
					prevPage.$refs.buy.setCustomer(customer)
					// 返回 上一页
					uni.navigateBack({
						delta:1 ,// 可以不写，默认值为 1
					})
				}
				// }
				// if (this.mode == "0") {
				// 	this.contentText = "客户管理"
				// }
			}
		}
	}
</script>

<style>
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
</style>