const 

Sale = require('../models/Sale'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');

// function to create sale
exports.PostcreateSales = async(req, res) => {

    console.log("Estoy en saleController - line 11 - PostcreateSale  ");
    console.log("Estoy en saleController - line 12 - PostcreateSale - req.body.sales_details: "+req.body.sales_details);

    const GetSaleParams = new Sale({
       
        
    name : req.body.name,
    client_CI : req.body.client_CI,
    phone : req.body.phone, 
    products_details: req.body.sales_details,
    seller_name: req.body.seller_name, 
    amount_sold: req.body.amount_sold,
    quantity_sold: req.body.quantity_sold,
    Date_created: new(Date), 
        
    });

    const NewSale = new Sale(GetSaleParams);
    NewSale.save();

    console.log("Estoy en saleController - line 30 - PostcreateSale  - NewSale: "+NewSale);

    return res.status(200).json({NewSale, message: "Sale Created Successfully .."})
}


// function to list all sales
exports.GetAllSalesList = async(req, res) => {

    console.log("Estoy en saleController - line 39 - GetListAllsales");
        
            try {
                const sales = await Sale.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en saleController - line 44 - GetListAllsales: "+sales) 

                res.status(200).send({ message: 'All sales fetched successfully', total: sales.length, sales })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all sales api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all sales

// function to delete a sale

exports.GetdeleteSaletCtrl= async(req, res) => {
    
    console.log("Estoy en saleController - line 61 - GetDeletesaleCtrl - id: "+req.params.id);

   
    try {
        const sale = await sale.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'sale Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete sale api issue : ${error}`, error })
    }
    
}
// End of block function to delete a sale

 // function to get a simple sale
 exports.GetSingleSaleCtrl= async(req, res) => {

    try {
        console.log("Estoy en GetSinglesaleCrtl - line 80 - req.params.id: "+req.params.id);
        const sale = await sale.findById({ _id: req.params.id });
       
        console.log(sale);

        res.status(200).send({ message: 'Single sale Fetched Successfully', sale })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `get single sale api issue : ${error}`, error })
    } } // End of Get simgle sale by id

