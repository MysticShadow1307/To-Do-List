const express = require('express');
const bodyParser = require('body-parser');
const TodolistEntryModel = require('./entry-schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/FinalDB', (err) => {
    if(!err)
        console.log('MongoDB connection succeeded.');
    else   
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));

});

todolistEntries = [
    {id: 1, date: "August 12th", entry:"Gundham", status:"Incomplete", priority:"High"},
    {id: 2, date: "September 12th", entry:"Steve", status:"Incomplete", priority:"High"},
    {id: 3, date: "October 12th", entry:"Pudding", status:"Incomplete", priority:"High"},

];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.get('/max-id', (req, res) => {
    var max = 0;
    for( var i=0; i<todolistEntries.length; i++)
    {
        if(todolistEntries[i].id > max){
            max = todolistEntries[i].id;
        }
    }
    res.json({maxId: max});
})

app.delete('/remove-entry/:id', (req, res) => {
    console.log(req.params.id)
    TodolistEntryModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Post Deleted'
        })
    })
})

app.put('/update-entry/:id', (req, res) => {
    const updatedEntry = new TodolistEntryModel({_id: req.body.id, date: req.body.date, entry: req.body.entry, status: req.body.status, priority: req.body.priority})
    TodolistEntryModel.updateOne({_id: req.body.id}, updatedEntry)
        .then(() => {
            res.status(200).json({
                message: 'Post Updated'
            })
        })
})

app.post('/add-entry', (req, res) =>{
    const todolistEntry = new TodolistEntryModel({date: req.body.date, entry: req.body.entry, status: req.body.status, priority: req.body.priority})
    todolistEntry.save()
        .then(() => {
            res.status(200).json({
                message: 'Post submitted'
            })
        })
})

app.get('/todolist-entries', (req, res, next) => {
    TodolistEntryModel.find()
        .then((data) => {
            res.json({'todolistEntries': data});
        })
        .catch(() =>{
            console.log("Error fetching entries")
        });
    

})

module.exports = app;