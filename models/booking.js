const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    service: {
        type: String,
        required: true
        
    },
    level: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    name: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    
    },
    dob: {
        type: String,
    },
    contact: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    }

   
})


const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking