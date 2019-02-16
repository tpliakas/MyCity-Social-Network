const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route     GET api/users/test
// @desc      Tests user route
// @access    Public
router.get('/test', (req, res) => res.json({ mas: 'Users Works'}));

// @route     GET api/users/register
// @desc      Register route
// @access    Public
router.post('/register', (req, res) => {
    // https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                // https://github.com/emerleite/node-gravatar
                const avatar = gravatar.url(req.body.email, {
                   s: '200', // Size
                   r: 'pg', // Rating
                   d: 'mm' // Default
                });

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    // ES5 avatar: avatar
                    avatar,
                    password: req.body.password
                });
                // https://github.com/dcodeIO/bcrypt.js
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});

module.exports = router;