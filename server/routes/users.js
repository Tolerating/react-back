var router = require('koa-router')();
let db = require('../utils/db');
let userSchema = require('../Models/UserModel');

router.prefix('/manage');

/* 
添加用户
|参数		|是否必选 |类型     |说明
|username    |Y       |string   |用户名
|password    |Y       |string   |密码
|phone       |N       |string   |手机号
|email       |N       |string   |邮箱
|role_id     |N       |string   |角色ID
*/
router.post('/user/add',async (ctx,next)=>{
    let increase = ctx.request.body;
    await db.insert({tableName:'users',doc:increase,schema:userSchema}).then(val =>{
        return ctx.body = val;
    }).catch(err =>{
        return ctx.body = err;
    });
});

/* 
更新用户
|参数		|是否必选 |类型     |说明
|_id         |Y       |string   |ID
|username    |N       |string   |用户名
|phone       |N       |string   |手机号
|email       |N       |string   |邮箱
|role_id     |N       |string   |角色ID

*/
router.post('/user/update',async (ctx,next)=>{
    let {_id,password,username,phone,email,role_id} = ctx.request.body;
});

/* 
获取所有用户列表
*/
router.get('/user/list',async (ctx,next)=>{
    
});

/* 
删除用户
|参数		|是否必选 |类型     |说明
|userId     |Y       |string   |用户ID
*/
router.post('/user/delete',async (ctx,next)=>{
    let {userId} = ctx.request.body;
});


module.exports = router;
