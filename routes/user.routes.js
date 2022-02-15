const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const bcrypt = require('bcrypt')

router.get('/newUser', (req, res) => {
    res.render('user/signUp')
})

router.post('/newUser', async (req, res) => {
    const user = new User({...req.body})
    const exists  = await User.findOne({ email: req.body.email, username: req.body.username})
    if (exists) { res.send('username or email already exists') }
    const hash = await bcrypt.hash(req.body.password, 10)
    user.password = hash
    try {
        await user.save()
        res.render('user/login')
    } catch (err) {
        console.error(err)
        res.redirect('error')
    }
})

router.get("/login", (req, res) => {
    res.render("user/login");
  })

router.get('/user/profile', async (req, res) => {
    const user = await User.findOne({...req.body})
    res.render('user/profile', {user})
})

module.exports = router