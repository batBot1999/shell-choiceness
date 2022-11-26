<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :class="{ hide: hideUpload }"
      :on-remove="uploadRemove"
      :on-change="uploadChange"
      :auto-upload="false"
      :file-list="fileList"
      accept=".jpg,.png"
      class="uploadimg"
    >
      <i slot="default" class="el-icon-plus"
        ><p>{{ text }}</p></i
      >
    </el-upload>
  </div>
</template>

<script>
var COS = require("cos-js-sdk-v5");
var cos = new COS({
  // getAuthorization 必选参数
  getAuthorization: function (options, callback) {
    // 异步获取临时密钥
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

    var url = "https://sports.bioclub.cn/jeecg-boot/sport/cos/key"; // url替换成您自己的后端服务
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
      try {
        var data = JSON.parse(e.target.responseText);
        var credentials = data.result.credentials;
      } catch (e) {}
      if (!data || !credentials) {
        return console.error(
          "credentials invalid:\n" + JSON.stringify(data, null, 2)
        );
      }
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.result.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.result.expiredTime, // 时间戳，单位秒，如：1580000000
      });
    };
    xhr.send();
  },
});
export default {
  props: {
    text: String,
  },
  data() {
    return {
      dialogImageUrl: "",
      disabled: false,
      fileList: [],
      params: {},
    };
  },
  computed: {
    hideUpload: function () {
      return this.fileList.length > 0;
    },
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handleDownload(file) {
      console.log(file);
    },
    uploadChange(file, fileList) {
      // console.log("file---",file);
      // this.params = new FormData();
      this.file = file.raw;
      // this.params.append("file", this.file);
      this.fileList.push({ url: file.url, name: "111" });
      // console.log("this.fileList", this.fileList);
      this.$emit("imageValue", this.file);
    },
    uploadRemove() {
      this.fileList = [];
      this.file = {};
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.hide .el-upload--picture-card {
  display: none;
}
/deep/.uploadimg .el-upload-list__item {
  transition: none !important;
}
/deep/.el-icon-plus p {
  font-size: 12px;
  color: #000000;
  transform: translateY(20px);
}
</style>
