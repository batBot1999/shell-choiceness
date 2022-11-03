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
  background: #f8f9fe;
  width: 100%;
  height: 380px;

  .hot-recommend-box {
    background: #ffffff;
    width: 1400px;
    height: 280px;
    margin: 50px auto 0;
    padding: 20px;

    .hot-recommend-header {
      width: 100%;
      height: 78px;
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

    .got-recommend-container {
    }
  }
}
</style>
