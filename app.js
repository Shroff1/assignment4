/*This is our middleware code that starts express*/
var express = require('express');
var path = require('path');
var url = require('url')
var users= require('./routes/users');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.connect(`mongodb://aniket:aniket@cluster0-shard-00-00-tgjao.mongodb.net:27017,cluster0-shard-00-01-tgjao.mongodb.net:27017,cluster0-shard-00-02-tgjao.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
//var db=mongoose.connetion;



var app = express();

app.use(bodyparser.urlencoded({extended: false}));

//tells express where to find views.
app.set('views', path.join(__dirname, 'views'));

//tell express to use pug as template engine
app.set('view engine', 'pug');

//sends all user requests in url to user.js file
app.use('/users', users);

//if route not found 404 error given
app.use((req,res,next)=>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
