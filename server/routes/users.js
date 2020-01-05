var router = require('koa-router')();
let db = require('../utils/db');
let userModel = require('../Models/UserModel');

router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/bar', function *(next) {

  this.body = 'this is a users/bar response!';
});

router.get('/test',async function (ctx,next){
  console.log(next);
  let a = {}
  await db.find({tableName:'users',conditions:{username:"admin"},schema:userModel}).then((value)=>{
    a.body = value;
  }).catch((err)=>{
    this.body = err;
  });
  this.body = a;
});
module.exports = router;
