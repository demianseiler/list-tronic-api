'use strict';

// Get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    username: 'string',
    password: 'string',
    user_email: 'string',
    first_name: 'string',
    last_name: 'string',
});

module.exports = mongoose.model('user', userSchema);