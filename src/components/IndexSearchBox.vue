<template>
  <div class="search-box-bg">
    <div class="search-box">
      <!-- <img src="../assets/img/searchIcon.png" class="search-img" alt="" /> -->
      <span class="search-box-text">BEKE</span>
      <div class="search-box-container">
        <div class="select-and-input">
          <el-select v-model="value" placeholder="商品名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span>|</span>
          <el-input v-model="input" placeholder="请输入关键词"></el-input>
        </div>
        <div class="search-button" @click="sendParent()">
          <img src="../assets/img/index-search-img.png" /><span>搜索</span>
        </div>
        <div class="search-goods-button" @click="goSearchPage">找商品</div>
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
    goSearchPage() {
      this.$router.push({
        name: "goods-search-page",
      });
    },
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
@font-face {
  font-family: alibaba-Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}

.search-box-bg {
  margin: 40px 0;
  // background: grey;


  .search-box {
    width: 62.5%;
    margin: 0 auto;
    // background: grey;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-box-text {
      height: 40px;
      line-height: 40px;
      font-style: italic;
      color: #2979ff;
      font-size: 36px;
      margin-right: 10px;
      font-family: alibaba-bold;
      font-weight: bold;

      // flex:1;
    }

    .search-box-container {
    font-family: alibaba-Regular;

      display: flex;
      // flex: 1;
      // justify-content: space-between;
      align-items: center;

      .select-and-input {
        border: 2px solid #2979ff;
        min-width: 400px;
        display: flex;
        align-items: center;

        .el-select {
          width: 7vw;
          min-width: 107px;
          // height: 40px;
          border-right: none;

          /deep/ input::-webkit-input-placeholder {
            color: #2979ff;
            // font-size: 16px;
          }
          /deep/ .el-input__inner {
            color: #2979ff;
            // height: 40px;
            text-align: center;
            // border-right: none;
            border: none;
          }
        }

        span {
          z-index: 999;
          // font-size: 30px;
          color: #e4e4e4;
        }

        .el-input {
          // width: 18.22vw;
          flex: 1;
          height: 100%;
          border: none;
          // flex: 1;
          /deep/.el-input__inner {
            height: 42px;
            // background-color: #eff1f2;
            // height: 100%;
            // width: 100%;
            // border: 1px solid #2979ff;
            // border-left: 1px solid #e4e4e4;
            border: none;
            border-radius: 0;
          }
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
