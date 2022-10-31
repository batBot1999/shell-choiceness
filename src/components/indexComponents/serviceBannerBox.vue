<template>
  <div class="serviceBannerBox">
    <div class="bannerLeft">
      <!-- @mouseover.native="getIndexServiceSortHover(item1.id)" -->
      <el-popover
        width="200"
        trigger="hover"
        placement="right-start"
        :visible-arrow="false"
        v-for="(item1, index) in totalServiceSortFirst"
        :key="index"
        @show="hoverShow(item1.id)"
      >
        <div v-if="slotIsShow">
          <!-- slot插入开始 -->
          <div
            class="servicesort-second-item"
            v-for="(item2, index) in totalServiceSortSecond"
            :key="index"
            @click="goSearchPage(item2.name)"
          >
          {{item2.name}}
          </div>
        </div>
        <!-- slot插入结束 -->
        <el-button slot="reference">{{ item1.name }}</el-button>
      </el-popover>
    </div>
    <div class="bannerCenter">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="200px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img
              :src="item.pic"
              class="small"
              @click="goBannerDetail(item.id, item.skipType, item.skipUrl)"
            />{{ item }}
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="bannerRight">
      <div class="is-login-box" v-show="!notLogin">
        <div class="welcomeBox">您好!欢迎来到贝壳精选!</div>
        <div class="buttonBox">
          <button @click="goLogin()">登录</button>
          <button @click="goRegister()">注册</button>
        </div>
      </div>
      <div class="is-login-box" v-show="notLogin">
        <p>{{ realname }},您已登录</p>
        <br />
        <p>所在公司:{{ companyName }}</p>
      </div>
      <div class="announcementBox">
        <p>平台公告</p>
        <!-- paginationContent -->
        <ul v-for="(item, index) in announcementList" :key="index">
          <div class="flex-box" @click="goAnnouncementDetail(item.id)">
            <span>{{ item.title }}</span>
            <span>{{ item.createTime }}</span>
          </div>
        </ul>

        <!-- 分页 -->
        <el-pagination
          small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="anouncementCurrentPage"
          :page-size="anouncementPageSize"
          :total="anouncementTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexSort } from "../../request/api.js";
import { getBanner } from "../../request/api.js";
import { getAnnouncementPagination } from "../../request/api.js";

export default {
  data() {
    return {
      notLogin: false,
      realname: localStorage.realname,
      companyName: localStorage.companyName,
      bannerType: 1,
      announcementList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 公告分页参数
      anouncementCurrentPage: 1,
      anouncementPageSize: 3,
      anouncementTotal: 0,
      // 轮播图容器
      bannerList: [],
      // 服务分类参数一级
      parentId: 0,
      level: 1,
      type: 1,
      // 一级服务分类容器
      totalServiceSortFirst: [],
      // 二级服务分类容器
      totalServiceSortSecond: [],
      // 全部服务分类控制显示隐藏
      // visible: false,
      slotIsShow: false,
      id: null,
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },

    goRegister() {
      this.$router.push({ name: "register" });
    },
    getBanner() {
      getBanner(this.bannerType).then((res) => {
        // console.log("bannerRes---", res);
        this.bannerList = res.result;
        // console.log("bannerList---", this.bannerList);
      });
    },

    // 携带二级分类前往搜索页面
    goSearchPage(secondSortName) {
      this.$router.push({
        name: "service-search-page",
        query: { secondSortName: secondSortName },
      });
    },

    // 获取服务一级分类标题
    getIndexServiceSortFirst() {
      let params = {
        parentId: this.parentId,
        level: this.level,
        type: 2,
      };
      getIndexSort(params).then((res) => {
        // console.log("三个参数:", this.parentId,this.level,this.type);
        // console.log("getIndexSortRes---", res);
        if (res.code === 200) {
          this.totalServiceSortFirst = res.result;
          // console.log(this.totalSortFirst);
        }
      });
    },

    hoverShow(id) {
      // console.log("id---", id);
      let params = {
        parentId: id,
        level: 2,
        type: 2,
      };
      getIndexSort(params)
        .then((res) => {
          if (res.code === 200) {
            // console.log("res---", res);
            this.totalServiceSortSecond = res.result;
            this.slotIsShow = true;
            // console.log("totalServiceSortSecond---", this.totalServiceSortSecond);
          }
        })
        .catch((e) => {});
    },

    // 选择当前是第几页
    handleCurrentChange(val) {
      this.anouncementCurrentPage = val;
      this.getAnnouncement();
    },

    // 获取公告
    getAnnouncement() {
      let params = {
        pageNo: this.anouncementCurrentPage,
        pageSize: this.anouncementPageSize,
      };
      getAnnouncementPagination(params).then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.announcementList = res.result.records;
          // console.log("announcementList---", this.announcementList);
          this.anouncementTotal = res.result.total;
          // console.log("this.total---", this.total);
        }
      });
    },

    // 跳转到公告详情
    goAnnouncementDetail(id) {
      this.$router.push({
        name: "announcement-detail",
        query: { id: id },
      });
    },
  },
  // watch: {
  //   notLogin(newvalue, oldvalue) {
  //     console.log(localStorage.getItem("token"));
  //     // console.log(newvalue, oldvalue);
  //   },
  // },
  mounted() {
    // console.log(localStorage.getItem("token"));
    this.notLogin = localStorage.getItem("token") ? true : false;

    this.getBanner();
    this.getAnnouncement();

    this.getIndexServiceSortFirst();
  },
};
</script>

<style lang="less" scoped>
.serviceBannerBox {
  width: 90vw;
  height: 200px;
  border: 1px solid #000;
  margin-bottom: 20px;
  display: flex;

  .bannerLeft {
    width: 25vw;
    background: green;

    .el-popover {
      // height: 100px;
      // line-height: 50px;
      .el-button {
      }
    }
  }

  .bannerCenter {
    width: 50%;
    .el-carousel__item img {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      margin: 0;
      width: 100%;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

  .bannerRight {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .is-login-box {
      text-align: center;
      .welcomeBox {
        font-size: 16px;
        padding: 12px;
      }
      .buttonBox {
        button:first-child {
          width: 100px;
          margin: 10px;
          color: #fff;
          background-color: #0e6ebe;
          border: 1px solid black;
        }
        button:last-child {
          width: 100px;
          margin: 10px;
          color: #000;
          background-color: #fff;
          border: 1px solid black;
        }
      }
    }

    .announcementBox {
      // text-align: center;
      width: 100%;
      border-top: 1px solid #000;
      margin-top: 10px;
      padding-top: 10px;
      font-size: 14px;

      p {
        font-size: 15px;
        font-weight: bolder;
        margin-bottom: 10px;
      }

      span {
        font-size: 12px;
        height: 12px;
        line-height: 12px;
      }

      ul > .flex-box {
        display: flex;
        justify-content: space-between;
        span:first-child {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        span:last-child {
          color: red;
          transform: scale(0.8);
          white-space: nowrap;
        }
      }
    }
  }
}
/deep/.servicesort-second-item:hover {
  color: #0e6ebe;
  background-color: #75a6cd;
}
</style>
