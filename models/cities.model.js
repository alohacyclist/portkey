const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    places: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'Places',
    },
})

module.exports = mongoose.model('City', citySchema)