const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   POST api/google-login
// @desc    Authenticate user with Google
// @access  Public
router.post('/google-login', [], async (req, res) => {
  const { idToken } = req.body;

  await client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((res) => {
      // console.log('google res', res)
      const { email_verified, name, email } = res.payload;
      if (email_verified) {
      }
    });
  try {
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
