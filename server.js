const express = require("express");
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello there!"));

// process.env.PORT will be needed by Heroku later
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}.`));
