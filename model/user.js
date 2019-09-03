'use strict';

// Get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    user_email: {
        type: String,
        required: true,
        trim: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_update_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);