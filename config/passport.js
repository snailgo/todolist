var LocalStrategy = require('passport-local').Strategy; //load passport-local strategy

// load up the user model
var User = require('../app/models/user');

//expose this funciton to our app using module.exports
module.exports = function(passport) {

  // serialize the user from the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({

      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

        User.findOne({
          'local.username': username
        }, function(err, user) {

          if (err)
            return done(err);

          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken'))
          } else {
            var newUser = new User();

            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

  // Local signin
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {

    User.findOne({
      'local.username': username
    }, function(err, user) {

      if (err)
        return done(err);

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password'));
      }

      return done(null, user);
    })

  }));
};