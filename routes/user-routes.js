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
const user = (req, res, next) => {

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



module.exports = {
    user
};