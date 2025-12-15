const mongoose = require('mongoose'),
{ Schema } = require('mongoose');

const saleSchema = new Schema({

    name: {type: String} , //Client Name
    client_CI: {type: String} , //Client CI
    phone: {type: String} , // Client Phone
    products_details: {type: String},
    seller_name: {type: String},
    amount_sold: {type: Number},
    quantity_sold: {type: Number},
    Date_created: {type: Date},
});
const Sale = mongoose.model('Sale', saleSchema)

module.exports = Sale;