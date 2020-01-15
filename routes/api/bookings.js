const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking")

router.get("/", ((req, res)=> {
    Booking.find().then((bookings) => {
        res.statusCode(200);
        res.send(bookings);
    }).catch((error) => {
        console.log(error)
        
    })
}))

router.post("/", (req, res) => {
    const booking = new Booking(req.body)
    booking.save((err, booking) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(booking);
    });
})