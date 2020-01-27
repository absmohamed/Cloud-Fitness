const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String
     
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
});


module.exports = User = mongoose.model('users', UserSchema)
