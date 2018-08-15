<template>
	<div class="tab border-bottom">
		<div class="tab-item"><router-link to="/goods">商品</router-link></div>
		<div class="tab-item"><router-link to="/ratings">评论</router-link></div>
		<div class="tab-item"><router-link to="/seller_info">商家</router-link></div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/mixin';
.tab {
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	@include border-bottom(rgba(7,17,27,.1));
	.tab-item {
		flex:1;
		text-align: center;
		a {
			font-size: 14px;
			color: #4D555D;
			&.active {
				color: #F01402;
			}
		}
		
	}
}
</style>