const router = require('express').Router();
const { User, Post } = require('../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// creates new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//edit post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (editPost) {
      res.status(200).json(editPost);
    } else {
      res.status(404).json({ message: 'No post found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id' });
    } else {
      res.status(200).json(deletePost);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;