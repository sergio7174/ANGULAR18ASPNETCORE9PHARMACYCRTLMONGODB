const mongoose = require('mongoose'),
{ Schema } = require('mongoose');

const supplierSchema = new Schema({

    name:{type:String},
    address:{type:String}, // Dirección del proveedor
    phone:{type:String},  // Telefono del proveedor


});
const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier;