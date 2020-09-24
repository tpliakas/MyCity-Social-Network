const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route    POST api/tickets
// @desc     Create a ticket
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('area', 'Area is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('addressNumber', 'Address number is required').not().isEmpty(),
      check('ticketType', 'Ticket type is required').not().isEmpty(),
      check('text', 'Text is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Data manipulation here

    try {
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
