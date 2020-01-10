const mongoose = require('mongoose');
const config = require('../bin/dbConfig');

class DB {
    constructor(){
        this.connection;
        this.connect()

    }
    connect(){
        return new Promise((resolve,reject)=>{
            try {
                if(!this.connection){
                    this.connection = mongoose.connect(config.dbUrl + config.dbName);
                    resolve(this.connection);
                }else{
                    resolve(this.connection);
                }
            } catch (error) {
                reject('数据库连接失败');
            }  
            
            mongoose.connection.once('open',function(){
                console.log('数据库连接成功~~~');
            });
            mongoose.connection.once('close',function(){
                console.log('数据库断开连接~~~');
            });
        });
        
    }
    /* 
    tableName:集合名
    conditions:查询条件
    projecttion:投影
    options:查询选项{skip:Number,limit:Number}
    schema:约束文档
    */
    find({tableName,conditions,projecttion = null,options = null,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.find(conditions,projecttion,options,(err,docs)=>{
                        if(!err){
                            resolve(docs);
                        }else{
                            reject(err);
                        }
                    }).lean();
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    findByconditions({tableName,conditions,projecttion = null,skip = 0,limit=0,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.find(conditions,projecttion,(err,docs)=>{
                        if(!err){
                            resolve(docs);
                        }else{
                            reject(err);
                        }
                    }).skip(skip).limit(limit);
                })
            } catch (error) {
                reject(error);
            }
        });
    }
    /* 
    tableName:集合名
    conditions:查询条件
    doc:修改后的对象
    options:查询选项{skip:Number,limit:Number}
    schema:约束文档
    */
    update({tableName,conditions,doc,options = null,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.updateMany(conditions,doc,options,(err)=>{
                        if(!err){
                            resolve("1");
                        }else{
                            reject(err);
                        }
                    });
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    /* 
    tableName:集合名
    doc:新增的对象
    schema:约束文档
    */
    insert({tableName,doc,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.create(doc,(err,jellybean, snickers)=>{
                        console.log(jellybean);   //添加成功的文档
                        console.log(snickers);
                        if(!err){
                            resolve(jellybean);
                        }else{
                        }
                    });
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    /* 
    tableName:集合名
    conditions:查询条件
    schema:约束文档
    */
    delete({tableName,conditions,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.remove(conditions,(err)=>{
                        if(!err){
                            resolve("success");
                        }else{
                            reject(err);
                        }
                    });
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    /* 
    tableName:集合名
    conditions:查询条件
    schema:约束文档
    */
    count({tableName,conditions,schema}){
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.count(conditions,(err,counts)=>{
                        if(!err){
                            resolve(counts);
                        }else{
                            reject(err);
                        }
                    });
                }).catch(err=>{
                    reject(err)
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
module.exports = new DB();