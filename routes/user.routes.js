const router = require('express').Router()
const User = require('../models/user.model')
const Token = require('../models/token.model')
const bcrypt = require('bcrypt')
const {isLoggedIn, isLoggedOut} = require('../middlewares/guard')
const multer  = require('multer')
const upload = require('../config/cloudstorage')
const sendEmail = require('../utils/send-mail')
const { v4: uuidv4 } = require('uuid')

router.get('/create', (req, res) => {
    res.render('user/sign-up', {message: "Sign up to add and read all content"})
})

router.post('/create', upload.single('picture'), async (req, res) => {
    const uuid = uuidv4()
    let activation_link = `http://${req.body.host}/auth/check/${uuid}`
    if(!req.file) {const user = new User({...req.body , confirmationCode: uuid })
    const exists  = await User.findOne({ email: req.body.email, username: req.body.username })
    if (exists) { res.send('username or email already exists') }
    const hash = await bcrypt.hash(req.body.password, 10)
    user.password = hash
    try {
        await user.save()
        sendEmail(user.email, 'activate account', activation_link)
        res.render('user/login', {message: 'Please check your mail and activate your account.'})
    } catch (err) {
        console.error(err)
        res.redirect('error')
    }}
    else {const user = new User({...req.body, picture: req.file.path, confirmationCode: uuid })
    console.log(user)
    const exists  = await User.findOne({ email: req.body.email, username: req.body.username })
    if (exists) { res.render('error', {message: 'username or email already exists'}) }
    const hash = await bcrypt.hash(req.body.password, 10)
    user.password = hash
    try {
        await user.save()
        sendEmail(user.email, 'activate account', activation_link)
        res.render('user/login', {message: 'Signed up, you can log in now!'})
    } catch (err) {
        console.error(err)
        res.redirect('error')
    }}
})

router.get('/login', (req, res) => {
    res.render("user/login", {message:''});
  })

router.post('/login', async (req,res) => {
    const user  = await User.findOne({ email: req.body.email })
    console.log(user.status)
    if (user) {
        if(user.status === 'active') {
            if(await bcrypt.compare(req.body.password, user.password)) {
                req.session.currentUser = user
                res.redirect('/auth/profile')
            } else {
                res.render('user/login', {message: 'The password is incorrect'})
            }
        } else {
            res.render('user/login', {message: 'Please check your mail to activate your account.'})
        }
    } else {
        res.render('user/login', {message: 'No user found'})
    }
})

router.get('/forgot-password', async (req, res) => {
    res.render('user/request-password', {message:'Please provide the email you signed up with.\n We will send you a reset-link.'})
  })

router.get("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

module.exports = router

// 

