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
router.post('/user/add',function* (next){
    let increase = this.request.body;
    yield db.insert({tableName:'users',doc:increase,schema:userSchema}).then(val =>{
        this.body = val;
    }).catch(err =>{
        this.body = err;
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
router.post('/user/update',function* (next){
    let {_id,password,username,phone,email,role_id} = this.request.body;
});

/* 
获取所有用户列表
*/
router.get('/user/list',function* (next){
    
});

/* 
删除用户
|参数		|是否必选 |类型     |说明
|userId     |Y       |string   |用户ID
*/
router.post('/user/delete',function* (next){
    let {userId} = this.request.body;
});


module.exports = router;
