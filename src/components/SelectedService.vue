<template>
  <div class="selected-service-box">
    <h1>精选服务</h1>
    <el-tabs v-model="activeName" type="card" @tab-click="tabSearchButton">
      <el-tab-pane
        v-for="(item, index) in serviceRecommendNav"
        :key="index"
        :label="item.name"
        :name="item.id.toString()"
      >
      </el-tab-pane>
    </el-tabs>

    <div class="service-content">
      <div
        class="tab-item"
        v-for="(item, index) in serviceList"
        :key="index"
        @click="goServiceDetail(item.id)"
      >
        <img src="../assets/img/serviceItemImage.png" alt="" />
        <div class="tab-item-text">
          <div>
            <p>{{ item.name }}</p>
            <p>服务商: {{ item.enterpriseName }}</p>
          </div>
          <button>快速体验</button>
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
import { serviceRecommendList } from "../request/api.js";
import { serviceRecommendListSupplement } from "../request/api.js";
import { getIndexSort } from "../request/api.js";
export default {
  data() {
    return {
      activeName: "22",
      pageSize: 20,
      serviceList: [],
      currentPage: 1,
      id: null,
      level: 1,
      type: 2,
      serviceRecommendNav: [],
      total: 0,
      recommendTabItem: {
        name: "精选服务",
        parentId: 22,
        level: 2,
        createBy: "admin",
        id: 22,
        tabId: null,
      },
    };
  },

  methods: {
    // 前往服务详情
    goServiceDetail(id) {
      this.$router.push({
        name: "service-detail",
        query: { id: id },
      });
    },

    // 获取服务分页
    getServiceList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      // console.log("params---", params);
      serviceRecommendList(params).then((res) => {
        // console.log("res---", res);
        this.serviceList = res.result.records;
        // console.log("this.serviceList", this.serviceList);
        this.total = res.result.total;
      });
    },

    // 获取服务分页tab
    getServiceRecommendNav() {
      let params = {
        level: 2,
        type: 2,
      };
      getIndexSort(params)
        .then((res) => {
          if (res.code === 200) {
            // console.log("resNav---", res);
            this.serviceRecommendNav = res.result;
            this.serviceRecommendNav.unshift(this.recommendTabItem);
            // console.log("this.serviceRecommendNav",this.serviceRecommendNav);
          }
        })
        .catch((e) => {});
    },

    // 分页点击其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getServiceList();
    },

    // 点击tab其他按钮跳转
    tabSearchButton(tab, event) {
      this.tabId = tab.name;
      // console.log("tabId",this.tabId);
      // 如果点击了热门推荐，就不传参数直接请求，如果点击其他的tab就传对应参数
      if (this.tabId == 22) {
        // console.log("this.tabId---", this.tabId);
        let params = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        serviceRecommendListSupplement(params).then((res) => {
          // console.log("params---", params);
          // console.log("tabSearchButton---", res);
          this.serviceList = res.result.records;
          // console.log("serviceList---", this.serviceList);
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
        serviceRecommendListSupplement(params).then((res) => {
          console.log("params---", params);
          console.log("tabSearchButton---", res);
          this.serviceList = res.result.records;
          // console.log("serviceList---", this.serviceList);
          this.currentPage = 1;
          this.total = res.result.total;
        });
      }
    },
  },

  mounted() {
    this.getServiceRecommendNav();
    this.getServiceList();
    //  console.log("servicemounted");

  },
};
</script>

<style lang="less" scoped>
.selected-service-box {
  // display: flex;
  // background: red;
  width: 90vw;
  /deep/.el-tabs__item.is-active {
    color: #fff;
    background: #0e6ebe;
  }
  .service-content {
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

        // p:first-child {
        //   margin: 10px;
        //   font-weight: bold;
        //   font-size: 20px;
        // }

        // p:nth-child(5) {
        //   color: red;
        //   margin-left: 20px;
        //   font-size: 30px;
        // }
      }
    }
  }
}
</style>
