const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  devServer: {
    port: 8081,
    host: "127.0.0.1",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/main/app/html/index.html",
    }),
  ],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
});
