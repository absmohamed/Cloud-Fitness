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
        required: true
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
    hireOne: {
        type: String,
        default: null

    },
    hireTwo: {
        type: String,
        default: null
        
    },
    hireThree: {
        type: String,
        default: null
        
    },
    paid: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Number,
    },
    refundPayment: {
        type: Number,
    }
     
})


const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking