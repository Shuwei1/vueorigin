<template>
  <div id="app">
    <router-view/>
  </div>

</template>
<script>
  export default {
    name: 'App'
  }

</script>
<style lang="scss">
  // 引入页面样式
  @import url('../src/scss/index.css');
  @import url('../src/scss/common.css');
  @import url('../src/scss/login.css');

</style>
