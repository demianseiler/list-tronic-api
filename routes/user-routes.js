'use strict';

// Load 3rd Party Packages
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Router
const router = express.Router();

// Load Keys For Auth
const keys = require('../config/keys');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User Model
const User = require('../model/user');


const register = (req, res, next) => {

    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const query = {email: req.body.email};
    User.findOne(query)
        .then(user => {
            if(user) {
                return res.status(400).json({email: "Email already exists"});
            }
            else{
                // User doesn't exist so let's create a new User object
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                });

                // Hash the users password before saving it to the database
                // TODO: Can we break this out to a utility class and use Async/Await
                // TODO: Move salt number to config file?
                bcrypt.genSalt(10, (err, salt) => {

                });



            }
        })
        .catch(err => {
            // TODO: Update when error logging is handled
            console.log('ERROR FINDING USER', err);
        });

};



/**
  * This is temporary and will be removed
 * TODO: REMOVE BEFORE PROD
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const users = (req, res, next) => {

    User.find().exec((error, foundUser) => {
        if(error) {console.log(error);}
        res.status(200).json(foundUser);
    });

}

/**
 * Return user profile.
 *
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const user = function(req, res, next) {

    console.log('REQ: ' + JSON.stringify(req.body));
    var username = req.body.username;

    if(!username){
        return res.status(400).json('No username received');
    }
    else{

        var query = { "username": username };
        User.findOne(query)
        .exec( (err, user) => {

            if (err) {
                return res.status(500).json(`Database Error: An error occurred trying to find the user with username: ${username}`);
            }

            if (!user) {
                return res.status(403).json(`Failed Login: The user ${username} could not be found`);
            }
            else {
                console.log("DID WE OPT");
                res.status(200).json(user);
            }

        });

    }

};

/**
 * Update and return the updated user profile.
 *
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const updateUserProfile = function(req, res, next) {

    console.log('REQ: ' + JSON.stringify(req.body));
    var username = req.body.username;

    if(!username){
        return res.status(400).json('No username received');
    }
    else{

        // populate user and save
        var firstName = req.body.first_name;
        var lastName = req.body.last_name;
        var email = req.body.email;

        var query = { "username": username };
        User.findOneAndUpdate(
            query,
            {
                "$set": {
                    "first_name": firstName,
                    "last_name" : lastName,
                    "user_email" : email
                }
            },
            {
                'new':true
            })
        .exec( (err, user) => {

            if (err) {
                return res.status(500).json(`Database Error: An error occurred trying to find the user with username: ${username}`);
            }

            if (!user) {
                return res.status(403).json(`Failed Login: The user ${username} could not be found`);
            }
            else {
                console.log("DID WE OPT");
                res.status(200).json('User updated');
            }

        });

    }

};



module.exports = {
    users,
    user,
    updateUserProfile
};