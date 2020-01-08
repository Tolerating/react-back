const router = require('koa-router')();
let db = require('../utils/db');
let userModel = require('../Models/UserModel');

/* 
用户登录
*/
router.post('/login',async (ctx,next)=>{
    let {username,password} = ctx.request.body;
    await db.find({tableName:'users',conditions:{username,password},schema:userModel}).then((value)=>{
        console.log(value);
        if(value.length == 0){
            return ctx.body = {
                "status": 1,
                "msg": "用户名或密码不正确!"
            }
        }else{
            return ctx.body = {
                "status": 0,
                "data": value
            };
        }
    }).catch((err)=>{
        return ctx.body = err;
    });
});

module.exports = router









