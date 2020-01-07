## 注意
`koa-router`的版本为`5.4.2`,路由的回调函数中访问context对象需要使用`this`访问,最新版本是传一个`context`参数

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



