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

    <!-- tab切换按钮容器 -->
    <div class="tab-container">
      <div v-for="(item1, index) in goodsSortFirst" :key="index">
        <button
          :name="item1.id.toString()"
          :class="index == s1 ? 'isActive' : ''"
          @click="tabSearchButton(item1, index)"
        >
          <span>{{ item1.name }}</span>
          <span>→</span>
        </button>
        <!-- <div class="item-name-total">{{ item1.name }}</div> -->
      </div>
    </div>

    <div
      class="goods-list-item"
      v-for="(item2, index2) in goodsList"
      :key="index2"
    >
      <div
        class="title-box"
        @click="goSearchPage(item2.name)"
        :class="'title-color' + (index2 % 3)"
      >
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
                v-for="(item3, index3) in item2.bioItemList"
                :key="index3"
              >
                <div class="swiper-slide-img">
                  <img :src="item3.mainPic" alt="" />
                </div>
                <div class="swiper-slide-text">
                  <p>{{ item3.name }}</p>
                  <!-- <p>规格:{{ item3.specificationDesc }}</p> -->
                  <p>货号:{{ item3.itemNo }}</p>
                  <p>￥{{ item3.price }}</p>
                  <p>{{ item3.enterpriseName }}</p>
                </div>
              </div>
            </div>
            <!-- <div style="opacity: 1" class="swiper-button-prev" v-if="item2.bioItemList.length > 3 ? true : false"></div> -->
            <!-- <div style="opacity: 1" class="swiper-button-next" v-if="item2.bioItemList.length > 3 ? true : false"></div> -->
          </div>
        </div>
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
      mySwiper: null,
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
      // 根据元素数量决定是否循环，来解决元素数量小于3时重复显示的问题
      loopState: false,
      buttonIsShow: false,
    };
  },

  methods: {
    // tabSearchButton(item1, index) {
    //   this.isActive = index;
    //   this.s1 = index;
    //   console.log("this.si--", this.s1);
    //   console.log("this.isActive---", this.isActive);
    // },

    // 携带二级分类前往搜索页面
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

        this.$nextTick(() => {
          this.mySwiper = new Swiper(".swiper-container", {
            loop: this.loopState, // 循环模式选项
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: false, //修改swiper的父元素时，自动初始化swiper

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
            // console.log("goodsSortFirst---", this.goodsSortFirst);
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
        // this.goodsList = [];
        // console.log("清空容器", this.goodsList);
        this.goodsList = res.result;
        // this.$forceUpdate();
        // if (this.mySwiper) {
        //   this.mySwiper.destroy(true, true);
        // }
        this.$nextTick(() => {
          this.mySwiper = new Swiper(".swiper-container", {
            loop: this.loopState, // 循环模式选项
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: false, //修改swiper的父元素时，自动初始化swiper

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
        //         this.mySwiper && this.mySwiper.update();
        // 　　　this.mySwiper && this.mySwiper.startAutoplay();
        // 　　 this.mySwiper && this.mySwiper.reLoop();
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
    // 一进来就获取获取商品列表第一个tab
    // this.getGoodsSortSecond();
    this.getgoodsList();
    // setTimeout(() => {
    // this.$nextTick(() => {
    //   this.mySwiper = new Swiper(".swiper-container", {
    //     loop: true, // 循环模式选项
    //     observer: true, //修改swiper自己或子元素时，自动初始化swiper
    //     observeParents: false, //修改swiper的父元素时，自动初始化swiper

    //     // 如果需要分页器
    //     // pagination: {
    //     //   el: ".swiper-pagination",
    //     // },

    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     // 同时显示
    //     slidesPerView: 3,
    //     // 滚动几个一组·
    //     // slidesPerGroup: 3,
    //     // 自动播放
    //     autoplay: true,
    //   });
    // });
    // }, 100);
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}

.isActive {
  background: #2979ff !important;
  color: #ffffff !important;
}
.goods-list-bg {
  padding: 50px;
  // width: 100%;
  // height: 1420px;
  background-image: url("../assets/img/index-goods-list.png");
  background-size: cover;
  // overflow: hidden;
  overflow-y: visible;

  .tab-container {
    width: 80%;
    // background: red;
    margin: 0 auto;
    // padding: 50px 0;
    display: flex;
    justify-content: space-between;
    position: relative;

    button {
      font-family: alibaba-Regular !important;
      // margin: 0 20px;
      padding: 0 10px;
      box-sizing: border-box;
      width: 11.45vw;
      height: 4.16vw;
      line-height: 4.16vw;
      // text-align: center;
      background: #1e202b;
      border-radius: 5px 5px 5px 5px;
      font-size: 18px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #ffffff;
      border: none;
      display: flex;
      justify-content: space-around;
    }
    // .item-name-total {
    //   box-sizing: border-box;
    //   display: none;
    //   height: 80px;
    //   position: absolute;
    //   top: -90px;
    //   font-size: 30px;
    //   line-height: 80px;
    //   text-align: center;
    //   color: #000;
    //   background: #ffffff;
    //   border-radius: 5px;
    //   padding: 0 20px;
    // }

    // button:hover + .item-name-total {
    //   display: block;
    // }

    button:hover {
      color: #2979ff;
      cursor: pointer;
      background: #3b3e4c;
    }

    button:active {
      border: none;
    }
  }

  .goods-list-item {
    margin: 50px auto 0px;
    width: 80%;
    display: flex;
    height: 360px;
    border-radius: 5px 5px 5px 5px;
    font-family: alibaba-Regular !important;
    // background: red;

    .title-box {
      box-sizing: border-box;
      width: 17%;
      height: 100%;
      color: #ffffff;
      // background: url("../assets/img/goods-list-title.png");
      // background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 3%;
      // align-items: center;
      // text-align: center;
      // padding: 0 50px;
      // border-radius: 5px 5px 5px 5px;

      p {
        margin-left: 30px;
      }

      p:first-child {
        font-size: 24px;
      }

      p:nth-child(2) {
        font-size: 14px;
        cursor: pointer;
      }
    }

    .title-color0 {
      background: url("../assets/img/title-bg-blue.png");
      background-size: cover;
    }

    .title-color1 {
      background: url("../assets/img/title-bg-red.png");
      background-size: cover;
    }

    .title-color2 {
      background: url("../assets/img/title-bg-pink.png");
      background-size: cover;
    }

    .item-box {
      height: 100%;
      // background: #f1eff4;
      width: 80%;
      // padding-left: 20px;
      // overflow-y: hidden;
      .swiper-container {
        // overflow-y: visibel;
        // height: 100%;
        --swiper-navigation-color: #2979ff; /* 单独设置按钮颜色 */
        --swiper-navigation-size: 50px; /* 设置按钮大小 */
        .swiper-wrapper {
          // height: 100%;

          .swiper-slide {
            padding-left: 20px;
            // background: red;
            // height: 100%;
            box-sizing: border-box;
            // border: 2px solid red;
            display: flex;
            flex-direction: column;
            // align-items: start;
            // overflow: hidden;
            // margin: 0 20px;

            .swiper-slide-img {
              // height: 100%;
              height: 200px;
              background: #ffffff;
              // width: calc(100%-40px);
              width: 100%;
              // overflow: hidden;
              img {
                width: 100%;
              }
            }
            .swiper-slide-text {
              text-align: start;
              width: 100%;
              // height: calc(100% - 200px);
              height: 160px;
              background: #ffffff;
              // padding: 20px;
              // padding-left: 50px;
              font-size: 14px;

              p {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 10px 0 0 10px;
              }
              p:first-child {
                margin-top: 20px;
                width: 80%;
                display: inline-block;
                font-size: 18px;
                font-weight: bold;
              }

              p:nth-child(3) {
                font-size: 20px;
                color: #f8494d !important;
              }

              p:not(P:first-child) {
                color: #9c9c9c;
              }
            }
          }

          .swiper-button-prev {
            opacity: 1 !important;
          }

          .swiper-button-next {
            opacity: 1 !important;
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
