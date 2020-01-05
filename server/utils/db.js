const mongoose = require('mongoose');
const config = require('../bin/dbConfig');

class DB {
    constructor(){
        this.connection;
        this.connect()

    }
    connect(){
        return new Promise((resolve,reject)=>{
            if(!this.connection){
                this.connection = mongoose.connect(config.dbUrl + config.dbName);
                resolve(this.connection);
            }else{
                resolve(this.connection);
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
    conditions:查询条件
    projecttion:投影
    options:查询选项
    schema:约束文档
    */
    find({tableName,conditions,projecttion = null,options = null,schema}){
        // const userSchema = new mongoose.Schema({
        //     username:{type:String,required:true},
        //     password:{type:String,required:true},
        //     phone:String,
        //     email:String,
        //     create_time:{type:Number,default:Date.now},
        //     role:Object
        // });
        
        // let userModel = mongoose.model('users',userSchema);
        // userModel.find({username:"admin"},(err,docs)=>{
        //     console.log(docs);
        // });
        return new Promise((resolve,reject)=>{
            try {
                this.connect().then(()=>{
                    let models = mongoose.model(tableName,schema);
                    models.find(conditions,projecttion,options,(err,docs)=>{
                        if(!err){
                            resolve(docs);
                        }else{
                            console.log("||");
                            reject(err);
                        }
                    });
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    update(){

    }

    insert(){

    }
}
// let test = new DB();
// test.find()
module.exports = new DB();