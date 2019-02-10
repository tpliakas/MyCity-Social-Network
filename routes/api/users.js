const express = require('express');
const router = express.Router();

// @route     GET api/users/test
// @desc      Tests user route
// @access    Public
router.get('/test', (req, res) => res.json({ mas: 'Users Works'}));

module.exports = router;