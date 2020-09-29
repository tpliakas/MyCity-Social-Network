const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Ticket = require('../../models/Ticket');
const User = require('../../models/User');

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

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTicket = new Ticket({
        user: req.user.id,
        title: req.body.title,
        city: req.body.city,
        area: req.body.area,
        location: req.body.location,
        address: req.body.address,
        addressNumber: req.body.addressNumber,
        ticketType: req.body.ticketType,
        importance: req.body.importance,
        images: req.body.images,
        video: req.body.video,
        status: req.body.images,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      const ticket = await newTicket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
