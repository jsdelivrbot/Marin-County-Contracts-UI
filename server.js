var express = require('express');
var app = express();
var path = require('path');

// app.get('/', function(req, res){
//    res.sendFile(path.join(__dirname + '/'));
// });

// app.use( express.static( __dirname));
// app.use('../bower_components',  express.static(__dirname + '../bower_components'));

app.use(express.static(__dirname + '/srcs'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.get( '/', function( req, res ) {
//     res.sendFile( path.join( __dirname, 'client', 'index.html' ));
  // });

app.listen(3000);
