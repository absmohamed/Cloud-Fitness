const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking")
const verifyOwner = require('middleware/uservalidation.js')
//Get all Booking
router.get("/", ((req, res)=> {
    Booking.find().then((bookings) => {
        res.statusCode(200);
        res.send(bookings);
    }).catch((error) => {
        console.log(error)
        
    })
}))


//Make a booking
router.post("/", (req, res) => {
    // We'll find the User by Email
    User.findOne({email})
    .then(user => {
        // Check for User
        if(!user) {
            return res.status(404).json({email: 'User not found, please login'});
        }
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
}


//For edit and deleting a booking
router.use(verifyOwner);

//Edit a Booking
router.put("/:id", verifyOwner, (req, res) => {
    const changeBooking = function(req,res) {
        //Check for error from middleware
        if (req.error) {
            res.status(req.error.status)
            res.send(req.error.message)
        }next()

            //execute the query from updatePost
            updateBooking(req).exec((err, post) => {
                req.body.modified_date = Date.picker()
                return Booking.findByIdAndUpdate(req.params.id, req.body {
                    new: true
                })
                next()
                if (err) {
                    res.status(500);
                    res.json({
                        error: err.message
                    });
                }
                
                res.statu(200);
                res.send(booking);
            });
        }
    }
    
});

