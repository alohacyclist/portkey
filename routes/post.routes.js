const router = require('express').Router();
const passport = require('passport')
const {isLoggedIn} = require('../middlewares/guard')
const User = require('../models/user.model')
const Post = require('../models/post.model')

router.get('/create', isLoggedIn, (req,res) => {
    res.render('post/add-post')
})

router.post('/create', async (req,res) => {
    const post = new Post({...req.body})
    post.author = req.session.currentUser._id;
    try{
        await post.save()
        res.redirect('post/all-posts', {post})

    } catch (error) {
        console.log(error)
    }
})

router.get('/all-posts', async (req,res) => {
    const posts = await Post.find()
    res.render('post/all-posts', { posts})
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const post = await Post.findById(req.params.id)
    console.log(req.params.id)
    res.render('post/read-post', { post }) 

})


module.exports = router