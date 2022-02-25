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
    }
})

module.exports = mongoose.model('City', citySchema)