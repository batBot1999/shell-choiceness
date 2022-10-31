<template>
  <div>
    <el-container>
      <!-- header包含了贝壳精选和商品服务tab -->
      <el-header>
        <el-row :gutter="28">
          <el-col :span="3"
            ><div class="grid-content shell-choiceness">贝壳精选</div></el-col
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

      <el-main>
        <div v-if="num == 1" class="el-main-son">
          <!-- 2.在父组件中通过v-on监听子组件中自定义的事件 -->
          <!-- 商品搜索box -->
          <GoodsSearchBox @searchInput="getSearchInput" />
          <!-- 商品搜索box -->

          <!-- 商品轮播图box -->
          <GoodsBannerBox />
          <!-- 商品轮播图box -->

          <!-- 商品推荐 -->
          <GoodsRecommand />
          <!-- 商品推荐 -->
        </div>
        <div v-if="num == 2" class="el-main-son">
          <!-- 服务搜索box  -->
          <ServiceSearchBox />
          <!-- 服务轮播图box -->
          <ServiceBannerBox />
          <!-- 精选服务 -->
          <SelectedService />
          <PartnerBox />
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
import Footer from "../components/Footer.vue";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import ServiceSearchBox from "../components/ServiceSearchBox.vue";
import GoodsBannerBox from "../components/indexComponents/GoodsBannerBox.vue";
import ServiceBannerBox from "../components/indexComponents/ServiceBannerBox.vue";
import GoodsRecommand from "../components/GoodsRecommand.vue";
import SelectedService from "../components/SelectedService.vue";
import PartnerBox from "../components/PartnerBox.vue";

export default {
  // name: 'Home',
  data() {
    return {
      searchInput: "",
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
    SelectedService,
    PartnerBox,
  },

  methods: {
    getSearchInput(value) {
      // console.log(value);
      this.$router.push({
        name: "goods-search-page",
        query: { name: value },
      });
    },
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
    .shell-choiceness {
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
