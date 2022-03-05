const router = require('express').Router()

router.get('/weather', (req, res) => {
    res.render('weather')
})

router.post('/weather', (req, res) => {
    const city = req.body.search
    const request = {
        method: 'GET',
        params: {
            search: city,
            units: 'imperial',
            mode:'xml'
        },
        headers: {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': '63f595cbd6msh1f205a4ec2140e9p1b23b3jsn5253b58698c6'
        }
    }
    fetch('https://community-open-weather-map.p.rapidapi.com/weather', request)
    .then(response => {
        console.log(response)
        res.render('forecast', {
            response
        })
    })
})

module.exports = router