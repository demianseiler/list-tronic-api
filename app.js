/**
 * app.js is the main application file for the Chat Tronic API application.
 */
'use strict';

/**
 * Project Module Imports
 * */
const pkg = require('./package.json');

/**
 * Imported Routes Modules
 */
const userRoutes = require('./routes/user-routes.js');


/**
 * 3rd Party Module Imports
 * */
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens -- https://www.npmjs.com/package/jsonwebtoken

// Create express 'app' object
const app = express();

// Setup application port
const DEFAULT_APP_PORT = 3000;
const APP_PORT = ( process.env.API_PORT ||  DEFAULT_APP_PORT);

// Setup DB connectivity
mongoose.connect(process.env.MONGO_URL); // connect to database

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutesV1 = express.Router();

// route middleware for CORS
apiRoutesV1.use( (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'x-access-token');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');

    next();

});




app.get('/', (req, res) => {
    res.send('Hello World');
});

// TODO: This will be removed before final commits.
apiRoutesV1.get('/users', userRoutes.users);

// Get user by username
apiRoutesV1.get('/user', userRoutes.user);

// Update profile
apiRoutesV1.post('/updateuserprofile', userRoutes.updateUserProfile);

/**
 * User End Points That DO Require JWT
 * TODO: Add JWT code
 */

// route to return all users (GET http://localhost:8080/api/users)
// apiRoutesV1.post('/user', userRoutes.user);







// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// apply the routes to our application with the prefix /api
app.use('/api/v1', apiRoutesV1);

// Start 'app' and listen on for requests
app.listen(APP_PORT, () => console.log(`Chat Tronic API application is listening on port ${APP_PORT}`));
