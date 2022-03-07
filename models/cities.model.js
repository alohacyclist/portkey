const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    country: {
        type: String,
    },
    geonameid: {
        type: Number,
    },
    name: { 
        type: String,
    },
    subcountry: {
        type: String,
    },
    places: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'Places'
    },
    posts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'Post'
    }
})

module.exports = mongoose.model('City', citySchema)