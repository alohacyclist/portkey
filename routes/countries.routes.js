const router = require('express').Router();
const Country = require('../models/countries.model')
var axios = require("axios").default;
const dbDetails = require('../db.json')

router.get('/add-country', (req,res) => {
    res.render('countries/add-country')
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
       res.render('/',{message: "Add this Country"})
    }
    
        
})


router.post('/add', async (req,res) => {
    const country = new Country({...req.body})
  
    try {
        await country.save()
        res.redirect('/countries/index')
    } catch (err) {
        console.error(err)
        res.send('error')
    }
})


module.exports = router