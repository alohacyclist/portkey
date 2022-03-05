const router = require('express').Router()
const User = require('../models/user.model')
const passport = require('passport')
const bcrypt = require('bcrypt')
const multer  = require('multer')
const fileUploader = require('../config/cloudstorage')
// const upload = multer({ dest: 'uploads/' })

router.get('/new-user', (req, res) => {
    res.render('user/sign-up')
})

router.post('/new-user', fileUploader.single('picture'), async (req, res) => {
    const user = new User({...req.body, picture: req.file})
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

router.get('/login', (req, res) => {
    res.render("user/login");
  })

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if(user){
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.currentUser = user
            res.redirect('/auth/profile')
        } else {
            res.redirect('/user/login')
        }
    }
})



module.exports = router