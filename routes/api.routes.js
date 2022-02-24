const router = require('express').Router()
const axios = require('axios')
const Map = require('../models/map.model')

/* axios.get('https://api.countrystatecity.in/v1/countries', async (req,res) {
	
})

const headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); */
  
// Map routes
router.get('/map', async (req, res) => {
    const coordinates = await Map.find()
    res.render('maps/map', { coordinates })
})
  
router.post('/map', async (req, res) => {
    const coordinates = JSON.parse(Object.keys(req.body)[0])
    await Map.create({
      xy: [coordinates.lat, coordinates.lng],
    })
    res.render('maps/map', { coordinates })
  })

// Weather routes
router.get('/weather', (req, res) => {
  res.render('weather/weather')
})

router.post('/weather', async (req, res) => {
  const city = req.body.search
  const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
  params: {q: `${city}`, days: '3'},
  headers: {
  'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
  'x-rapidapi-key': process.env.RAPID_API_KEY
}
}

  axios.request(options).then(function (response) {
      res.render('weather/forecast', {response})
  }).catch(function (error) {
      console.error(error);
  });
})
  
module.exports = router
    