const router = require('koa-router')();
router.prefix('/manage');

/* 
上传图片
|参数		|是否必选 |类型     |说明
|image  |Y       |文件   |图片文件
*/
router.post('/img/upload',function* (next){
    let {image} = this.request.body;
});

/* 
删除图片
|参数		|是否必选 |类型     |说明
|name    |Y       |string   |图片文件名
*/
router.post('/img/delete',function* (next){
    let {name} = this.request.body;
});
module.exports = router
