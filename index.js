const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const User = require("./models/user")
// DB Config
const db = require('./config/key').mongoURI
// Connect to MongoDB
mongoose
    .connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/user", authRouter);
// app.use("/api/bookings", bookingRouter);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running at ${port}`)
});