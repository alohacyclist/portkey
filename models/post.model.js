const mongoose = require('mongoose')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
    },
    sanitizedHtml: {
        type: String,
        required: true,
    } 
})
postSchema.pre('validate', function (next) {
    if (this.description) {
      // sanitize html and save it in the post
      this.sanitizedHtml = dompurify.sanitize(marked.parse(this.content))
    }
    // update the updated date whenever we change something in the post
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model('Post', postSchema)