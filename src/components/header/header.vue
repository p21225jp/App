<template>
	<div class="header">
		<div class="seller-info">
			<div class="avatar">
				<img :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="description">
					{{ seller.description }} / {{ seller.deliveryTime }}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="description">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="more-supports" @click="showDetali">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-warpper" @click="showDetali">
			   <span class="pic"></span><span class="text">{{ seller.bulletin }}</span><i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ seller.name }}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="test">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="(support,index) in seller.supports" class="support-item" :key="index">
								<span class="icon" :class="classMap[support.type]"></span>
								<span class="description">{{support.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="test">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content"> {{ seller.bulletin }}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="closeDetail"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Star from "@/components/star/star"
const ERR_OK = 0
export default {
	data: function () {
		return {
			seller: {},
			detailShow: false
		}
	},
	components: {
		Star
	},
	created() {
		this.classMap = ['decrease','discount','special','invoice','guarantee']
		this.$http.get('api/seller').then((response) => {
			response = response.data
			if (response.errno === ERR_OK) {
				this.seller = response.data
			}
		})
	},
	methods:{
		showDetali() {
			this.detailShow = true
		},
		closeDetail() {
			this.detailShow = false
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/mixin";
.header {
	color: #FFF;
	background: rgba(7,17,27,0.5);
	position: relative;
	overflow: hidden;
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter:blur(10px);
	}
	.detail {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(7,17,27,0.8);
		backdrop-filter: blur(10px);
		opacity: 1;
		&.fade-enter-active, &.fade-leave-active {
			transition: all 0.5s;
		}
		&.fade-enter, &.fade-leave-active {
			opacity: 0;
        	background: rgba(7, 17, 27, 0);
		}
		.detail-wrapper {
			width: 100%;
			min-height: 100%;
			.detail-main {
				margin-top: 64px;
				padding: 0 36px 64px;
				.name {
					font-size: 16px;
					font-weight: 700;
					line-height: 16px;
					text-align: center;
					margin-bottom: 16px;
				}
				.star-wrapper {
					text-align: center;
					margin-bottom: 28px;
				}
				.title {
					text-align: center;
					display: flex;
					margin-bottom: 24px;
					.line {
						flex: 1;
			            position: relative;
			            top: -6px;
			            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
					}
					.test {
						padding: 0 12px;
              			font-size: 14px;
              			font-weight: 700;
					}
				}
				.supports {
					padding: 0 12px;
					margin-bottom: 28px;
					.support-item {
						margin-bottom: 12px;
						font-size: 0;
						.icon {
							display: inline-block;
							vertical-align: top;
							width: 16px;
							height: 16px;
							margin-right: 6px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
							&.decrease {
								@include bg-image('decrease_2');
							}
							&.discount {
								@include bg-image('discount_2');
							}
							&.guarantee {
								@include bg-image('guarantee_2');
							}
							&.invoice {
								@include bg-image('invoice_2');
							}
							&.special {
								@include bg-image('special_2');
							}
						}
						.description {
							font-size: 12px;
							line-height: 16px;
						}
					}
					&:last-child {
						margin-bottom: 0;
					}
				}
				.bulletin {
					padding: 0 12px;
					.content {
						font-size: 12px;
						line-height: 24px;
					}
				}
			}
		}
		.detail-close {
			position: relative;
	        width: 32px;
	        height: 32px;
	        margin: -64px auto 0 auto;
	        clear: both;
	        font-size: 32px;
	        color: rgba(255,255,255,0.5);
		}
	}
	.seller-info {
		padding:24px 12px 18px 24px;
		font-size: 0;
		position: relative;
		.avatar {
			display: inline-block;
			vertical-align: top;
			margin-right: 16px;
			img {
				width: 64px;
				height: 64px;
				border-radius: 4px;
			}
		}
		.content {
			display: inline-block;
			padding:2px 0 2px 0;
			.title {
				margin-bottom: 8px;
				.brand {
					display: inline-block;
					vertical-align: top;
					margin-right: 6px;
					width: 30px;
					height: 18px;
					background-size: 30px 18px;
					@include bg-image('brand');
					background-repeat: no-repeat;
				}
				.name {
					font-size: 16px;
					font-weight: bold;
					line-height: 18px;
				}
			}
			& > .description {
				font-size: 12px;
				line-height: 12px;
				margin-bottom: 10px;
			}
			.supports {
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 4px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						@include bg-image('decrease_1');
					}
					&.discount {
						@include bg-image('discount_1');
					}
					&.guarantee {
						@include bg-image('guarantee_1');
					}
					&.invoice {
						@include bg-image('invoice_1');
					}
					&.special {
						@include bg-image('special_1');
					}
				}
				& > .description {
					font-size: 10px;
					line-height: 12px;
				}
			}
		}
		.more-supports {
			position: absolute;
			right: 12px;
			bottom: 18px;
			height: 24px;
			line-height: 24px;
			padding: 0 8px;
			border-radius: 14px;
			background-color: rgba(0,0,0,0.2);
			text-align: center;
			.count{
				vertical-align: top;
				font-size: 10px;
				margin-right: 2px;
			}
			.icon-keyboard_arrow_right {
				line-height: 24px;
				font-size: 10px;
			}
		}
	}
	.bulletin-warpper {
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: rgba(7,17,27,0.2);
		position: relative;
		.pic {
			display: inline-block;
			vertical-align: top;
			width: 22px;
			height: 12px;
			background-size: 22px 12px;
			@include bg-image('bulletin');
			background-repeat: no-repeat;
			margin-right: 4px;
			margin-top: 8px;
		}
		.text {
			vertical-align: top;
			font-size: 10px;
			line-height: 28px;
		}
		.icon-keyboard_arrow_right {
			position: absolute;
			font-size: 10px;
			right: 12px;
			top: 8px;
		}
	}
}
</style>