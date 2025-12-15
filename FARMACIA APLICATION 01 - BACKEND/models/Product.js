const mongoose = require('mongoose'),
{ Schema } = require('mongoose');

const productSchema = new Schema({

    name:{type :String},
    product_code:{type :String},
    description:{type: String},
    purchase_price: {type: Number},
    selling_price: {type: Number},
    current_stock: {type: Number},
    initial_stock: {type: Number},
    supplier: {type: String},
    nutritional_information: {type: String},
    notes: {type: String},
    create_at: {type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() },
    create_by_user_id: { type: String},
    last_update_by_user_id: {type: String},
    category: {type: String},
    storage_location: {type: String},
    expiration_date: {type: Date},
    lot_number: {type: String}
});
const Product = mongoose.model('Product', productSchema)

module.exports = Product;