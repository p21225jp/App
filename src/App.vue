<template>
  <div id="app">
    <app-header :seller="seller"></app-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header/header"
import Tab from "@/components/tab/tab"
const ERR_OK = 0
export default {
	data() {
		return {
			seller:{}
		}
	},
	components: {
		"app-header":Header,
	    Tab
	},
	created() {
		this.$http.get('api/seller').then((response) => {
			response = response.data
			if (response.errno === ERR_OK) {
				this.seller = response.data
			}
		})
	}
}

</script>

<style lang="scss">
@import './assets/scss/public';
@import './assets/scss/icon';
</style>
