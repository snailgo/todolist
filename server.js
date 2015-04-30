// pengfeiw
// server.js


//set up =========================
var express   = require('express');
var app       = express();  // create out app w/ express
var mongoose  = require('mongoose');  // mongoose for mongodb
var morgan    = require('morgan');  // log request to the console
var bodyParser  = require('body-parser'); // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT


// configuration =================
var database = require('./config/database');
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// routes ===========================================================================
require('./app/routes')(app);



app.listen(8080);
console.log("App is listening on port 8080");
