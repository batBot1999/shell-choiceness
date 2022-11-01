<template>
  <div class="goodsBannerBox">
    <div class="bannerLeft">
      <el-popover
        width="200"
        trigger="hover"
        placement="right-start"
        :visible-arrow="false"
        v-for="(item1, index) in totalGoodsSortFirst"
        :key="index"
        @show="hoverShow(item1.id)"
      >
        <div v-if="slotIsShow">
          <!-- slot插入开始 -->
          <div
            class="goodssort-second-item"
            v-for="(item2, _index) in totalGoodsSortSecond"
            :key="_index"
            @click="goSearchPage(item2.name)"
          >
            {{ item2.name }}
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
import { getBanner } from "../../request/api.js";
import { getAnnouncementPagination } from "../../request/api.js";
import { getIndexSort } from "../../request/api.js";

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
      // 商品分类参数一级
      parentId: 0,
      level: 1,
      type: 1,
      // 一级商品分类容器
      totalGoodsSortFirst: [],
      // 二级商品分类容器
      totalGoodsSortSecond: [],
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
        name: "goods-search-page",
        query: { secondSortName: secondSortName },
      });
    },

    // 前往轮播图详情
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

    // getAnnouncement() {
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioAnnouncement/app/list",
    //       {
    //         header: { "Content-Type": "application/json" },
    //         params: {
    //           pageNo: this.anouncementCurrentPage,
    //           pageSize: this.anouncementPageSize,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       // console.log("res---", res);
    //       if (res.data.code === 200) {
    //         this.announcementList = res.data.result.records;
    //         this.anouncementTotal = res.data.result.total;
    //       }
    //     });
    // },

    // 选择当前是第几页
    handleCurrentChange(val) {
      this.anouncementCurrentPage = val;
      this.getAnnouncement();
    },

    // 在网页显示前就把首页商品分类一级标题加载完
    // getIndexGoodsSortFirst() {
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioClassification/app/parent",
    //       {
    //         params: {
    //           parentId: this.parentId,
    //           level: this.level,
    //           type: this.type,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       // console.log("res-----", res);
    //       if (res.data.code === 200) {
    //         this.totalGoodsSortFirst = res.data.result;
    //         // console.log(this.totalGoodsSortFirst);
    //       }
    //     })
    //     .catch((e) => {});
    // },

    // 获取商品一级分类标题
    getIndexGoodsSortFirst() {
      let params = {
        parentId: this.parentId,
        level: this.level,
        type: this.type,
      };
      getIndexSort(params).then((res) => {
        // console.log("三个参数:", this.parentId,this.level,this.type);
        // console.log("getIndexSortRes---", res);
        if (res.code === 200) {
          this.totalGoodsSortFirst = res.result;
          // console.log(this.totalGoodsSortFirst);
        }
      });
    },

    // 首页商品分类hover时显示二级标题
    // getIndexSortHover(id) {
    // hoverShow(id) {
    //   // console.log("id---", id);
    //   axios
    //     .get(
    //       "http://linzhiying123.natapp1.cc/jeecg-boot/bio/app/bioClassification/app/parent",
    //       {
    //         params: {
    //           id: id,
    //           level: this.level,
    //           type: this.type,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       // console.log("res-----", res);
    //       if (res.data.code === 200) {
    //         this.totalGoodsSortSecond = res.data.result;
    //         // this.slotIsShow = true;
    //         // console.log("totalGoodsSortSecond---", this.totalGoodsSortSecond);
    //       }
    //     })
    //     .catch((e) => {});
    // },

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
            this.totalGoodsSortSecond = res.result;
            this.slotIsShow = true;
          }
        })
        .catch((e) => {});
    },

    // 在mounted时就获取到首页商品分类二级标题
    // getIndexSortSecond() {
    //   let params = {
    //     id: id,
    //     level: this.level,
    //     type: this.type,
    //   };
    //   getIndexSort({});
    // },

    // 跳转到公告详情
    goAnnouncementDetail(id) {
      this.$router.push({
        name: "announcement-detail",
        query: { id: id },
      });
    },
  },
  mounted() {
    // console.log(localStorage.getItem('token'));
    this.notLogin = localStorage.getItem("token") ? true : false;

    this.getBanner();

    this.getAnnouncement();

    this.getIndexGoodsSortFirst();

    // this.getIndexSortSecond();
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
    width: 25vw;
    background: green;

    .el-popover {
      // height: 100px;
      // line-height: 50px;
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

/deep/.goodssort-second-item:hover {
  color: #0e6ebe;
  background-color: #75a6cd;
}
</style>
