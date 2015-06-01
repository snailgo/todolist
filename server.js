// pengfeiw
// server.js


//set up =========================
var express   = require('express');
var app       = express();  // create out app w/ express
var mongoose  = require('mongoose');  // mongoose for mongodb
var morgan    = require('morgan');  // log request to the console
var bodyParser  = require('body-parser'); // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT
var passport = require('passport');
var cookieParser = require('cookie-parser');
var sess = require('express-session');
var flash = require('connect-flash');

// configuration =================

// database
var database = require('./config/database');
mongoose.connect(database.url);

require('./config/passport')(passport);


// express
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cookieParser());
app.use(sess({secret: "todo node secret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');


// routes ===========================================================================
//require('./app/routes')(app);
require('./app/routes/auth.js')(app, passport);

app.listen(8080);
console.log("App is listening on port 8080");
