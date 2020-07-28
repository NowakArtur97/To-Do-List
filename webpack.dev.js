const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  devServer: {
    host: "0.0.0.0",
    port: 8081,
    disableHostCheck: true,
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
      template: "./src/app/html/index.html",
    }),
  ],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
});
