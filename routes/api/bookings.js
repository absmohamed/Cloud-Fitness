const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking")

router.get("/", ((req, res)=> {
    Booking.find().then((bookings) => {
        res.statusCode(200);
        res.send(bookings);
    }).catch((err) => {
        
    })
}))

router.post("/", (req, res) => {
    createBooking = async (bookingInfo) => {
        //call to server to add new booking
        //will return the new booking
        const newBooking = {
            service: bookingInfo.service,
            level: bookingInfo.level,
            datetime: bookingInfo.datetime,
            duration: bookingInfo.duration,
            



        }
    }
})