const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/route');

//set up express
const app = express();
app.listen(4000, function () {
    console.log('now listening for request');
})

//connect to database
mongoose.connect('mongodb://localhost/vul', { useNewUrlParser: true });
mongoose.Promise = global.Promise;


//using bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//using routes
app.use('/', routes);

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(422).send({ error: err.message })

});