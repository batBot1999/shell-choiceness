<template>
  <div class="serviceBannerBox">
    <div class="bannerLeft">
      <!-- @mouseover.native="getIndexServiceSortHover(item1.id)" -->
      <el-popover
        width="200"
        trigger="hover"
        placement="right-start"
        :visible-arrow="false"
        v-for="(item1, index) in this.totalServiceSortFirst"
        :key="index"
        @show="hoverShow(item1.id)"
      >
        <div v-if="slotIsShow">
          <!-- slot插入开始 -->

          <!-- <div v-for="(item2, index) in this.totalServiceSortSecond" :key="index">
            2323
          </div> -->
          <!-- <div>2112</div> -->
        </div>
        <!-- slot插入结束 -->
        <el-button slot="reference">{{ item1.name }}</el-button>
      </el-popover>
    </div>
    <div class="bannerCenter">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="200px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
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
        <ul>
          <li>【通告】&供应商管理措施</li>
          <li>【通告】&采购商管理措施</li>
          <li>【推荐】&nbsp实验耗材精选</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
      totalServiceSortFirst: [],
      // 二级商品分类容器
      totalServiceSortSecond: [],
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
        id: id,
        level: this.level,
        type: this.type,
      };
      getIndexSort(params)
        .then((res) => {
          if (res.code === 200) {
            // console.log("res---", res);
            this.totalServiceSortSecond = res.result;
          }
        })
        .catch((e) => {});
    },
  },
  watch: {
    notLogin(newvalue, oldvalue) {
      console.log(localStorage.getItem("token"));
      // console.log(newvalue, oldvalue);
    },
  },
  mounted() {
    // console.log(localStorage.getItem("token"));
    this.notLogin = localStorage.getItem("token") ? true : false;

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
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      margin: 0;
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
      text-align: center;
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

      ul > li {
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
