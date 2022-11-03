<template>
  <div class="goods-list-bg">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="tabSearchButton">
      <el-tab-pane
        v-for="(item1, index) in goodsSortFirst"
        :key="index"
        :label="item1.name"
        :name="item1.id.toString()"
      >
      </el-tab-pane>
    </el-tabs> -->

    <div class="tab-container">
      <div v-for="(item1, index) in goodsSortFirst" :key="index">
        <button
          :name="item1.id.toString()"
          :class="index == s1 ? 'isActive' : ''"
          @click="tabSearchButton(item1, index)"
        >
          {{ item1.name }}
        </button>
        <div class="item-name-total">{{ item1.name }}</div>
      </div>
    </div>
    <div
      class="goods-list-item"
      v-for="(item2, index) in goodsList"
      :key="index"
    >
      <div class="title-box" @click="goSearchPage(item2.name)">
        <p>{{ item2.categoryName }}</p>
        <p>更多 →</p>
      </div>
      <div class="item-box">
        <div class="swiper-content">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                @click="goGoodsDetail(item3.id)"
                v-for="(item3, index) in item2.bioItemList"
                :key="index"
              >
                <div class="swiper-slide-img">
                  <img src="../assets/img/goodsImage.png" alt="" />
                </div>
                <div class="swiper-slide-text">
                  <p>{{ item3.name }}</p>
                  <p>货号:{{ item3.itemNo }}</p>
                  <p>规格:{{ item3.specificationDesc }}</p>
                  <p>{{ item3.price }}</p>
                  <p>{{ item3.enterpriseName }}</p>
                </div>
              </div>
            </div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>

        <!-- <div class="item" v-for="(item3, index) in item2.bioItemList">
          <img src="../assets/img/index-goods-img.png" alt="" />
          <div class="item-text-box">
            <p>{{ item3.name }}</p>
            <p>规格:{{ item3.specificationDesc }}</p>
            <p>货号:{{ item3.supplierId }}</p>
            <p>出品方:{{ item3.supplierName }}</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { goodsRecommendList } from "../request/api.js";
// import { goodsRecommendList } from "../request/api.js";
import { getIndexSort } from "../request/api.js";
import { getIdGoodsList } from "../request/api.js";
export default {
  data() {
    return {
      activeName: "72",
      pageSize: null,
      goodsList: [],
      currentPage: 1,
      id: null,
      // 商品分类一级参数
      parentId: 0,
      level: 1,
      type: 1,
      //
      total: 0,
      // tab一级标题容器
      goodsSortFirst: [],
      // firstIdContainer: [],
      // tab二级标题容器
      goodsSortSecond: [],
      isActive: 0,
      s1: 0,
    };
  },

  methods: {
    tabSearchButton(item1, index) {
      this.isActive = index;
      this.s1 = index;
      console.log("this.si--", this.s1);
      console.log("this.isActive---", this.isActive);
    },

    //   // 携带二级分类前往搜索页面
    goSearchPage(secondSortName) {
      this.$router.push({
        name: "goods-search-page",
        query: { secondSortName: secondSortName },
      });
    },

    // 前往商品详情
    goGoodsDetail(id) {
      this.$router.push({
        name: "goods-detail",
        query: { id: id },
      });
    },

    // 获取商品列表
    getgoodsList() {
      // console.log("this.goodsSortFirst---", this.goodsSortFirst);
      // let id = this.goodsSortFirst[0].id;
      let id = "72";
      getIdGoodsList(id).then((res) => {
        // console.log("res---", res);
        this.goodsList = res.result;
        // console.log("goodsList---", this.goodsList);
      });
    },

    // 获取tab一级标题
    getGoodsSortFirst() {
      let params = {
        parentId: 0,
        level: 1,
        type: 1,
      };
      getIndexSort(params)
        .then((res) => {
          // console.log("resNav1-----", res);
          if (res.code === 200) {
            this.goodsSortFirst = res.result;
            console.log("goodsSortFirst---", this.goodsSortFirst);
            // this.goodsSortFirst.unshift(this.recommendTabItem);
          }
        })
        .catch((e) => {});
    },

    // 获取tab二级标题
    // getGoodsSortSecond() {
    //   console.log("getSortFirstId", this.getSortFirstId);
    //   // console.log("firstIdContainer", firstIdContainer);

    //   let params = {
    //     parentId: 72,
    //     level: 2,
    //     type: 1,
    //   };
    //   getIndexSort(params)
    //     .then((res) => {
    //       // console.log("resNav2-----", res);
    //       if (res.code === 200) {
    //         this.goodsSortSecond = res.result;
    //         // this.goodsSortSecond.unshift(this.recommendTabItem);
    //       }
    //     })
    //     .catch((e) => {});
    // },

    // 切换tab重新分页
    tabSearchButton(item1, index, tab, event) {
      this.isActive = index;
      this.s1 = index;
      // console.log("this.si--",this.s1);
      // console.log("this.isActive---",this.isActive);
      // console.log("item1---", item1);
      this.tabId = item1.id;
      // console.log("this.tabId---", this.tabId);
      getIdGoodsList(this.tabId).then((res) => {
        // console.log("tabSearchButtonRes---", res);
        this.goodsList = res.result;
        // console.log("goodsList---", this.goodsList);
      });
    },
  },

  computed: {
    // getSortFirstId() {
    //   let firstIdContainer = [];
    //   console.log("this.goodsSortFirst---", this.goodsSortFirst);
    //   this.goodsSortFirst.map((item) => {
    //     firstIdContainer.push(item.id);
    //   });
    //   console.log("firstIdContainer", firstIdContainer);
    //   return firstIdContainer;
    // },
  },
  created() {},
  mounted() {
    // 获取商品一级标题
    this.getGoodsSortFirst();

    // 获取商品二级标题
    // this.getGoodsSortSecond();
    this.getgoodsList();
    setTimeout(() => {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper

          // 如果需要分页器
          // pagination: {
          //   el: ".swiper-pagination",
          // },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 同时显示
          slidesPerView: 3,
          // 滚动几个一组·
          // slidesPerGroup: 3,
          // 自动播放
          autoplay: true,
        });
      });
    }, 1000);

    // 一进来就获取获取商品列表第一个tab
  },
};
</script>

<style lang="less" scoped>
.isActive {
  background: #2979ff !important;
  color: #ffffff !important;
}
.goods-list-bg {
  width: 100%;
  height: 1420px;
  background-image: url("../assets/img/index-goods-list.png");
  background-size: cover;
  overflow: hidden;

  .tab-container {
    margin: 100px 260px 0;
    height: 80px;
    display: flex;
    justify-content: space-between;
    position: relative;

    button {
      box-sizing: border-box;
      width: 220px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #1d1f27;
      border-radius: 5px 5px 5px 5px;
      font-size: 18px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #ffffff;
    }
    .item-name-total {
      box-sizing: border-box;
      display: none;
      height: 80px;
      position: absolute;
      top: -90px;
      // right: 0;
      font-size: 30px;
      line-height: 80px;
      text-align: center;
      color: #000;
      background: #ffffff;
      border-radius: 5px;
      padding: 0 20px;
    }

    button:hover + .item-name-total {
      display: block;
      z-index: 999;
    }

    button:hover {
      color: #2979ff;
    }
  }

  // .goods-list-bg .hover-span {
  //   // display: none;
  //   color: #ffffff;
  //   font-size: 50px;
  // }

  // 修改tab样式开始
  // /deep/ .el-tabs__nav-scroll {
  //   width: calc(100% - 520px);
  //   margin: 0 260px;
  // }

  // /deep/ .el-tabs__nav {
  //   margin-top: 50px;
  //   width: 100%;
  //   display: flex;
  //   justify-content: space-between;

  //   .el-tabs__item {
  //     width: 220px;
  //     height: 80px;
  //     text-align: center;
  //     line-height: 80px;
  //     color: #ffffff;
  //     padding: 0px;
  //   }

  //   .el-tabs__item:hover {
  //     color: #2979ff;
  //   }
  // }

  // /deep/ .el-tabs--card > .el-tabs__header {
  //   border-bottom: 0;
  //   margin: 0;
  // }

  // /deep/.el-tabs__nav-wrap {
  //   margin-bottom: 0;
  // }

  // /deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  //   background: #1d1f27;
  //   border-radius: 5px 5px 5px 5px;
  //   font-size: 18px;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  //   white-space: nowrap;
  //   border: 0;
  //   padding: 0 30px;
  // }

  // /deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  //   border: 0;
  // }

  // /deep/ .is-active {
  //   background-color: #2979ff !important;
  //   color: #ffffff !important;
  // }
  // 修改tab样式结束

  .goods-list-item {
    margin: 50px 260px 0px;
    width: calc(100% - 520px);
    height: 360px;
    display: flex;

    .title-box {
      box-sizing: border-box;
      width: 240px;
      height: 100%;
      color: #ffffff;
      background: #2979ff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0 50px;
      position: relative;
      border-radius: 5px 5px 5px 5px;

      p:first-child {
        width: 140px;
        font-size: 24px;
      }

      p:nth-child(2) {
        font-size: 14px;
        cursor: pointer;
      }

      // div {
      //   position: absolute;
      //   display: none;
      //   width: 240px;
      //   font-size: 24px;
      //   line-height: 30px;
      //   right: 0px;
      //   top: 0px;
      //   text-align: center;
      //   color: #000;
      //   background: #ffffff;
      //   border-radius: 5px;
      // }
    }

    // .title-box:hover div {
    //   display: block;
    // }

    .item-box {
      width: calc(100% - 240px);
      height: 100%;

      .swiper-container {
        width: 100%;
        height: 360px;
        margin: 0 auto;
        background: #f1eff4;

        .swiper-wrapper {
          .swiper-slide {
            // width: 300px;
            height: 100%;
            // margin: 0 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .swiper-slide-img {
              img {
                width: 300px;
                height: 170px;
              }
            }
            .swiper-slide-text {
              width: 100%;
              padding: 20px;
              margin-left: 50px;
              font-size: 14px;

              p {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              p:first-child {
                font-size: 18px;
                width: 90%;
              }

              p:not(P:first-child) {
                color: #9c9c9c;
                margin: 10px 0;
              }
            }
          }
        }
      }

      // display: flex;
      // overflow-x: scroll;
      // overflow-y: hidden;

      // .item {
      //   width: 375px;
      //   margin-left: 15px;
      //   background: #ffffff;

      //   img {
      //     width: 100%;
      //     height: 170px;
      //   }

      //   .item-text-box {
      //     padding: 20px;

      //     p {
      //       color: #9c9c9c;
      //       font-size: 14px;
      //       height: 40px;
      //       line-height: 40px;
      //       text-overflow: ellipsis;
      //       overflow: hidden;
      //       white-space: nowrap;
      //     }

      //     p:first-child {
      //       font-size: 18px;
      //       color: #000000;
      //       font-weight: bold;
      //     }

      //     p:last-child {
      //       font-size: 16px;
      //       color: #666666;
      //     }
      //   }
      // }
    }
  }
}
</style>
