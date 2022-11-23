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
      <i slot="default" class="el-icon-plus"><p>{{text}}</p></i>

    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
  data() {
    return {
      dialogImageUrl: "",
      disabled: false,
      fileList:[],
      params: {},
    };
  },
  computed:{
    hideUpload:function(){
      return this.fileList.length > 0;
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handleDownload(file) {
      console.log(file);
    },
    uploadChange(file, fileList) {
      console.log(file);
      this.params = new FormData();
      console.log("params", this.params);
      // this.file=file.raw;
      this.params.append("file", this.file);
      // this.fileList.push({url:file.url,name:"111"})
    },
    uploadRemove() {
     this.fileList=[];
     this.file={};
    }
  },
};
</script>

<style lang="less" scoped>
/deep/.hide .el-upload--picture-card {
	display: none;
}
/deep/.uploadimg .el-upload-list__item{
  transition: none !important;
}
/deep/.el-icon-plus p {
  font-size: 12px;
  color: #000000;
  transform: translateY(20px)
}
</style>
