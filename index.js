const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require('./routes/api/users');
const passport = require('passport');
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
    .connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));


// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
// Use Routes
app.use('/api/users', users);


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running at ${port}`)
});