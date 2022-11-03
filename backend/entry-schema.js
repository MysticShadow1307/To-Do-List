const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    date: String,
    entry: String,
    status: String,
    priority: String
});

module.exports = mongoose.model('TodolistEntry', entrySchema);

