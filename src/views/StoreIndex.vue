<template>
  <div>
    <HeaderNav />
    <div class="header-search-box">
      <div class="shell-choiceness">贝壳精选</div>
      <img src="../assets/img/shell-icon.png" alt="" />
      <div>
        <p>贝壳社</p>
        <p>服务电话: 0581-86658021</p>
      </div>
      <GoodsSearchBox class="goods-search-box" />
      <button class="search-button">搜全站</button>
    </div>

    <div class="header-tab-box">
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        企业全部商品
      </div>
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        联系方式
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

        <div class="keyword-search-box">
          <span>关键字</span>
          <input type="text" />
          <button>搜索</button>
        </div>

        <div class="store-pagination-box">
          <!-- table -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="商品名称"> </el-table-column>
            <el-table-column prop="title" label="货号"> </el-table-column>
            <el-table-column prop="type" label="品牌"> </el-table-column>
            <el-table-column prop="url" label="规格"> </el-table-column>
            <el-table-column prop="package" label="销售包装"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="date" label="发货时间"> </el-table-column>
            <el-table-column prop="operarion" label="操作">
              <template slot-scope="scope">
                <!-- <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >加入购物车</el-button
                > -->
                <el-button type="text" size="small">立即下单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="num == 2" class="el-main-son2">
        <p>2</p>
      </div>
    </el-main>

    <Footer />
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
// import getPoem from "../request/api.js";

export default {
  data() {
    return {
      num: 1,
      radio1: "全部",
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
    };
  },
  components: {
    HeaderNav,
    GoodsSearchBox,
    Footer,
  },

  methods: {
    // 选择一页显示多少条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPoemList();
    },
    // 选择当前是第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPoemList();
    },
    getPoemList() {
      axios.get("https://api.apiopen.top/api/getImages", {
        header: { "Content-Type": "application/json" },
        params: { page: this.currentPage, size: this.pageSize },
      }).then((res) => {
        console.log("res---", res);
        if (res.data.code === 200) {
          this.tableData = res.data.result.list;
          this.total = res.data.result.total;
        }
      })
    },
  },

  mounted() {
    this.getPoemList();
  },
};
</script>

<style lang="less" scoped>
.header-search-box {
  width: 90vw;
  margin-left: 5vw;
  display: flex;
  justify-content: center;

  .shell-choiceness {
    width: 150px;
    height: 36px;
    line-height: 36px;
    background: #0e6ebe;
    color: #fff;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }

  img {
    margin-left: 30px;
    margin-right: 10px;
    height: 60px;
  }

  div {
    height: 60px;
    line-height: 30px;

    p {
      font-size: 10px;
      white-space: nowrap;
    }

    p:first-child {
      font-weight: bold;
    }
  }

  /deep/.search-box {
    width: 50vw;
    margin-left: 50px;
    .el-select > .el-input {
      .el-input__inner {
        width: 110px;
      }
    }

    .el-input {
      width: 300px;
      .el-input__inner {
        width: 300px;
      }
    }

    .search-button:active {
      color: #4b8bc0;
    }
  }
  .search-button {
    width: 200px;
    height: 60px;
    color: #fff;
    font-size: 25px;
    background-color: grey;
    border: none;
  }
  .search-button:active {
    color: #0e6ebe;
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
      display: flex;
      text-align: center;

      span {
        height: 50px;
        line-height: 50px;
        width: 10%;
        font-weight: bold;
        font-size: 25px;
      }

      .el-radio-group {
        width: 90%;
      }

      // 这一端css是在elementui的radio基础上改的,要理清hover active checked之间的关系
      .el-radio-group > .el-radio-button {
        width: 11%;

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

    .keyword-search-box {
      display: flex;
      line-height: 50px;
      gap: 10px;
      margin-left: 50px;
      margin-top: 50px;
      span {
        font-size: 20px;
        font-weight: bold;
      }

      input {
        height: 46px;
        width: 400px;
      }

      button {
        color: #fff;
        background: #0e6ebe;
        text-align: center;
        font-size: 20px;
        width: 100px;
        height: 50px;
        border: none;
      }
    }

    .store-pagination-box {
      /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #0e6ebe;
        color: #fff;
      }

      /deep/.el-radio-button__inner {
        padding: 0 0;
        width: 100%;
        border: none;
        height: 30px;
        line-height: 30px;
        transition: none;
      }

      /deep/.el-radio-button__inner:hover {
        color: #0e6ebe;
      }
    }
  }
}
</style>
