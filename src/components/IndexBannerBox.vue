<template>
  <div class="index-banner-bg">
    <div class="index-banner-container">
      <div class="banner-left-box">
        <div class="sort-title">全部商品分类</div>
        <el-popover
          popper-class="popover-style"
          trigger="hover"
          placement="right-start"
          :visible-arrow="false"
          v-for="(item1, index) in totalSortFirst"
          :key="index"
          @show="hoverShow(item1.id)"
        >
          <div v-if="slotIsShow">
            <!-- slot插入开始 -->
            <div
              v-for="(item2, _index) in totalSortSecond"
              :key="_index"
              @click="goSearchPage(item2.name)"
              class="sort-second-item"
            >
              {{ item2.name }}
            </div>
          </div>
          <!-- slot插入结束 -->
          <el-button slot="reference">{{ item1.name }}</el-button>
        </el-popover>
      </div>
      <div class="banner-main-box">
        <el-carousel height="570px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img
              :src="item.pic"
              class="small"
              @click="goBannerDetail(item.id, item.skipType, item.skipUrl)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="banner-right-box">
        <div class="banner-login-box">
          <div class="banner-avatar-box"></div>
          <div class="banner-welcome-text">您好，欢迎来到贝壳精选！</div>
          <div class="banner-button-box">
            <button @click="goLogin">登录</button>
            <button @click="goRegister">注册</button>
          </div>
        </div>
        <div class="banner-announcement-box">
          <div class="announcement-title">平台公告</div>
          <!-- paginationContent -->
          <div class="pagination-content">
          <ul v-for="(item, index) in announcementList" :key="index">
            <div class="flex-box" @click="goAnnouncementDetail(item.id)">
              <span>{{ item.title }}</span>
              <p>{{ item.createTime }}</p>
            </div>
          </ul>
          </div>
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
  </div>
</template>

<script>
import { getBanner } from "../request/api.js";
import { getAnnouncementPagination } from "../request/api.js";
import { getIndexSort } from "../request/api.js";

export default {
  data() {
    return {
      notLogin: false,
      realname: localStorage.realname,
      companyName: localStorage.companyName,
      announcementList: [],

      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 公告分页参数
      anouncementCurrentPage: 1,
      anouncementPageSize: 3,
      anouncementTotal: 0,
      // 轮播图容器
      bannerType: 1,
      bannerList: [],
      // 商品分类参数一级
      parentId: 0,
      level: 1,
      type: 1,
      // 一级商品分类容器
      totalSortFirst: [],
      // 二级商品分类容器
      totalSortSecond: [],
      // 全部商品分类控制显示隐藏
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

    // 获取轮播图
    getBanner() {
      getBanner(this.bannerType)
        .then((res) => {
          // console.log("bannerRes---", res);
          this.bannerList = res.result;
          // console.log("bannerList---", this.bannerList);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //   // 前往轮播图详情
    goBannerDetail(id, skipType, skipUrl) {
      // 如果skipId为1,点击跳转到商品详情页面
      if (skipType == 1) {
        this.$router.push({
          name: "goods-detail",
          query: { id: id },
        });
      } else if (skipType == 3) {
        // window.open("https://"+skipUrl); 如果后端没加https,只是一个www.baidu.com,要自己手动拼，否则就会跳转到localhost8080:www.baidu.com
        window.open(skipUrl);
      }
    },

    //   // 携带二级分类前往搜索页面
      goSearchPage(secondSortName) {
        this.$router.push({
          name: "goods-search-page",
          query: { secondSortName: secondSortName },
        });
      },

    //   // 获取公告
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

      // 选择当前是第几页
      handleCurrentChange(val) {
        this.anouncementCurrentPage = val;
        this.getAnnouncement();
      },

    //   // 获取一级分类标题
    getIndexSortFirst() {
      let params = {
        parentId: this.parentId,
        level: this.level,
        type: this.type,
      };
      getIndexSort(params).then((res) => {
        // console.log("三个参数:", this.parentId,this.level,this.type);
        // console.log("getIndexSortRes---", res);
        if (res.code === 200) {
          this.totalSortFirst = res.result;
          // console.log(this.totalSortFirst);
        }
      });
    },

    //   // 获取二级分类标题
    hoverShow(id) {
      // console.log("id---", id);
      let params = {
        parentId: id,
        level: 2,
        type: 1,
      };
      getIndexSort(params)
        .then((res) => {
          if (res.code === 200) {
            // console.log("res---", res);
            this.totalSortSecond = res.result;
            this.slotIsShow = true;
          }
        })
        .catch((e) => {});
    },

    //   // 跳转到公告详情
      goAnnouncementDetail(id) {
        this.$router.push({
          name: "announcement-detail",
          query: { id: id },
        });
      },
  },

  mounted() {
    // console.log(localStorage.getItem('token'));
    // this.notLogin = localStorage.getItem("token") ? true : false;

    this.getBanner();

    this.getAnnouncement();

    this.getIndexSortFirst();

    // this.getIndexSortSecond();
  },
};
</script>

<style lang="less">
.popover-style {
  width: 300px;
  border: none;
  transform: translate(-11px, -5px);
  div {
    font-size: 16px;
    cursor: pointer;
  }

  .sort-second-item:hover {
    color: #2979ff;
  }
}
</style>

<style lang="less" scoped>
.index-banner-bg {
  // width: 100vw;
  height: 570px;
  background: url("../assets/img/index-banner-bgimg.png");
  background-size: cover;
  overflow: hidden;

  .index-banner-container {
    width: calc(100vw - 520px);
    height: 100%;
    display: flex;
    margin: 0 auto;

    .banner-left-box {
      width: 300px;
      height: 570px;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;

      .sort-title {
        font-size: 16px;
        text-align: center;
        color: #2979ff;
        height: 80px;
        line-height: 80px;
      }

      span {
        width: 300px;

        span > .el-button {
          width: 300px;
          height: calc(490px / 6);
          text-align: start;
          font-size: 16px;
          font-weight: bold;
        }

        span > .el-button::after {
          content: ">";
          float: right;
          font-size: 20px;
          color: #c7c7c7;
        }
      }
    }

    .banner-main-box {
      width: 860px;
      height: 570px;

      // 宽度优先自适应
      .el-carousel__item img {
        width: 100%;
      }

      // 轮播图左右按钮大小
      /deep/.el-carousel__arrow i {
        font-size: 30px !important;
      }
    }

    .banner-right-box {
      width: 240px;
      height: 570px;
      background: #ffffff;

      .banner-login-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        .banner-avatar-box {
          width: 80px;
          height: 80px;
          background-image: url("../assets/img/index-avtar-default.png");
          background-size: cover;
          margin: 30px 0 10px;
        }

        .banner-welcome-text {
          color: #666666;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .banner-button-box {
          width: 160px;
          display: flex;
          justify-content: space-between;

          button:first-child {
            width: 70px;
            height: 30px;
            background: #2979ff;
            border-radius: 50px 50px 50px 50px;
            color: #ffffff;
            border: none;
            cursor: pointer;
          }
          button:last-child {
            width: 70px;
            height: 30px;
            background: #ffffff;
            border-radius: 50px 50px 50px 50px;
            color: #2979ff;
            border: 1px solid #2979ff;
            cursor: pointer;
          }
        }
      }

      .banner-announcement-box {
        height: 270px;
        padding: 20px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        .announcement-title {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }

        .pagination-content {
          flex: 1;
          ul {
            margin: 10px 0;
            font-size: 14px;
            line-height: 20px;

            p {
              color: #C7C7C7;
              margin-top: 10px;
            }
          }
        }

        .el-pagination {
          margin: 0 auto;
          text-align: center;
        }
      }
    }
  }
}
</style>
