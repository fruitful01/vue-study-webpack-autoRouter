const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const babelConfig = require('./babel.config');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
module.exports = {
  // mode: 'development',
  entry: {
    app: ['@babel/polyfill', './src/app.js'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  externals: {
    vue: 'Vue', //cdn 引入
    'vue-router': 'VueRouter',
    vuex: 'vuex',
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.png|svg|jpg|jpeg$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '贴吧',
      template: './index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: "'/'",
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[id].[name].[chunkhash:8].css',
      chunkFilename: 'style/[id].[name].[chunkhash:8].css',
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [
      // new OptimizeCSSAssetsPlugin(), //压缩css
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        async: {
          // 为异步代码打成一个公共包(在app.js修改一下代码,重新打包,不影响此包hash)
          name: 'async',
          chunks: 'async', // 为异步代码打包
          minChunks: 1,
          minSize: 0,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    contentBase: './dist',
    port: 1119,
    hot: true,
    historyApiFallback: true, //history mode 必须设置
  },
};
