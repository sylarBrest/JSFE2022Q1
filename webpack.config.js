const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.js",
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/svg/favicon.svg",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/images", to: "./assets/images" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|jpg|ico)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@controller': path.resolve(__dirname, 'src/components/controller'),
      '@view': path.resolve(__dirname, 'src/components/view'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
