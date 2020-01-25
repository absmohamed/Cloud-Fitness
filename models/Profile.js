const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    contact: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    level: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true,
        min: 2
    },
    weight: {
        type: Number,
        required: true,
        min: 2
    },
    gender: {
        type: String,
        required: true
    },
    bio: { 
        type: String 
    },
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        youtube: {
            type: String
        }
    },
});


module.exports = Profile = mongoose.model('profile', ProfileSchema)
