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
mongoose.connect('localhost:27017');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

app.listen(8080);
console.log("App is listening on port 8080");


// define model ==================
var Todo = mongoose.model('Todo', {
    test : String   
});


// RESTful API ===================

  // get all todos
  app.get('/api/todos', function(req, res) {
    
    //use mongoose to get all todos in the database
    Todo.find(function(err, todos){
      
      if (err)
        res.send(err);
      
      res.josn(todos);  //return all todos in JSON format   
    });
  });
  
  app.post('/api/todos', function(req, res){
  
    Todo.create({
      text : req.body.test,
      done : false
    }, function(err, todo) {
        if(err)
          res.send(err);
          
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
            
          res.json(todos);
        });
    });
  });

