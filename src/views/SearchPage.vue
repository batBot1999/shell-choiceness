<template>
  <div>
    <HeaderNav />
    <div class="header-search-box">
      <div class="shell-choiceness">贝壳精选</div>
      <GoodsSearchBox />
    </div>
    <div class="header-tab-box">
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 1 ? 'active' : ''"
        @click="num = 1"
      >
        全部商品
      </div>
      <div
        style=""
        type="button"
        class="grid-content tab-button"
        :class="num == 2 ? 'active' : ''"
        @click="num = 2"
      >
        首页
      </div>
    </div>
    <el-main>
      <div v-if="num == 1" class="el-main-son1">
        <div class="sort-radio-box">
          <span>分类</span>
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="化学试剂"></el-radio-button>
            <el-radio-button label="生化试剂"></el-radio-button>
            <el-radio-button label="实验仪器"></el-radio-button>
            <el-radio-button label="实验耗材"></el-radio-button>
            <el-radio-button label="医疗器械"></el-radio-button>
            <el-radio-button label="科研设备"></el-radio-button>
            <el-radio-button label="原料药"></el-radio-button>
            <el-radio-button label="辅料"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="brand-box">
          <span>品牌</span>
          <button label="">全部</button>
          <tr class="brand-checkbox">
            <td v-for="(item, index) in brands" :key="index">
              <input type="checkbox" />{{ item }}
            </td>
          </tr>
        </div>

        <div class="standard-box">
          <span>规格</span>
          <button label="">全部</button>
          <tr class="standard-checkbox">
            <td v-for="(item, index) in standards" :key="index">
              <input type="checkbox" />{{ item }}
            </td>
          </tr>
        </div>

        <div class="search-pagination-box">
          <el-radio-group v-model="radio2">
            <el-radio-button label="默认排序"></el-radio-button>
            <el-radio-button label="价格"></el-radio-button>
            <el-radio-button label="上架时间"></el-radio-button>
            <el-radio-button label="销量"></el-radio-button>
          </el-radio-group>
          <!-- table -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="itemNo" label="货号"> </el-table-column>
            <el-table-column prop="specificationDesc" label="规格"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="date" label="发货时间"> </el-table-column>
            <el-table-column prop=" enterpriseName" label="供应商">
              <el-button type="text" size="small">科加奥</el-button>
            </el-table-column>
            <el-table-column prop="operarion" label="操作">
              <template slot-scope="scope">
                <!-- <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >加入购物车</el-button
                > -->
                <el-button type="text" size="small">立即下单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="num == 2" class="el-main-son2">
        <p>2</p>
      </div>
    </el-main>
    <Footer />
  </div>
</template>

<script>
import { goodsRecommendList } from "../request/api.js";
import GoodsSearchBox from "../components/GoodsSearchBox.vue";
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      num: 1,
      radio1: "全部",
      brands: [
        "品牌1",
        "品牌2",
        "品牌3",
        "品牌4",
        "品牌5",
        "品牌6",
        "品牌7",
        "品牌8",
        "品牌9",
        "品牌10",
        "品牌11",
        "品牌12",
        "品牌13",
      ],
      standards: [
        "规格1",
        "规格2",
        "规格3",
        "规格4",
        "规格5",
        "规格6",
        "规格7",
        "规格8",
        "规格9",
        "规格10",
      ],
      currentPage4: 4,
      tableData: [
        {
          goods: "艾本德单道移液器",
          number: "20210330",
          brand: "Eppendorf/艾本德",
          standard: "100-1000ul",
          package: "6支/盒",
          price: "￥999.00",
          date: "5-7天",
          provider: "科加奥",
        },
      ],
      // goodsList: [],
      radio2: "默认排序",
    };
  },
  components: {
    GoodsSearchBox,
    Footer,
    HeaderNav,
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // getgoodsList() {
    //   goodsRecommendList({ pageNo: this.pageNo, pageSize: this.pageSize }).then(
    //     (res) => {
    //       this.goodsList = res.result.records;
    //       console.log("this.goodsList---", this.goodsList);
    //     }
    //   );
    // },
  },

  mounted() {
    // this.getgoodsList();
  },
};
</script>

<style lang="less" scoped>
.header-search-box {
  width: 100vw;
  display: flex;
  justify-content: center;

  .shell-choiceness {
    width: 150px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #0e6ebe;
    color: #fff;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
}
.header-tab-box {
  margin-top: 20px;
  width: 100vw;
  display: flex;
  div {
    width: 50%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: bolder;
  }
  .active {
    background: #0e6ebe;
    color: #fff;
  }
}
.el-main {
  overflow-x: hidden;
  padding: 0;
  margin: 40px 20px;

  .el-main-son1 {
    display: flex;
    flex-direction: column;

    .sort-radio-box {
      display: flex;
      text-align: center;

      span {
        height: 50px;
        line-height: 50px;
        width: 10%;
        font-weight: bold;
        font-size: 25px;
      }

      .el-radio-group {
        width: 90%;
      }

      // 这一端css是在elementui的radio基础上改的,要理清hover active checked之间的关系
      .el-radio-group > .el-radio-button {
        width: 11%;

        /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #0e6ebe;
          color: #fff;
        }

        /deep/.el-radio-button__inner {
          padding: 0 0;
          width: 100%;
          border: none;
          height: 50px;
          line-height: 50px;
          transition: none;
        }

        /deep/.el-radio-button__inner:hover {
          color: #0e6ebe;
        }
      }
    }

    .brand-box {
      margin: 10px 0;
      display: flex;
      text-align: center;

      span {
        height: 50px;
        line-height: 50px;
        width: 10%;
        font-weight: bold;
        font-size: 25px;
      }

      .brand-checkbox {
        width: 90%;
        display: flex;
        flex-wrap: wrap;

        td {
          width: 12.5%;
        }
      }
    }

    .standard-box {
      margin: 10px 0;
      display: flex;
      text-align: center;

      span {
        height: 50px;
        line-height: 50px;
        width: 10%;
        font-weight: bold;
        font-size: 25px;
      }

      .standard-checkbox {
        width: 90%;
        display: flex;
        flex-wrap: wrap;

        td {
          width: calc(100% / 7);
        }
      }
    }

    .search-pagination-box {
      .el-radio-group {
        margin: 30px 0;
        display: flex;
        justify-content: center;
        .el-radio-button {
          width: 20vw;
        }

        /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #0e6ebe;
          color: #fff;
        }

        /deep/.el-radio-button__inner {
          padding: 0 0;
          width: 100%;
          border: none;
          height: 30px;
          line-height: 30px;
          transition: none;
        }

        /deep/.el-radio-button__inner:hover {
          color: #0e6ebe;
        }
      }
    }
  }
}
</style>
