const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // The validator only takes in strings, so if the don't submit something it's not going to come in as a string, it will come in as null or undefined. What this does is if it comes in as null or undefined, it will set it to an empty string and then we can check it with the isEmpty validator
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.contact = !isEmpty(data.contact) ? data.contact : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    data.height = !isEmpty(data.height) ? data.height : '';
    data.weight = !isEmpty(data.weight) ? data.weight : '';
    // data.gender = !isEmpty(data.gender) ? data.gender : '';


    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.contact)) {
        errors.contact = 'Contact Number is required';
    }

    if(Validator.isEmpty(data.height)) {
        errors.height = 'Height is required';
    }

    if(Validator.isEmpty(data.weight)) {
        errors.weight = 'Weight is required';
    }

    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender is required';
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}