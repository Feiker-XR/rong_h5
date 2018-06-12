var markdown = require( "markdown" ).markdown;
console.log( markdown.toHTML( "4123412341234 *asdfasdf*!" ) );

/*
var express = require('express');
var markdown = require('markdown');
var app = module.exports = express.createServer();  
  
app.configure(function(){  
  // set some config  
});  
  
app.get('/', function(req, res){  
  res.render('index', {
    title: 'Express'  
  });  
});  
  
app.listen(8001, function (argument) {
    console.log( 'Markdown server Port: ', port )
}); */



// var express = require('express');
// var app = express();
// var ejs = require('ejs');
// var path = require('path');
// var fs = require("fs");
// var port = 51004;

// var bodyParser = require('body-parser');
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// app.listen(port, function (argument) {
//     console.log( 'Markdown server Port: ', port )
// });
