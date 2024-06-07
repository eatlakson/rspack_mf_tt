const path = require("node:path");
const { HtmlRspackPlugin } = require("@rspack/core");
const {
  container: { ModuleFederationPlugin },
} = require("@rspack/core");

const workingDir = process.cwd();
const outDir = path.resolve(workingDir, "dist");
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    main: {
      import: "./src/index",
      runtime: "runtime",
    },
  },
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
    publicPath: ASSET_PATH,
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
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        "@mf/remote": "mf_remote@http://localhost:3002/remoteEntry.js",
      },
      runtimePlugins: [require.resolve("./runtimePlugin")],
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
