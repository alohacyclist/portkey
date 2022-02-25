const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type:String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }, 
    picture: {
        type: String
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        immutable: true,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,  
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'Comment',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    }
})

module.exports = mongoose.model('Post', postSchema)