'use strict';
const mongoose = require('mongoose');
// Order Schema
const orderSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    order: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('Order', orderSchema);
