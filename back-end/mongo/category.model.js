//Kết nối collection category
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId =Schema.ObjectId


//khai báo các field
const categorySchema = new Schema({
    name:{type:String, require: true},
    description:{type:String, require: true},
    image:{type:String, require: true},

})
module.exports = mongoose.models.category || mongoose.model('category',categorySchema) //kiểm tra xem có category chưa