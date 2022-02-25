const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const {isLoggedIn} = require('../middlewares/guard')
const dotenv = require("dotenv")
dotenv.config();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "/user/profile",
    failureRedirect: "/auth",
  })
)

router.get('/profile', isLoggedIn, async (req, res) => {
    const user = req.session.currentUser
    res.render('auth/profile', {user})
})

module.exports = router