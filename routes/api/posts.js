const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Bibim = require('../../models/Bibim');
const pagination = require('../../middleware/pagination');
const paginationC = require('../../middleware/paginationC');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const bibim = await Bibim.findById(req.body.bibimId);

      const newPost = new Post({
        text: req.body.text,
        userName: user.userName,
        avatar: user.avatar,
        user: req.user.id,
        bibimId: req.body.bibimId,
        bibimName: bibim.bibimName,
        parentId: null
        // comments: null
      });

      bibim.posts.unshift(newPost);

      await bibim.save();

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', pagination(Post), async (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const bibim = await Bibim.findById(post.bibimId);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if it is a user's post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    bibim.posts.pull(post._id);

    await bibim.save();
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found!' });
    }

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/posts/like/:_id
//@desc     Like/Unlike a post
//@access   Private
router.post('/like/:_id', auth, async (req, res) => {
  const _id = req.params._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ msg: 'No Post By that Id' });
    }
    const post = await Post.findById(_id);
    if (!post) return res.status(404).json({ msg: 'No Post By that Id' });
    // Check if User has already liked a post
    if (post.likes.filter(like => like.id === req.user.id).length > 0) {
      //Remove user from likes array
      post.likes = post.likes.filter(like => like.id !== req.user.id);
    } else {
      //Add user to likes array
      post.likes.unshift(req.user.id);
    }
    await post.save();
    return res.status(200).json(post.likes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('commentText', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.body.parentId);

      const newComment = new Post({
        text: req.body.commentText,
        userName: user.userName,
        avatar: user.avatar,
        user: req.user.id,
        parentId: req.body.parentId,
        bibimName: req.body.bibimName,
        bibimId: req.body.bibimId,
        topParentId: req.body.topParentId
        // comments: null
      });
      let topPost = null;

      if (req.body.parentId !== req.body.topParentId) {
        topPost = await Post.findById(req.body.topParentId);

        topPost.comments.unshift(newComment);

        await topPost.save();
      }

      post.comments.unshift(newComment);

      await post.save();

      await newComment.save();

      if (topPost !== null) {
        res.json(topPost.comments);
      } else {
        res.json(post.comments);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //remove post in posts of DB
    const postAsComment = await Post.findById(req.params.comment_id);

    postAsComment.text = null;
    await postAsComment.save();

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // remove comment of

    let topPost = null;

    if (post.topParentId) {
      topPost = await Post.findById(post.topParentId);
    } else {
      topPost = await Post.findById(post._id);
    }

    const topPostRemoveIndex = topPost.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    topPost.comments.splice(topPostRemoveIndex, 1);

    await topPost.save();

    // Get remove index
    // const removeIndex = post.comments
    //   .map(comment => comment.id)
    //   .indexOf(req.params.comment_id);

    // post.comments.splice(removeIndex, 1);

    // await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/comments
// @desc     Get all comments
// @access   Public
// router.get('/c', paginationC(Post), async (req, res) => {
//   try {
//     res.json(res.paginatedResults);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
