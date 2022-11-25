<template>
  <div class="header-nav-bg">
    <div class="header-nav">
      <div class="login-box" v-show="!notLogin">
        <span>Hi!欢迎来到贝壳精选!</span>
        <span>请<span @click="goLogin" class="blue-text">登录</span></span>
        <span @click="goRegister" class="blue-text">注册</span>
      </div>
      <div class="login-box" v-show="notLogin">
        <span>Hi!欢迎来到贝壳精选!</span>
        <span  class="blue-text">{{ realname }}</span><span>您已登录</span>
        <span>所在公司:</span><span class="blue-text">{{ companyName }}</span>
      </div>
      <div>
        <span style="cursor: pointer" @click="goHome">首页&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
        <span style="cursor: pointer" @click="goPersonConfig">个人中心&nbsp</span>
        <!-- &nbsp|&nbsp&nbsp&nbsp
        <span
          class="shop-car-text"
          >购物车&nbsp<span class="number-text">({{ 0 }})&nbsp</span>
          </span
        >|&nbsp
        <span @click="goMySettlementPage">我的订单</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notLogin: false,
      realname: localStorage.realname,
      companyName: localStorage.companyName,
    };
  },
  methods: {
        goHome() {
      this.$router.push({
        name: "home",
      });
    },
    goPersonConfig() {
      this.$router.push({
        name: "enterprise-certification",
      });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    goMySettlementPage() {
      this.$router.push({ name: "settlement-page" });
    },
  },

  mounted() {
    this.notLogin = localStorage.getItem("token") ? true : false;
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}
.header-nav-bg {
  background: #f8f9fe;
  .header-nav {
    width:  62.5%;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: #666666;
      font-size: 14px;
      line-height: 24px;
      font-family: alibaba-Regular;
    }

    .login-box {
      display: flex;
      gap: 20px;

      .blue-text {
        color: #2979ff;
        cursor: pointer;
      }
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
      transform: translate(-8px, 2px);
      background: url("../assets/img/shop-car-img.png");
      background-size: cover;
    }
  }
}
</style>
