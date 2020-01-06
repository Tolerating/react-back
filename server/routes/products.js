const router = require('koa-router')();
router.prefix('/manage');

/* 
获取商品分页列表
|参数		|是否必选 |类型     |说明
|pageNum    |Y       |Number   |页码
|pageSize   |Y       |Number   |每页条目数
*/
router.get('/product/list',function* (next){
    let {pageNum,pageSize} = this.query;
});

/* 
根据ID/Name搜索产品分页列表
|参数		|是否必选 |类型     |说明
|pageNum       |Y       |Number   |页码
|pageSize      |Y       |Number   |每页条目数
|productName   |N       |String   |根据商品名称搜索
|productDesc   |N       |String   |根据商品描述搜索
*/
router.get('/product/list',function* (next){
    let {pageNum,pageSize,productName,productDesc} = this.query;
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
router.post('/product/update',function* (next){
    let {productId,status} = this.request.body;
});
module.exports = router