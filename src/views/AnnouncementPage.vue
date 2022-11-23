<template>
  <div class="main-container">
    <HeaderNav />
    <IndexSearchBox @searchInput="getIndexSearchInput" />
    <!-- 分页列表 -->
    <h1>公告列表</h1>
    <div
      class="pagination-container-item"
      v-for="(item, index) in announcementList"
      :key="index"
    >
      <div class="img-container">
        <img src="../assets/img/bioClub.png" alt="" />
      </div>
      <div class="flex-box" @click="goAnnouncementDetail(item.id)">
        <p>{{ item.title }}</p>
        <p>{{ filtersRichText(item.content) }}</p>
        <p>{{ item.createTime }}</p>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      layout="prev, pager, next, jumper, total"
      @current-change="handleCurrentChange"
      :current-page="anouncementCurrentPage"
      :page-size="anouncementPageSize"
      :total="anouncementTotal"
    >
    </el-pagination>
    <Footer />
  </div>
</template>

<script>
import IndexSearchBox from "../components/IndexSearchBox.vue";
import { getAnnouncementPagination } from "../request/api.js";
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
import { showLoading, hideLoading } from "../utils/Loading";
export default {
  data() {
    return {
      announcementList: [],
      anouncementCurrentPage: 1,
      anouncementPageSize: 5,
      anouncementTotal: 0,
      searchInput: "",
    };
  },
  components: {
    Footer,
    HeaderNav,
    IndexSearchBox,
  },

  methods: {
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
          console.log("announcementList---", this.announcementList);
          this.anouncementTotal = res.result.total;
          // console.log("this.total---", this.total);
        }
      });
    },

    // 跳转到公告详情
    goAnnouncementDetail(id) {
      // console.log("id", id);
      this.$router.push({
        name: "announcement-detail",
        query: { id: id },
      });
    },

    // 选择当前是第几页
    handleCurrentChange(val) {
      this.anouncementCurrentPage = val;
      this.getAnnouncement();
    },

    // 获取输入框内容并跳转
    getIndexSearchInput(value) {
      // console.log(value);
      this.$router.push({
        name: "goods-search-page",
        query: { name: value },
      });
    },

    // 定义一个过滤器函数
    filtersRichText(val) {
      if (val != null && val != "") {
        let reg = /[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\！]/g;
        let names = val.match(reg);
        val = names ? names.join("") : "";
        return val;
      } else return "";
    },
  },

  computed: {
    // 愚蠢的想法

    // textFilter() {
    //   const a = this.announcementList.map((item) => {
    //     let b = this.filtersRichText(item.content);
    //     console.log("b---", b);
    //   return b;
    //   })
    //   return a;
    // },
  },

  mounted() {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 500);
    this.getAnnouncement();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  background: #f5f7fa;

  h1 {
    text-align: center;
    margin: 20px 0;
  }

  .pagination-container-item {
    cursor: pointer;
    padding: 20px 0;
    background: #ffffff;
    display: flex;
    margin: 0 auto;
    width: 50vw;
    .img-container {
      width: 200px;
      min-width: 150px;
      height: 150px;
      // overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .flex-box {
      width: calc(100%-200px);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      p:first-child {
        font-size: 18px;
        font-weight: bold;
      }

      p:nth-child(2) {
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      p:last-child {
        font-size: 14px;
        color: #999999;
      }
    }
  }

  .el-pagination {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
