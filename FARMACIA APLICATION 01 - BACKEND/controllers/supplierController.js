const 

Supplier = require('../models/supplier'),
dotenv=require('dotenv');


// function to create Supplier
exports.PostcreateSupplier = async(req, res) => {

   
   console.log("Estoy en SupplierController - line 13 - name: "+ req.body.name);
   console.log("Estoy en SupplierController - line 14 - address: "+ req.body.address);
   console.log("Estoy en SupplierController - line 15 - phone: "+ req.body.phone);

    const GetSupplierParams = new Supplier({
        
        name:    req.body.name,
        address: req.body.address,
        phone:   req.body.phone,
         
    });


    const NewSupplier = new Supplier(GetSupplierParams);
    NewSupplier.save();
    return res.status(200).send({NewSupplier: NewSupplier, message: "Supplier Created Successfully .."})
}

// function to list all Suppliers
exports.GetListAllSuppliers = async(req, res) => {

    console.log("Estoy en SupplierController - line 32 - GetListAllSuppliers");
        
            try {
                const Suppliers = await Supplier.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en SupplierController - line 36 - GetListAllSuppliers: "+Suppliers); 

                res.status(200).send({ message: 'All Suppliers fetched successfully', total: Suppliers.length, Suppliers })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all Suppliers api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all Suppliers

// function to delete a Supplier

exports.GetdeleteSupplierCtrl= async(req, res) => {
    
    console.log("Estoy en SupplierController - line 54 - GetDeleteSupplierCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await Supplier.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Supplier Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete Supplier api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Supplier

// function to Edit a Saved Supplier

exports.PutupdateSupplierCtrl= async(req, res) => {

    console.log("Estoy en SupplierController - line 74 - PutupdateSupplierCtrl - req.params.id: "+req.params.id);

        await Supplier.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const SupplierToUpdate = { req.body }, etc.....

            name:req.body.name,
            address: req.body.address,
            phone:   req.body.phone,
             
             }, { new: true })

            .then(updatedSupplier => {
          if (updatedSupplier) {

            console.log('Supplier updated successfully:', updatedSupplier);
            
            res.status(200).send({ message: 'Supplier updated successfully',  updatedSupplier })
          } else {
            res.status(200).send({ message: 'Supplier Not updated successfully'})
            console.log('Supplier not found');
          }
        })
        .catch(error => {
          console.error('Error updating Supplier:', error);
        })    
    } 
    
  // function to get a simple Supplier
    exports.GetSingleSupplierCtrl= async(req, res) => {

        try {
            
            console.log("Estoy en GetSingleSupplierCrtl - line 107 - req.params.id: "+req.params.id);

            const supplier = await Supplier.findById({ _id: req.params.id });
           
            console.log(supplier);

            res.status(200).send({ message: 'Single Supplier Fetched Successfully', supplier })
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `get single Supplier api issue : ${error}`, error })
        } } // End of Get simgle Supplier by id