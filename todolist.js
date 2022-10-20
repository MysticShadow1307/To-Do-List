const mongoose = require('mongoose');

var Todolist = mongoose.model('Todolist', {
    text: {type: String },
    isCompleted: {type: String},
    priority: {type: Number}
});

module.exports = {Todolist};