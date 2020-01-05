const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

const userSchema = new mongoose.Schema({    
    name:{type:String,required:true}, //角色名称 
    auth_time:String,    //授权时间
    auth_name:String,         //授权人
    create_time:{type:Number,default:Date.now}, //创建时间
    menus:{type:Array,required:true},
});

const UserModel = mongoose.model('role',userSchema);