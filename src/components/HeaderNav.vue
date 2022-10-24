<template>
      <div class="header-nav">
      <div>
        <span>欢迎来到贝壳精选</span>
        <span @click="goLogin">请登录</span>
        <span @click="goRegister">免费注册</span>
      </div>
      <div>
        <span>首页</span>| <span>购物车(0)</span>|
        <span>我的订单</span>
      </div>
    </div>
</template>

<script>
export default {

  methods: {
        goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
  }
}
</script>

<style lang="less" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;

  div {
    margin: 10px;
    display: flex;
    gap: 30px;
  }

  div:first-child span:not(:first-child) {
    color: blue;
    cursor: pointer;
  }
}
</style>