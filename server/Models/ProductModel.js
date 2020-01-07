const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    status:{type:Number,required:true},
    imgs:{type:Array,required:true},
    name:String,
    desc:String,
    price:Number,
    pCategoryId:String,
    categoryId:String,
    detail:String
});
module.exports = productSchema;