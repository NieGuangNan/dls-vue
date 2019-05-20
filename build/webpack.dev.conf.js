const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

// baseWebpackConfig.output.chunkFilename = '[name].[chunkhash].js';            // 路由js命名 这个拆分路由 模块依赖脚本文件

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  // optimization: {
  //   minimize: true,
  //   providedExports: true,
  //   usedExports: true,
  //   //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
  //   //依赖于optimization.providedExports和optimization.usedExports
  //   sideEffects: true,
  //   //取代 new webpack.optimize.ModuleConcatenationPlugin()
  //   concatenateModules: true,
  //   //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
  //   noEmitOnErrors: true,
  //   splitChunks: {
  //     chunks: 'initial', //'all'|'async'|'initial'(全部|按需加载|初始加载)的chunks
  //   },
  //   //提取webpack运行时的代码
  //   runtimeChunk: {
  //     name: 'manifest'
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      __DEV__:true,
    }),new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
