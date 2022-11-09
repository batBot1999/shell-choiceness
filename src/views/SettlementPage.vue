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
    <div class="settlement-content">
      <div class="settlement-content-left">
        <span class="settlement-text">结算</span>
        <p class="p-title">送货方式</p>
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

        <div class="goods-list-box">
          <p class="p-title2">商品清单</p>
          <p class="order-number">订单编号:202210170001</p>

          <div class="goods-list-container">
            <p class="deiver-title">货车配送</p>
            <p>送达时间:2022年10月30日</p>
            <div class="goods-item">
              <div class="img-box">
              <img src="../assets/img/goodsImage.png" alt="">
              </div>
              <div class="goods-item-text">
                <p>艾本德单道移液器</p>
                <p>货号：20210330</p>
                <p>规格：100-1000ul</p>
                <p>单价：¥999.00</p>
                <p>销售包装：6支/盒</p>
              </div>
            </div>
          </div>

          <p class="p-title2">温馨提示</p>
          <div class="call-box">
            若您有任何疑问可联系客服,联系电话0571-86658025
          </div>
        </div>
      </div>
      <div class="settlement-content-right">
        <p class="right-title">订单明细</p>
        <div class="ticket-box">
          <img src="../assets/img/货车.png" alt="" />
          <span class="ticket-item-first">开票</span>
          <span class="ticket-item-second">添加邮箱自助发送电子发票</span>
        </div>
        <div class="settlement-option">
          <span>优惠券</span>
          <span class="no-discount">暂无可用</span>
        </div>
        <div class="settlement-option">
          <span>商品总计</span>
          <span>￥1900.00</span>
        </div>
        <div class="settlement-option">
          <span>配送费</span>
          <span>￥100.00</span>
        </div>
        <div class="line-box"></div>
        <div class="should-pay-box">
          <span>应付金额</span>
          <span>¥ 2,098.00</span>
        </div>
        <div class="button-box">提交订单</div>
      </div>
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
    goHome() {
      this.$router.push({
        name: "home",
      });
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

.settlement-content {
  width: calc(100vw - 100px);
  margin: 20px auto 0;
  display: flex;

  .settlement-content-left {
    padding: 0 20px;
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

        .left-son-box::before {
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

    .goods-list-box {
      padding: 20px;
      // background: green;

      .p-title2 {
        font-size: 20px;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 20px;
      }

      .order-number {
        margin: 10px 20px;
      }

      .goods-list-container {
        // background: green;
        margin-left: 20px;
        padding: 30px;

        .deiver-title {
          font-size: 20px;
          font-weight: bold;
        }

        .deiver-title::before {
          content: "";
          display: block;
          width: 30px;
          height: 30px;
          background: url("../assets/img/货车.png");
          background-size: cover;
          transform: translate(-40px, 30px);
        }

        p:nth-child(2) {
          margin-top: 10px;
        }

        .goods-item {
          margin: 20px;
          width:500px;
          display: flex;
          // background: green;

          .img-box {
            width: 200px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .goods-item-text {
           padding: 20px;

           p:first-child {
            font-size: 20px;
            font-weight: bold;
           }

           p:not(p:first-child) {
            margin: 10px 0;
           }
          }
        }
      }

      .call-box {
        margin: 20px;
        border: 1px solid #000;
        width: 90%;
        padding: 20px;
      }
    }
  }

  .settlement-content-right {
    // background: grey;
    padding: 20px;
    width: 40%;
    // height: 50vh;

    border-left: 1px solid #000000;

    .right-title {
      font-size: 30px;
      font-weight: bold;
    }

    .ticket-box {
      background: #f4f4f4;
      margin-top: 20px;
      padding: 0 20px;
      height: 10vh;
      line-height: 5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .ticket-item-first {
        flex: 1;
        font-size: 20px;
        font-weight: bold;
      }

      .ticket-item-second:after {
        content: ">";
        font-size: 20px;
      }
    }

    .settlement-option {
      // background: green;
      margin: 20px 0;
      height: 3vh;
      line-height: 3vh;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;

      .no-discount::after {
        content: ">";
        font-size: 20px;
      }

      span:first-child {
        font-size: 18px;
      }

      span:last-child {
        font-size: 14px;
      }
    }

    .line-box {
      width: 100%;
      border-top: 2px solid #000;
    }

    .should-pay-box {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
    }

    .button-box {
      width: 80%;
      height: 7vh;
      line-height: 7vh;
      text-align: center;
      border-radius: 50px;
      color: #ffffff;
      background: #0e6ebe;
      border: none;
      outline: none;
      margin: 50px auto 0;
      font-size: 20px;
    }
  }
}
</style>
