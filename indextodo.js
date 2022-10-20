const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./dbtodo.js');
var todoController = require('./controllers/todoController.js');

var app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/todolist', todoController);