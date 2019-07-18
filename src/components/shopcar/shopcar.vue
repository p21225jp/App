<template>
	<div class="shopcar">
		<div class="left-wrapper">
			<div class="shopcar-button-wrapper">
				<div class="shopcar-button">
					<i class="icon-shopping_cart"></i>
				</div>
			</div>
			<div class="total-price"></div>
			<div class="ext"></div>
		</div>
		<div class="right-wrapper"></div>
	</div>
</template>
<script>
	import Icon from "@/components/icon/icon"
	export default {}
</script>
<style scoped lang="scss">
@import "../../assets/scss/public";
@import "../../assets/scss/mixin";
.shopcar {
	position: fixed;
	display: flex;
	width: 100%;
	bottom: 0;
	z-index: 49;
	height: 48px;
	background-color: #141d27;
	font-size: 0;
	.left-wrapper {
		flex: 1;
		.shopcar-button-wrapper {
			width: 56px;
			height: 56px;
			box-sizing: border-box;
			display: inline-block;
			margin:0 12px;
			padding: 6px;
			border-radius: 50%;
			position: relative;
			top: -10px;
			vertical-align: top;
			background: #131d26;
			.shopcar-button {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #2b343c;
				text-align: center;
				.icon-shopping_cart {
					color: #80858a;
					font-size: 24px;
					line-height: 44px;
				}
			}
		}
		.total-price {
			
		}

	}
	.right-wrapper {
		flex: 0 0 105px;
		width: 105px;
	}
}
</style>