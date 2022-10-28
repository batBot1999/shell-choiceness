<template>
  <div class="goodsBannerBox">
    <div class="bannerLeft">
      <ul>
        <li>全部商品分类</li>
        <li>工具酶、抗体等上游生物试剂</li>
        <li>实验室常用仪器、耗材</li>
        <li>医疗器械、设备</li>
        <li>特色原料药、中间体、辅料、包材</li>
        <li>医疗服务</li>
        <li>专业软件</li>
      </ul>
    </div>
    <div class="bannerCenter">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="200px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.pic" class="small">{{ item }}</img>
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
import { getGoodsRecommendBanner } from "../../request/api.js";
import { getAnnouncementPagination } from "../../request/api.js";
import axios from "axios";

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
      bannerList:[],
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    getGoodsBanner() {
      getGoodsRecommendBanner(this.bannerType).then((res) => {
        console.log(res);
        this.bannerList = res.result;
        // console.log("bannerList---", bannerList);
      });
    },
    goAnnouncementDetail(id) {
      this.$router.push({
        name: "announcement-detail",
        query: { id: id },
      })
    },

    // getAnnouncement() {
    //   getAnnouncementPagination({
    //     pageNo: this.anouncementCurrentPage,
    //     pageSize: this.anouncementPageSize,
    //   }).then((res) => {
    //     console.log(res);
    //     if (res.code === 200) {
    //       this.announcementList = res.result.records;
    //       // console.log("announcementList---", this.announcementList);
    //       this.anouncementTotal = res.result.total;
    //       // console.log("this.total---", this.total);
    //     }
    //   });
    // },

    // 选择当前是第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.anouncementCurrentPage = val;
      this.getAnnouncement();
    },
    getAnnouncement() {
      axios
        .get(
          "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioAnnouncement/app/list",
          {
            header: { "Content-Type": "application/json" },
            params: {
              pageNo: this.anouncementCurrentPage,
              pageSize: this.anouncementPageSize,
            },
          }
        )
        .then((res) => {
          // console.log("res---", res);
          if (res.data.code === 200) {
            this.announcementList = res.data.result.records;
            this.anouncementTotal = res.data.result.total;
          }
        });
    },
  },
  mounted() {
    // console.log(localStorage.getItem('token'));
    this.notLogin = localStorage.getItem("token") ? true : false;

    this.getGoodsBanner();

    this.getAnnouncement();
  },
  watch: {
    notLogin(newvalue, oldvalue) {
      // console.log(localStorage.getItem('token'));
      // console.log(newvalue,oldvalue);
    },
  },
};
</script>

<style lang="less" scoped>
.goodsBannerBox {
  width: 90vw;
  height: 200px;
  border: 1px solid #000;
  margin-bottom: 20px;
  display: flex;

  .bannerLeft {
    width: 25%;
    padding: 10px;

    li {
      line-height: 25px;
    }

    li:hover {
      color: #475669;
    }

    li:last-child::after {
      content: ">";
      float: right;
    }

    li:first-child::after {
      content: "";
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
        font-size: 12px;
        font-weight: bolder;
        margin-left: 40%;
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
</style>
