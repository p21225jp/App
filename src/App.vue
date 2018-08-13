<template>
  <div id="app">
    <app-header></app-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header/header"
import Tab from "@/components/tab/tab"
export default {
  components: {
    "app-header":Header,
    Tab
  }
}

</script>

<style lang="scss">
@import './assets/scss/public';
@import './assets/scss/icon';
</style>
