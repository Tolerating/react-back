const router = require('koa-router')();
const db = require('../utils/db');
const userSchema = require('../Models/UserModel');
const RolesSchema = require('../Models/RoleModel');
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
        return ctx.body = {
            "status":0,
            "data":val
        };
    }).catch(err =>{
        return ctx.body = {
            "status":1,
            "msg":err.message
        };
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
    let {_id,username,password,phone,email,role_id} = ctx.request.body;
    await db.update({tableName:'users',conditions:{_id},doc:{$set:{username,password,phone,email,role_id}},schema:userSchema}).then(val=>{
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

/* 
获取所有用户列表
*/
router.get('/user/list',async (ctx,next)=>{
  let {_id} = ctx.query;  
  await db.find({tableName:'users',conditions:{_id:{$ne:_id}},schema:userSchema}).then(async (users)=>{
    await db.find({tableName:'roles',conditions:{},schema:RolesSchema}).then(roles=>{
        return ctx.body={
            "status":0,
            "data":{
                "users":users,
                "roles":roles
            }
        }
    }).catch(err=>{
      return ctx.body = {
          "status":1,
          "msg":err.message
      }
    }); 
  }).catch(err=>{
      return ctx.body = {
          "status":1,
          "msg":err.message
      }
  });  
});

/* 
删除用户
|参数		|是否必选 |类型     |说明
|userId     |Y       |string   |用户ID
*/
router.post('/user/delete',async (ctx,next)=>{
    let {_id} = ctx.request.body;
    console.log(_id);
    await db.delete({tableName:'users',conditions:{_id},schema:userSchema}).then(val=>{
        return ctx.body={
            "status":0
        }
    }).catch(err=>{
        return ctx.body={
            "status":1,
            "msg":err.message
        }
    });
});


module.exports = router;
