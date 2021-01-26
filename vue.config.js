module.exports = {
  devServer: {
    port: 9002, // 端口号
    disableHostCheck: true,
    proxy: { // 配置跨域
      '/': {
        target: 'http://api.phonestore.com/api/', // 后台接口
        ws: false,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/': ''// 请求的时候使用这个api就可以
        }
      }
    }
  }
}
