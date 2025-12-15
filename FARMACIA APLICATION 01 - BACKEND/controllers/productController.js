const 

Product = require('../models/Product'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');


// function to create product
exports.PostcreateProduct = async(req, res) => {

   
   console.log("Estoy en productController - line 13 - PostcreateProduct  ");

    const GetProductParams = new Product({
       
        
    name : req.body.name, //Nombre del producto
    product_code : req.body.product_code, //Código del producto
    description : req.body.description, //descripción del producto
    purchase_price: req.body.purchase_price, // Precio del producto
    selling_price: req.body.selling_price, // Precio del producto
    current_stock: req.body.current_stock, // Stock
    supplier: req.body.supplier, // Referencia a la tabla de proveedores
    expiration_date: req.body.expiration_date, // Fecha de caducidad
    lot_number: req.body.lot_number, // Lote
    storage_location: req.body.storage_location, // Lugar de almacenamiento
    nutritional_information: req.body.nutritional_information, // Información nutricional
    notes: req.body.notes, //Notas
    category: req.body.category,  //Referencia a la tabla de categorías
    created_at: new(Date), // Fecha de creación
    updated_at: new(Date), // Fecha de actualizacion
        
    });


    const NewProduct = new Product(GetProductParams);
    NewProduct.save();

    console.log("Estoy en productController - line 40 - PostcreateProduct  - NewProduct: "+NewProduct);

    return res.status(200).json({NewProduct, message: "Product Created Successfully .."})

}

// function to list all products
exports.GetListAllProducts = async(req, res) => {

    console.log("Estoy en productController - line 49 - GetListAllProducts");
        
            try {
                const products = await Product.find({}).limit(12).sort({ createdAt: -1 });

               //console.log("Estoy en productController - line 54 - GetListAllProducts: "+products) 

                res.status(200).send({ message: 'All products fetched successfully', total: products.length, products })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all products api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all products

// function to delete a product

exports.GetdeleteProductCtrl= async(req, res) => {
    
    console.log("Estoy en productController - line 84 - GetDeleteProductCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Product Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete product api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Product

// function to Edit a Saved product

exports.PutupdateProductCtrl= async(req, res) => {

    

    console.log("Estoy en productController - line 92 - PutupdateProductCtrl - req.params.id: "+req.params.id);

        await Product.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const ProductToUpdate = { req.body }, etc.....

    name : req.body.name, //Nombre del producto
    product_code : req.body.product_code, //Código del producto
    description : req.body.description, //descripción del producto
    purchase_price: req.body.purchase_price, // Precio del producto
    selling_price: req.body.selling_price, // Precio del producto
    current_stock: req.body.current_stock, // Stock
    supplier: req.body.supplier, // Referencia a la tabla de proveedores
    expiration_date: req.body.expiration_date, // Fecha de caducidad
    lot_number: req.body.lot_number, // Lote
    storage_location: req.body.storage_location, // Lugar de almacenamiento
    nutritional_information: req.body.nutritional_information, // Información nutricional
    notes: req.body.notes, //Notas
    category: req.body.category,  //Referencia a la tabla de categorías
    updated_at: new(Date), // Fecha de actualizacion 
            
             }, { new: true })

            .then(updatedProduct => {
          if (updatedProduct) {
            console.log('Product updated successfully:', updatedProduct);
            res.status(200).send({ message: 'Product updated successfully',  updatedProduct })
          } else {
            res.status(200).send({ message: 'Product Not updated successfully'})
            console.log('User not found');
          }
        })
        .catch(error => {
          console.error('Error updating Product:', error);
        })    
    } 
    
  // function to get a simple product
    exports.GetSingleProductCtrl= async(req, res) => {

        try {
            console.log("Estoy en GetSingleProductCrtl - line 127 - req.params.id: "+req.params.id);
            const product = await Product.findById({ _id: req.params.id });
           
            console.log(product);

            res.status(200).send({ message: 'Single Product Fetched Successfully', product })
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `get single product api issue : ${error}`, error })
        } } // End of Get simgle product by id
    
// function to increase product from Cart component
exports.GetincreaseProductQuantityCtrl= async(req, res) => {

    console.log("Estoy en GetincreaseProductQuantityCtrl - line 141 - req.params.id:"+req.params.id);

    try {
        const product = await Product.findOne({ _id: req.params.id });
        const productQuantity = product.avalibleCount;
        const updatedProductQuantity = productQuantity + 1;
        const updatedProduct = await Product.findByIdAndUpdate(product._id, { avalibleCount: updatedProductQuantity },{ new: true });
        await updatedProduct.save();

        res.status(200).send({ message: 'Quantity increased successfully', updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `increaseProductQuantityCtrl filter api issue : ${error}`, error })
    }

}
       
exports.PutdecreaseProductQuantityCtrl= async(req, res) => {

    console.log("Estoy en PutdecreaseProductQuantityCtrl - line 159 - req.params.id:"+req.params.id);
    
    const Elementcount = req.body.quantity;

    console.log("Estoy en putdecreaseProductQuantityCtrl - line 163 - Elementcount:"+Elementcount);

    try {
        const product = await Product.findOne({ _id: req.params.id });
        const productQuantity = product.current_stock;

        console.log("Estoy en putdecreaseProductQuantityCtrl - line 170 - productQuantity:"+productQuantity);


        const updatedProductQuantity = productQuantity - Elementcount;

        if (productQuantity<=0){console.log("There is not Product");
            res.status(200).send({ message: `There is not Product` })} else {
        // console.log(updatedProductQuantity);
        const updatedProduct = await Product.findByIdAndUpdate(product._id, { current_stock: updatedProductQuantity },{ new: true })
        .then(updatedProduct => {
           
            console.log("Estoy en putdecreaseProductQuantityCtrl - line 177 - updatedProduct._id:"+updatedProduct._id);


            if (updatedProduct) {
              console.log('Product updated successfully:', updatedProduct);
              res.status(200).send({ message: 'Product updated successfully',  updatedProduct })
            } else {
              res.status(200).send({ message: 'Product Not updated successfully'})
              console.log('User not found');
            }
          })
        }}catch (error) {
            console.log(error);
            res.status(200).send({ message: `increaseProductQuantityCtrl filter api issue : ${error}`, error })
        }
    
    
    
    }


        //await updatedProduct.save();

        /*console.log("Estoy en putdecreaseProductQuantityCtrl - line 176 - updatedProduct - Quantity decreased successfully: "+updatedProduct._id);

        res.status(200).send({ message: 'Quantity decreased successfully', updatedProduct });
    }} catch (error) {
        console.log(error);
        res.status(200).send({ message: `decreaseProductQuantityCtrl filter api issue : ${error}`, error })
    }*/


