const path = require("node:path");
const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require("@rspack/core");

const workingDir = process.cwd();
const outDir = path.resolve(workingDir, "dist");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    clean: true,
    trustedTypes: true,
    path: outDir,
    publicPath: "http://localhost:3002/",
    filename: "[name]-[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mf_remote",
      filename: "remoteEntry.js",
      exposes: {
        ".": "./src/app",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: "./public/index.ejs",
      chunks: ["main"],
    }),
  ],
};
