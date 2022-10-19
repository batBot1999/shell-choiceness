<template>
  <div class="footer-main">
    <div class="footer-main-content">
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
 <hr align="center" width="100%" size="1" color="#D7D7D7">
    <div class="footer-main-bottom">
      <p>版权所有&nbsp&copy&nbsp科加奥</p>
      <p>浙ICP备14044159号</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer-main {
  background-color: #eff1f2;
  font-size: 12px;

  .footer-main-content {
    display: flex;
    justify-content: space-evenly;

    div:first-child {

      .qrCodeImage {
        width: 50px;
        height: 50px;
      }
    }
  }

  .footer-main-bottom {
    width: 100%;
    height:50px;
    // line-height: 20px;
    text-align: center;
    padding-top: 10px;
    p {
      font-size: 12px;
      transform: scale(0.6);
    }
  }
}
</style>
