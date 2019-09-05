const validator = require('validator');
const isEmpty = require('isEmpty');

module.exports = validateLoginInput = (data) => {
    
    // Will contain any validation errors to be returned
    let errors = {};

    // Validate and repopulate data fields
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';

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

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}
