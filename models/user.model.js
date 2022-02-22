const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    displayName: String,
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture: { 
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    }
})

module.exports = mongoose.model('User', userSchema)