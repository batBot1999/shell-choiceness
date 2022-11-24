<template>
  <div>
    <div class="address-table">
      <el-button type="primary" @click="addAdressButton">新增地址</el-button>
      <!-- 新增地址弹窗 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input
              v-model="addForm.consignee"
              placeholder="请输入收货人"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="addForm.consigneePhone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="省市区" :label-width="formLabelWidth">
            <el-cascader
              ref="cascaderAddr"
              v-model="addForm.ssq"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input
              v-model="addForm.address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewAdress">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="consignee" label="收货人" width="250">
        </el-table-column>
        <el-table-column prop="consigneePhone" label="手机号码" width="250">
        </el-table-column>
        <el-table-column prop="province,city,area" label="所在地区" width="400">
          <template slot-scope="scope">
            {{ scope.row.province }}&nbsp{{ scope.row.city }}&nbsp{{
              scope.row.area
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="详细地址"
          width="400"
        ></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editAdressButton(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small">设为默认</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑地址弹窗 -->
      <el-dialog title="收货地址" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.consignee"
              placeholder="请输入收货人"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.consigneePhone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="省市区" :label-width="formLabelWidth">
            <el-cascader
              ref="cascaderAddr"
              v-model="editForm.ssq"
              :options="options"
              :key="timer"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNewAdress">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        class="pagination-box"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes,  prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import city from "../assets/city/city";
import { getUserImformationAdress } from "../request/api.js";
import { addUserImformationAdress } from "../request/api.js";
import { editUserImformationAdress } from "../request/api.js";
import { getUserImformation } from "../request/api.js";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      // 表格数据
      tableData: [],
      total: 0,
      // 控制新增地址弹窗状态
      dialogFormVisible: false,
      // 控制编辑地址弹窗状态
      editDialogFormVisible: false,
      options: null,
      personInformationContainer: {},
      receivePlaceValue: [
        //   Number(this.personInformrmatationContainer.provinceCode),
        //   Number(this.personInfoionContainer.cityCode),
        //   Number(this.personInformationContainer.areaCode),
      ],

      addForm: {
        consignee: "",
        consigneePhone: "",
        address: "",
        ssq: "",
      },
      editForm: {
        id: "",
        consignee: "",
        consigneePhone: "",
        address: "",
        ssq: "",
      },
      formLabelWidth: "120px",
      timer: 0,
    };
  },
  methods: {
    // 获取表格数据
    getTableData() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      getUserImformationAdress(params).then((res) => {
        console.log("res---", res);
        this.tableData = res.result.records;
        this.total = res.result.total;
        // 为了不去组件传参,在地址页面请求个人信息
        this.getUserImformationMethod();
        console
          .log
          // this.personInformationContainer.provinceCode,
          // this.personInformationContainer.cityCode,
          // this.personInformationContainer.areaCode
          ();
      });
    },

    // 删除行
    // deleteRow(index, rows) {
    //   rows.splice(index, 1);
    //   this.getTableData();
    // },
    // 选择一页显示多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    },
    // 分页点击其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableData();
    },
    // 确认新增地址
    addNewAdress() {
      // console.log("addForm---", this.addForm);
      this.dialogFormVisible = false;
      let params = {
        consignee: this.addForm.consignee,
        consigneePhone: this.addForm.consigneePhone,
        address: this.addForm.address,
        province: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[0],
        provinceCode: this.addForm.ssq[0],
        city: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[1],
        cityCode: this.addForm.ssq[1],
        area: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[2],
        areaCode: this.addForm.ssq[2],
      };
      addUserImformationAdress(params).then((res) => {
        console.log("res---", res);
        this.getTableData();
      });
    },
    editNewAdress() {
      console.log("editForm---", this.editForm);
      this.editDialogFormVisible = false;
      let params = {
        id: this.editForm.id,
        consignee: this.editForm.consignee,
        consigneePhone: this.editForm.consigneePhone,
        address: this.editForm.address,
        province: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[0],
        provinceCode: this.editForm.ssq[0],
        city: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[1],
        cityCode: this.editForm.ssq[1],
        area: this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels[2],
        areaCode: this.editForm.ssq[2],
      };
      editUserImformationAdress(params).then((res) => {
        console.log("res---", res);
        this.getTableData();
      });
    },
    // 点击按钮显示增加地址的弹窗
    addAdressButton() {
      console.log(
        this.personInformationContainer.provinceCode,
        this.personInformationContainer.cityCode,
        this.personInformationContainer.areaCode
      );
      this.addForm.consignee = "";
      this.addForm.consigneePhone = "";
      this.addForm.address = "";
      this.dialogFormVisible = true;
    },
    // 编辑行
    editAdressButton(index, row) {
      console.log("row---", row);
      this.editForm.id = row.id;
      this.editForm.consignee = row.consignee;
      this.editForm.consigneePhone = row.consigneePhone;
      this.editForm.address = row.address;

      this.$set(this.editForm, "ssq", [
        Number(row.provinceCode),
        Number(row.cityCode),
        Number(row.areaCode),
      ]);
      console.log(this.editForm.ssq);
      this.timer++;
      this.editDialogFormVisible = true;
    },
    // 请求个人信息
    getUserImformationMethod() {
      getUserImformation()
        .then((res) => {
          // console.log("res---", res);
          // () = res.resultthis.personInformationContainer;
          console.log(
            "personInformationContainer---",
            this.personInformationContainer
          );
          // this.$set(
          //   this.receivePlaceValue,
          //   "provinceCode",
          //   this.personInformationContainer.provinceCode
          // );
          // this.$set(
          //   this.receivePlaceValue,
          //   "cityCode",
          //   this.personInformationContainer.cityCode
          // );
          // this.$set(
          //   this.receivePlaceValue,
          //   "areaCode",
          //   this.personInformationContainer.areaCode
          // );
          // console.log("this.receivePlaceValue---", this.receivePlaceValue);
        })

        .catch((e) => {
          console.log("e---", e);
        });
    },
  },
  mounted() {
    this.options = city;

    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
.address-table {
  width: 100%;
}
</style>
