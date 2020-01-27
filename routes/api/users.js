const express = require('express');
const router = express.Router();

// bcrypt hashes the password
const bcrypt = require('bcryptjs');
// Bringing in User Model
const User = require('../../models/User');

// Bringing in JSON Web tokens
const jwt = require('jsonwebtoken');

// Bringing in const keys to use secret key
const keys = require('../../config/keys')

// Bringing in Passport
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Route GET to api/users/test
// Description: Tests user route
// Access: Public Route
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));


// Route GET api/users/register
// Description: Register a User
// Access: Public Route
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Checking Validation 
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                lastname: req.body.lastname,
                role: req.body.role
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password.toString(), salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
});

// Route GET api/users.login
// Description: Login User / Returning the JSON Web Token
// Access: Public

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Checking Validation 
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // We'll find the User by Email
    User.findOne({email})
    .then(user => {
        // Check for User
        if(!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors);
        }

        // Check Password 
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                // User Matched

                // Create JWT payload
                const payload = { id: user.id, name: user.name }
                // Sign Token
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                });
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });

});

// Route GET api/users/current
// Description: Returns the current user
// Access: Private

router.get(
    '/current', 
    passport.authenticate('jwt', { session: false}), 
    (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });

})




module.exports = router;