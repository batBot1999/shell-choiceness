<template>
  <div class="goodsRecommandBox">
    <span>商品推荐</span>&nbsp&nbsp&nbsp&nbsp<span>爆款商品推荐</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="热门推荐" name="hotRecommand">
        <div class="tab-item-container">
          <div class="tab-item">
            <img src="../assets/img/goodsImage.png" alt="">
            <div class="tab-item-text">
              <p>艾本德单道移液器</p>
              <p>品牌：Eppendorf/艾本德</p>
              <p>货号：20210330</p>
              <p>规格：套装</p>
              <p>￥999</p>
              <p>杭州科加奥网络科技有限公司</p>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="tab-pane" label="工具酶" name="">工具酶</el-tab-pane>
      <el-tab-pane class="tab-pane" label="抗体" name="">抗体</el-tab-pane>
      <el-tab-pane label="仪器" name="">仪器</el-tab-pane>
      <el-tab-pane label="耗材" name="">耗材</el-tab-pane>
      <el-tab-pane label="器械" name="">器械</el-tab-pane>
      <el-tab-pane label="设备" name="">设备</el-tab-pane>
      <el-tab-pane label="原料药" name="">原料药</el-tab-pane>
      <el-tab-pane label="辅料" name="">辅料</el-tab-pane>
      <el-tab-pane label="更多" name="">更多</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "hotRecommand",
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.goodsRecommandBox {
  width: 90vw;
  span:first-child {
    font-weight: bold;
    font-size: 30px;
  }
  span:nth-child(2) {
    font-size: 12px;
  }
  /deep/.el-tabs__item {
    width: 8.96vw;
  }
  /deep/.el-tabs__item.is-active {
    color: #fff;
    background: #0e6ebe;
  }
  .tab-item-container {
    .tab-item {
      background: #0e6ebe;
      width: 210px;
      img {
        width: 210px;
      }

      .tab-item-text {
        // text-align: center;
        padding-left: 10px;
        font-size: 14px;
        color: #fff;
        padding-bottom: 10px;

        p:first-child {
          margin: 10px;
          font-weight: bold;
          font-size: 20px;
        }

        p:nth-child(5) {
          color: red;
          margin-left: 20px;
          font-size:30px;
        }
      }
    }

  }
}
</style>
