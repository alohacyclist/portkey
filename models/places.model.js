const mongoose = require('mongoose')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String
    },
    image: {
        type: String
    },
    placeType: {
        type: String,
        options: ['Attractions', 'Food & Drink', 'Hotels', 'Other'],
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
        ref: 'Author' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    sanitizedHtml: {
        type: String,
        required: true,
    } 
})
// before saving to the database
placeSchema.pre('validate', function (next) {
    if (this.description) {
      // sanitize html and save it in the post
      this.sanitizedHtml = dompurify.sanitize(marked.parse(this.description))
    }
    // update the update date whenever we change something in the post
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model('Places', placeSchema)