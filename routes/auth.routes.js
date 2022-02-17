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

router.get('/profile', async (req, res) => {
  const user = await User.findOne({...req.body})
  res.render('user/profile', {user})
})
  
module.exports = router