<template>
  <div>
    <div class="header-nav">
      <div>
        <span>欢迎来到贝壳精选</span>
        <span @click="goLogin">请登录</span>
        <span @click="goRegister">免费注册</span>
      </div>
      <div>
        <span>首页</span>| <span>购物车(0)</span>|
        <span>我的订单</span>
      </div>
    </div>
    <div class="header-search-box">
      <div class="shell-choiceness">贝壳精选</div>
      <GoodsSearchBox />
    </div>
    <div class="header-tab-box">
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        找商品
      </div>
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        找服务
      </div>
    </div>
    <el-main>
      <div v-if="num == 1" class="el-main-son1">
        <div class="sort-radio-box">
          <span>分类</span>
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="化学试剂"></el-radio-button>
            <el-radio-button label="生化试剂"></el-radio-button>
            <el-radio-button label="实验仪器"></el-radio-button>
            <el-radio-button label="实验耗材"></el-radio-button>
            <el-radio-button label="医疗器械"></el-radio-button>
            <el-radio-button label="科研设备"></el-radio-button>
            <el-radio-button label="原料药"></el-radio-button>
            <el-radio-button label="辅料"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="brand-radio-box">
          <span>品牌</span>
        </div>
        <div class="standard-radio-box">
          <span>规格</span>
        </div>
      </div>
      <div v-if="num == 2" class="el-main-son2">
        <p>2</p>
      </div>
    </el-main>
  </div>
</template>

<script>
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
export default {
  data() {
    return {
      num: 1,
      radio1: "全部",
    };
  },
  components: {
    GoodsSearchBox,
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
.header-nav {
  display: flex;
  justify-content: space-between;

  div {
    margin: 10px;
    display: flex;
    gap: 30px;
  }

  div:first-child span:not(:first-child) {
    color: blue;
    cursor: pointer;
  }
}
.header-search-box {
  width: 100vw;
  display: flex;
  justify-content: center;

  .shell-choiceness {
    width: 150px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #0e6ebe;
    color: #fff;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
}
.header-tab-box {
  margin-top: 20px;
  width: 100vw;
  display: flex;
  div {
    width: 50%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: bolder;
  }
  .active {
    background: #0e6ebe;
    color: #fff;
  }
}
.el-main {
  overflow-x: hidden;
  padding: 0;
  margin: 40px 20px;

  .el-main-son1 {
    display: flex;
    flex-direction: column;

    .sort-radio-box {
      width: 100vw;
      display: flex;
      text-align: center;

      span {
        height: 50px;
        line-height: 50px;
      }

      .el-radio-group {
        width: 90%;
      }

      // 这一端css是在elementui的radio基础上改的,要理清hover active checked之间的关系
      .el-radio-group > .el-radio-button {
        width: 10%;

        /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #0e6ebe;
          color: #fff;
        }

        /deep/.el-radio-button__inner {
          padding: 0 0;
          width: 100%;
          border: none;
          height: 50px;
          line-height: 50px;
          transition: none;
        }

        /deep/.el-radio-button__inner:hover {
          color: #0e6ebe;
        }
      }
    }
  }


}
</style>
