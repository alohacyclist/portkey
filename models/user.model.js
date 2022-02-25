const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    picture: { 
        type: String,
        default: 'https://res.cloudinary.com/portkey/image/upload/v1645273815/profile-pictures/hp_owshdn.png'
    },
    role: {
        type: String,
        default: 'user'
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