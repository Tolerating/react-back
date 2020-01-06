const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({    
    parentId:{type:String,required:true},
    name:String   
});

module.exports = categorySchema;