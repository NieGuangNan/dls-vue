const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = config.build.env;
const extractLess = new ExtractTextPlugin('style.[hash].css');
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    // path仅仅告诉Webpack结果存储在哪里，然而publicPath项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    publicPath: config.build.assetsPublicPath
  },
  optimization: {
    minimize: true, //压缩优化
    providedExports: true,
    usedExports: true,
    //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    //依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    //取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true,
    splitChunks: {
      // maxAsyncRequests: 1,                     // 最大异步请求数， 默认1
      // maxInitialRequests: 1,                   // 最大初始化请求书，默认1
      cacheGroups: {
        // test: path.resolve(__dirname, '../node_modules'),
        commons: {
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        }
      }
    },
    //提取webpack运行时的代码
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    extractLess,
    new webpack.DefinePlugin({
      'process.env': env
    }), new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new VueLoaderPlugin(),

    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // }),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true,
    //     discardComments: { removeAll: true }
    //   }
    // }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      hash:true,// 防止缓存
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
