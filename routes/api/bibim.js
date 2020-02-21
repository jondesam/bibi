const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Bibim = require('../../models/Bibim');
const User = require('../../models/User');
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

module.exports = router;
