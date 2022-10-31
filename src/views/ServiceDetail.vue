<template>
  <div class="service-detail-main">
    <HeaderNav />
    <div class="header-icon">{{this.serviceItem.name}}</div>

    <div class="shell-introduce">
      <img src="../assets/img/bioClub.png" alt="serviceItem.name" />
      <div>
        <p>贝壳社</p>
        <p>
          贝壳社，是一家为医健行业创业者提供创业全路径价值服务与解决方案的创新平台公司，致力于打造线上线下融合、双循环驱动
          的医健创新产业社区新业态。
          贝壳社旗下主要包含品牌传播、创业教育、线下产业空间、投资孵化、CXO平台等服务，通过贝壳社内部可满足企业品牌的搭建、
          核心高管及团队的创业培训及公司落地所需的空间，投融资对接，承接项目转化孵化、产品供应链对接管理等需求，外部我们链
          接政府、临床机构、投资及咨询机构、第三方服务商、科研院所等资源。内外双循环驱动，为医健创业者提供项目转化孵化、品牌传
          播、创业教育、产业落地空间、投融资、CXO对接管理等全路径创业服务。
          我们始终秉承科技创新与人文关怀并存的发展理念，聚焦前沿科技创新，关注企业和创业者的成长，提供价值服务，促进合作共
          赢，赋能医健创业公司成长，推动创新技术造福人类生命健康。
        </p>
      </div>
    </div>

    <div class="contact-me">
      <div>主动联系</div>
      <div>请联系我</div>
    </div>

    <div class="service-type">服务类型</div>
        <div v-html="this.serviceItem.itemDesc"></div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import HeaderNav from "../components/HeaderNav.vue";
import { getServiceDetail } from "../request/api.js";
export default {
  data() {
    return {
      id: null,
      serviceItem: {},

    };
  },

  components: {
    HeaderNav,
    Footer,
  },

  methods: {
    getServiceDetailItem() {
      getServiceDetail(this.id)
        .then((res) => {
          // console.log("res---", res);
          this.serviceItem = res.result;
          // console.log("serviceItem---", this.serviceItem);
        })
        .catch((e) => {
          console.log("e---", e);
        });
    },
  },

  computed: {},

  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getServiceDetailItem();
  },
};
</script>

<style lang="less" scoped>
.service-detail-main {
  // background: green;
  .header-icon {
    margin: 50px auto;
    color: #fff;
    background: #0e6ebe;
    width: 150px;
    height: 80px;
    font-size: 20px;
    text-align: center;
    line-height: 80px;
  }

  .shell-introduce {
    margin-top: 20px;
    display: flex;
    div {
      p:first-child {
        font-weight: bold;
        font-size: 20px;
        margin: 20px;
      }

      p:last-child {
        margin: 20px;
        width: 80%;
      }
    }
  }

  .contact-me {
    width: 40%;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;

    div {
      text-align: center;
      line-height: 60px;
      width: 150px;
      height: 60px;
      font-size: 20px;
    }

    div:first-child {
      background: #0e6ebe;
      color: #fff;
    }

    div:last-child {
      background: #fff;
      color: #0e6ebe;
      border: 1px solid #0e6ebe;
    }
  }

  .service-type {
    font-weight: bold;
    font-size: 20px;
    margin: 50px auto;
    width: 150px;
    height: 80px;
    text-align: center;
  }
}
</style>
