module.exports = {
  baseUrl: "./",
  assetsDir: "assets", //静态资源目录（js, css, img）
  productionSourceMap: false,
  outputDir: "dist", //build输出目录
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8080",
    https: false, //是否使用https协议
    hotOnly: false, //是否开启热更新
    proxy: {
      "/gcmanager": {
        target: "http://10.12.52.234:1986/gcapi/", //对应服务器地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "/gcmanager": "",
        },
      },
      "/gcchoosed": {
        target: "http://10.12.52.234:8080/gcmanager/", //对应服务器地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "/gcchoosed": "",
        },
      },
      "/api": {
        target: "http://127.0.0.1:2333/api", //对应服务器地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "/api": "/api",
        },
      },
      // '/gcm':{
      //     target:'http://10.12.52.234:8080/gcmanager/',   //对应服务器地址
      //     changeOrigin:true,  //允许跨域
      //     pathRewrite:{
      //         '/gcm':''
      //     }
      // },
    },
  },
};
