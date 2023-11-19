<template name="home">
    <view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 快速入口
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="Gridchange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in 3" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{index +3}} 列</view>
								<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">边框</text>
						</view>
						<view class="action">
							<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="turn2Detial(item.url)">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
    </view>
</template>
<script>
	export default {
        name: "home",
		data() {
			return {
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '客户',
					url: '/pages/customer/index',
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像',
					url: '',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像',
					url: '',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知',
					url: '',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜',
					url: '',
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤',
					url: '',
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
			turn2Detial(url) {
				uni.navigateTo({
					url: url
				})
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