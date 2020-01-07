const router = require('koa-router')();
const mongoose = require('mongoose');
const db = require('../utils/db');
const ProductsSchema = require('../Models/ProductModel');
router.prefix('/manage');

/* 
获取商品分页列表
|参数		|是否必选 |类型     |说明
|pageNum    |Y       |Number   |页码
|pageSize   |Y       |Number   |每页条目数
*/
router.get('/product/list',function* (next){
    let count = yield db.count({tableName:'products',conditions:{},schema:ProductsSchema}).then(val=>{
        return val;
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
    let {pageNum,pageSize} = this.query;
    yield db.find({tableName:'products',conditions:{},options:{skip:(pageNum-1)*pageSize,limit:Number(pageSize)},schema:ProductsSchema}).then(val=>{
        this.body = {
            "status": 0,
            "data": {
                "pageNum": pageNum,
                "total": count,
                "pages": Math.ceil(count/pageSize),
                "pageSize": pageSize,
                "list": val
            }
        }
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
});

/* 
根据ID/Name搜索产品分页列表
|参数		|是否必选 |类型     |说明
|pageNum       |Y       |Number   |页码
|pageSize      |Y       |Number   |每页条目数
|productName   |N       |String   |根据商品名称搜索
|productDesc   |N       |String   |根据商品描述搜索

$regex表示一个正则表达式，匹配了key
$or为模糊查询  格式:$or:[{name:{$regex: String(key),$options: '$i'}},{}....]

*/
router.get('/product/search',function* (next){
    let {pageNum,pageSize,productName = null,productDesc = null} = this.query;
    let condition = {};
    // let query = new RegExp(searchName,'i');
    if(productName){
        condition = {$or: [{"name": {$regex: String(productName)}}]};
    }else{
        condition = {$or: [{"desc": {$regex: String(productDesc)}}]};
    }
    let count = yield db.count({tableName:'products',conditions:condition,schema:ProductsSchema}).then(val=>{
        return val;
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
    yield db.find({tableName:'products',conditions:condition,options:{skip:(pageNum-1)*pageSize,limit:Number(pageSize)},schema:ProductsSchema}).then(val=>{
        this.body={
            "status": 0,
            "data": {
                "pageNum": pageNum,
                "total": count,
                "pages": Math.ceil(count/pageSize),
                "pageSize": pageSize,
                "list": val
            }
        }
    }).catch(err=>{
        this.body = {
            "status": 1,
            "msg":err.message
        }
    });
});

/* 
添加商品
|参数		|是否必选 |类型     |说明
|categoryId    |Y       |string   |分类ID
|pCategoryId   |Y       |string   |父分类ID
|name          |Y       |string   |商品名称
|desc          |N       |string   |商品描述
|price         |N       |string   |商品价格
|detail        |N       |string   |商品详情
|imgs          |N       |array   |商品图片名数组
*/
router.post('/product/add',function* (next){
    let {pacategoryId,pCategoryId,name,desc,price,detail,imgs} = this.request.body;
});

/* 
更新商品
|参数		|是否必选 |类型     |说明
|_id           |Y       |string   |商品ID
|categoryId    |Y       |string   |分类ID
|pCategoryId   |Y       |string   |父分类ID
|name          |Y       |string   |商品名称
|desc          |N       |string   |商品描述
|price         |N       |string   |商品价格
|detail        |N       |string   |商品详情
|imgs          |N       |array   |商品图片名数组
*/
router.post('/product/update',function* (next){
    let {_id,categoryId,pCategoryId,name,desc,price,detail,imgs} = this.request.body;
});

/* 
对商品进行上架/下架处理
|参数		|是否必选 |类型     |说明
|productId    |Y       |string   |商品名称
|status       |Y       |number   |商品状态值
*/
router.post('/product/updateStatus',function* (next){
    let {productId,status} = this.request.body;
    yield db.update({tableName:'products',conditions:{_id:productId},doc:{$set:{status}},schema:ProductsSchema}).then(val=>{
        this.body={
            "status": 0
        }
    }).catch(err=>{
        this.body={
            "status": 1
        }
    });
});
module.exports = router