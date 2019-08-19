'use strict';

const User = require('../model/user');


/**
 * Get a user from the database who has a matching
 * username to the one in the request.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const users = (req, res, next) => {

    // Pull username from request to be used as database search criteria
    // const searchUserName = req.body.username;
    const searchUserName = 'CommanderQ';
    
    // If searchUserName has a value then search the database
    if(!searchUserName){
        
        return res.status(400).json('Missing appropriate username search value in request.');
    }
    else{
        const query = {username: searchUserName};
        User.findOne({username:searchUserName}).exec((error, foundUser) => {
            if(error) {console.log(error);}
            res.status(200).json(foundUser);
        });
    }

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