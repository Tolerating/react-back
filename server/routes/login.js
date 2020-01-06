const router = require('koa-router')();
let db = require('../utils/db');
let userModel = require('../Models/UserModel');

/* 
用户登录
*/
router.post('/login',async function (next){
    console.log(this.request.body);
    let {username,password} = this.request.body;
    await db.find({tableName:'users',conditions:{username,password},schema:userModel}).then((value)=>{
        console.log(value);
        if(value.length == 0){
            this.body = {
                "status": 1,
                "msg": "用户名或密码不正确!"
            }
        }else{
            this.body = {
                "status": 0,
                "data": value
            };
        }
    }).catch((err)=>{
        this.body = err;
    });
});

module.exports = router









