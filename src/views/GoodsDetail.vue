<template>
  <div>
    <HeaderNav />
    <div class="header-search-box">
      <div class="shell-choiceness">贝壳精选</div>
      <img src="../assets/img/shell-icon.png" alt="" />
      <div>
        <p>贝壳社</p>
        <p>服务电话: 0581-86658021</p>
      </div>
      <GoodsSearchBox class="goods-search-box" />
      <button class="search-button">搜全站</button>
    </div>

    <div class="header-tab-box">
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        企业全部商品
      </div>
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        当前商品
      </div>
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 3 ? 'active' : ''"
        @click="num = 3"
      >
        联系方式
      </div>
    </div>

    <el-main>
      <div v-if="num == 1" class="el-main-page1">1</div>
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
            <img src="../assets/img/goodsImage.png" alt="" />
            <el-carousel :interval="4000" type="card" height="100px">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="goods-right-box">
            <p>{{ this.goodsItem.name }}</p>
            <div class="text-box">
              <div class="detail-box">
                <span>货号：{{ this.goodsItem.itemNo }}</span>
                <span>规格：{{ this.goodsItem.specificationDesc }}</span>
                <!-- <span>价格: {{ this.goodsItem.price }} </span> -->
                <span>{{ this.goodsItem.enterpriseName }}</span>
                <span>购买数量：</span>
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
                <div>总价:{{ totalPrice }}</div>
              </div>
            </div>
            <button>提交订单</button>
          </div>
        </div>
      </div>
      <div v-if="num == 3" class="el-main-page3">3</div>
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

export default {
  components: {
    HeaderNav,
    GoodsSearchBox,
    Footer,
  },
  data() {
    return {
      num: 2,
      levels: ["实验常规仪器", "移液器", "单道移液器"],
      counter: 0,
      goodsItem: {},
      goodsItemSku: [],
      id: null,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },

    getGoodsDetailItem() {
      // console.log("id---",this.id);
      getGoodsDetail(this.id)
        .then((res) => {
          // console.log("res---", res);
          this.goodsItem = res.result;
          // console.log("goodsItem---", this.goodsItem);
        })
        .catch((e) => {
          // console.log("e---", e);
        });
    },

    getGoodsDetailItemSku() {
      // console.log("id---",this.id);
      getGoodsDetailSku(this.id)
        .then((res) => {
          // console.log("res---", res);
          this.goodsItemSku = res.result;
          console.log("goodsItemSku---", this.goodsItemSku);
          // 遍历每一个sku然后给他加一个计数器,一开始直接加进去没有响应式地更新视图,去网上查发现可以用这个this.$set(obj, key, value)给对象加键值对
          this.goodsItemSku.map((item) => {
            this.$set(item, "counter", 0);
          });
        })
        .catch((e) => {
          // console.log("e---", e);
        });
    },

    submitOrder() {},
  },

  computed: {
    totalPrice() {
      // console.log("this.counter",this.counter);
      let a = 0;
      this.goodsItemSku.map((item) => {
        a += item.price * item.counter;
      });
      return a;
    },
  },

  mounted() {
    this.id = this.$route.query.id;
    this.getGoodsDetailItem();
    this.getGoodsDetailItemSku();
  },
};
</script>

<style lang="less" scoped>
.header-search-box {
  width: 90vw;
  margin-left: 5vw;
  display: flex;
  justify-content: center;

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
  .center-text {
    text-align: center;
  }

  .current-goods-box {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    .goods-left-box {
      margin-right: 50px;
      float: left;
      img {
        width: 300px;
        border: 1px solid #fff;
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
      overflow: hidden;
      height: 432px;
      // background: green;
      p:first-child {
        font-weight: bold;
        font-size: 20px;
        margin: 20px 0;
      }

      p:nth-child(2) {
        font-size: 20px;
        font-weight: bold;
        color: red;
      }

      .text-box {
        margin-bottom: 15px;
        // display: flex;
        gap: 100px;
        .detail-box {
          display: flex;
          flex-direction: column;
          span {
          }
          .sku-item {
            display: flex;
            // flex-direction: column;
            font-size: 40px;
            line-height: 40px;

            .sku-text {
              border: 1px solid #000;
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
        background: #0e6ebe;
        color: #fff;
      }
    }
  }
}
</style>
