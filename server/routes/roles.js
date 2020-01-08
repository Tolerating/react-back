const router = require('koa-router')();
router.prefix('/manage');

/* 
添加角色
|参数		|是否必选 |类型     |说明
|roleName    |Y       |string   |角色名称
*/
router.post('/role/add',async (ctx,next)=>{
    let {username,password,phone,email,role_id} = ctx.request.body;
});

/* 
获取角色列表

*/
router.get('/role/list',async (ctx,next)=>{
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

});
module.exports = router
