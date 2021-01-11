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
        images: req.body.images
          ? req.body.images.split(',').map((image) => image.trim())
          : [],
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

// @route    GET api/tickets
// @desc     Get all tickets
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/tickets/:id
// @desc     Delete a ticket
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Check user
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await ticket.remove();

    res.json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/tickets/like/:id
// @desc     Like a ticket
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    // Check if the ticket has already been liked
    if (ticket.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Ticket already liked' });
    }

    ticket.likes.unshift({ user: req.user.id });

    await ticket.save();

    return res.json(ticket.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/tickets/unlike/:id
// @desc     Unlike a ticket
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    // Check if the ticket has not yet been liked
    if (!ticket.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Ticket has not yet been liked' });
    }

    // remove the like
    ticket.likes = ticket.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await ticket.save();

    return res.json(ticket.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
