const router = require('express').Router();
const passport = require('passport')
const {isLoggedIn} = require('../middlewares/guard')
const User = require('../models/user.model')


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
  );

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "/user/profile",
    failureRedirect: "/auth",
  })
);

router.get('/profile', isLoggedIn, async (req, res) => {
    const user = await User.findOne({...req.body})
    res.render('auth/profile', {user})
})
  
module.exports = router