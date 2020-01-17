const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
console.log(path.resolve(__dirname, './src/app.js'), '-------------------');
module.exports = {
  mode: 'development',
  entry: {
    app: '../src/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css|scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 1119,
    hot: true,
    historyApiFallback: true, //history mode 必须设置
  },
};
