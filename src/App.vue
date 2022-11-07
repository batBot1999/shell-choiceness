<template>
  <div id="app">
    <link rel="icon" href="../public/favicon.ico">
    <router-view />
    <!-- <router-link to="/">Home</router-link> -->

  </div>
</template>

<script>

export default {

};
</script>

<style lang="less">
* {
  padding: 0px;
  margin: 0px;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

ul {
  list-style-type: none;
}

span p {
  font-family: Microsoft YaHei-Regular;
}
</style>
