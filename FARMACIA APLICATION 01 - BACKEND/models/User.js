const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
   
    fullName: { type: String},
    email: { type: String },
    password: { type: String },
    isAdmin: { type: String, default: 'false' },
    timestamps: {type: Boolean, default: true}

})

const User = mongoose.model('User', userSchema)

module.exports = User;