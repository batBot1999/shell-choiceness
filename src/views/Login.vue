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
      <el-form-item label="账号:" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginButton" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button class="loginButton" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from "../request/api.js"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
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
            max: 10,
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
            alert('submit!');
            login(this.ruleForm).then((res) => {
              // console.log(res);
              // 如果账号密码正确,要把token保存起来
              localStorage.setItem("token", res.data.token);
              // 而且还要跳转页面
              this.$router.push({name: "home"})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
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
    border: 20px solid #409EFF;
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
