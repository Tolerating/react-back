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
router.get('/product/list',async (ctx,next)=>{
    let count = await db.count({tableName:'products',conditions:{},schema:ProductsSchema}).then(val=>{
        return val;
    }).catch(err=>{
        return ctx.body = {
            "status": 1,
            "msg":err.message
        }
    });
    let {pageNum,pageSize} = ctx.query;
    await db.find({tableName:'products',conditions:{},options:{skip:(pageNum-1)*pageSize,limit:Number(pageSize)},schema:ProductsSchema}).then(val=>{
        return ctx.body = {
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
        return ctx.body = {
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
router.get('/product/search',async (ctx,next)=>{
    let {pageNum,pageSize,productName = null,productDesc = null} = ctx.query;
    let condition = {};
    // let query = new RegExp(searchName,'i');
    if(productName){
        condition = {$or: [{"name": {$regex: String(productName)}}]};
    }else{
        condition = {$or: [{"desc": {$regex: String(productDesc)}}]};
    }
    let count = await db.count({tableName:'products',conditions:condition,schema:ProductsSchema}).then(val=>{
        return val;
    }).catch(err=>{
        return ctx.body = {
            "status": 1,
            "msg":err.message
        }
    });
    await db.find({tableName:'products',conditions:condition,options:{skip:(pageNum-1)*pageSize,limit:Number(pageSize)},schema:ProductsSchema}).then(val=>{
        return ctx.body={
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
        return ctx.body = {
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
router.post('/product/add',async (ctx,next)=>{
    // console.log(ctx.request.body);
    let {name,desc,price,imgs,detail,pCategoryId,categoryId} = ctx.request.body;
    await db.insert({tableName:'products',doc:{name,desc,price,imgs,detail,pCategoryId,categoryId,status:1},schema:ProductsSchema}).then(val=>{
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
router.post('/product/update',async (ctx,next)=>{
    let {_id,name,desc,price,imgs,detail,pCategoryId,categoryId} = ctx.request.body;
    await db.update({tableName:'products',conditions:{_id},doc:{$set:{name,desc,price,imgs,detail,pCategoryId,categoryId}},schema:ProductsSchema}).then(val=>{
        return ctx.body={
            "status": 0
        }
    }).catch(err=>{
        return ctx.body={
            "status": 1
        }
    });
});

/* 
对商品进行上架/下架处理
|参数		|是否必选 |类型     |说明
|productId    |Y       |string   |商品名称
|status       |Y       |number   |商品状态值
*/
router.post('/product/updateStatus',async (ctx,next)=>{
    let {productId,status} = ctx.request.body;
    await db.update({tableName:'products',conditions:{_id:productId},doc:{$set:{status}},schema:ProductsSchema}).then(val=>{
        return ctx.body={
            "status": 0
        }
    }).catch(err=>{
        return ctx.body={
            "status": 1
        }
    });
});
module.exports = router