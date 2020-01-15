const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // If not empty it will be data.name but if it is empty then it'll be an empty string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // Password is the confirm password
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if(!Validator.isLength(data.name, { min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(!Validator.isLength(data.lastname, { min: 2, max: 30})) {
        errors.lastname = 'Last Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Last Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max:30 })) {
        errors.password = 'Password must be atleast 6 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}