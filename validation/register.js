const validator = require('validator');
const isEmpty = require('isEmpty');

module.exports = validateRegisterInput = (data) => {
    
    // Will contain any validation errors to be returned
    let errors = {};

    // Validate and repopulate data fields
    data.username = !isEmpty(data.username) ? data.username : '';    
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

    // Validate Username
    if(validator.isEmpty(data.username)){
        errors.username = 'Username field is required.';
    }

    // Validate Email
    if(validator.isEmail(data.email)){
        errors.email = 'Email is required.';
    }
    else if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    // Validate Password Exists
    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required.';
    }

    // Validate Password Meets Length Requirements
    if(validator.isLength(data.password, {min: 8, max: 32})){
        errors.password = 'Password must be at least 8 characters.';
    }

    // Verify Passwords Match
    if(!validator.equals(data.password, data.passwordMatch)){
        errors.passwordMatch = 'Passwords must match.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};
