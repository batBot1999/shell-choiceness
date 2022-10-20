<template>
  <div>
    <el-container>
      <!-- header包含了贝壳精选和商品服务tab -->
      <el-header>
        <el-row :gutter="28">
          <el-col :span="3"
            ><div class="grid-content shell-shoiceness">贝壳精选</div></el-col
          >
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>

          <el-col :span="6"
            ><div
              style=""
              type="button"
              class="grid-content tab-button"
              :class="num == 1 ? 'active' : ''"
              @click="num = 1"
            >
              找商品
            </div></el-col
          >
          <el-col :span="6"
            ><div
              style=""
              type="button"
              class="grid-content tab-button"
              :class="num == 2 ? 'active' : ''"
              @click="num = 2"
            >
              找服务
            </div></el-col
          >
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
        </el-row>
      </el-header>

      <!-- 主题内容 -->
      <el-main>
        <div v-if="num == 1" class="el-main-son">
          <!-- 商品搜索box 开始 -->
          <GoodsSearchBox />
          <!-- 商品搜索box 结束 -->

          <!-- 商品轮播图box 开始 -->
          <GoodsBannerBox />
          <!-- 商品轮播图box 结束 -->

          <!-- 商品推荐 开始 -->
          <GoodsRecommand />
          <!-- 商品推荐 结束 -->
        </div>
        <div v-if="num == 2" class="el-main-son">
          <ServiceSearchBox />
          <ServiceBannerBox />
        </div>

        <!-- <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link> -->
      </el-main>
    </el-container>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import ServiceSearchBox from "../components/ServiceSearchBox.vue";
import GoodsBannerBox from "../components/indexComponents/GoodsBannerBox.vue";
import ServiceBannerBox from "../components/indexComponents/ServiceBannerBox.vue";
import GoodsRecommand from "../components/GoodsRecommand.vue";
export default {
  // name: 'Home',
  data() {
    return {
      input: "",
      num: 1,
    };
  },
  components: {
    Footer,
    GoodsSearchBox,
    ServiceSearchBox,
    GoodsBannerBox,
    ServiceBannerBox,
    GoodsRecommand,
  },
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    .grid-content {
      height: 36px;
      text-align: center;
      line-height: 36px;
    }
    .shell-shoiceness {
      background: #0e6ebe;
      color: #fff;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      margin: 20px 0 0 20px;
    }

    .tab-button {
      margin-top: 40px;
      background: #fff0f3;
      font-weight: bolder;
    }

    .active {
      background: #fff;
    }
  }

  .el-main {
    .el-main-son {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
