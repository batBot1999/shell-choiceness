<template>
  <div>
    <!-- <div class="header-nav">
      <div class="shell-choiceness">贝壳精选</div>
      <div>
        <span>首页</span>| <span>购物车(0)</span>|
        <span>我的订单</span>
      </div>
    </div> -->
    <HeaderNav />
    <span class="settlement-text">结算</span>
    <p class="p-title">送货方式</p>
    <div class="settlement-content">
      <div class="settlement-content-left">
        <div class="deliver-box">
          <div class="deliver-box-top">
            <div class="left-son-box">
              <p>普通送货</p>
              <p>标准配送，下单后通过货车或包裹形式送达</p>
            </div>
            <div class="right-son-box">选择其他配送方式&nbsp</div>
          </div>
          <div class="deliver-box-bottom">
            <div>
              <p class="deliver-box-title">收货人</p>
              <p>张三</p>
              <p>&nbsp</p>
              <p class="deliver-box-title">收货地址</p>
              <p>浙江省杭州市滨江区民生医药A幢1楼111室</p>
            </div>
            <div class="right-son-box">更换收货地址&nbsp</div>
          </div>
        </div>

        <p class="p-title2">商品清单</p>
        <p>订单编号:202210170001</p>
        <div>2</div>

        <p class="p-title2">温馨提示</p>
        <div>若您有任何疑问可联系客服,联系电话0571-86658025</div>
      </div>
      <div class="settlement-content-right">2</div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import HeaderNav from "../components/HeaderNav.vue";
export default {
  components: {
    Footer,
    HeaderNav,
  },
  data() {
    return {};
  },
  methods: {
        goHome () {
      this.$router.push({
        name: "home",
      })
    },
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
// .header-nav {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// .shell-choiceness {
//   width: 150px;
//   height: 36px;
//   line-height: 36px;
//   background: #0e6ebe;
//   color: #fff;
//   height: 60px;
//   text-align: center;
//   line-height: 60px;
//   font-size: 20px;
// }

// div {
//   margin: 30px;
//   gap: 30px;
// }

// div:last-child {
//   display: flex;
// }

// div:first-child span:not(:first-child) {
//   color: blue;
//   cursor: pointer;
// }
// }

.settlement-text {
  font-weight: bold;
  font-size: 30px;
  margin-left: 30px;
}

.p-title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
  margin-top: 20px;
}

.settlement-content {
  width: calc(100vw - 100px);
  margin: 20px auto 0;
  display: flex;

  .settlement-content-left {
    width: 60%;

    .deliver-box {
      width: 100%;
      background: #f4f4f4;
      padding-bottom: 30px;
      .deliver-box-top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 20px;
          // border-bottom: 1px solid black;


        .left-son-box {
          margin-left: 50px;
          text-align: start;
          p:first-child {
            font-size: 20px;
            font-weight: bold;
          }
          p:last-child {
            color: #757678;
          }
        }

        .left-son-box:before {
          content: "";
          display: block;
          width: 30px;
          height: 30px;
          background: url("../assets/img/货车.png");
          background-size: cover;
          transform: translate(-50px, 37px);
        }

        .right-son-box::after {
          content: ">";
          font-size: 20px;
        }
      }

      .deliver-box-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;

        div {
          p {
            line-height: 20px;
          }

          .deliver-box-title {
            color: #757678;
          }
        }

        .right-son-box::after {
          content: ">";
          font-size: 20px;
        }
      }
    }
  }

  .settlement-content-right {
    width: 40%;
  }

  div:last-child {
  }
}
</style>
