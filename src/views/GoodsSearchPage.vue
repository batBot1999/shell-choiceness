<template>
  <div>
    <HeaderNav />
    <div class="header-search-box">
      <div class="shell-choiceness" @click="goHome">贝壳精选</div>
      <GoodsSearchBox @searchInput="getGoodsSearchInput" />
    </div>
    <div class="header-tab-box">
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        全部商品
      </div>
      <!-- <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        首页
      </div> -->
    </div>
    <el-main>
      <div v-if="num == 1" class="el-main-son1">
        <div class="sort-radio-box">
          <!-- tab -->
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="tabSearchButton"
          >
            <el-tab-pane
              v-for="(item, index) in goodsRecommendNav"
              :key="index"
              :label="item.name"
              :name="item.id.toString()"
            >
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="search-pagination-box">
          <!-- 标记1 按照官方文档来， @row-click="goGoodsDetail"方法不能加括号，也不能加参数，下边接受参数就行了-->
          <el-table
            :data="tableData"
            style="width: 100%; font-family: alibaba-Regular"
            @row-click="goGoodsDetail"
          >
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="itemNo" label="货号"> </el-table-column>
            <el-table-column prop="specificationDesc" label="规格">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="createTime" label="发货时间">
            </el-table-column>
            <el-table-column prop=" enterpriseName" label="供应商">
              <el-button type="text" size="small">科加奥</el-button>
            </el-table-column>
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
            class="pagination-box"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total,  prev, pager, next, jumper"
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
import { goodsRecommendList } from "../request/api.js";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
import { getIndexSort } from "../request/api.js";
import { showLoading, hideLoading } from "../util/Loading";
import axios from "axios";
export default {
  data() {
    return {
      // loading: true,
      activeName: "22",
      goodsRecommendNav: [],
      num: 1,
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      // goodsList: [],
      name: "",
      level: 2,
      type: 1,
      recommendTabItem: {
        name: "热门推荐",
        parentId: 22,
        level: 2,
        createBy: "admin",
        id: 22,
        tabId: null,
      },
    };
  },
  components: {
    GoodsSearchBox,
    Footer,
    HeaderNav,
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
    // 标记1
    goGoodsDetail(row) {
      // console.log("row---", row.id);
      this.$router.push({
        name: "goods-detail",
        query: { id: row.id },
      });
    },

    // 分页点击其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getSearchPageGoodsList();
    },

    // 点击搜索按钮
    getGoodsSearchInput(value) {
      // console.log(value);
      axios
        .get(
          "http://bkzx.bioclub.cn/api/jeecg-boot/bio/app/bioItem/list",
          {
            params: {
              name: value,
              pageNo: this.currentPage,
              pageSize: this.pageSize,
            },
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            // console.log("res-----", res.data.result.records);
            this.tableData = res.data.result.records;
            // console.log(this.tableData);
            this.total = res.data.result.total;
          }
        })
        .catch((e) => {});
    },

    // getgoodsList() {
    //   goodsRecommendList({ pageNo: this.pageNo, pageSize: this.pageSize }).then(
    //     (res) => {
    //       this.goodsList = res.result.records;
    //       console.log("this.goodsList---", this.goodsList);
    //     }
    //   );
    // },

    // 获取商品列表
    getSearchPageGoodsList() {
      axios
        .get(
          "http://bkzx.bioclub.cn/api/jeecg-boot/bio/app/bioItem/list",
          {
            params: {
              // name: this.name,
              pageNo: this.currentPage,
              pageSize: this.pageSize,
            },
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            console.log("res-----", res.data.result.records);
            this.tableData = res.data.result.records;
            // console.log(this.tableData);
            this.total = res.data.result.total;
            setTimeout(() => {
              hideLoading();
            }, 500);
          }
        })
        .catch((e) => {
          setTimeout(() => {
            hideLoading();
          }, 500);
        });
    },

    // 获取商品推荐tab列表
    getGoodsRecommendNav() {
      let params = {
        level: this.level,
        type: this.type,
      };
      getIndexSort(params)
        .then((res) => {
          // console.log("resNav-----", res);
          if (res.code === 200) {
            this.goodsRecommendNav = res.result;
            this.goodsRecommendNav.unshift(this.recommendTabItem);
            // console.log("goodsRecommendNav", this.goodsRecommendNav);
          }
        })
        .catch((e) => {});
    },

    // 切换tab重新分页
    tabSearchButton(tab, event) {
      this.tabId = tab.name;

      // 如果点击了热门推荐，就不传参数直接请求，如果点击其他的tab就传对应参数
      if (this.tabId == 22) {
        console.log("this.tabId---", this.tabId);
        let params = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        goodsRecommendList(params).then((res) => {
          // console.log("params---", params);
          // console.log("tabSearchButton---", res);
          this.tableData = res.result.records;
          this.currentPage = 1;
          this.total = res.result.total;
        });
      } else {
        // console.log("this.tabId---", this.tabId);
        let params = {
          categoryId: this.tabId,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        goodsRecommendList(params).then((res) => {
          // console.log("params---", params);
          // console.log("tabSearchButton---", res);
          this.tableData = res.result.records;
          this.currentPage = 1;
          this.total = res.result.total;
        });
      }
    },
  },

  mounted() {
    showLoading();
    // 拿到在首页搜索时候传递的搜索参数
    this.name = this.$route.query.name;
    // console.log("this.name--", this.name);

    // loading
    // this.openFullScreen1();
    // this.getgoodsList();

    // 在这个页面请求和渲染
    this.getSearchPageGoodsList();
    this.getGoodsRecommendNav();
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}
.header-search-box {
  width: 100vw;
  display: flex;
  justify-content: center;

  .shell-choiceness {
    font-family: alibaba-Regular;

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

    /deep/.sort-radio-box {
      font-family: alibaba-Regular;

      // display: flex;
      // text-align: center;

      // span {
      //   height: 50px;
      //   line-height: 50px;
      //   width: 10%;
      //   font-weight: bold;
      //   font-size: 25px;
      // }

      // .el-radio-group {
      //   width: 90%;
      // }

      // // 这一端css是在elementui的radio基础上改的,要理清hover active checked之间的关系
      // .el-radio-group > .el-radio-button {
      //   width: 11%;

      //   /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
      //     background: #0e6ebe;
      //     color: #fff;
      //   }

      //   /deep/.el-radio-button__inner {
      //     padding: 0 0;
      //     width: 100%;
      //     border: none;
      //     height: 50px;
      //     line-height: 50px;
      //     transition: none;
      //   }

      //   /deep/.el-radio-button__inner:hover {
      //     color: #0e6ebe;
      //   }
      // }
    }

    .search-pagination-box {
      .el-radio-group {
        margin: 30px 0;
        display: flex;
        justify-content: center;
        .el-radio-button {
          width: 20vw;
        }

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

      .pagination-box {
        font-family: alibaba-Regular;

        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
