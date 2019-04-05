const express = require('express');
const passport = require('passport');
const Post = require('../models/post');
const Profile = require('../models/profile');

const router = express.Router();

// @route GET  posts/test
//@desc Tests posts route
//@access public

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user._id,
      });
      let postCreated = await newPost.save();
      res.status(200).send(postCreated);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.get('/', async (req, res) => {
  try {
    let post = await Post.find().sort({ date: -1 });
    if (post) {
      res.status(200).send(post);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).send(post);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        let post = await Post.findById(req.params.id);
        if (
          post.likes.filter(like => like.user.toString() == req.user._id)
            .length > 0
        ) {
          res.status(409).send('already liked this post');
        } else {
          post.likes.unshift({ user: req.user._id });
          let likeAdded = await post.save();
          res.send(likeAdded);
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        let post = await Post.findById(req.params.id);
        if (
          post.likes.filter(like => like.user.toString() == req.user._id)
            .length === 0
        ) {
          res.status(409).send('You havent liked the post');
        } else {
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          let removeLike = await post.save();
          res.send(removeLike);
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        let post = await Post.findById(req.params.id);
        if (post.user.toString() == req.user._id) {
          let removingPost = await post.remove();
          res.status(200).send(removingPost);
        } else {
          res.status(401).send({ notAuthorised: 'not authorized' });
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (post) {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user._id,
        };
        post.comments.unshift(newComment);
        let commentAdded = await post.save();
        res.send(commentAdded);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (post) {
        if (
          post.comments.filter(
            comment => comment._id.toString() == req.params.comment_id
          ).length == 0
        ) {
          res.status(404).send('comment not found');
        } else {
          const removeIndex = post.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.comment_id);
          post.comments.splice(removeIndex, 1);
          let removedComment = await post.save();
          res.send(removedComment);
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = {
  postsController: router,
};
