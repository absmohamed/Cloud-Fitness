const User = require('../models/user');
const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    service: {
        type: String
        
    },
    level: {
        type: String
       
    },
    datetime: {
        type: Date

    },
    duration: {
        type: Number
    },
    username: {
        type: String
    }
    
    
})


const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking