// 拼接路径
const resolve = dir => require("path").join(__dirname, dir);

// 基础路径 注意发布之前要先修改这里
let publicPath = "/";

module.exports = {
  publicPath: publicPath, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    publicPath: publicPath, // 和 baseUrl 保持一致
    proxy: {
      // 测试环境
      "/": {
        ws: false,
        target: "http://hbzkzpp.cn/",
        changeOrigin: true
      }
    }
  },
};
