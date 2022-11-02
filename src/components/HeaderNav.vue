<template>
  <div class="header-nav-bg">
    <div class="header-nav">
      <div>
        <span>Hi!欢迎来到贝壳精选!</span>
        <span>请<span @click="goLogin" class="blue-text">登录</span></span>
        <span @click="goRegister" class="blue-text">免费注册</span>
      </div>
      <div>
        <span style="cursor: pointer;">首页</span>|<span class="shop-car-text"
          >购物车&nbsp<span class="number-text">({{ 0 }})</span></span
        >|
        <span>我的订单</span>
      </div>
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
  },
};
</script>

<style lang="less" scoped>
.header-nav-bg {
  width: 100vw;
  background: #f8f9fe;
  .header-nav {
    width: calc(100vw - 720px);
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: #666666;
      font-size: 14px;
      line-height: 24px;
    }

    div {
      display: flex;
      gap: 20px;

      .blue-text {
        color: #2979ff;
            cursor: pointer;

      }

      .shop-car-text {
        .number-text {
          color: #f8494d;
        }
      }

      .shop-car-text::before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;
        transform: translate(-8px,2px);
        background: url("../assets/img/shop-car-img.png");
        background-size:cover;
      }
    }
  }
}
</style>
