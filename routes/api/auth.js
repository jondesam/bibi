const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
// const setAlert = require('../../client/src/actions/alert');

const User = require('../../models/User');

// @route   GET api/auth
// @desc
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (error) {
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists in
      let user = await User.findOne({ email });

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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
