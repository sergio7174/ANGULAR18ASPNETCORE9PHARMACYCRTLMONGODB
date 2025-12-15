const 

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostcreateSales,
    GetAllSalesList,
    GetdeleteSaletCtrl,
    GetSingleSaleCtrl,

    } = require('../controllers/saleController');
  
// route to create sales
router.post('/', PostcreateSales);

    // List all sales 
router.get('/listAllSales', GetAllSalesList);

//delete Sale route
router.delete('/delete-sale/:id', GetdeleteSaletCtrl);

//get Single Sale route
router.get('/get-single-sale/:id', GetSingleSaleCtrl);


module.exports = router;