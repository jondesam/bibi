const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../../models/User');

// @route   GET api/auth
// @desc
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // console.log('user', user);

    res.json(user);
  } catch (error) {
    //   res.status(500).json({msg:''})
    console.log('error', error);

    console.log(error.message);

    res.status(500).send('Server err');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists in
      let user = await User.findOne({ email });

      console.log('user', user);

      if (!user) {
        return res
          .status(400)
          .json({ errorss: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errorsl: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      //   console.log('user', user);

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );

      //   res.send('User resistered');
    } catch (error) {
      console.log(error.message);

      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
