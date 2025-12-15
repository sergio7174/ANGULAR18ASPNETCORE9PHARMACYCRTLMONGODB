const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostcreateProduct,
    GetListAllProducts,
    GetdeleteProductCtrl,
    PutupdateProductCtrl,
    GetSingleProductCtrl,
    GetincreaseProductQuantityCtrl,
    PutdecreaseProductQuantityCtrl, } = require('../controllers/productController');
  

router.post('/',upload.single("image"), PostcreateProduct);
router.get('/listAll', GetListAllProducts);
//delete Product route
router.delete('/delete-product/:id', GetdeleteProductCtrl);


//updateProduct route
router.put('/update-product/:id', PutupdateProductCtrl); 

//getSingleProduct route
router.get('/get-single-product/:id', GetSingleProductCtrl);

//increaseProductQuantityCtrl
router.put('/increase-product-quantity/:id', GetincreaseProductQuantityCtrl);

//decreaseProductQuantityCtrl
router.put('/decrease-product-quantity/:id', PutdecreaseProductQuantityCtrl);

module.exports = router;