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
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <html>
          <body>
            <h1>Hello World</h1>
            <holy-retro-nestopia prop1="foo"></holy-retro-nestopia>
          </body>
        </html>
    `,
    }),
    // new CopyPlugin({ patterns: [{ from: "./HelloWorld.js" }] }),
  ],
  devServer: {
    static: "./dist",
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
}
