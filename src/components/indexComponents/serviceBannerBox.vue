<template>
  <div class="serviceBannerBox">
    <div class="bannerLeft">
      <ul>
        <li>服务分类</li>
        <li>动物实验服务</li>
        <li>药学评价服务</li>
        <li>CDMO服务</li>
        <li>临床前CRO服务</li>
        <li>临床CRO服务</li>
        <li>更多服务</li>
      </ul>
    </div>
    <div class="bannerCenter">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="300px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="bannerRight">
      <div class="welcomeBox">您好!欢迎来到贝壳精选!</div>
      <div class="buttonBox">
        <button>登录</button>
        <button>注册</button>
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
export default {};
</script>

<style lang="less" scoped>
.serviceBannerBox {
  width: 90vw;
  height: 300px;
  border: 1px solid #000;
  margin-bottom: 20px;
  display: flex;

  .bannerLeft {
    width: 25%;
    // background-color: red;
    padding: 20px;

    li {
      line-height: 35px;
    }

    li:hover {
      color: #475669;
    }

    li::after {
      content: ">";
      float: right;
    }

    li:first-child::after {
      content: "";
    }
  }

  .bannerCenter {
    width: 50%;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
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

    .welcomeBox {
      font-size: 12px;
      padding: 20px;
    }

    .buttonBox {
      button {
        width: 50px;
        margin: 10px;
        color: #000;
      }
    }

    .announcementBox {
      text-align: center;
      width: 100%;
      border-top: 1px solid #000;
      margin-top: 50px;
      padding-top: 20px;
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
