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


// define model ==================
var Todo = mongoose.model('todo', {
    text : String
});


// routes ===========================================================================

  // api ----------------------------------------------------------------------------

  // get all todos
  app.get('/api/todos', function(req, res) {

    //use mongoose to get all todos in the database
    Todo.find(function(err, todos){

      if (err)
        res.send(err);

      res.json(todos);  //return all todos in JSON format
    });
  });

  app.post('/api/todos', function(req, res){

    Todo.create({
      text : req.body.text,
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

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
  });



app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App is listening on port 8080");
