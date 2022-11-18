<template>
  <div>
    <HeaderNav />
    <div class="main-container">
      <img src="../assets/img/payment-success-img.png" alt="" />
      <span>订单提交成功!还有{{ count }}秒自动返回首页!</span>
      <div class="return-home-button" @click="goHome()">点击返回首页</div>
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
    return {
      count: null,
    };
  },
  created() {
    this.countDown(); // 倒计时
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
    countDown() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= TIME_COUNT) {
            //限制倒计时区间
            this.count--;
          } else {
            clearInterval(this.timer); //删除定时器
            this.timer = null;
            //跳转的页面写在此处
            this.$router.push({ name: "home" });
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 50px;
  img {
    width: 200px;
  }
  span {
    margin: 20px auto;
    font-size: 30px;
  }

  .return-home-button {
        cursor: pointer;
    width: 250px;
    height: 80px;
    line-height: 80px;
    border: 2px solid #3bb270;
    color: #3bb270;
    border-radius: 10px;
    font-size: 30px;
    text-align: center;
  }
}
</style>
