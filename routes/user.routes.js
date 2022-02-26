const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const bcrypt = require('bcrypt')
const {isLoggedIn} = require('../middlewares/guard')
const multer  = require('multer')
const upload = require('../config/cloudstorage')

router.get('/create', (req, res) => {
    res.render('user/sign-up')
})

router.post('/create', isLoggedIn, upload.single('picture'), async (req, res) => {
    const user = new User({...req.body, picture: req.file.path})
    const exists  = await User.findOne({ email: req.body.email, username: req.body.username })
    if (exists) { res.send('username or email already exists') }
    const hash = await bcrypt.hash(req.body.password, 10)
    user.password = hash
    try {
        await user.save()
        res.redirect('/user/login')
    } catch (err) {
        console.error(err)
        res.redirect('error')
    }
})

router.get('/')

router.get('/login', (req, res) => {
    res.render("user/login");
  })

router.post('/login', async (req,res) => {
    const user  = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
        
        if(await bcrypt.compare(req.body.password, user.password)) {
            req.session.currentUser = user
            res.redirect('/auth/profile')
        } else {
            res.render('user/login', {message: 'The password is incorrect'})
        }
    } else {
        res.render('user/login', {message: 'No user found'})
    }
})

router.get("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

module.exports = router