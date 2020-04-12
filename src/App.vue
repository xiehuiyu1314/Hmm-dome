<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="less">
@import url("./style/base.css");
html,
body,
#app {
  height: 100%;
}
</style>
