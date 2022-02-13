const router = require('express').Router();
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    })
  );

  router.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: "/user/profile",
      failureRedirect: "/auth",
    })
  );
  
module.exports = router