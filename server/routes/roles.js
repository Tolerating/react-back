const router = require('koa-router')();
const RolesSchema = require('../Models/RoleModel');
const db = require('../utils/db');
router.prefix('/manage');

/* 
添加角色
|参数		|是否必选 |类型     |说明
|roleName    |Y       |string   |角色名称
*/
router.post('/role/add',async (ctx,next)=>{
    let {name} = ctx.request.body;
    let create_time = new Date().getTime();
    await db.insert({tableName:'roles',doc:{name,create_time,menus:[]},schema:RolesSchema}).then(val=>{
        return ctx.body = {
            "status": 0,
            "data":val
        }
    }).catch(err=>{
        return ctx.body = {
            "status": 1,
            "msg":err.message
        }
    });
});

/* 
获取角色列表

*/
router.get('/role/list',async (ctx,next)=>{
    await db.find({tableName:'roles',conditions:{},schema:RolesSchema}).then(val=>{
        // console.log(val)
        return ctx.body = {
            "status": 0,
            "data":val
        }
    }).catch(err=>{
        return ctx.body = {
            "status": 1,
            "msg":err.message
        }
    });
});
/* 
更新角色(给角色设置权限)
|参数		     |是否必选  |类型     |说明
|_id          |Y       |string   |角色ID
|menus        |Y       |array    |权限key数组
|auth_time    |Y       |number   |权限时间
|auth_name    |Y       |string   |权限人姓名
*/
router.post('/role/update',async (ctx,next)=>{
    const {_id,menus,auth_time,auth_name} = ctx.request.body;
    await db.update({tableName:'roles',conditions:{_id},doc:{$set:{menus,auth_time,auth_name}},schema:RolesSchema}).then(val=>{
        return ctx.body = {
            "status":0
        }
    }).catch(err=>{
        return ctx.body = {
            "status":1,
            "msg":err.message
        }
    });
});
module.exports = router
