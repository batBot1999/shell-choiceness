<template>
  <div>
    <HeaderNav />
    <div class="anouncementBackground">
      <div class="anouncementContainer">
        <h3>{{ this.anouncementDetailContent.title }}</h3>
        <div style="overflow: hidden">
          <span>{{ this.anouncementDetailContent.updateBy }}</span>
        </div>
        <p style="float: right">
          作者:{{ this.anouncementDetailContent.createBy }}
        </p>
        <div>接口给的创建时间{{ this.anouncementDetailContent.applyDate }}</div>
        <div>当前时间{{ this.time }}</div>
        <div>{{ FormatGap }}</div>
        <div v-html="this.anouncementDetailContent.content"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
import { getAnouncementDetail } from "../request/api.js";
import moment from "moment";
// import { Loading } from "element-ui";
import { showLoading, hideLoading } from "../util/Loading";
export default {
  components: {
    HeaderNav,
    Footer,
    // FormatGap,
  },

  data() {
    return {
      // loading: true,

      id: null,
      anouncementDetailContent: {},
      time: null,
      // start: this.anouncementDetailContent,
      // end: new Date,
    };
  },

  methods: {
    getAnouncementDetailItem() {
      getAnouncementDetail(this.id).then((res) => {
        // console.log("res--", res);
        this.anouncementDetailContent = res.result;
        setTimeout(() => {
          hideLoading();
        }, 500);
        // console.log(
        //   "this.anouncementDetailContent---",
        //   this.anouncementDetailContent
        // );
        // console.log(
        //   "this.anouncementDetailContent.createTime---",
        //   this.anouncementDetailContent.createTime
        // );
      });
    },
  },

  computed: {
    /**
     *
     * @param {*} start 起始时间  2020-02-02 12:12:12 时间格式化字符串
     * @param {*} end 结束时间  2020-02-02 13:12:12 时间格式化字符串
     * @returns 相差时间（分钟）
     */
    FormatGap() {
      // let staytimeGap = new Date().getTime() - new Date(star).tgetTime();
      let staytimeGap =
        new Date(this.time).getTime() -
        new Date(this.anouncementDetailContent.applyDate).getTime();
      let stayHour = Math.floor(staytimeGap / (3600 * 1000)); // 小时
      let leave1 = staytimeGap % (3600 * 1000);
      let stayMin = Math.floor(leave1 / (60 * 1000)); // 分钟
      let leave2 = leave1 % (60 * 1000);
      let staySec = Math.floor(leave2 / 1000); // 秒
      let day = parseInt(stayHour / 24);
      stayHour = stayHour - day * 24;
      // return stayHour * 60 + stayMin     stayHour/24取整就是天数
      return (
        day + "天" + stayHour + "小时" + stayMin + "分钟" + staySec + "秒之前"
      );
    },
  },

  mounted() {
    showLoading();

    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getAnouncementDetailItem();
    this.time = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(this.time);
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}

.anouncementBackground {
  width: 100vw;
  background: grey;
  font-family: alibaba-Regular;


  .anouncementContainer {
    width: 85%;
    margin: 0 auto;
    background: rgb(202, 198, 198);
    padding: 50px;
  }
}
</style>
