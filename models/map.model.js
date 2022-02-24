const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema({
    xy: [Number],
})

module.exports = mongoose.model('Map', mapSchema)