const router = require('express').Router();
const { User, Comment, Post } = require('../models/');
const withAuth = require('../utils/auth');

// homepage for all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('homepage', {posts, logged_in: req.session.logged_in});
    }catch(err){
        res.status(500).json(err);
    }
});

// fetch one post
router.get('/post/:id', withAuth, async (req, res) =>{
try{
    const postData=await Post.findOne({
        where:{
            id:req.params.id
            },
            include:[
                {
                    model:Comment,
                    include:{
                        model:User,
                        attributes:['username'],
                    },
                },
                {
                    model:User,
                    attributes: ['username'],
                },
            ],
    });
    if(postData){
        const post = postData.get({plain:true});
        res.render('post-by-id', {post, logged_in:req.session.logged_in});
    }else{
        res.status(404).end();
    }
    } catch(err){
        res.status(500).json(err);
    }
});

// Route to login/signup
router.get("/login", (req,res)=>{
    res.render('login');
});
module.exports = router;