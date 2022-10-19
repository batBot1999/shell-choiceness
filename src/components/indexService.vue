<template>
  <div>
    <div class="search-box">
      <img src="../assets/img/searchIcon.png" class="search-img" alt="" />
      <el-input
        v-model="input"
        placeholder="请输入服务名称、服务类型、服务商名称"
      ></el-input>
      <button class="search-button">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    }
  },
    components: {
  }
};
</script>

<style lang="less" scoped>
.search-box {
  width: 600px;
  height: 50px;
  background: orange;
  display: flex;
  margin-bottom: 10px;


  .search-img {
    width: 50px;
    height: 50px;
  }

  /deep/.el-input__inner {
    height: 50px;
  }

  .search-button {
    width: 100px;
    height: 50px;
  }
}
</style>
