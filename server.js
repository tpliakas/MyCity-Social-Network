const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello!"));

// process.env.PORT will be needed by Heroku later
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}.`));
