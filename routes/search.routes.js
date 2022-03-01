const router = require('express').Router()
const Cities = require('../models/cities.model')
const Map = require('../models/map.model')
const axios = require('axios')

router.post('/search', async (req, res) => {
    const result = await Cities.find({
        $or: [
                {name: req.body.search.charAt(0).toUpperCase() + req.body.search.substr(1).toLowerCase()},
                {country: req.body.search.charAt(0).toUpperCase() + req.body.search.substr(1).toLowerCase()}
            ],
      
           
    })
   
    res.render('results', {result})
})

router.get('/:country', async (req, res) => {
    const result = await Cities.find(req.params)
    console.log(result)
    res.render('cities/all-cities', { result })
})

router.get('/city/:id', async (req, res) => {
    const result = await Cities.findById(req.params.id).populate('places')
    
    // GET WEATHER
    const city = result.name
    const weatherOptions = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {q: `${city}`, days: '3'},
    headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    }

    const response = await axios.request(weatherOptions)

    const locationOptions = {
        method: 'GET',
        url: `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${city}`,
        headers: { 'apiKey': 'MjYxMTAxZjJkODc3NDhmMmIwZTYwMGQyZGQ2YTdkZWM6NWI1ODQ2MDgtODBlYi00NmYxLWJiNDEtOGZkMzI5MTMyNTlk', "Content-Type": "application/json"  }
        }

    const locationResponse = await axios.request(locationOptions)
     
    const coordinates = [locationResponse.data.locations[0].referencePosition.latitude, locationResponse.data.locations[0].referencePosition.longitude]

    res.render('cities/city-info', { result, response, coordinates })
})

module.exports = router