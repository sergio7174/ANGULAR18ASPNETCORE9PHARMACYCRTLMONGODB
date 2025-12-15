const 

User = require('../models/User'),
dotenv=require('dotenv'),
jwt= require('jsonwebtoken'),
bcrypt = require("bcrypt");

dotenv.config();

process.env.TOKEN_KEY = "Sergio";
process.env.TOKEN_EXPIRY = new Date().setDate(new Date().getDate() + 1)

exports.signUp = async(req, res) => {

    try {

    console.log('Estoy en authController - line 11 - signUp controller - body',req.body)

    if (!(req.body.email && req.body.password)) {
        return res.status(200).json({ message: 'Email and password not present' })
        //return res.status(400).json({ message: 'Email and password not present' })
    }

    const emailExists = await User.findOne({ email: req.body.email });

    console.log("Estoy en  authController - line 26 - emailExists:  "+ emailExists);


    if (emailExists) {

        console.log("Estoy en  authController -Dentro de emailExist- line 25 - emailExists:  "+ emailExists);

        return res.status(200).json({ message: 'Email already exits' })
        //return res.status(400).json({ message: 'Email already exits' })
    }

       /** changing the password to save it with cripto*/
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

    const newUser = new User(req.body)
    newUser.save()

    //return res.status(200).send({ success: true, message: 'Register Successful' })
    
    return res.status(200).json({newUser, message: 'User Register Successfully ..'})
} catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register api issue : ${error.message}`.bgRed.black, error })
}
}

exports.login = async(req, res) => {
    

    //console.log('body',req.body)
    console.log('Estoy en authController - line 58 - login controller - query: '+req.query)
    
    const email = req.body.email;
    const password = req.body.password;

    console.log("Estoy en authcontroller - login - line 63, email: "+email);
    console.log("Estoy en authcontroller - login - line 64, password: "+password);
    
    const user = await User.findOne({ email })

    if (!user) {
      
        console.log ("Estoy en authcontroller - login - line 71 - not user");
        return res.status(200).json({ message: "User does not exists" })

        //return res.status(409).json({ message: "User does not exists" })
      
    }
   // the compare function needs the await command to work ..
    const isMatchedPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isMatchedPassword) {

            console.log("Estoy en authController - login - line 80 - mensajeNotOk: Invalid Credentials .....")

            return res.status(200).send({ message: 'Invalid Credentials!, Incorrect Password ..' });
        }
    
        
        //return res.status(200).send({ success: true, message: 'Login Successful', token, user })
        //console.log ("Estoy en authcontroller - login - line 88 - user - login successful")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" })
        return res.status(200).json({ user: user, token: token, message: 'Login Successful' })
}

const UserModel = require('../models/User')



exports.getAllAdmin = async(req, res) => {

    console.log ("Estoy en authcontroller - getAllAdmin - line 100 - ");

    const haveAdmin = await UserModel.find({ isAdmin: 'true' });
        try {

        if (haveAdmin) 
            {   console.log ("Estoy en authcontroller - getAllAdmin - line 106 - haveAdmin: "+haveAdmin);
                res.status(200).send({haveAdmin: UserModel})}
         else { res.status(500).send({ message: 'Register api issue, IsAdmin not found .. !'});
}}catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register api issue : ${error.message}`.bgRed.black, error })

} 

}       