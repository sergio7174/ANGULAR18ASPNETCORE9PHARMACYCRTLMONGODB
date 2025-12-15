const 

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostcreateSupplier,
    GetListAllSuppliers,
    GetdeleteSupplierCtrl,
    PutupdateSupplierCtrl,
    GetSingleSupplierCtrl,
    
     } = require('../controllers/supplierController');
  

  router.post('/', PostcreateSupplier);

  router.get('/listAll', GetListAllSuppliers);
//delete Supplier route
  router.delete('/delete-Supplier/:id', GetdeleteSupplierCtrl);

//updateSupplier route
  router.put('/update-Supplier/:id', PutupdateSupplierCtrl); 

//getSingleSupplier route
  router.get('/get-single-Supplier/:id', GetSingleSupplierCtrl);


module.exports = router;