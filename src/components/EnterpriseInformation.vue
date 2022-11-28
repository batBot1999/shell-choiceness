<template>
  <div class="container-second">
    <el-steps :active="active" class="stepsHeader">
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
        <span>修改认证主体</span>
      </div>
      <div class="container3-container">
        <p>
          账号类型:<span>{{ accountType }}</span>
        </p>
        <p>
          认证状态:<span>{{ isCertification }}</span>
        </p>
        <p>
          认证时间:<span>{{ certificationTime }}</span>
        </p>
        <p>
          法人姓名:<span>{{ legalPersonName }}</span>
        </p>
        <p>
          法人证件类型:<span>{{ legalPersonCardType }}</span>
        </p>
        <p>
          法人身份证号:<span>{{ legalPersonIDNumber }}</span>
        </p>
        <p>
          企业名称:<span>{{ enterpriseName }}</span>
        </p>
        <p>
          企业证件类型:<span>{{ enterpriseCertificateType }}</span>
        </p>
        <p>
          统一社会信用代码:<span>{{ unifiedSocialCreditCode }}</span>
        </p>
      </div>
    </div>
    <div v-if="this.active == 4">
      <h3>对不起!审核未能通过！</h3>
      <p>原因为:</p>
      <p>{{ reason }}</p>
    </div>
  </div>
</template>

<script>
import UploadImage from "./upload/UploadImage.vue";
import { postEnterpriseInformation } from "../request/api.js";
import { getEnterpriseImformationType } from "../request/api.js";
import { getUserImformation } from "../request/api.js";

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

      // 企业步骤第几步
      active: 1,
      enterpriseRuleForm: {
        enterpriseName: "",
        creditCode: "",
        legalPersonName: "",
        IDNumber: "",
        businessLicense: "",
        IDImage1: "",
        IDImage2: "",
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

          postEnterpriseInformation({
            // params,
            businessLicensePic:  this.img1,
            cardFrontPic: this.img2,
            cardReversePic: this.img3,
            companyName: this.enterpriseRuleForm.enterpriseName,
            companyCode: this.enterpriseRuleForm.creditCode,
            legalPersonName: this.enterpriseRuleForm.legalPersonName,
            idCard: this.enterpriseRuleForm.IDNumber,
          })
            .then((res) => {
              // if (res. == 200) {
                // console.log("params-----", params);
                // this.$message({
                //   showClose: true,
                //   message: "信息提交成功!",
                //   type: "success",
                // });
                console.log("res---", res);
              // }
            })
            .catch((e) => {
              this.$message({
                showClose: true,
                message: e.message,
                type: "error",
              });
              console.log("e---", e);
            });
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
    getInformationType() {
      getEnterpriseImformationType().then((res) => {
        console.log("type---", res);

        // 初次进入的用户来填表
        if (res.result == 0) {
          this.active = 1;
          // 审核中
        } else if (res.reuslt == 1) {
          this.active = 2;
        } else if (res.result == 2) {
          // 审核已通过
          this.active = 3;
        } else if (res.result == 3) {
          //审核未通过！原因....
          this.active = 4;
        }
      });
    },
    // 请求个人信息
    getUserImformationMethod() {
      getUserImformation()
        .then((res) => {
          console.log("res---", res);
          this.certificationTime = res.result.createTime;
          this.legalPersonName = res.result.realname;
          this.legalPersonIDNumber = res.result.idCard;
          this.enterpriseName = res.result.idCard;
          this.unifiedSocialCreditCode = res.result.idCard;
        })

        .catch((e) => {
          console.log("e---", e);
        });
    },
  },

  mounted() {
    // this.getInformationType();
    this.getUserImformationMethod();
  },
};
</script>

<style lang="less" scoped>
.container-second {
  margin-top: 50px;
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
