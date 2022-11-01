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
          <p>{{ item.name }}</p>
          <p>货号:{{ item.itemNo }}</p>
          <p>规格:{{ item.specificationDesc }}</p>
          <p>{{ item.price }}</p>
          <p>{{ item.enterpriseName }}</p>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
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
        // console.log("res---", res);
        this.goodsList = res.result.records;
        console.log("goodsList---", this.goodsList);
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
      // 自动播放
      autoplay: true,
    });
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 180px;
  margin: 0 auto;

  .swiper-slide {
    width: 33.33%;
    height: 100%;
    background: red;
  }
}
</style>
