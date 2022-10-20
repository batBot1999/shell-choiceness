<template>
<div class="selected-service-box">
<h1>精选服务</h1>
<div class="service-content">
  <div class="service-item">
    <img src="../assets/img/serviceItemImage.png" alt="">
    <div class="service-item-bottom">
      <div>
      <p>服务介绍......</p>
      <p>服务商: 科加奥</p>
      </div>
      <button>快速体验</button>
    </div>
  </div>
  <div class="service-item">
    <img src="../assets/img/serviceItemImage.png" alt="">
    <div class="service-item-bottom">
      <div>
      <p>服务介绍......</p>
      <p>服务商: 科加奥</p>
      </div>
      <button>快速体验</button>
    </div>
  </div>
  <div class="service-item">
    <img src="../assets/img/serviceItemImage.png" alt="">
    <div class="service-item-bottom">
      <div>
      <p>服务介绍......</p>
      <p>服务商: 科加奥</p>
      </div>
      <button>快速体验</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.selected-service-box {
  width: 100%;
  text-align: center;
  margin: 0 50px;

  h1 {
    margin: 40px 0;
  }

  .service-content {
    // background-color: grey;
    display: flex;
    justify-content:space-evenly;

    .service-item {
      // background-color: blue;
      width: 25%;
      img {
        width: 100%;
      }

      .service-item-bottom {
        height:60px;
        // background-color: green;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        p {
          padding-bottom: 10px;
        }

        button {
          width: 100px;
          height: 30px;
          background-color: #0e6ebe;
          color: #fff;
          border: none;
        }
      }
    }
  }
}
</style>