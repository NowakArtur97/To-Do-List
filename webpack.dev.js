const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  devServer: {
    port: 8081,
    host: "127.0.0.1",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
});
