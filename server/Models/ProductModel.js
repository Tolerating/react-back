const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    status:{type:String,required:true},
    imgs:{type:Array,required:true},
    name:String,
    desc:String,
    price:Number,
    pCategoryId:String,
    categoryId:String,
    detail:String
});
module.exports = productSchema;