module.exports = {
  proxyList: {
    '/': {
      // 测试环境
      target: 'http://192.168.2.232:8000', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
          '^/': '' //需要rewrite重写的,
      }
    }
  }
}
