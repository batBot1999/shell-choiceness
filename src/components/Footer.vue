<template>
  <div class="footer-box">
    <div class="footer-container">
      <div class="footer-left-box">
        <div>
          首页 丨 资讯中心 丨 帮助中心 丨 法律信息 丨 友情链接 丨 联系我们
        </div>
        <div>
          <p>Copyright © 杭州科畅科技咨询有限公司 京ICP备2022014119号</p>
          <p>地址：北京市海淀区信息路22号B座2层552室</p>
        </div>
        <div>技术支持：西安冰雪网络科技有限公司</div>
      </div>
      <div class="footer-right-box">
        <div class="footer-qrcode-box">
          <div class="qrcode-box-item">
            <img src="../assets/img/footer-qrcode-img.png" alt="" />
            <p>官方公众号</p>
          </div>
          <div class="qrcode-box-item">
            <img src="../assets/img/footer-qrcode-img.png" alt="" />
            <p>官方公众号</p>
          </div>
        </div>
        <div class="footer-text-box">
          <span>咨询热线：</span><span> 400-1199-918</span>
        </div>
      </div>
    </div>

    <!-- <div class="footer-main-content">
      <div>
        <p>联系我们</p>
        <p>0571-86658025</p>
        <p>工作时间: 周一到周五09:00 - 17:30</p>
        <img src="../assets/img/QrCode.png" class="qrCodeImage" alt="" />
      </div>
      <div>
        <p>帮助中心</p>
        <ul>
          <li>新手指南</li>
          <li>付款方式</li>
          <li>配送信息</li>
          <li>常见问题</li>
          <li>退货政策</li>
          <li>品质保证</li>
        </ul>
      </div>
      <div>
        <p>法律信息</p>
        <ul>
          <li>用户协议</li>
          <li>隐私协议</li>
          <li>法律声明</li>
        </ul>
      </div>
      <div>
        <p>公司信息</p>
        <ul>
          <li>关于我们</li>
          <li>加入我们</li>
          <li>意见反馈</li>
        </ul>
      </div>
      <div>
        <p>友情链接</p>
        <ul>
          <li>供应链平台</li>
          <li>智慧园区平台</li>
          <li>软件超市</li>
        </ul>
      </div>
    </div>
    <div class="footer-main-bottom">
      <p>版权所有&nbsp&copy&nbsp科加奥</p>
      <p>浙ICP备14044159号</p>
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// * {
//   box-sizing: border-box;
// }
.footer-box {
  // margin-top: 100px;
  background-color: #333333;
  width: 100%;
  height: 20vh;
  overflow: hidden;

  .footer-container {
    height: 213px;
    margin: 0 auto;
    margin-top: 80px;
    width: 80vw;;
    display: flex;
    justify-content: space-between;

    .footer-left-box {
      width: 574px;
      height: 213px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #999999;

      div:first-child {
        font-size: 16px;
      }
    }

    .footer-right-box {
      width: 270px;
      height: 213px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .footer-qrcode-box {
        display: flex;
        justify-content: space-between;
        img {
          width: 120px;
          height: 120px;
        }
        .qrcode-box-item {
          text-align: center;
          color: #999999;

          p {
            margin-top: 15px;
            font-size: 14px;
          }
        }
      }

      .footer-text-box {
        color: #ffffff;
        white-space: nowrap;
        span:first-child {
          font-size: 14px;
        }
        span:last-child {
          font-size: 28px;
        }
      }
    }
  }

  // font-size: 12px;
  // .footer-main-content {
  //   display: flex;
  //   justify-content: space-evenly;
  //   margin-bottom: 20px;

  //   div:not(:first-child) {
  //     margin-top: 40px;
  //     p {
  //       font-weight: bold;
  //       margin-bottom: 10px;
  //     }

  //     ul > li {
  //       line-height: 20px;
  //       height: 20px;
  //       font-size: 10px;
  //       transform: scale(0.8);
  //     }
  //   }

  //   div:first-child {
  //     margin-top: 50px;
  //     p {
  //       font-size: 10px;
  //     }
  //     p:first-child {
  //       font-weight: bold;
  //       margin-bottom: 10px;
  //     }
  //     .qrCodeImage {
  //       margin-top: 10px;
  //       width: 50px;
  //       height: 50px;
  //     }
  //   }
  // }
  // .footer-main-bottom {
  //   width: 100%;
  //   height: 50px;
  //   // line-height: 20px;
  //   text-align: center;
  //   padding-top: 10px;
  //   p {
  //     font-size: 12px;
  //     transform: scale(0.6);
  //   }
  // }
}
</style>
