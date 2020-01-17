const Koa = require('koa');
const KoaRouter = require('koa-router');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const app = new Koa();
const router = new KoaRouter();
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devMiddleware = require('./devMiddleware');
const hotMiddleware = require('./hotMiddleware');

app.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath, // '/'
  })
);
app.use(hotMiddleware(compiler));
router.put('/upload', async (ctx, next) => {
  console.log(ctx);
  ctx.body = {
    a: 1,
  };
});
app.use(router.routes());
app.listen(1119, function() {
  // new OpenBrowserPlugin({ url: `http://localhost:1119` });
  console.log('app is listening on port 1119\n ');
});
