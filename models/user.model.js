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
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fsearch%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw1DVoOYFMVv72l8Qcfo87HC&ust=1644938812129000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjVyd7A__UCFQAAAAAdAAAAABAD'
    },
    googleId: {
        type: String,
        unique: true,
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