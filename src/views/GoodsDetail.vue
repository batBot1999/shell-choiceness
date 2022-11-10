<template>
  <div>
    <HeaderNav />
    <div class="header-search-box">
      <div class="shell-choiceness" @click="goHome">贝壳精选</div>
      <img src="../assets/img/shell-icon.png" alt="" />
      <div>
        <p>贝壳社</p>
        <p>服务电话: 0581-86658021</p>
      </div>
      <!-- <GoodsSearchBox class="goods-search-box" /> -->
    </div>

    <div class="header-tab-box">
      <!-- <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        企业全部商品
      </div> -->
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        当前商品
      </div>
      <!-- <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 3 ? 'active' : ''"
        @click="num = 3"
      >
        联系方式
      </div> -->
    </div>

    <el-main>
      <!-- <div v-if="num == 1" class="el-main-page1">1</div> -->
      <div v-if="num == 2" class="el-main-page2">
        <div class="center-text">
          <span
            >{{ levels[0] }}&nbsp>&nbsp{{ levels[1] }}&nbsp>&nbsp{{
              levels[2]
            }}</span
          >
        </div>
        <div class="current-goods-box">
          <div class="goods-left-box">
            <img :src="this.goodsItem.mainPic" alt="" />
            <!-- <el-carousel :interval="4000" type="card" height="100px">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel> -->
          </div>

          <div class="goods-right-box">
            <p>{{ this.goodsItem.name }}</p>
            <div class="text-box">
              <div class="detail-box">
                <p>货号：{{ this.goodsItem.itemNo }}</p>
                <p>规格：{{ this.goodsItem.specificationDesc }}</p>
                <p>{{ this.goodsItem.supplierName }}</p>
                <p>购买数量：</p>
                <div
                  class="sku-item"
                  v-for="item in goodsItemSku"
                  :key="item.id"
                >
                  <div class="sku-text">
                    {{ item.unitName }}({{ item.convertMultiple
                    }}{{ item.stockUnitName }}/{{ item.unitName }})
                  </div>
                  <span>价格:{{ item.price }}</span>
                  <el-input-number
                    v-model="item.counter"
                    @change="handleChange"
                    :min="0"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <p>总价:{{ totalPrice }}</p>
              </div>
            </div>
            <button
              style="font-family: alibaba-Regular"
              @click="sendDataToOrderPage()"
              :disabled="commitOrderFlag == 0"
            >
              提交订单
            </button>
          </div>
        </div>
        <div
          v-html="this.goodsItem.itemDesc"
          style="font-family: alibaba-Regular !important"
        ></div>
      </div>

      <!-- <div v-if="num == 3" class="el-main-page3">3</div> -->
    </el-main>

    <Footer />
  </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav.vue";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import Footer from "../components/Footer.vue";
import { getGoodsDetail } from "../request/api.js";
import { getGoodsDetailSku } from "../request/api.js";
import { showLoading, hideLoading } from "../util/Loading";

export default {
  components: {
    HeaderNav,
    GoodsSearchBox,
    Footer,
  },
  data() {
    return {
      commitOrderFlag: 0,
      num: 2,
      levels: ["实验常规仪器", "移液器", "单道移液器"],
      counter: 0,
      goodsItem: [],
      goodsItemSku: [],
      id: null,
      counterValue: null,
      goodsTotalPrice: null,
    };
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
    handleChange(value) {
      this.counterValue = value;
      console.log(this.counterValue);
      if (value !== 0) {
        this.commitOrderFlag = 1;
      } else {
        this.commitOrderFlag = 0;
      }
    },

    getGoodsDetailItem() {
      // console.log("id---",this.id);
      getGoodsDetail(this.id)
        .then((res) => {
          console.log("res---", res);
          this.goodsItem = res.result;
          // console.log("goodsItem---", this.goodsItem);
          setTimeout(() => {
            hideLoading();
          }, 500);
        })
        .catch((e) => {
          console.log("e---", e);
        });
    },

    getGoodsDetailItemSku() {
      // console.log("id---",this.id);
      getGoodsDetailSku(this.id)
        .then((res) => {
          // console.log("res---", res);
          this.goodsItemSku = res.result;

          // console.log("goodsItemSku---", this.goodsItemSku);
          // 遍历每一个sku然后给他加一个计数器,一开始直接加进去没有响应式地更新视图,去网上查发现可以用这个this.$set(obj, key, value)给对象加键值对
          this.goodsItemSku.map((item) => {
            this.$set(item, "counter", 0);
          });
        })
        .catch((e) => {
          // console.log("e---", e);
        });
    },

    sendDataToOrderPage() {
      console.log("1企业id:", this.goodsItem.supplierId);
      console.log("2商品id:", this.goodsItem.bioSkuList[0].id);
      console.log("3商品名称:", this.goodsItem.name);
      console.log("4 skuid:", this.goodsItem.bioSkuList[0].skuNo);
      console.log("5购买数量:", this.counterValue);
      console.log("6总价:", this.goodsTotalPrice);
      console.log("7单价:", this.goodsItem.bioSkuList[0].price);
      console.log("7图片路径:", this.goodsItem.mainUrl);
      console.log("9货号:", this.itemNo);
      console.log("10规格:", this.specificationDesc);
      this.$router.push({
        name: "settlement-page",
        query: {
          supplierId: this.goodsItem.supplierId,
          itemId: this.goodsItem.bioSkuList[0].id,
          itemName: this.goodsItem.name,
          skuId: this.goodsItem.bioSkuList[0].skuNo,
          num: this.counterValue,
          totalPrice: this.goodsTotalPrice,
          price: this.goodsItem.bioSkuList[0].price,
          imgUrl: this.goodsItem.mainPic,
          itemNo: this.goodsItem.itemNo,
          specificationDesc: this.goodsItem.specificationDesc,
        },
      });
    },
  },

  computed: {
    totalPrice() {
      // console.log("this.counter",this.counter);
      let a = 0;
      this.goodsItemSku.map((item) => {
        a += item.price * item.counter;
      });

      this.goodsTotalPrice = a;
      return a;
    },
  },

  mounted() {
    showLoading();
    this.notLogin = localStorage.getItem("token") ? true : false;
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getGoodsDetailItem();
    this.getGoodsDetailItemSku();
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}
.header-search-box {
  width: 90vw;
  margin-left: 5vw;
  display: flex;
  justify-content: start;

  .shell-choiceness {
    width: 150px;
    height: 36px;
    line-height: 36px;
    background: #0e6ebe;
    color: #fff;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }

  img {
    margin-left: 30px;
    margin-right: 10px;
    height: 60px;
  }

  div {
    height: 60px;
    line-height: 30px;

    p {
      font-size: 10px;
      white-space: nowrap;
    }

    p:first-child {
      font-weight: bold;
    }
  }

  /deep/.search-box {
    width: 50vw;
    margin-left: 50px;
    .el-select > .el-input {
      .el-input__inner {
        width: 110px;
      }
    }

    .el-input {
      width: 300px;
      .el-input__inner {
        width: 300px;
      }
    }

    .search-button:active {
      color: #4b8bc0;
    }
  }
  .search-button {
    width: 200px;
    height: 60px;
    color: #fff;
    font-size: 25px;
    background-color: grey;
    border: none;
  }
  .search-button:active {
    color: #0e6ebe;
  }
}

.header-tab-box {
  margin-top: 20px;
  width: 100vw;
  display: flex;
  div {
    width: 33.33%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: bolder;
  }
  .active {
    background: #0e6ebe;
    color: #fff;
  }
}
.el-main > .el-main-page2 {
  font-family: alibaba-Regular;

  .center-text {
    text-align: center;
  }

  .current-goods-box {
    width: 90%;
    height: 60vh;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    // border: 1px solid red;
    gap: 10%;

    .goods-left-box {
      height: 70%;
      border: 1px solid #000;
      overflow: hidden;

      img {
        width: 100%;
      }
      .el-carousel {
        width: 300px;

        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
    }

    .goods-right-box {
      // border: 1px solid blue;
      flex: 1;
      overflow: hidden;
      height: 100%;
      padding-left: 20px;

      p:first-child {
        font-weight: bold;
        font-size: 30px;
        margin: 20px 0;
      }

      .text-box {
        // margin-bottom: 15px;
        // display: flex;
        // gap: 100px;
        .detail-box {
          display: flex;
          flex-direction: column;
          p {
            font-size: 18px;
            font-family: alibaba-Regular;
            font-weight: normal;
            margin-top: 15px;
          }
          .sku-item {
            display: flex;
            // flex-direction: column;
            font-size: 40px;
            line-height: 40px;
            justify-content: start;
            align-items: center;
            margin-top: 20px;

            .sku-text {
              // border: 1px solid #000;
              line-height: 50px;
            }
            .active {
              border: blue;
            }
          }
        }
      }

      button {
        margin-top: 30px;
        width: 150px;
        height: 80px;
        font-size: 20px;
        border: none;
        border-radius: 5px;
      }

      button:first-child {
        // background: #0e6ebe;
        color: #fff;
      }
    }
  }
}
</style>
