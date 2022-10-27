<template>
  <div class="goodsRecommandBox">
    <span>商品推荐</span>&nbsp&nbsp&nbsp&nbsp<span>爆款商品推荐</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="热门推荐" name="hotRecommand" class="hot-recommand">
        <div class="hot-recommand-box">
          <div
            class="tab-item"
            @click="goGoodsDetail(item.id)"
            v-for="item in goodsList"
            :key="item.id"
          >
            <!-- <div class="tab-item" @click="goGoodsDetail"> -->
            <img src="../assets/img/goodsImage.png" alt="" />
            <div class="tab-item-text">
              <p>{{ item.name }}</p>
              <p>货号:{{ item.itemNo }}</p>
              <p>规格:{{ item.specificationDesc }}</p>
              <p>{{ item.price }}</p>
              <p>{{ item.enterpriseName }}</p>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
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
import { goodsRecommendList } from "../request/api.js";
export default {
  data() {
    return {
      activeName: "hotRecommand",
      pageNo: 1,
      pageSize: 1000,
      goodsList: [],
      currentPage4: 4,
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    goGoodsDetail(id) {
      this.$router.push({
        name: "goods-detail",
        query: { id: item.id },
      });
    },

    getgoodsList() {
      goodsRecommendList({ pageNo: this.pageNo, pageSize: this.pageSize }).then(
        (res) => {
          // console.log("res.result.records---", res.result.records);
          this.goodsList = res.result.records;
          // console.log("goodsList---", this.goodsList);
        }
      );
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },

  mounted() {
    this.getgoodsList();
  },
};
</script>

<style lang="less" scoped>
.goodsRecommandBox {
  // display: flex;
  // background: red;
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
  .hot-recommand {
    .hot-recommand-box {
      display: flex;
      .tab-item {
        box-sizing: border-box;
        background: #0e6ebe;
        width: 18%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1%;
        img {
          width: 100%;
        }

        .tab-item-text {
          text-align: center;
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
            font-size: 30px;
          }
        }
      }
    }
    .el-pagination {
    }
  }
}
</style>
