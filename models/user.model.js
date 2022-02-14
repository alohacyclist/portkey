const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: { type: String,
    },
    email: {
        type: String,
        required: true,
    },
    picture: { type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fsearch%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw1DVoOYFMVv72l8Qcfo87HC&ust=1644938812129000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjVyd7A__UCFQAAAAAdAAAAABAD'
    },
    googleId: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
})

module.exports = mongoose.model('User', userSchema)