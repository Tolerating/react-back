## 注意
`koa-router`的版本为`5.4.2`的话,路由的回调函数中访问context对象需要使用`this`访问,最新版本是传一个`context`参数

## koa-static
静态资源处理中间件
`app.use(require('koa-static')(__dirname + '/public'));`
上面的意思是public文件夹是存放静态资源的地方,访问的时候不要带上public,例如:`localhost:3000/images/1.jpg`

## mongoose模糊查询
```javascript
//$regex表示一个正则表达式，匹配了key
//$or为模糊查询  格式:$or:[{name:{$regex: String(key),$options: '$i'}},{}....]
router.get('/product/search',function* (next){
    let {pageNum,pageSize,productName = null,productDesc = null} = this.query;
    let condition = {};
    // let query = new RegExp(searchName,'i');
    if(productName){
        condition = {$or: [{"name": {$regex: String(productName)}}]};
    }else{
        condition = {$or: [{"desc": {$regex: String(productDesc)}}]};
    }
    let count = yield db.count({tableName:'products',conditions:condition,schema:ProductsSchema}).then(val=>{
        return val;
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
    yield db.find({tableName:'products',conditions:condition,options:{skip:(pageNum-1)*pageSize,limit:Number(pageSize)},schema:ProductsSchema}).then(val=>{
        this.body={
            "status": 0,
            "data": {
                "pageNum": pageNum,
                "total": count,
                "pages": Math.ceil(count/pageSize),
                "pageSize": pageSize,
                "list": val
            }
        }
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
});

```

## koa2文件上传实现
实现文件上传的中间件有三个:
* koa-body
* busboy
* koa-multer

### koa-body的使用
**注意:koa版本需要为2.x**
1. 下载koa-body: `npm install koa-body --save`
2. 引入:
```javascript
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
```
引入后,即可通过ctx.request.files获取上传的文件
> 提醒：
> 新版本的koa-body通过ctx.request.files获取上传的文件
> 旧版本的koa-body通过ctx.request.body.files获取上传的文件

3. 获取到文件之后，通过fs将文件保存到服务器的指定目录
上传单个文件：
```javascript
router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
});
```
上传多个文件:
```javascript
router.post('/uploadfiles', async (ctx, next) => {
  // 上传多个文件
  const files = ctx.request.files.file; // 获取上传文件
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
 return ctx.body = "上传成功！";
});
```

## mongoose修改返回对象中的属性值
mongoose默认是不让我们修改返回对象中的数据的,但是提供了lean()函数可以修改返回对象中的数据
例如:
```JavaScript
models.find(conditions,projecttion,options,(err,docs)=>{
    if(!err){
        resolve(docs);
    }else{
        reject(err);
    }
}).lean();
```