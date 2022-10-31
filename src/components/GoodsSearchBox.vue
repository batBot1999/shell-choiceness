<template>
  <div class="search-box">
    <img src="../assets/img/searchIcon.png" class="search-img" alt="" />
    <el-select v-model="value" placeholder="商品名称">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input v-model="input" placeholder="请输入关键词"></el-input>
    <!-- <button class="search-button" @click="goGoodsSearch()">
      搜索
    </button> -->
        <button class="search-button" @click="sendParent()">
      搜索
    </button>
  </div>
</template>

<script>
// import { getIndexSort } from "../request/api.js";
export default {
  data() {
    return {
      input: "",
      options: [
        {
          value: "选项1",
          label: "商品名称",
        },
        {
          value: "选项2",
          label: "商品货号",
        },
        {
          value: "选项3",
          label: "商品品牌",
        },
      ],
      value: "",
    };
  },

  components: {},

  methods: {
    // goGoodsSearch() {
    //   // THIS.$EMIT('',)
    //   this.$router.push({
    //     name: "goods-search-page",
    //     query: {name: this.input}
    //   }),
    // },
      // 1.把input内容传给父组件 子组件中通过$emit触发事件
      sendParent() {
        // 自定义事件 $emit("事件名称", "发送事件参数")
        this.$emit("searchInput", this.input);
      }
  },
};
</script>

<style lang="less" scoped>
.search-box {
  width: 1000px;
  height: 60px;
  background: #eff1f2;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  // overflow: hidden;

  .search-img {
    width: 40px;
    height: 40px;
    margin: 0 15px;
  }

  .el-select {
    width: 160px;
    /deep/.el-input__inner {
      height: 40px;
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 0;
    }
  }

  /deep/.el-input__inner {
    background-color: #eff1f2;
    height: 60px;
    border: none;
  }

  .search-button {
    width: 200px;
    height: 60px;
    color: #fff;
    font-size: 25px;
    background-color: #0e6ebe;
    border: none;
  }
}

.goodsBannerBox {
  width: 90%;
}
</style>
