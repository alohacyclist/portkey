const router = require('express').Router()
const User = require('../models/user.model')
const Token = require('../models/token.model')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/send-mail')
const { v4: uuidv4 } = require('uuid')

router.post('/forgot', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) { res.render('user/request-password', {message:'No user associated with this email address...' }) }

    let token = await Token.findOne({ userId: user._id })
    if(!token) { token = await Token.create({
        userId: user._id,
        token: uuidv4(),
        })
    await token.save()
    }
    const reset_link = 
        'Password-reset requested for your Portkey Account.\n\n' +
        'To reset, click the link or paste it into your browser:\n\n' +

        `http://${req.headers.host}/forgot/${user._id}/${token.token}\n\n` +

        'If this was not you, your password will remain unchanged.\n';

        'Hava a nice day!';

        await sendEmail(user.email, 'Password reset', reset_link);

        res.render('user/login', {message:'Please check your email for password-reset-link.'})
})

  // GET route to change the password using the token from the email
router.get('/forgot/:id/:token', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      res.render('user/new-password', { user, token });
    } catch (error) {
      console.log(error);
    }
  });
  
  // POST route to change the password using the token from the email
  router.post('/new-password/:id/:token', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).send('invalid link or expired');
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.render('user/login', {message: 'Invalid link or expired'})
  
      const password = req.body.password;
      
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      await user.save();
      await token.delete();
      res.render('user/login', {message: 'Your password was reset. You can login now.'});
    } catch (error) {
      res.render('user/login', {message: 'Your password could not be reset.'});
    }
})

module.exports = router