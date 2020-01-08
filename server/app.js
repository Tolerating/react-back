let Koa = require('koa')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror');
let koaBody = require('koa-body');
let users = require('./routes/users');
let login = require('./routes/login');
let image = require('./routes/image');
let products = require('./routes/products');
let category = require('./routes/category');
const roles = require('./routes/roles');
const app = new Koa();


// error handler
// onerror(app);
// app.use(require('koa-bodyparser')());
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));
// app.use(json());
// app.use(logger());

//访问方法所耗费的时间
// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

//静态资源处理
app.use(require('koa-static')(__dirname + '/public'));
console.log(__dirname);

// routes definition
app.use(users.routes(), users.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(image.routes(), image.allowedMethods());
app.use(products.routes(), products.allowedMethods());
app.use(category.routes(), category.allowedMethods());
app.use(roles.routes(), roles.allowedMethods());

// 错误日志
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app;
