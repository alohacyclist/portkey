const router = require('express').Router()
const Cities = require('../models/cities.model')

router.post('/search', async (req, res) => {
    const result = await Cities.find({
        $or: [
                {name: req.body.search},
                {country: req.body.search}
            ]
    })
    res.render('results', {result})
})

router.get('/:country', async (req, res) => {
    const result = await Cities.find(req.params)
    res.render('cities/all-cities', { result })
})

router.get('/city/:id', async (req, res) => {
    const result = await Cities.findById(req.params.id).populate('places')
    res.render('cities/city-info', { result })
})

module.exports = router