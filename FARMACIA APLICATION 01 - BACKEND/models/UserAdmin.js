const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userAdminSchema = new Schema({
    username: { type: String},
    email: { type: String },
    password: { type: String },
    isAdmin: { type: String, default: 'true' },
    timestamps: {type: Boolean, default: true}

})

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema)

module.exports = UserAdmin;