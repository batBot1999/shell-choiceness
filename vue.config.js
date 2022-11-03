const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // assetsPublicPath: './jeecg-boot',
  publicPath: "/jeecg-boot",
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
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
