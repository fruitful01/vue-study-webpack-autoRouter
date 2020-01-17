module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage', //usage根据你的broswerList版本和你使用的来引入，不考虑node_modules内容的polyfill,entry是根据你的broswerList来引入不关系你是否用得到
        corejs: 2,
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
