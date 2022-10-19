<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="4"
            ><div class="grid-content bg-purple">贝壳精选</div></el-col
          >
          <el-col :span="8"
            ><div
              type="button"
              class="grid-content bg-purple"
              :class="num == 1 ? 'active' : ''"
              @click="num = 1"
            >
              找商品
            </div></el-col
          >
          <el-col :span="8"
            ><div
              type="button"
              class="grid-content bg-purple"
              :class="num == 2 ? 'active' : ''"
              @click="num = 2"
            >
              找服务
            </div></el-col
          >
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <div v-if="num == 1" class="el-main-son">
          <indexGoods />
          <goodsBannerBox/>
        </div>
        <div v-if="num == 2"  class="el-main-son">
          <indexService />
          <serviceBannerBox/>

        </div>
        <!-- <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link> -->
      </el-main>

    </el-container>
  </div>
</template>

<script>
// import Footer from "./Footer.vue";
import indexGoods from "../components/indexGoods.vue";
import indexService from "../components/indexService.vue";
import goodsBannerBox from "../components/indexComponents/goodsBannerBox.vue";
import serviceBannerBox from "../components/indexComponents/serviceBannerBox.vue";
export default {
  // name: 'Home',
  data() {
    return {
      input: "",
      num: 1,
    };
  },
  components: {
    // Footer,
    indexGoods,
    indexService,
    goodsBannerBox,
    serviceBannerBox,
  },
};
</script>

<style lang="less" scoped>
.el-container {

  .el-header {
    // background-color: green;
    .el-row {
      &:last-child {

      }
    }

    .bg-purple {
      background: #d3dce6;
    }
    .grid-content {
      height: 36px;
      text-align: center;
      line-height: 36px;
    }
  }

  .el-main {
    padding: 0px;
    .el-main-son {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

    }

  }

}

.active {
  color: firebrick;
}
</style>
