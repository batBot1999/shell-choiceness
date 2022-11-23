<template>
  <div>
    <HeaderNav />
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <span class="account-management">账号中心</span>
            </template>
            <el-menu-item index="1-1" @click="showPerson"
              >基本信息</el-menu-item
            >
            <el-menu-item index="1-2" @click="showEnterprise"
              >企业认证</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
      <div class="container-first" v-if="personOrEnterprise == 1">
        <div class="person-header">
          <div>
            <el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
          </div>
          <div class="personal-information">
            <p>
              用户名:&nbsp&nbsp&nbsp&nbsp{{
                personInformationContainer.username
              }}
            </p>
            <p>
              账号ID:&nbsp&nbsp&nbsp&nbsp{{ personInformationContainer.id }}
            </p>
            <p>注册时间:&nbsp&nbsp&nbsp&nbsp{{ createTime }}</p>
            <p>实名认证:&nbsp&nbsp&nbsp&nbsp{{}}</p>
            <p>
              手机号:&nbsp&nbsp&nbsp&nbsp{{ personInformationContainer.phone }}
            </p>
          </div>
        </div>
        <PersonInformation :information="personInformationContainer" v-if="flag"></PersonInformation>
      </div>
      <div class="container-second" v-if="personOrEnterprise == 2">
        <el-steps :active="active">
          <el-step title="填写信息" class="inVerification"> </el-step>
          <el-step title="人工审核" class="inVerification"> </el-step>
          <el-step title="审核通过" class="inVerification"> </el-step>
        </el-steps>
        <div class="el-step-container1" v-if="this.active == 1">
          <div class="form-box">
            <el-form
              :model="enterpriseRuleForm"
              status-icon
              :rules="enterpriseRules"
              ref="enterpriseRuleForm"
              label-width="200px"
              class="demo-enterpriseRuleForm"
            >
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input
                  placeholder="请输入企业名称"
                  v-model="enterpriseRuleForm.enterpriseName"
                ></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input
                  placeholder="请输入统一社会信用代码"
                  v-model="enterpriseRuleForm.creditCode"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照" prop="businessLicense">
                <UploadImage :text="text0"></UploadImage>
              </el-form-item>
              <el-form-item label="法人姓名" prop="legalPersonName">
                <el-input
                  placeholder="请输入法人姓名"
                  v-model="enterpriseRuleForm.legalPersonName"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="IDNumber">
                <el-input
                  placeholder="请输入法人身份证号"
                  v-model="enterpriseRuleForm.IDNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证照片" prop="IDImage">
                <UploadImage :text="text1"></UploadImage>
                <UploadImage :text="text2"></UploadImage>
              </el-form-item>
              <el-button
                type="primary"
                @click="submitForm('enterpriseRuleForm')"
                style="margin-top: 12px; margin-left: 40%"
                >提交</el-button
              >
            </el-form>
          </div>
        </div>
        <div class="el-step-container2" v-if="this.active == 2">
          <img src="../assets/img/warning.png" alt="" />
          <div class="step-second-textbox">
            <h1>您已成功提交企业认证信息,请耐心等候!</h1>
            <p>工作人员会在24小时内完成审核,请关注系统通知,谢谢!</p>
          </div>
        </div>
        <div class="el-step-container3" v-if="this.active == 3">
          <div class="container3-header">
            <span>企业实名认证</span>
            <span>修改认证主体</span>
          </div>
          <div class="container3-container">
            <p>账号类型:</p>
            <p>认证状态:</p>
            <p>认证时间:</p>
            <p>法人姓名:</p>
            <p>法人证件类型:</p>
            <p>法人身份证号:</p>
            <p>企业名称:</p>
            <p>企业证件类型:</p>
            <p>统一社会信用代码:</p>
          </div>
        </div>
      </div>
    </el-row>
    <Footer />
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import Footer from "../components/Footer.vue";
import UploadImage from "../components/upload/UploadImage.vue";
import PersonInformation from "../components/PersonInformation.vue";
import { getUserImformation } from "../request/api.js";
export default {
  data() {
    return {
      flag:false,
      // 个人信息容器
      personInformationContainer: [],
      // 个人还是企业
      personOrEnterprise: 1,
      // 企业步骤第几步
      active: 1,
      enterpriseRuleForm: {
        enterpriseName: "",
        creditCode: "",
        legalPersonName: "",
        IDNumber: "",
      },
      enterpriseRules: {
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        creditCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
        ],
        businessLicense: [
          { required: true, message: "请上传营业执照", trigger: "blur" },
        ],
        legalPersonName: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        IDNumber: [
          { required: true, message: "请输入法人身份证号", trigger: "blur" },
        ],
        IDImage: [
          { required: true, message: "请上传身份证照片", trigger: "blur" },
        ],
      },

      text0: "上传文件",
      text1: "身份证正面",
      text2: "身份证反面",
    };
  },
  components: {
    Footer,
    HeaderNav,
    UploadImage,
    PersonInformation,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showPerson() {
      this.personOrEnterprise = 1;
    },
    showEnterprise() {
      this.personOrEnterprise = 2;
    },
    submitForm(formName) {
      this.next(); // 标记1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    next() {
      // if (this.active++ > 2) this.active = 0;
      if (this.active < 3) {
        this.active++;
      }
      console.log("active", this.active);
    },
    // 请求个人信息
    getUserImformationMethod() {
      getUserImformation()
        .then((res) => {
          // console.log("res---", res);
          this.personInformationContainer = res.result;
          this.flag=true;
        })
        .catch((e) => {
          console.log("e---", e);
        });
    },
  },
  computed: {
    createTime() {
      if (this.personInformationContainer.createTime) {
        return this.personInformationContainer.createTime.slice(0,10);
      }
    },
  },
  mounted() {
    this.getUserImformationMethod();
  },
};
</script>

<style lang="less" scoped>
.tac {
  display: flex;
  width: 100%;
}
.container-first {
  // background: rgb(213, 211, 211);
  padding: 30px 150px;
  width: 100%;
  .person-header {
    width: 60%;
    display: flex;
    // justify-content: space-around;
    // align-items: center;
    .personal-information {
      display: flex;
      flex-wrap: wrap;
      // background: red;
      margin-left: 100px;
      width: 100%;
      p {
        text-align: left;
        // background: green;
        width: 50%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
    }
  }
}

.container-second {
  flex: 1;
  // background: rgb(216, 214, 214);
  padding: 100px;
  .el-step-container1 {
    display: flex;
    justify-content: center;
    .form-box {
      margin-top: 50px;
      width: 50%;
    }
  }
  .el-step-container2 {
    display: flex;
    align-items: center;
    justify-content: center;
    .step-second-textbox {
      margin-left: 50px;
      h1 {
        margin-bottom: 20px;
      }
    }
  }

  .el-step-container3 {
    margin-top: 20px;
    .container3-header {
      display: flex;
      justify-content: space-between;
      span:last-child {
        color: #409eff;
      }
    }
    .container3-container {
      width: 100%;
      // background: green;
      display: flex;
      flex-wrap: wrap;
      p {
        width: 30%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
}

/deep/.el-form-item__content {
  display: flex;
  gap: 20px;
}
</style>
