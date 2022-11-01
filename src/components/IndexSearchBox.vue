<template>
  <div class="search-box-bg">
    <div class="search-box">
      <!-- <img src="../assets/img/searchIcon.png" class="search-img" alt="" /> -->
      <span class="search-box-text">BEKE</span>
      <div class="search-box-container">
        <el-select v-model="value" placeholder="商品名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- <span>|</span> -->
        <el-input v-model="input" placeholder="请输入关键词"></el-input>
        <div class="search-button" @click="sendParent()">
          <img src="../assets/img/index-search-img.png" /><span>搜索</span>
        </div>
        <div class="search-goods-button">找商品</div>
        <div class="search-service-button">找服务</div>
        <!-- <button class="search-button" @click="goGoodsSearch()">
          搜索
          </button> -->
      </div>
    </div>
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
    },
  },
};
</script>

<style lang="less" scoped>
.search-box-bg {
  margin: 40px 360px 50px;

  .search-box {
    width: calc(100vw - 720px);
    // background: grey;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-box-text {
      height: 41px;
      font-family: Arial-Bold Italic, Arial;
      color: #2979ff;
      font-size: 36px;
      // flex:1;
    }

    .search-box-container {
      display: flex;
      // justify-content: space-between;
      align-items: center;

      .el-select {
        height: 44px;
        border: 1px solid #2979ff;
        border-right: none;
        width: 130px;

        /deep/ input::-webkit-input-placeholder {
          color: #2979ff;
          // font-size: 16px;
        }
        /deep/ .el-input__inner {
          color: #2979ff;
          height: 44px;
          text-align: center;
          border-right: none;
        }
      }

      .el-input {
        width: 350px;
        /deep/.el-input__inner {
          // background-color: #eff1f2;
          height: 46px;
          width: 100%;
          border: 1px solid #2979ff;
          border-left: 1px solid #e4e4e4;
          border-radius: 0;
        }
      }

      .search-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 46px;
        background: #2979ff;
        border: none;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        color: #ffffff;
        line-height: 32px;

        img {
          width: 18px;
          margin-right: 5px;
        }
      }

      .search-goods-button {
        box-sizing: border-box;
        width: 120px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        background: #f8494d;
        color: #ffffff;
        margin-left: 10px;
      }

      .search-service-button {
        box-sizing: border-box;
        width: 120px;
        height: 46px;
        line-height: 42px;
        font-size: 16px;
        text-align: center;
        border: 2px solid #f8494d;
        color: #f8494d;
        margin-left: 10px;
      }
    }

    // .search-img {
    //   width: 40px;
    //   height: 40px;
    //   margin: 0 15px;
    // }

    // .el-select {
    //   width: 160px;
    //   /deep/.el-input__inner {
    //     height: 40px;
    //     background-color: #fff;
    //     border: 1px solid #000;
    //     border-radius: 0;
    //   }
    // }

    // /deep/.el-input__inner {
    //   background-color: #eff1f2;
    //   height: 46px;
    //   border: none;
    // }

    // .search-button {
    //   width: 200px;
    //   height: 46px;
    //   color: #fff;
    //   font-size: 25px;
    //   background-color: #0e6ebe;
    //   border: none;
    // }
  }
}
</style>
