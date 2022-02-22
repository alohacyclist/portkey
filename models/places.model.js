const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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