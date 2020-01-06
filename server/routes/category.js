const router = require('koa-router')();
const CategorySchema = require('../Models/CategoryModel');
const db = require('../utils/db');
router.prefix('/manage');

/* 
获取一级或某个二级分类列表
|参数		|是否必选 |类型     |说明
|parentId    |Y       |string   |父级分类的ID
*/
router.get('/category/list',function* (next){
    let {parentId} = this.query;
    yield db.find({tableName:'categories',conditions:{parentId},schema:CategorySchema}).then(val=>{
        this.body = {
            "status": 0,
            "data":val
        }
    }).catch(err=>{
        this.body = {
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
router.post('/category/add',function* (next){
    let {parentId,categoryName} = this.request.body;
    yield db.insert({tableName:'categories',doc:{parentId:parentId,name:categoryName},schema:CategorySchema}).then(()=>{
        this.body = {
            "status": 0
        }
    }).catch(err=>{
        this.body = {
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
router.post('/category/update',function* (next){
    let {categoryId,categoryName} = this.request.body;
    yield db.update({tableName:'categories',conditions:{_id:categoryId},doc:{$set:{name:categoryName}},schema:CategorySchema}).then(()=>{
        this.body = {
            "status": 0
        }
    }).catch(err=>{
        this.body={
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
router.get('/category/info',function* (next){
    let {userId} = this.query;
});
module.exports = router