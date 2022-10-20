<template>
  <div class="goodsBannerBox">
    <div class="bannerLeft">
      <ul>
        <li>全部商品分类</li>
        <li>工具酶、抗体等上游生物试剂</li>
        <li>实验室常用仪器、耗材</li>
        <li>医疗器械、设备</li>
        <li>特色原料药、中间体、辅料、包材</li>
        <li>医疗服务</li>
        <li>专业软件</li>
      </ul>
    </div>
    <div class="bannerCenter">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="200px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="bannerRight">
      <div class="welcomeBox">您好!欢迎来到贝壳精选!</div>
      <div class="buttonBox">
        <button @click="goLogin()">登录</button>
        <button @click="goRegister()">注册</button>
      </div>
      <div class="announcementBox">
        <p>平台公告</p>
        <ul>
          <li>【通告】&供应商管理措施</li>
          <li>【通告】&采购商管理措施</li>
          <li>【推荐】&nbsp实验耗材精选</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style lang="less" scoped>
.goodsBannerBox {
  width: 90vw;
  height: 200px;
  border: 1px solid #000;
  margin-bottom: 20px;
  display: flex;

  .bannerLeft {
    width: 25%;
    padding: 10px;

    li {
      line-height: 25px;
    }

    li:hover {
      color: #475669;
    }

    li:last-child::after {
      content: ">";
      float: right;
    }

    li:first-child::after {
      content: "";
    }
  }

  .bannerCenter {
    width: 50%;
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

  .bannerRight {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .welcomeBox {
      font-size: 16px;
      padding: 12px;
    }

    .buttonBox {
      button:first-child {
        width: 100px;
        margin: 10px;
        color: #fff;
        background-color: #0e6ebe;
        border: 1px solid black;
      }
      button:last-child {
        width: 100px;
        margin: 10px;
        color: #000;
        background-color: #fff;
        border: 1px solid black;
      }
    }

    .announcementBox {
      text-align: center;
      width: 100%;
      border-top: 1px solid #000;
      margin-top: 10px;
      padding-top: 10px;
      font-size: 14px;

      p {
        font-size: 15px;
        font-weight: bolder;
        margin-bottom: 10px;
      }

      ul > li {
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
