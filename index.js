const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const passport = require('passport');
const app = express();

// const bookingRouter = require("./routes/api/bookings");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello!'));
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
app.use('/api/profile', profile);
// app.use('/api/profile', profile);

// app.use("/api/bookings", bookingRouter);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running at ${port}`)
});