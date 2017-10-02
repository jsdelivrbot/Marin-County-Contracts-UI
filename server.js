var express = require('express');
var app = express();

app.use(express.static(__dirname + '/srcs'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.listen(3000);
