<template>
  <div class="hot-recommend-bg">
    <div class="hot-recommend-box">
      <div class="hot-recommend-header">
        <img src="../assets/img/index-recommend-img.png" alt="" />
        <span>热门推荐</span>
        <span>爆款产品推荐</span>
        <span @click="goSearchPage">更多 →</span>
      </div>
      <div class="hot-recommend-container">
        <Swiper />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "./Swiper.vue";
export default {
  data() {
    return {};
  },

  components: {
    Swiper,
  },

  methods: {
    goSearchPage() {
      this.$router.push({
        name: "goods-search-page",
      });
    },
  },

  mounted() {},
};
</script>

<style lang="less" coped>
.hot-recommend-bg {
  // background: #f8f9fe;
  // background: red;
  // width: 100%;
  // height: 40vh;
  background: #F8F9FE;
  overflow: hidden;
  padding-bottom: 40px;

  .hot-recommend-box {
    box-sizing: border-box;
    background: #ffffff;
    width: 80%;
    height: 300px;
    padding: 20px;
    margin: 50px auto 0;

    .hot-recommend-header {
      // width: 100%;
      display: flex;
      align-items: center;

      span:nth-child(2) {
        font-size: 24px;
        margin-left: 15px;
      }

      span:nth-child(3) {
        font-size: 14px;
        color: #9c9c9c;
        margin-left: 10px;
        flex: 1;
        margin-top: 10px;
      }

      span:last-child {
        font-size: 14px;
        color: #2979ff;
      }
    }
    .hot-recommend-container {
      // background: red;
    }
  }
}
</style>
