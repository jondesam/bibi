const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['userName', 'avatar']);

    if (!profile) {
      // console.log('No profile!!!');

      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (error) {
    error.message;
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bio, youtube, facebook, twitter, instagram, linkedin } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (bio) profileFields.bio = bio;

  // Build social object
  profileFields.social = {};

  if (youtube) {
    if (youtube.includes('http://') || youtube.includes('https://'))
      profileFields.social.youtube = youtube;
    else profileFields.social.youtube = `http://${youtube}`;
  }

  if (twitter) {
    if (twitter.includes('http://') || twitter.includes('https://'))
      profileFields.social.twitter = twitter;
    else profileFields.social.twitter = `http://${twitter}`;
  }

  if (facebook) {
    if (facebook.includes('http://') || facebook.includes('https://'))
      profileFields.social.facebook = facebook;
    else profileFields.social.facebook = `http://${facebook}`;
  }

  if (instagram) {
    if (instagram.includes('http://') || instagram.includes('https://'))
      profileFields.social.instagram = instagram;
    else profileFields.social.instagram = `http://${instagram}`;
  }

  if (linkedin) {
    if (linkedin.includes('http://') || linkedin.includes('https://'))
      profileFields.social.linkedin = linkedin;
    else profileFields.social.linkedin = `http://${linkedin}`;
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    // console.error(err.message);
    // console.log('profile generate ERR', err);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'userName',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['userName', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
