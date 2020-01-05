let app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror');

let index = require('./routes/index');
let users = require('./routes/users');
const roles = require('./routes/roles');




// error handler
// onerror(app);
// app.use(require('koa-bodyparser')());
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

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// 错误日志
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app;
