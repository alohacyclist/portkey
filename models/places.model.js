const mongoose = require('mongoose')

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
    }

})

module.exports = mongoose.model('Places', placeSchema)