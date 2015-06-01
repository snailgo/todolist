var mongoose = require('mongoose');   //access mongodb
var bcrypt = require('bcryptjs');  //generate hash code

//User Schema
var userSchema = mongoose.Schema({
  local : {
    username : String,
    password : String
  }
});

//Methods for schema
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

//Methods must be defined before mongoose.model() compile Module
module.exports = mongoose.model('User', userSchema);