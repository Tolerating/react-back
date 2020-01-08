const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
router.prefix('/manage');
// const dirPath = path.join(__dirname, '../public/upload/')
const dirPath = "http://localhost:3001/upload/"
/* 
上传图片
|参数		|是否必选 |类型     |说明
|image  |Y       |文件   |图片文件
*/
router.post('/img/upload', async (ctx,next)=>{
    // console.log();
    let file = ctx.request.files.image;
    let result;
    // return ctx.body = file;
    const reader = fs.createReadStream(file.path);
    let random = new Date().getTime().toString();
    let filePath = path.join(__dirname, '../public/upload/') + `${random+ '-' + file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    console.log(upStream);
    ctx.response.body = dirPath+random+'-'+file.name;
    
    
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
