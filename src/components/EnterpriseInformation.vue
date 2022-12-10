<template>
  <div class="container-second">
    <el-steps
      :active="active"
      class="stepsHeader"
      v-if="this.active != 3 && this.active != 4"
    >
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
            <UploadImage
              @imageValue="getImageValue0"
              :text="text0"
            ></UploadImage>
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
            <UploadImage
              @imageValue="getImageValue1"
              :text="text1"
            ></UploadImage>
            <UploadImage
              @imageValue="getImageValue2"
              :text="text2"
            ></UploadImage>
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
        <span @click="updateCertification">修改认证主体</span>
      </div>
      <div class="container3-container">
        <p>
          账号类型:&nbsp&nbsp&nbsp<span>{{ accountType }}</span>
        </p>
        <!-- <p>认证状态:&nbsp&nbsp&nbsp<span>已认证</span></p> -->
        <div class="authentication-container">
          <div>实名认证:&nbsp&nbsp&nbsp&nbsp</div>
          <!-- <div class="not-authentication" v-if="isAuthentication == 1">
            <div>未认证</div>
            <div @click="showEnterpriseAuthentication">去认证</div>
          </div> -->
          <div class="already-authentication">已认证</div>
        </div>
        <p>
          认证时间:&nbsp&nbsp&nbsp<span>{{ certificationTime }}</span>
        </p>
        <p>
          法人姓名:&nbsp&nbsp&nbsp<span>{{ legalPersonName }}</span>
        </p>
        <p>
          法人证件类型:&nbsp&nbsp&nbsp<span>{{ legalPersonCardType }}</span>
        </p>
        <p>
          法人身份证号:&nbsp&nbsp&nbsp<span>{{ legalPersonIDNumber }}</span>
        </p>
        <p>
          企业名称:&nbsp&nbsp&nbsp<span>{{ enterpriseName }}</span>
        </p>
        <p>
          企业证件类型:&nbsp&nbsp&nbsp<span>{{
            enterpriseCertificateType
          }}</span>
        </p>
        <p>
          统一社会信用代码:&nbsp&nbsp&nbsp<span>{{
            unifiedSocialCreditCode
          }}</span>
        </p>
      </div>
    </div>
    <div slot="" class="el-step-container4" v-if="this.active == 4">
      <h3>对不起!审核未能通过！</h3>
      <h4>原因为:</h4>
      <p>{{ reason }}</p>
      <el-button @click="updateCertification">点击返回首页</el-button>
    </div>
  </div>
</template>

<script>
import UploadImage from "./upload/UploadImage.vue";
import { postAddEnterpriseInformation } from "../request/api.js";
import { postEditEnterpriseInformation } from "../request/api.js";
import { getEnterpriseInformationType } from "../request/api.js";
import { getUserImformation } from "../request/api.js";
import { getEnterpriseInformation } from "../request/api.js";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      // 企业实名认证信息
      accountType: "企业账号",
      certificationTime: "",
      legalPersonName: "",
      legalPersonCardType: "身份证",
      legalPersonIDNumber: "",
      enterpriseName: "",
      enterpriseCertificateType: "企业营业执照",
      unifiedSocialCreditCode: "",

      // 企业信息容器
      enterpriseContainer: null,
      // 企业步骤第几步
      active: 1,
      enterpriseRuleForm: {
        // enterpriseName: "" || enterpriseContainer.companyName,
        // creditCode: "" || enterpriseContainer.companyCode,
        // legalPersonName: "" || enterpriseContainer.legalPersonName,
        // IDNumber: "" || enterpriseContainer.idCard,
        // businessLicense: "",
        // IDImage1: "",
        // IDImage2: "",

        enterpriseName: "",
        creditCode: "",
        legalPersonName: "",
        IDNumber: "",
        businessLicense: "",
        IDImage1: "",
        IDImage2: "",
        createBy: "",
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
        // businessLicense: [
        //   { required: true, message: "请上传营业执照", trigger: "blur" },
        // ],
        legalPersonName: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        IDNumber: [
          { required: true, message: "请输入法人身份证号", trigger: "blur" },
        ],
        // IDImage: [
        //   { required: true, message: "请上传身份证照片", trigger: "blur" },
        // ],
      },
      text0: "上传文件",
      text1: "身份证正面",
      text2: "身份证反面",
      // 审核未通过的原因
      reason: "",
      personInformation: "",
      // 静态图片路径
      img1: "https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF",
      img2: "https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF",
      img3: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
      // 是否认证,根据localstorage中的type来判断

      // 判断是编辑还首次新增,根据id
      addOrEdit: null,

      // 向vuex提交状态,判断当前是否处于审核中
      storeState: 2,

      // 存放后端传回来的state以及reason
      reason: "",
      isState: null,
    };
  },
  methods: {
    getImageValue0(value) {
      this.businessLicense = value;
      console.log("this.123---", this.businessLicense);
    },
    getImageValue1(value) {
      this.IDImage1 = value;
      console.log("this.123---", this.IDImage1);
    },
    getImageValue2(value) {
      this.IDImage2 = value;
      console.log("this.123---", this.IDImage2);
    },
    submitForm(formName) {
      this.next(); // 标记1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let params = new FormData();
          // params.append("file1", this.img1);
          // params.append("file2", this.img2);
          // params.append("file3", this.img3);
          // params.append(
          //   "enterpriseName",
          //   this.enterpriseRuleForm.enterpriseName
          // );
          // params.append("creditCode", this.enterpriseRuleForm.creditCode);
          // params.append(
          //   "legalPersonName",
          //   this.enterpriseRuleForm.legalPersonName
          // );
          // params.append("IDNumber", this.enterpriseRuleForm.IDNumber);

          // 如果企业id存在说明是在编辑,如果企业id不存在说明是首次在新增
          if (this.addOrEdit) {
            console.log("editOrEdit---");
            // 如果存在就是编辑
            postEditEnterpriseInformation({
              businessLicensePic: this.img1,
              cardFrontPic: this.img2,
              cardReversePic: this.img3,
              companyCode: this.enterpriseRuleForm.creditCode,
              companyName: this.enterpriseRuleForm.enterpriseName,
              createBy: this.createBy,
              createTime: this.certificationTime,
              id: this.addOrEdit,
              idCard: this.enterpriseRuleForm.IDNumber,
              isDelete: this.isDelete,
              isStatus: 1,
              legalPersonName: this.enterpriseRuleForm.legalPersonName,
              reason: this.reason,
              updateBy: this.updateBy,
              updateTime: this.updateTime,
              userId: this.userId,
            }).then((res) => {
              console.log("editRes---", res);

              // 提交store修改审核状态
              this.$store.dispatch("CHANGE_ISAUDITING", 2);
              this.active = this.$store.state.isAuditing;
            });
          } else {
            console.log("addOrEdit---");
            // 如果不存在就是首次新增
            postAddEnterpriseInformation({
              // params,
              isStatus: 1,
              businessLicensePic: this.img1,
              cardFrontPic: this.img2,
              cardReversePic: this.img3,
              companyName: this.enterpriseRuleForm.enterpriseName,
              companyCode: this.enterpriseRuleForm.creditCode,
              legalPersonName: this.enterpriseRuleForm.legalPersonName,
              idCard: this.enterpriseRuleForm.IDNumber,
            })
              .then((res) => {
                console.log("addRes---", res);
                // 提交store修改审核状态
                this.$store.dispatch("CHANGE_ISAUDITING", 2);
                this.active = this.$store.state.isAuditing;
              })
              .catch((e) => {
                this.$message({
                  showClose: true,
                  message: e.message,
                  type: "error",
                });
                console.log("e---", e);
              });
          }

          // this.next(); // 标记1
        } else {
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
    // 获取type,根据type来判断应该显示哪个页面
    getInformationType() {
      getEnterpriseInformationType().then((res) => {
        let type = res.result;
        console.log("type---", type);

        // 初次进入的用户来填表
        if (type == 0) {
          console.log("res.result---", res);
          this.active = 1;
          // 审核中
        } else if (type == 1) {
          console.log("res.result---", res);
          this.active = 2;
        } else if (type == 2) {
          console.log("res.result---", res);
          // 审核已通过
          this.active = 3;
        } else if (type == 3) {
          console.log("res.result---", res);
          //审核未通过！原因....
          this.active = 4;
        }
      });
    },
    // 请求个人信息
    // getUserImformationMethod() {
    //   getUserImformation()
    //     .then((res) => {
    //       console.log("res---", res);
    //       this.certificationTime = res.result.createTime;
    //       this.legalPersonName = res.result.realname;
    //       this.legalPersonIDNumber = res.result.idCard;
    //       this.enterpriseName = res.result.idCard;
    //       this.unifiedSocialCreditCode = res.result.idCard;
    //     })

    //     .catch((e) => {
    //       console.log("e---", e);
    //     });
    // },
    // 获取公司信息来显示
    getEnterpriseInformationMethod() {
      getEnterpriseInformation().then((res) => {
        console.log("getEnterpriseInformationRes---", res);
        this.enterpriseRuleForm.IDNumber = res.result.idCard;
        this.enterpriseRuleForm.legalPersonName = res.result.legalPersonName;
        this.enterpriseRuleForm.enterpriseName = res.result.companyName;
        this.enterpriseRuleForm.creditCode = res.result.companyCode;

        // 放进容器
        this.unifiedSocialCreditCode = res.result.companyCode;
        this.enterpriseName = res.result.companyName;
        this.createBy = res.result.createBy;
        this.certificationTime = res.result.createTime;
        this.addOrEdit = res.result.id;
        this.legalPersonIDNumber = res.result.idCard;
        this.isDelete = res.result.isDelete;
        this.isState = res.result.isStatus;
        this.legalPersonName = res.result.legalPersonName;
        this.reason = res.result.reason;
        this.updateBy = res.result.updateBy;
        this.updateTime = res.result.updateTime;
        this.userId = res.result.userId;

        // 如果不存在说明是首次进入企业信息页面，直接跳转填表页面
        if (!res.result.isStatus) {
          this.active = 1;
        }
        // 如果isState等于1说明是编辑,处于审核中
        else if (res.result.isStatus == 1) {
          this.$store.dispatch("CHANGE_ISAUDITING", 2);
          this.active = this.$store.state.isAuditing;
          // 如果isState等于2说明审核通过
        } else if (res.result.isStatus == 2) {
          this.$store.dispatch("CHANGE_ISAUDITING", 3);
          this.active = this.$store.state.isAuditing;
          // 如果isState等于3说明审核未通过
        } else if (res.result.isStatus == 3) {
          this.$store.dispatch("CHANGE_ISAUDITING", 4);
          this.active = this.$store.state.isAuditing;
        }
        // console.log("enterpriseContainer---", this.enterpriseContainer);
        // console.log("this.addOrEdit = res.result.id", this.addOrEdit);
      });
    },

    // 跳转回填表页面重新认证
    updateCertification() {
      this.active = 1;
    },
  },

  mounted() {
    this.getInformationType();
    // this.getUserImformationMethod();
    this.getEnterpriseInformationMethod();
    // this.active = this.$store.state.isAuditing;
  },
};
</script>

<style lang="less" scoped>
.container-second {
  margin: 50px 100px 0 100px;
  flex: 1;
  // width: 100%;
  // background: rgb(216, 214, 214);

  .stepsHeader {
    width: 50%;
    margin: 0 auto;
  }

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
      margin-bottom: 20px;
      justify-content: space-between;
      span:first-child {
        font-size: 16px;
        font-weight: 600;
      }
      span:last-child {
        color: #409eff;
        font-size: 14px;
      }
    }
    .container3-container {
      background: rgb(216, 214, 214);

      width: 100%;
      // background: green;
      display: flex;
      flex-wrap: wrap;
      padding: 20px;

      p {
        width: 33.3%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: rgb(108, 105, 105);
        text-align: left;

        span {
          color: #000000;
          font-weight: 400;
        }
      }
      .authentication-container {
        width: 33.3%;
        display: flex;
        div {
          height: 30px;
          line-height: 30px;
        }
        .not-authentication {
          padding: 0 5px;
          border-radius: 5px;
          display: flex;
          div:first-child {
            height: 30px;
            line-height: 30px;
            color: rgb(247, 13, 13);
            background: rgb(244, 212, 212);
          }
          div:last-child {
            height: 30px;
            line-height: 30px;
            color: blue;
          }
        }
        .already-authentication {
          padding: 0 5px;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          color: green;
          background: rgb(170, 235, 170);
        }
      }
    }
  }
  .el-step-container4 {
    // background: red;
    padding: 20px;
    text-align: center;

    h3 {
      margin-bottom: 20px;
    }

    h4 {
      margin-bottom: 20px;
    }

    .el-button {
      margin-top: 20px;
    }
  }
}
/deep/.el-form-item__content {
  display: flex;
  gap: 20px;
}
</style>
