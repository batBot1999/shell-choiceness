<template>
  <div class="index-banner-bg">
    <div class="index-banner-container">
      <div class="banner-left-box">
        <div class="goods-sort-title">全部商品分类</div>
        <div
          class="goods-sort-item"
          v-for="(item1, index1) in totalSortFirst"
          :key="index1"
          @mouseover="hoverShow(item1.id)"
        >
          <span>{{ item1.name }}</span>
          <div class="sort-item-after"></div>
          <div class="sort-total-item">
            <div class="sort-flex-box">
              <div
                class="flex-item"
                v-for="(item2, index2) in totalSortSecond"
                :key="index2"
                @click="goSearchPage(item2.name)"
              >
                <!-- @mouseover="hoverShowThird(item2.id)" -->
                <div class="flex-item-txt">
                  <span>{{ item2.name }}</span>
                </div>
                :
                <div class="sort-third-container">
                  <div
                    class="sort-third-item"
                    v-for="(item3, index3) in item2.bioClassificationDTOList"
                    :key="index3"
                  >
                    {{ item3.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-popover
          popper-class="popover-style"
          trigger="hover"
          placement="right-start"
          :visible-arrow="false"
          v-for="(item1, index) in totalSortFirst"
          :key="index"
          @show="hoverShow(item1.id)"
          :close-delay="1000000"
        >
          <div v-if="slotIsShow">
            <div
              v-for="(item2, _index) in totalSortSecond"
              :key="_index"
              @click="goSearchPage(item2.name)"
              class="sort-second-item"
            >
              <img class="popover-item-img" style="width: 100px; height: 50px" src="../assets/img/bioClub.png" />
              {{ item2.name }}
            </div>
          </div>
          <el-button slot="reference">{{ item1.name }}</el-button>
        </el-popover> -->
      </div>
      <div class="banner-main-box">
        <el-carousel>
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img
              :src="item.pic"
              class="small"
              style="width: 50vw; height: 100%"
              @click="goBannerDetail(item.id, item.skipType, item.skipUrl)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="banner-right-box">
        <div class="banner-login-box" v-show="!notLogin">
          <div class="banner-avatar-box"></div>
          <div class="banner-welcome-text">您好，欢迎来到贝壳精选！</div>
          <div class="banner-button-box">
            <button @click="goLogin">会员登录</button>
            <button @click="goRegister">免费注册</button>
          </div>
        </div>
        <div class="banner-login-box" v-show="notLogin">
          <div class="banner-avatar-box" @click="goPersonConfig"></div>
          <div class="banner-welcome-text">
            {{ realname }}，欢迎来到贝壳精选！
          </div>
          <span>所在公司&nbsp:&nbsp{{ companyName }}</span>
        </div>
        <div class="banner-announcement-box">
          <div class="announcement-title">
            <span>平台公告</span>
            <span @click="goAnnouncementPage">更多</span>
          </div>
          <!-- paginationContent -->
          <div class="pagination-content">
            <ul v-for="(item, index) in announcementList" :key="index">
              <div class="flex-box" @click="goAnnouncementDetail(item.id)">
                <p>{{ item.title }}</p>
                <p>{{ item.createTime }}</p>
              </div>
            </ul>
          </div>
          <!-- 分页 -->
          <!-- <el-pagination
            small
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="anouncementCurrentPage"
            :page-size="anouncementPageSize"
            :total="anouncementTotal"
          >
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "../request/api.js";
import { getAnnouncementPagination } from "../request/api.js";
import { getIndexSort } from "../request/api.js";
import { getIdGoodsSortAll } from "../request/api.js";

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
      anouncementPageSize: 5,
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
      // 三级商品分类容器
      totalSortThird: [],
      // 全部商品分类控制显示隐藏
      // visible: false,
      slotIsShow: false,
      id: null,
      totalSortThirdFake: [
        { name: "假数据" },
        { name: "假数据假数据" },
        { name: "假数据假数据假数据" },
        { name: "假数据" },
        { name: "假数据假数据" },
        { name: "假数据假数据假数据" },
        { name: "假数据" },
        { name: "假数据假数据" },
        { name: "假数据假数据假数据" },
      ],
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    goAnnouncementPage() {
      this.$router.push({ name: "announcement-page" });
    },
        goPersonConfig() {
      this.$router.push({
        name: "enterprise-certification",
      });
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

    // 获取二级分类标题
    hoverShow(id) {
      console.log("id---", id);
      let params = {
        parentId: id,
        level: 2,
        type: 1,
      };
      // console.log("params---", params);
      getIdGoodsSortAll(params)
        .then((res) => {
          if (res.code === 200) {
            console.log("getIdGoodsSortAll---", res);
            this.totalSortSecond = res.result;
            // this.slotIsShow = true;
          }
        })
        .catch((e) => {});
    },

    // 首页商品分类hover一级返传一级id,返回二三级直接渲染 标记1 latest
    // hoverShowThird(id) {
    //   let params = {
    //     parentId: id,
    //     level: 3,
    //     type: 1,
    //   };
    //   getIndexSort(params)
    //     .then((res) => {
    //       if (res.code === 200) {
    //         // console.log("itotalSortThree---", res);
    //         this.totalSortThird = res.result;
    //         // this.slotIsShow = true;
    //       }
    //     })
    //     .catch((e) => {});
    // },

    //   // 跳转到公告详情
    goAnnouncementDetail(id) {
      // console.log("id", id);
      this.$router.push({
        name: "announcement-detail",
        query: { id: id },
      });
    },
  },

  mounted() {
    this.notLogin = localStorage.getItem("token") ? true : false;

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
  @font-face {
    font-family: alibaba-Regular;
    src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
  }
  width: 300px;
  border: none;
  transform: translate(-11px, -5px);
  div {
    // font-family: alibaba-Regular;
    font-size: 16px;
    cursor: pointer;
  }

  .sort-second-item:hover {
    color: #2979ff;
  }
}
.banner-left-box .el-popover__reference {
  font-family: alibaba-Regular !important;
}
</style>

<style lang="less" scoped>
*::-webkit-scrollbar {
  display: none;
}
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}

@font-face {
  font-family: alibaba-Medium;
  src: url("../assets/font/AlibabaPuHuiTi-2-65-Medium.ttf");
}

// @media screen and (max-width: 1600px) {
//   .banner-right-box {
//     // color: red;
//     font-size: 12px;
//     display: flex;
//     justify-content: flex-start !important;

//     .banner-login-box {
//       .banner-avatar-box {
//         width: 60px !important;
//         height: 60px !important;
//       }
//     }
//   }

// }

.index-banner-bg {
  width: 100%;
  height: 30vw;
  background: url("../assets/img/index-banner-bgimg.png");
  background-size: cover;
  overflow: hidden;

  .index-banner-container {
    overflow: hidden;
    width: 80%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    .banner-left-box {
      width: 20%;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      font-family: alibaba-Regular !important;
      position: relative;

      .goods-sort-title {
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #2979ff;
        font-size: 20px;
      }
      .goods-sort-item {
        // width: 45vw;
        height: calc((30vw - 80px) / 6);
        line-height: calc((30vw - 80px) / 6);
        text-align: left;
        color: #000000;
        padding-left: 50px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .sort-total-item {
          display: none;
          position: absolute;
          top: 0;
          left: 100%;
          width: 48vw;
          background: #ffffff;
          z-index: 999;
          .sort-flex-box {
            overflow-y: scroll;
            // overflow-x: hidden;
            height: 30vw;
            display: flex;
            width: 100%;

            flex-direction: column;
            // flex-wrap: wrap;
            // background: #ffffff;
            // flex-direction: row;
            // writing-mode: vertical-lr;
            .flex-item {
              // writing-mode: horizontal-tb;
              // position: relative;
              box-sizing: border-box;
              // background: grey;
              // height: 6vw;
              // line-height: 6vw;
              // width: 12vw;
              // text-align: center;
              // padding: 0 20px;
              display: flex;
              // align-items: center;
              // white-space: wrap;
              // display: flex;
              // justify-content: space-between;

              .flex-item-txt {
                padding: 0 10px;
                width: 15%;
                color: #2979ff;
                text-overflow: ellipsis;
                font-size: 18px;
                // white-space: nowrap;
                overflow: hidden;
                text-align: end;
                // background: red;
                white-space: nowrap;
                // position: absolute;
                // left: 0;
                // top: 0;
                // border-right: 1px solid grey;
              }

              .sort-third-container {
                width: 85%;
                display: flex;
                flex-wrap: wrap;
              }

              .sort-third-item {
                padding: 0 10px;
                font-size: 16px;
                color: #666666;
              }

              .sort-third-item:hover {
                color: #2979ff;
              }
            }

            .flex-item:hover {
              color: #2979ff;
            }
          }
        }
      }

      .goods-sort-item > .sort-item-after {
        width: 15px;
        height: 15px;
        border: solid #c7c7c7;
        border-width: 0 3px 3px 0;
        transform: translate(-200%, 0%) rotate(-45deg);
      }

      .goods-sort-item:hover {
        background: #ecf5ff;
        cursor: pointer;
      }

      .goods-sort-item:hover > span {
        color: #2979ff;
      }

      .goods-sort-item:hover > .sort-item-after {
        border-bottom-color: #2979ff;
        border-right-color: #2979ff;
      }

      .goods-sort-item:hover > .sort-total-item {
        display: block;
      }

      // span > .el-button {
      //   border: none;
      //   width: 100%;
      //   height: calc((30vw - 80px) / 6);
      //   text-align: left;
      //   font-weight: 400;
      //   color: #000000;
      // }

      // span > .el-button:hover {
      //   color: #2979ff;

      //   span > .el-button:hover:after {
      //     border: #2979ff;
      //     color: black;
      //   }
      // }

      // /deep/.el-button > span {
      //   font-size: 18px;
      //   display: inline-block;
      //   width: 80%;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
      //   overflow: hidden;
      // }

      // span > .el-button::after {
      //   content: "";
      //   width: 10px;
      //   height: 10px;
      //   border: solid #c7c7c7;
      //   border-width: 0 2px 2px 0;
      //   transform: translate(-50%, 20%) rotate(-45deg);
      //   float: right;
      // }
    }

    .banner-main-box {
      width: 60%;

      /deep/.el-carousel {
        cursor: pointer;
        height: 100%;
        width: 100%;

        .el-carousel__container {
          height: 100%;

          .el-carousel-item {
            .el-carousel__item img {
            }
          }
        }
      }

      // 轮播图左右按钮大小
      /deep/.el-carousel__arrow i {
        font-size: 30px !important;
      }
    }

    .banner-right-box {
      font-family: alibaba-Regular !important;
      overflow: hidden;
      width: 20%;
      min-width: 270px;
      height: 100%;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;

      .banner-login-box {
        width: 100%;
        // height: 100%;
        // background: red;
        // gap: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        // justify-content: space-around;

        .banner-avatar-box {
          cursor: pointer;
          width: 150px;
          height: 150px;
          background-image: url("../assets/img/index-avtar-default.png");
          background-size: cover;
        }

        .banner-welcome-text {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: #666666;
          font-size: 16px;
        }

        .banner-button-box {
          width: 100%;
          display: flex;
          justify-content: center;
          // flex-direction: column;
          align-items: center;
          gap: 20px;
          // background: red;

          button:first-child {
            font-family: alibaba-Regular !important;

            font-size: 18px;
            width: 40%;
            height: 40px;
            background: #2979ff;
            border-radius: 50px 50px 50px 50px;
            color: #ffffff;
            border: none;
            cursor: pointer;
          }
          button:last-child {
            font-family: alibaba-Regular !important;

            font-size: 18px;
            width: 40%;
            height: 40px;
            background: #ffffff;
            border-radius: 50px 50px 50px 50px;
            color: #2979ff;
            border: 1px solid #2979ff;
            cursor: pointer;
          }
        }
      }

      .banner-announcement-box {
        width: 100%;
        overflow: hidden;
        // min-height: 270px;
        // background: yellow;
        // height: 50%;
        // padding: 0 10px;
        // margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        // padding: 10px;
        .announcement-title {
          // margin: 10px 0;
          // background: green;
          width: 100%;
          font-size: 16px;
          font-family: alibaba-Medium;
          display: flex;
          justify-content: space-between;
          span:first-child {
            font-family: alibaba-Regular !important;

            font-weight: bold;
            margin-left: 10px;
          }
          span:last-child {
            font-family: alibaba-Regular !important;

            color: #999999;
            margin-right: 10px;
            cursor: pointer;
          }

          span:last-child:hover {
            color: #2979ff;
          }
        }

        .pagination-content {
          width: 100%;
          min-height: 100%;
          ul {
            cursor: pointer;
            font-size: 14px;
            line-height: 20px;
            margin: 10px 0;
            .flex-box {
              p:first-child {
                font-family: alibaba-Regular !important;
                // display: inline-block;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                white-space: nowrap;

                // -webkit-line-clamp: 1;
                color: #666666;
              }
              p:last-child {
                font-family: alibaba-Regular !important;
                width: 100%;
                color: #c7c7c7;
                // margin-bottom: 10px;
              }

              p:first-child:hover {
                color: #2979ff;
              }

              p:first-child:hover + p:last-child {
                color: #2979ff;
              }
            }
          }
        }

        // .el-pagination {
        //   margin: 0 auto;
        //   text-align: center;
        // }
      }
    }
  }
}
</style>
