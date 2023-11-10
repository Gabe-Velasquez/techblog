const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// Gather all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id, // Finds the logged in users posts only
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.redirect('/');
  }
});

// Route for new post
router.get('/new', (req,res)=>{
    res.render('new-post');
});

//edits
router.get("/edit/:id", withAuth, async(req,res)=> {
    try{
        const editPost = await Post.findByPk(req.params.id);
        if(!editPost){
          const post=editPost.get({plain:true});
            res.render('edit-post', {post});
        }else{
          res.status(404).end();
        }
    }catch(err){
        res.redirect('login');
    }
});
module.exports = router;