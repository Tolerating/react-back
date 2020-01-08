const router = require('koa-router')();
const CategorySchema = require('../Models/CategoryModel');
const db = require('../utils/db');
router.prefix('/manage');

/* 
获取一级或某个二级分类列表
|参数		|是否必选 |类型     |说明
|parentId    |Y       |string   |父级分类的ID
*/
router.get('/category/list',async (ctx,next)=>{
    let {parentId} = ctx.query;
    await db.find({tableName:'categories',conditions:{parentId},schema:CategorySchema}).then(val=>{
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
添加分类
|参数		|是否必选 |类型     |说明
|parentId      |Y       |string   |父级分类的ID
|categoryName  |Y       |string   |名称
*/
router.post('/category/add',async (ctx,next)=>{
    let {parentId,categoryName} = ctx.request.body;
    await db.insert({tableName:'categories',doc:{parentId:parentId,name:categoryName},schema:CategorySchema}).then(()=>{
        return ctx.body = {
            "status": 0
        }
    }).catch(err=>{
        return ctx.body = {
            "status": 1,
            "msg":err.message
        }
    });
});


/* 
更新品类名称
|参数		|是否必选 |类型     |说明
|categoryId    |Y       |string   |父级分类的ID
|categoryName  |Y       |string   |名称
*/
router.post('/category/update',async (ctx,next)=>{
    let {categoryId,categoryName} = ctx.request.body;
    await db.update({tableName:'categories',conditions:{_id:categoryId},doc:{$set:{name:categoryName}},schema:CategorySchema}).then(()=>{
        return ctx.body = {
            "status": 0
        }
    }).catch(err=>{
        return ctx.body={
            "status": 1,
            "msg":err.message
        }
    });
});

/* 
根据分类ID获取分类
|参数		|是否必选 |类型     |说明
|categoryId    |Y       |string   |父级分类的ID
*/
router.get('/category/info',async (ctx,next)=>{
    let {categoryId} = ctx.query;
    await db.find({tableName:'categories',conditions:{_id:categoryId},schema:CategorySchema}).then(val=>{
        console.log(val);
        return ctx.body={
            "status": 0,
            "data": val[0]
        }
    }).catch(err=>{
        return ctx.body={
            "status": 1,
            "msg": err.message
        }
    });
});
module.exports = router