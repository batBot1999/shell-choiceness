<template>
  <div class="register-main-box">
    <div class="register-left-box">
      <h1>Hi!</h1>
      <h1>欢迎加入贝壳精选</h1>
      <h1>如果您已有账号</h1>
      <button @click="goLogin()">立即登陆</button>
    </div>
    <div class="register-right-box">
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
          <el-form-item label="电子邮箱" prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="此邮箱作为登录账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              placeholder="请输入您的手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
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

          <el-form-item label="您的姓名" prop="realname">
            <el-input
              v-model="ruleForm.realname"
              placeholder="请输入您的真实姓名"
            ></el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="ruleForm.companyName"
              placeholder="请输入公司名"
            ></el-input>
          </el-form-item>

          <el-form-item label="职位" prop="position">
            <el-input
              v-model="ruleForm.position"
              placeholder="请输入您的职位"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="账号用途" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="采购"></el-radio>
              <el-radio label="销售"></el-radio>
            </el-radio-group>
          </el-form-item> -->

          <el-form-item>
            <el-button
              type="primary"
              :plain="true"
              @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
        <el-dialog
  title="认证提醒"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span class="modal-content">用户需要进行企业认证后,认证通过后方可进行采购操作.</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="goHome">直接进入首页</el-button>
    <el-button type="primary" @click="goEnterpriseCertification">前往认证页面</el-button>
  </span>
</el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "../request/api.js";
import { Message } from "element-ui";
import { login } from "../request/api.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
       let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
       if(!reg.test(value)){callback(new Error('密码必须是由6-20位字母+数字组合'))
      }else{
          callback()
      }
      // if (value === "") {
      //   callback(new Error("请输入密码"));
      // } else {
      //   if (this.ruleForm.checkPass !== "") {
      //     this.$refs.ruleForm.validateField("checkPass");
      //   }
      //   callback();
      // }

    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        companyName: "",
        email: "",
        password: "",
        phone: "",
        checkPass: "",
        realname: "",
        position: "",
        type: 0,
      },
      rules: {
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        type: [{ trigger: "change" }],
      },
      centerDialogVisible: false,
    };
  },

  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    submitForm(formName) {
      this.centerDialogVisible = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({
            companyName: this.ruleForm.companyName,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            phone: this.ruleForm.phone,
            realname: this.ruleForm.realname,
            position: this.ruleForm.position,
            type: 0,
          }).then((res) => {
            console.log("register-res---", res);
            if (res.code === 200) {
              window.localStorage.setItem("token", res.result.token);
              window.localStorage.setItem("type", res.result.type);
              this.$message({
                showClose: true,
                message: res.message,
                type: "success",
              });
      // this.centerDialogVisible = true;
              // this.$router.push({ name: "login" });
            }
          }).catch((e) => {
            // 如果账号已存在
            console.log("e---", e);
            if (e.code === 500) {
              this.$message({
                showClose: true,
                message: e.message,
                type: "error",
              });
            }
          })

        } else {
          return false;
        }
      });
    },
    goHome () {
      this.$router.push({ name: "home" });
    },
    goEnterpriseCertification () {
      this.$router.push({ name: "enterprise-certification" });
    }
  },
};
</script>

<style lang="less" scoped>
.register-main-box {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #0059aa;

  .register-left-box {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40vw;
    height: 30%;
    float: left;
    background-color: #0059aa;

    h1:first-child {
      color: yellow;
      transform: translate(-100px);
    }

    h1:nth-child(2) {
      color: #fff;
    }

    h1:nth-child(3) {
      color: #fff;
    }

    button {
      width: 80%;
      height: 50px;
      font-size: 15px;
      color: #0e6ebe;
      border-radius: 20px;
      border: none;
    }
  }

  .register-right-box {
    width: 60vw;
    height: 100%;
    float: left;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .logiFormBox {
      width: 50%;
      text-align: center;
      background: #fff;

      h1 {
        margin-bottom: 50px;
      }

      /deep/.el-dialog--center .el-dialog__body {
        text-align: center !important;;
        font-size: 18px;
      }
    }
  }
}
</style>
