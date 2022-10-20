<template>
  <div class="logiFormBox">
    <h1>欢迎加入贝壳精选</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="电子邮箱" prop="mail">
        <el-input
          v-model="ruleForm.mail"
          placeholder="此邮箱作为登录账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phoneNumber">
        <el-input
          v-model="ruleForm.phoneNumber"
          placeholder="请输入您的手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          placeholder="请输入6～20位密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="您的姓名" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入您的真实姓名"
        ></el-input>
      </el-form-item>

      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入您的真实姓名"
        ></el-input>
      </el-form-item>

      <el-form-item label="职位" prop="jobPosition">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入您的职位"
        ></el-input>
      </el-form-item>

      <el-form-item label="账号用途" prop="accountUse">
        <el-radio-group v-model="ruleForm.accountUse">
          <el-radio label="采购"></el-radio>
          <el-radio label="销售"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        mail: "",
        phoneNumber: "",
        pass: "",
        checkPass: "",
        name: "",
        companyName: "",
        jobPosition: "",
        accountUse: "",
      },
      rules: {
        mail: [{ required: true, trigger: "blur" }],
        phoneNumber: [{ required: true, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        name: [{ required: true, trigger: "blur" }],
        companyName: [{ required: true, trigger: "blur" }],
        jobPosition: [{ required: true, trigger: "blur" }],
        accountUse: [{ required: true, trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.logiFormBox {
  width: 50%;
  text-align: center;
  background: #fff;

  h1 {
    margin-bottom: 50px;
  }

  .demo-ruleForm {
  }
}
</style>
