/**
 * app.js is the main application file for the Chat Tronic API application.
 */
'use strict';

/**
 * Project Module Imports
 * */
const pkg = require('./package.json');
const dotenv = require('dotenv').config();

/**
 * 3rd Party Module Imports
 * */
const express = require('express');

// Create express 'app' object
const app = express();

// Setup application port
const DEFAULT_APP_PORT = 3000;

const APP_PORT = ( process.env.API_PORT ||  DEFAULT_APP_PORT);

// Begin routes
app.get('/', function(req, res) {
    res.send('Hello World');
});



// Start 'app' and listen on for requests
app.listen(APP_PORT, () => console.log(`Chat Tronic API application is listening on port ${APP_PORT}`));
