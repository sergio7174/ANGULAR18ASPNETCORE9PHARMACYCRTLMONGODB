const mongoose = require('mongoose'),
{ Schema } = require('mongoose');

const categorySchema = new Schema({

    name:{type:String},
    image:{type:String},


});
const Category = mongoose.model('Category', categorySchema)

module.exports = Category;