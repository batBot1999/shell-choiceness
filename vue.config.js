const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:"http://linzhiying123.natapp1.cc/jeecg-boot",
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
