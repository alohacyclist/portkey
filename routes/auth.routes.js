const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const { isLoggedIn } = require('../middlewares/guard')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
  );

router.get('/google/callback', passport.authenticate('google', {
     successRedirect: "/auth/profile",
     failureRedirect: "/auth",
   })
 );

router.get('/profile', isLoggedIn, async (req, res) => {
  const user = req.session.currentUser
  res.render('user/profile', {user})
})
  
module.exports = router