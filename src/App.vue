<template>
  <div id="app">
    <router-view />
    <!-- <router-link to="/">Home</router-link> -->
    <Footer />
  </div>
</template>

<script>
import Footer from "./views/Footer.vue";
export default {
  components: { Footer },
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
}

ul {
  list-style-type: none;
}
</style>
