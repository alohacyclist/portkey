const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: String,
    googleId: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
})

module.exports = mongoose.model('User', userSchema)