const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')

router.get('/user/profile', async (req, res) => {
    const user = await User.findOne({...req.body})
    res.render('user/profile', {user})
})

module.exports = router