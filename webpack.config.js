const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./async-race/src/index.ts",
  output: {
    path: path.resolve(__dirname, "async-race/dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "async-race/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  experiments: {
    topLevelAwait: true
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
