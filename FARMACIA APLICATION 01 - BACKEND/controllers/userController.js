const 

UserModel = require('../models/User'),
bcrypt = require("bcrypt"),
salt = bcrypt.genSaltSync(10);

  


exports.GetAllUsers = async(req, res) => {

    console.log ("Estoy en userController - getAllUsers - line 7 - ");

    const AllUsers = await UserModel.find({});
        try {

        if (AllUsers) 
            {   console.log ("Estoy en authcontroller - getAllUsers - line 12 - AllUsers: "+AllUsers);
                res.status(200).send({AllUsers})}
         else { res.status(500).send({ message: 'Register api issue, Users not found .. !'});
}}catch (error) {
    console.log(error);
    res.status(500).send({ message: `Register api issue : ${error.message}`.bgRed.black, error })}}
    
// function to delete an User



// Function to get all not admin users
exports.GetAllUsersNotAdmin = async(req, res) => {

    console.log ("Estoy en userController - getAllUsers - line 7 - ");

    const AllUsersNotAdmin = await UserModel.find({ isAdmin: 'false' });
        try {

        if (AllUsersNotAdmin) 
            {   console.log ("Estoy en authcontroller - getAllAdmin - line 106 - AllUsersNotAdmin: "+AllUsersNotAdmin);
                res.status(200).send({AllUsersNotAdmin: UserModel})}
         else { res.status(500).send({ message: 'Register api issue, Users not found .. !'});
}}catch (error) {
    console.log(error);
    res.status(500).send({ message: `Register api issue : ${error.message}`.bgRed.black, error })}}
    
// function to delete an User

exports.GetdeleteUserCtrl= async(req, res) => {
    
    console.log("Estoy en UserController - line 43 - GetDeleteUserCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await UserModel.findByIdAndDelete(req.params.id);
        console.log("Estoy en UserController - line 49 - GetDeleteUserCtrl - User Deleted Successfully ");
        res.status(200).send({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete User api issue : ${error}`, error })
    }
    
}
// End of block function to delete a User

// function to edit an User

exports.PutupdateUserCtrl= async(req, res) => {

    console.log("Estoy en UserController - line 63 - PutupdateUserCtrl - req.params.id: "+req.params.id);

        await UserModel.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const ProductToUpdate = { req.body }, etc.....    

    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
            
             }, { new: true }).then(updatedUser => {
          
                if (updatedUser) {

            console.log('User updated successfully:', updatedUser);
            
            res.status(200).send({ message: 'User updated successfully',  updatedUser })
          } else {
            res.status(200).send({ message: 'User Not updated successfully'})
            console.log('User not found');
          }
        })
        .catch(error => {
          console.error('Error updating User:', error);
        })    
    } 
    
// function to get a simple Product
exports.GetSingleUserCtrl= async(req, res) => {

    try {
        
        console.log("Estoy en GetSingleUserCrtl - line 96 - req.params.id: "+req.params.id);

        const User = await UserModel.findById({ _id: req.params.id });
       
        console.log("Estoy en GetSingleUserCrtl - line 106 - User: "+User);

         

        res.status(200).send({ message: 'Single Category Fetched Successfully', User })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `get single Category api issue : ${error}`, error })
    } } // End of Get simgle Category by id



