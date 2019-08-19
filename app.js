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
const express = require('express');
const mongoose = require('mongoose');

// Create express 'app' object
const app = express();

// Setup application port
const DEFAULT_APP_PORT = 3000;
const APP_PORT = ( process.env.API_PORT ||  DEFAULT_APP_PORT);

// Setup DB connectivity
mongoose.connect(process.env.MONGO_URL); // connect to database

// Begin routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/user', userRoutes.user);


// Start 'app' and listen on for requests
app.listen(APP_PORT, () => console.log(`Chat Tronic API application is listening on port ${APP_PORT}`));
