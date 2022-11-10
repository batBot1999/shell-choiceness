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
            <div class="deliver-box-title">
              <span>收货人姓名:</span
              ><input type="text" v-model="receiveName" />
            </div>
            <div class="deliver-box-title">
              <span>收货人电话:</span
              ><input type="text" v-model="receivePhoneNumber" />
            </div>
            <div class="block">
              <p>收货地址</p>
              <!-- <span class="demonstration">请选择收货地址:</span> -->
              <el-cascader
                v-model="receivePlaceValue"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </div>
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
                <img :src="imgUrl" alt="" />
              </div>
              <div class="goods-item-text">
                <p>{{ this.itemName }}</p>
                <p>货号：{{ this.itemNo }}</p>
                <p>规格：{{ this.specificationDesc }}</p>
                <p>单价：{{ this.price }}</p>
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
          <span>￥{{ this.totalPrice }}</span>
        </div>
        <div class="settlement-option">
          <span>配送费</span>
          <span>￥{{ this.deliverPay }}</span>
        </div>
        <div class="line-box"></div>
        <div class="should-pay-box">
          <span>应付金额</span>
          <span>￥{{ Number(this.deliverPay) + Number(this.totalPrice) }}</span>
        </div>

        <div class="commit-button-box">
          <button
            class="button-box"
            @click="commitOrder()"
            :disabled="commitOrderFlag == 0"
          >
            提交订单
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import HeaderNav from "../components/HeaderNav.vue";
import { postOrderCommit } from "../request/api.js";
import axios from "axios";
export default {
  components: {
    Footer,
    HeaderNav,
  },

  data() {
    return {
      commitOrderFlag: 1,
      supplierId: null,
      itemId: null,
      itemName: null,
      skuId: null,
      num: null,
      totalPrice: null,
      price: null,
      imgUrl: null,
      itemNo: null,
      specificationDesc: null,
      deliverPay: 100,
      receiveName: "",
      receivePhoneNumber: "",
      receivePlaceValue: [],
      options: [
        {
          value: "省A",
          label: "省A",
          children: [
            {
              value: "市A",
              label: "市A",
              children: [
                {
                  value: "县A",
                  label: "县A",
                },
                {
                  value: "县B",
                  label: "县B",
                },
              ],
            },
            {
              value: "市B",
              label: "市B",
              children: [
                {
                  value: "县C",
                  label: "县C",
                },
                {
                  value: "县D",
                  label: "县D",
                },
              ],
            },
          ],
        },
        {
          value: "省B",
          label: "省B",
          children: [
            {
              value: "市C",
              label: "市C",
              children: [
                {
                  value: "县E",
                  label: "县E",
                },
                {
                  value: "县F",
                  label: "县F",
                },
              ],
            },
            {
              value: "市D",
              label: "市D",
              children: [
                {
                  value: "县G",
                  label: "县G",
                },
                {
                  value: "县H",
                  label: "县H",
                },
              ],
            },
            {
              value: "市E",
              label: "市E",
              children: [
                {
                  value: "县I",
                  label: "县I",
                },
                {
                  value: "县K",
                  label: "县K",
                },
                {
                  value: "县K",
                  label: "县K",
                },
              ],
            },
          ],
        },
        {
          value: "省C",
          label: "省C",
          children: [
            {
              value: "市F",
              label: "市F",
            },
            {
              value: "市G",
              label: "市G",
            },
            {
              value: "市H",
              label: "市H",
            },
          ],
        },
      ],
    };
  },
  methods: {
    // handleChange(value) {
    //   console.log(value);
    //   if (value !== 0 && this.receiveName && this.receivePhoneNumber ) {
    //     this.commitOrderFlag = 1;
    //   } else {
    //     this.commitOrderFlag = 0;
    //   }
    // },
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
    commitOrder() {
      axios
        .post(
          "http://bkzx.bioclub.cn/api/jeecg-boot/bio/bioOrder/add",
          {
            supplierId: this.supplierId,
            itemId: this.itemId,
            itemName: this.itemName,
            skuId: this.skuId,
            num: this.num,
            totalPrice: Number(this.deliverPay) + Number(this.totalPrice),
            price: this.price,
            receiverName: this.receiveName,
            receiverPhone: this.receivePhoneNumber,
            receiverAddress: this.receivePlaceValue.toString(),
          },
          {
            headers: {
              "content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            console.log("res-----", res);
          }
        })
        .catch((e) => {});
    },
  },
  // /bio/bioOrder/add
  computed: {
    // shouldPay () {
    //   let sum = this.totalPrice;
    //   sum += this.deliverPay;
    //   return sum;
    // }

    // canButtonUse() {
    //   if (this.receivePlaceValue&&this.receiveName&&this.receivePhoneNumber) {
    //     this.commitOrderFlag  = 1;
    //   } else {
    //     this.commitOrderFlag  = 0;
    //   }
    //   console.log("this.commitOrderFlag ---", this.commitOrderFlag );
    //   return;
    // },
  },

  mounted() {
    this.supplierId = this.$route.query.supplierId;
    this.itemId = this.$route.query.itemId;
    this.itemName = this.$route.query.itemName;
    this.skuId = this.$route.query.skuId;
    this.num = this.$route.query.num;
    this.totalPrice = this.$route.query.totalPrice;
    this.price = this.$route.query.price;
    this.imgUrl = this.$route.query.imgUrl;
    this.itemNo = this.$route.query.itemNo;
    this.specificationDesc = this.$route.query.specificationDesc;

    // console.log("1企业id:", this.supplierId);
    // console.log("2商品id:", this.itemId);
    // console.log("3商品名称:", this.itemName);
    // console.log("4skuid:", this.skuId);
    // console.log("5购买数量:", this.num);
    // console.log("6总价:", this.totalPrice);
    // console.log("7单价:", this.price);
    // console.log("8图片URL:", this.imgUrl);
    // console.log("9货号:", this.itemNo);
    // console.log("10规格:", this.specificationDesc);
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
        // background: blue;
        display: flex;
        flex-direction: column;
        padding: 20px;

        .deliver-box-title {
          margin: 10px 0;
          width: 20vw;
          display: flex;
          justify-content: space-between;
          color: #757678;
        }

        .block {
          width: 23vw;
          padding: 20px 0;
          // background: red;
          display: flex;
          justify-content: space-between;
          align-items: center;

          p {
            white-space: nowrap;
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
          width: 500px;
          display: flex;
          // background: green;

          .img-box {
            width: 200px;
            height: 200px;
            overflow: hidden;
            img {
              width: 100%;
              // height: 100%;
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
    // text-align: center;

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
    .commit-button-box {
      width: 100%;
      // background: red;
      text-align: center;
    }
    .button-box {
      width: 300px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      border-radius: 50px;
      color: #000000;
      // background: #0e6ebe;
      border: none;
      outline: none;
      margin: 50px;
      font-size: 20px;

      .usefulButton {
        background: green !important;
      }

      .notUsefulButton {
        background: red !important;
      }
    }
  }
}
</style>
