const router = require('express').Router();
const Place = require('../models/places.model')
const Cities = require('../models/cities.model')

var axios = require("axios").default;
const dbDetails = require('../db.json')

router.post('/city/:id/add-place', async (req, res) => {
    const city = await Cities.findById(req.params.id)
    const place = await Place.create({ ...req.body })
    city.places.push(place.id)
    try {
        await place.save()
        await city.save()
    } catch (err) {
        console.error(err)
    }
    
    res.redirect(`/city/${city.id}`)
})

router.post('/main', async (req,res) => {
    //original input
    const localOriginal = req.body.search
    //make input lower case
    const localLower = localOriginal.toLowerCase()
    //remake the input into right template
    const local = localLower.charAt(0).toUpperCase() + localLower.substr(1)

    
    //console.log(local)

     let db = dbDetails

     let result = await axios.post('http://httpbin.org/post', db);
    
     //db json
     let data = result.data.json;

     //testing item in db
     //console.log(data.data[0].country);

    if (!local){
        res.send('type a country')
    }
    
    //testing substr
    //console.log(data.data[0].attractions[0].description.substr(0,100))

    //check array for country name
    if (data.data.some(c => c.country === local)) {
        data.data.forEach(c => {
            if (c.country === local){
             //   console.log(c)
                res.render('countries/main', {data: c, local})
            }
        })
    } else {
       res.render('countries/add-country',{local, message: "Add this Country"})
    }     
})

module.exports = router