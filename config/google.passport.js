const mongoose = require('mongoose');
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model')

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleID: profile.id })
        if (!user) {
            try {
                const newUser = await User.create({
                googleID: profile.id,
                Email: profile.emails
                })
                done(null, newUser)
                console.log(newUser, 'created successfully')
            } catch (err) {
                done(err)
            }
        } else if (user) {
            done(null, user)
            console.log(user, 'user exists already')
        }
    } catch (err) {
        done(err)
    }
    }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((user, done) => {
    User.findById(user.id, (err, user) => {
      done(err, user)
    })
  })
}

