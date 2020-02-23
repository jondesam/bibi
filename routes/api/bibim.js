const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Bibim = require('../../models/Bibim');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route    POST api/bibims
// @desc     Create a bibim
// @access   Private

router.post(
  '/create',
  [
    auth,
    [
      check('name', 'name is required')
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

      // console.log('found user', user);

      const newBibim = new Bibim({
        name: req.body.name,
        creater: user._id,
        createrName: user.name,
        description: req.body.description
      });

      const bibim = await newBibim.save();

      res.json(bibim);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!!');
    }
  }
);

// @route    GET api/bibim
// @desc     Get all bibim
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const bibims = await Bibim.find().sort({ date: -1 });
    res.json(bibims);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const bibim = await Bibim.findById(req.params.id);

    // Check for ObjectId format and bibim
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !bibim) {
      return res.status(404).json({ msg: 'Bibim not found' });
    }

    res.json(bibim);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Bibim not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/subscription/:id
// @desc     subscribe a bibim
// @access   Private
router.put('/subscription/:id', auth, async (req, res) => {
  try {
    const bibim = await Bibim.findById(req.params.id);
    console.log('req.body', req.body);
    console.log('req.user.id', req.user.id);

    const profile = await Profile.findById(req.body._id);
    // console.log(profile);

    const newSubscription = {
      profileId: req.body._id
    }; //profile._id
    console.log('newSubscription peofileId', newSubscription);

    // Check if the post has already been liked
    if (
      bibim.subscriptions.filter(
        subscription => subscription.user.toString() === req.user.id
      ).length > 0
    ) {
      console.log('Bibim already subscribed');

      return res.status(400).json({ msg: 'Post already liked' });
    }

    profile.subscriptions.unshift({ bibimId: req.params.id });

    bibim.subscriptions.unshift(newSubscription);

    await profile.save();
    await bibim.save();

    res.json(bibim.subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
