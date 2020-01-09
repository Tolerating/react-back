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
    let file = ctx.request.files.image;
    const reader = fs.createReadStream(file.path);
    let random = new Date().getTime().toString();
    try {
        let filePath = path.join(__dirname, '../public/upload/') + `${random+ '-' + file.name}`;
        const upStream = fs.createWriteStream(filePath);
        reader.pipe(upStream);
        ctx.response.body ={
            "status": 0,
            "data": {
                "name": random+'-'+file.name,
                "url": dirPath+random+'-'+file.name
            }
        }   
    } catch (error) {
        ctx.response.body ={
            "status": 1
        }   
    }
    
});

/* 
删除图片
|参数		|是否必选 |类型     |说明
|name    |Y       |string   |图片文件名
*/
router.post('/img/delete',async (ctx,next)=>{
    let {name} = ctx.request.body;
    const delPath = path.join(__dirname, '../public/upload/') + name;
    try {
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
            ctx.body = {
                "status": 0
            }
        } else {
            console.log('inexistence path：', delPath);
            ctx.body = {
                "status": 1
            }
        }
    } catch (error) {
        console.log('del error', error);
        ctx.body = {
            "status": 1
        }
    }
    
});
module.exports = router
