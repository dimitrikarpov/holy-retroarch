const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
  plugins: [
    // new HtmlWebpackPlugin({ title: "Output management" }),
    // new CopyPlugin({
    //   patterns: [{ from: "cores" }],
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      //   {
      //     test: /libretro.wasm$/i,
      //     type: "asset",
      //   },
    ],
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
}
