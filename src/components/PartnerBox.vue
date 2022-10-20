<template>
  <div class="partner-box">
    <h1>合作伙伴</h1>
    <div class="partner-content">
      <img src="../assets/img/servicePartner1.png" alt="">
      <img src="../assets/img/servicePartner2.png" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.partner-box {
  width: 100%;
  text-align: center;
  // background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    padding: 30px 0;
  }

  .partner-content {
    width: 70%;
    display: flex;
    justify-content: space-between;

    img {
      width: 30%;
    }
  }
}

</style>