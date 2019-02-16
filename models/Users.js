const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Shema ({
   name: {
       type: String,
       required: true
   },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);