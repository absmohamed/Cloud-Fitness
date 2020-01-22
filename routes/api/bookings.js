const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");
const {
    verifyOwner,
    userAuthenticated,
} = require('../../middleware/uservalidation');

//Get all Booking
router.get("/", ((req,res) => {
    Booking.find().then((bookings) => {
        res.statusCode(200);
        res.send(bookings);
    }).catch((error) => {
        res.statusCode(500);
        console.log(error);
    });
}));

//For edit and deleting a booking
router.use(userAuthenticated);

//Make a booking
router.post("/", (req, res) => {
    const username = req.body.username
    // We'll find the User by Email
    User.findOne({username})
    .then(user => {
        // Check for User
        if(!user) {
            return res.status(404).json({error: 'User not found, please login'});
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
    });
});

//Edit a Booking
router.put("/:id", verifyOwner, (req, res) => {
    
    //Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    }

    //execute the query from updatePost
    req.body.modified_date = Date.now();
    Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    .exec((err,booking) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        
        res.status(200);
        res.send(booking);
    });
});

module.exports = router