const mongoose = require('mongoose');
const { Schema } = require('zod');

// Create a Schema for Account
const accountScehma = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountScehma);

module.exports = {Account}