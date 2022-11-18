<template>
  <div class="swiper-content">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          @click="goGoodsDetail(item.id)"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <div class="swiper-slide-img">
            <img :src="item.mainPic" alt="" />
          </div>
          <div class="swiper-slide-text">
            <p>{{ item.name }}</p>
            <p>￥{{ item.price }}</p>
            <p>货号:{{ item.itemNo }}</p>
            <!-- <p>规格:{{ item.specificationDesc }}</p> -->
            <p>{{ item.enterpriseName }}</p>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { goodsRecommendList } from "../request/api.js";
export default {
  data() {
    return {
      goodsList: [],
    };
  },

  methods: {
    goGoodsDetail(id) {
      this.$router.push({
        name: "goods-detail",
        query: { id: id },
      });
    },

    getgoodsList() {
      let params = {
        pageNo: 1,
        pageSize: 1000,
      };
      goodsRecommendList(params).then((res) => {
        // console.log("res-----", res);
        this.goodsList = res.result.records;
        // console.log("goodsList-----", this.goodsList);
      });
    },
  },

  // updated() {
  mounted() {
    this.getgoodsList();

    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

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
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}
.swiper-container {
  width: 80w;
  margin: 20px auto;


  .swiper-slide {
        cursor: pointer;
    border-radius: 5px;
    background: #f1eff4;
    margin: 0 10px;
    // margin-left: 20px;
    display: flex;
    align-items: center;

    .swiper-slide-img {
      height: 8vw;
      img {
        width: 8vw;
        height: 100%;
      }
    }
    .swiper-slide-text {
      width: 10vw;
      padding-left: 20px;
      font-size: 14px;
      font-family: alibaba-Regular;

      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      p:first-child {
        font-size: 18px;
        font-weight: bold;
        // width: 90%;
      }

      p:not(P:first-child) {
        color: #9c9c9c;
        margin: 10px 0;
      }

      p:nth-child(2) {
        color: #F8494D!important;
        font-size: 20px;
      }

      // p:last-child {
      //   color: #000000 !important;
      // }
    }
  }
}
</style>
