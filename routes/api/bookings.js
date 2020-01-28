const express = require('express');
const router = express.Router();

// bcrypt hashes the password
const bcrypt = require('bcryptjs');
// Bringing in User Model
const User = require('../../models/User');

const Booking = require('../../models/booking')

// Bringing in JSON Web tokens
const jwt = require('jsonwebtoken');

// Bringing in const keys to use secret key
const keys = require('../../config/keys')

// Bringing in Passport
const passport = require('passport');
//Get all Booking
router.get("/bookings", ((req,res) => {
    Booking.find().then((bookings) => {
        res.status(200);
        res.send(bookings);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    });
}));


//Get my bookings
router.get('/bookings/:id', 
    passport.authenticate('jwt', { session :false }),
    (req, res) => {
    Booking.find(_id).then((bookings)=>{
        res.json({
            id: req.user.id,
            service: req.body.service,
            level: req.body.level,
            date: req.body.date,
            duration: req.body.duration
        })
        res.statusCode(200);
        res.send(bookings);
    }).catch((error)=> {
        res.sendCode(500);
        console.log(error);
    })
})



//Make a booking
router.post("/bookings", 
    passport.authenticate('jwt', { session :false }),
    (req, res) => {
    const username = req.body.username
    // We'll find the User by Email
    User.findOne({email: username})
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
router.put("/bookings/:id", 
    passport.authenticate('jwt', { session :false }), 
    (req, res) => {
    
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

//delete post

router.delete("/bookings/:id", 
    passport.authenticate('jwt', { session :false }),
    (req, res) => {

    //Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.messsage);

        //execut the query from deletePost
        booking.findByIdAndRemove(req.params.id, req.body, {
            new: true
        })
        .exec((err, booking)=>{
            if (err) {
                res.status(500);
                res.json({
                    error: err.message
                });                
            }
            res.status(200);
            res.send(booking);
        })
    }
})

module.exports = router

