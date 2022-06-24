let proxyObj = {};
proxyObj['/']={
  ws:false,
  target:'http://localhost:8081',
  changeOrigin:true,
  pathRewrite:{'^/':''}
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    host:'localhost',
    proxy:proxyObj,
    port:8080
  }
})
