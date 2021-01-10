const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regex = /^$|youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;

const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  addressNumber: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    required: true
  },
  importance: {
    type: String
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String,
    url: String,
    validate: regex
  },
  currentStatus: {
    type: String,
    default: 'Pending'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  // Decided to not use comments use atm
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ticket', TicketSchema);
