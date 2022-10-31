<template>
  <div class="goodsRecommandBox">
    <span>商品推荐</span>&nbsp&nbsp&nbsp&nbsp<span>爆款商品推荐</span>
    <el-tabs v-model="activeName" type="card" @tab-click="tabSearchButton">
      <el-tab-pane
        v-for="(item, index) in goodsRecommendNav"
        :key="index"
        :label="item.name"
        :name="item.id.toString()"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="hot-recommand-box">
      <div
        class="tab-item"
        @click="goGoodsDetail(item.id)"
        v-for="(item, index) in goodsList"
        :key="index"
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
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { goodsRecommendList } from "../request/api.js";
import { getIndexSort } from "../request/api.js";
import axios from "axios";
export default {
  data() {
    return {
      activeName: "22",
      pageSize: 20,
      goodsList: [],
      currentPage: 1,
      id: null,
      level: 2,
      type: 1,
      goodsRecommendNav: [],
      total: 0,
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

  computed: {},

  methods: {
    goGoodsDetail(id) {
      this.$router.push({
        name: "goods-detail",
        query: { id: id },
      });
    },

    getgoodsList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      goodsRecommendList(params).then((res) => {
        // console.log("res---", res);
        this.goodsList = res.result.records;
        // console.log("goodsList---", this.goodsList);
          this.total = res.result.total;
      });
    },

    // getgoodsList() {
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioItem/recommended/list",
    //       {
    //         params: {
    //           pageNo: this.currentPage,
    //           pageSize: this.pageSize,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       if (res.data.code === 200) {
    //         // console.log("res-----", res.data.result.records);
    //         this.goodsList = res.data.result.records;
    //         // console.log("this.goodsList----", this.goodsList);
    //         this.total = res.data.result.total;
    //       }
    //     })
    //     .catch((e) => {});
    // },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getgoodsList();
    },

    // getGoodsRecommendNav() {
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioClassification/app/parent",
    //       {
    //         params: {
    //           level: this.level,
    //           type: this.type,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log("resNav-----", res);
    //       if (res.data.code === 200) {
    //         this.goodsRecommendNav = res.data.result;
    //         // this.$push(this.goodsRecommendNav, "2", this.recommendTabItem);
    //         this.goodsRecommendNav.unshift(this.recommendTabItem);
    //         console.log("this.goodsRecommendNav---", this.goodsRecommendNav);
    //       }
    //     })
    //     .catch((e) => {});
    // },

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
          }
        })
        .catch((e) => {});
    },

    // 点击tab时重新进行查询
    // tabSearchButton(tab, event) {
    //   // console.log(tab, event);
    //   // 通过elementui文档拿到这个tabId,真的难拿,不看文档绕了好大一圈都拿不到
    //   this.tabId = tab.name;
    //   // console.log("this.tabId---",this.tabId);
    //   // console.log(this.activeName);
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioItem/list",
    //       {
    //         params: {
    //           categoryId: this.tabId,
    //           pageNo: this.currentPage,
    //           pageSize: this.pageSize,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       if (res.data.code === 200) {
    //         console.log("params---", params);
    //         console.log("tabSearchButton---", res);
    //         this.goodsList = res.data.result.records;
    //       }
    //     })
    //     .catch((e) => {});
    // },

    // 切换tab重新分页
    tabSearchButton(tab, event) {
      this.tabId = tab.name;

      // 如果点击了热门推荐，就不传参数直接请求，如果点击其他的tab就传对应参数
      if (this.tabId == 22) {
        // console.log("this.tabId---", this.tabId);
        let params = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        goodsRecommendList(params).then((res) => {
          // console.log("params---", params);
          console.log("tabSearchButton---", res);
          this.goodsList = res.result.records;
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
          this.goodsList = res.result.records;
          this.currentPage = 1;
          this.total = res.result.total;

        });
      }
    },
  },

  mounted() {
    this.getgoodsList();

    this.getGoodsRecommendNav();
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
  }
  /deep/.el-tabs__item.is-active {
    color: #fff;
    background: #0e6ebe;
  }
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
}
</style>
