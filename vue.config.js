const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // assetsPublicPath: './jeecg-boot',
  publicPath: "/jeecg-boot",
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        // target:"http://linzhiying123.natapp1.cc/jeecg-boot",
        target:"http://bkzx.bioclub.cn/api/jeecg-boot",
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
// vue.config.js
