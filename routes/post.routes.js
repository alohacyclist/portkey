const router = require('express').Router();
const {isLoggedIn} = require('../middlewares/guard')
const upload = require('../config/cloudstorage')
const Post = require('../models/post.model')
const override = require('method-override')

router.get('/create', isLoggedIn, async (req,res) => {
    res.render('post/add-post')
})

router.post('/create', isLoggedIn, upload.single('picture'), async (req,res) => {
    if(!req.file) {const post = await Post.create({ ...req.body, author: req.session.currentUser})
        try{
            await post.save()
            res.redirect('/post/all-posts')

        } catch (error) {
            console.log(error)
        }
    } else {
        {const post = await Post.create({ ...req.body, picture: req.file.path, author: req.session.currentUser})
        try{
            await post.save()
            res.redirect('post/all-posts')

        } catch (error) {
            console.log(error)
        }
    }
}})

router.get('/all-posts', async (req,res) => {
    const post = await Post.find()
    res.render('post/all-posts', { post })
})

router.get('/read/:id', isLoggedIn, async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post/read-post', { post }) 
})

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post/edit-post', { post }) 
})

router.post('/:id/update', isLoggedIn, async (req, res) => {
    console.log(req.body)
    const post = await Post.findByIdAndUpdate(req.params.id, {...req.body, author: req.session.currentUser}, {new: true})
    /* await post.save() */
    res.render('post/read-post', { post }) 
})


module.exports = router