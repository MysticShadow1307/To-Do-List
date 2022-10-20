const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Todolist } = require('../models/todolist');

// => localhost:3000/employees/
// => localhost:3000/todolist/
router.get('/', (req, res) => {
    Todolist.find((err, docs) => {
        if(!err) {res.send(docs); }
        else { console.log('Error in Retriving Todolist :' + JSON.stringify(err, undefined, 2)); }
    });
});


//Read Data Method
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id: $(req.params.id)');
    
    Todolist.findById(req.params.id, (err, doc) => {
        if(!err) {res.send(doc); }
        else {console.log('Error in Retriving Todolist: ' + JSON.stringify(err, undefined, 2)); }
    });
});


//Create Method
router.post('/', (req, res) => {
    var todo = new Todolist({
        text: req.body.text, 
        isCompleted: req.body.isCompleted,
        priority: req.body.priority
    });
    todo.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Todolist Save: ' + JSON.stringify(err, undefined, 2));}
    });
});

//Update Method
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id: $(req.params.id)');
    
    var todo = {
        text: req.body.text, 
        isCompleted: req.body.isCompleted,
        priority: req.body.priority,
    };
    Todolist.findByIdAndUpdate(req.params.id, { $set: todo}, { new: true}, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Todolist update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Delete Operation
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id: $(req.params.id)');
    
    Todolist.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Todolist Delete: ' + JSON.stringify(err, undefined, 2)); }

    });
});


module.exports = router;