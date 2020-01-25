const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load User Model
const User = require('../../models/User');

// Load Profile Model
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => res.json({msg: 'Profile works'}));


// ROUTES FOR PROFILE OF USER

// Route: GET api/profile
// Description: Get current users profile
//Access: Private

router.get(
    '/', 
    passport.authenticate('jwt', { session :false }), 
    (req, res) => {
        const errors = {};
        // Populate allows us to add the users name into our profile. because we put the user in the profile schema.
        Profile.findOne({ user: req.user.id })
        .populate('user', ['name'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// ROUTE to GET api/profile/all
// Description: Get all profiles
// Access: Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    // We added a catch incase theres an internal error
})


// ROUTE to GET api/profile/handle/:handle
// Description: Get the profile by handle
// Access: Public

router.get('/handle/:handle', (req, res) => {
const errors = {};

    // This is going to grab the handle in the url and match it with the handle in the database
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
    // We added a catch incase theres an internal error
});

// ROUTE to GET api/profile/user/:user_id
// Description: Get the profile by user ID
// Access: Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    
        // This is going to grab the handle in the url and match it with the handle in the database
        Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        }).catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
        // We added a catch incase theres an internal error
});




// Route: Post api/profile
// Description: Create or Edit the users profile
//Access: Private

router.post(
    '/', 
    passport.authenticate('jwt', { session :false }), 
    (req, res) => {
        console.log("in post for /api/profile with req", req.body)
        const { errors, isValid } = validateProfileInput(req.body);
        

        // Check Validation
        if(!isValid) {
            // Return any errors with the 400 status
            return res.status(400).json(errors);
            console.log("error1");
        }
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        // We're checking if this (req.body.handle) sent in from the handle, and if so we're setting it to profileFields.handle
        // we fill the profileFields object with req.body
        if(req.body.handle) profileFields.handle = req.body.handle
        if(req.body.contact) profileFields.contact = req.body.contact;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.level) profileFields.level = req.body.level;
        if(req.body.height) profileFields.height = req.body.height;
        if(req.body.weight) profileFields.weight = req.body.weight;
        if(req.body.gender) profileFields.gender = req.body.gender;
        if(req.body.bio) profileFields.bio = req.body.bio;

        // Social has an object of fields, so we initialise profileFields.social and set it to an empty array
        profileFields.social = {};
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;

        // We search for the user with the logged in users id
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                // If they have a profile, this will update the profile with the new fields that come in, and then respond with that profile
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields}, 
                    { new: true}
                    ).then(profile => res.json(profile))
            } else {
                // Create
                // If they don't have a profile, we make sure there's no handle by that name, but if there is we send back an error. If it's noot then we create a profile
                // First we check to see if the handle exists
                Profile.findOne({ handle: profileFields.handle })
                .then(profile => {
                    // If profile is given back that matches that handle, we use errors.handle
                    if(profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                        console.log("error2")
                    }

                    // Save the Profile
                    new Profile(profileFields).save(console.log("save problem")).then(profile => res.json(profile));
                    console.log("error3")
                })
            }
        })
    }

);

// ROUTE to DELETE USER AND PROFILE api/profile
// Description: Delete User and Profile
// Access: Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id })
            .then(() => res.json({ success: true})
            );
        });
    }
);

module.exports = router;