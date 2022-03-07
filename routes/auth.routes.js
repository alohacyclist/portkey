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

router.get('/check/:confirmationCode', async (req, res) => {
  const user = await User.findOne({confirmationCode: req.params.confirmationCode})
  if(user) { 
    user.status = 'active'
    await user.save()
    console.log(user, 'user confirmed')
    res.redirect('/user/login')
  } else {
    res.send('user could not be confirmed')
  }
})

router.get('/profile', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.session.currentUser._id).populate('content')
    res.render('auth/profile', {user})
})

module.exports = router