<template>
  <div class="login-box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>欢迎您使用贝壳精选</h2>
      <el-form-item label="账号:" prop="email">
        <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="loginButton"
          @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button class="loginButton" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../request/api.js";
export default {
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "账号长度在3到10之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "密码长度在3到10之间",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      // 对表单内容进行验证
      this.$refs[formName].validate((valid) => {
        // valid布尔类型,为true表示验证成功,false验证错误
        if (valid) {
          login({
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          }).then((res) => {
            console.log("res---",res);
            if (res.code == 200) {
              // 如果账号密码正确,要把token保存起来
              // console.log("res.result.userInfo---", res.result.userInfo);
              window.localStorage.setItem("realname", res.result.userInfo.realname);
              window.localStorage.setItem("companyName", res.result.userInfo.companyName);
              // console.log("localStorage.realname---", localStorage.realname);
              // window.localStorage.setItem("companyName", res.result.userInfo.realname);
              window.localStorage.setItem("token", res.result.token);
              window.localStorage.setItem("type", res.result.type);
              // console.log("res---", res);
              // console.log("localStorage---", localStorage);
              this.$router.push({ name: "home" });
            }
          }).catch((e) => {
            // 如果账号不存在
            // console.log("e---", e);
            if (e.code === 500) {
              this.$message({
                showClose: true,
                message: e.message,
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/img/bgImage.png");
  background-size: 100%;
  background-repeat: no-repeat;
  // 解决外边距重叠
  overflow: hidden;
  text-align: center;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border: 20px solid #409eff;
    border-radius: 20px;

    h2 {
      margin-bottom: 10px;
    }

    .loginButton {
      width: 40%;
    }
  }
}
</style>
