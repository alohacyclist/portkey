const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const fs = require('fs')
const { isLoggedIn } = require('../middlewares/guard')
const { downloadFile } = require('../config/cloudstorage')

const dotenv = require("dotenv");
const S3 = require('aws-sdk/clients/s3')
dotenv.config();


const bucket = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretKey  = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKey,
  secretKey
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
  );

router.get('/google/callback', passport.authenticate('google', {
     successRedirect: "/auth/profile",
     failureRedirect: "/auth",
   })
 );

// https://portkey.s3.eu-central-1.amazonaws.com/${user.picture.filename}

router.get('/profile', async (req, res) => {
  const user = req.session.currentUser
  const response = await s3.getObject({
    Bucket: bucket,
    Key: user.picture.filename,
  }).promise()
  console.log(response)
  const picture = response.Body.toString('utf-8')
  res.render('user/profile', {user, picture: picture})
})
module.exports = router