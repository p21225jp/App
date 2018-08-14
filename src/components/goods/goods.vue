<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul class="menu">
				<li v-for="(item,index) in goods" class="menu-item">
					<span class="text">
						<icon :size="3" :type="item.type" v-show="item.type>0"></icon>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper">
			<ul>
				<li v-for="item in goods" class="goods-item">
					<h1 class="title">{{ item.name }}</h1>
					<ul>
						<li v-for="food in item.foods" class="food">
							<div class="food-img">
								<img :src="food.icon">
							</div>
							<div class="food-content">
								<div class="name">{{food.name}}</div>
								<div class="description">{{food.description}}</div>
								<div class="sell-count">
									<span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Icon from "@/components/icon/icon"
const ERR_OK = 0
export default {
	data() {
		return {
			goods:[]
		}
	},
	props: {
		seller: {
			type:Object
		}
	},
	components:{
		Icon
	},
	created() {
		this.$http.get('api/goods').then((response) => {
			response = response.data
			if (response.errno === ERR_OK) {
				this.goods = response.data
			}
		})
	}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/mixin";
.goods {
	display: flex;
	position: absolute;
	top: 174px;
	bottom: 0;
	width: 100%;
	overflow: hidden;
	.menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background-color: #F3F5F7;
		.menu-item {
			display: table;
			width: 56px;
			height: 54px;
			padding: 0 12px;
			line-height: 14px;
			color: rgb(7,17,27);
			.text {
				display: table-cell;
				width: 56px;
				vertical-align: middle;
				font-size: 12px;
				@include border-bottom(rgba(7,17,27,.1));
			}
		}
	}
	.goods-wrapper {
		flex:1;
	}
}
</style>