const 

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { 
    GetAllUsers,
    GetdeleteUserCtrl,
    PutupdateUserCtrl,
    GetSingleUserCtrl,
    GetAllUsersNotAdmin } = require('../controllers/userController');
  

// List all users Not Admin 
router.get('/listAllNotAdmin', GetAllUsersNotAdmin);
    
// List all users 
router.get('/listAll', GetAllUsers);

//delete User route
router.delete('/delete-user/:id', GetdeleteUserCtrl);

//get Single User route
router.get('/get-single-user/:id', GetSingleUserCtrl);

//update User route
router.put('/update-user/:id', PutupdateUserCtrl);


module.exports = router;